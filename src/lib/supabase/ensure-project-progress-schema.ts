import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { PostgrestError } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getSupabaseProjectRef } from "@/lib/supabase/env";

const __dirname = dirname(fileURLToPath(import.meta.url));

const MIGRATION_PATH = resolve(
  __dirname,
  "../../../supabase/migrations/20260718194500_create_project_progress.sql",
);

let schemaReady: boolean | null = null;
let schemaEnsurePromise: Promise<boolean> | null = null;

export function isMissingProjectProgressTableError(
  error: PostgrestError | null | undefined,
): boolean {
  if (!error) return false;
  return (
    error.code === "PGRST205" ||
    error.message.includes("Could not find the table 'public.project_progress'")
  );
}

function readMigrationSql(): string {
  return readFileSync(MIGRATION_PATH, "utf8");
}

async function runSqlViaManagementApi(query: string): Promise<boolean> {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  const projectRef = getSupabaseProjectRef();
  if (!token || !projectRef) return false;

  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    },
  );

  if (!response.ok) {
    console.warn(
      "[project-progress] management API migration failed",
      response.status,
      await response.text(),
    );
    return false;
  }

  return true;
}

async function applyProjectProgressMigration(): Promise<boolean> {
  const migrationSql = readMigrationSql();
  return runSqlViaManagementApi(migrationSql);
}

async function probeProjectProgressTable(): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("project_progress").select("id").limit(1);
  if (!error) return true;
  return !isMissingProjectProgressTableError(error);
}

export async function ensureProjectProgressSchema(): Promise<boolean> {
  if (schemaReady === true) return true;
  if (schemaEnsurePromise) return schemaEnsurePromise;

  schemaEnsurePromise = (async () => {
    if (await probeProjectProgressTable()) {
      schemaReady = true;
      return true;
    }

    console.warn(
      "[project-progress] project_progress table missing — attempting migration",
    );

    const applied = await applyProjectProgressMigration();
    if (!applied) {
      schemaReady = false;
      return false;
    }

    const ready = await probeProjectProgressTable();
    schemaReady = ready;
    return ready;
  })();

  try {
    return await schemaEnsurePromise;
  } finally {
    schemaEnsurePromise = null;
  }
}

export function resetProjectProgressSchemaCache() {
  schemaReady = null;
  schemaEnsurePromise = null;
}
