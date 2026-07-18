import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

function loadEnvLocal() {
  const envPath = resolve(projectRoot, ".env.local");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

function readAccessToken() {
  const fromEnv = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  if (fromEnv) return fromEnv;

  const home = process.env.USERPROFILE ?? process.env.HOME;
  if (!home) return undefined;

  const tokenPath = resolve(home, ".supabase", "access-token");
  if (!existsSync(tokenPath)) return undefined;

  const token = readFileSync(tokenPath, "utf8").trim();
  return token.length > 0 ? token : undefined;
}

function getProjectRef() {
  const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const match = url?.match(/https:\/\/([^.]+)\.supabase\.co/);
  return match?.[1];
}

async function runSqlViaManagementApi(token, projectRef, query) {
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

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`Management API SQL failed (${response.status}): ${body}`);
  }
}

async function runSqlViaPostgres(projectRef, query) {
  const password = process.env.SUPABASE_DB_PASSWORD?.trim();
  const explicitUrl = process.env.SUPABASE_DB_URL?.trim();
  if (!password && !explicitUrl) return false;

  const pg = await import("pg");
  const connectionString =
    explicitUrl ??
    `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres`;

  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query(query);
    return true;
  } finally {
    await client.end();
  }
}

loadEnvLocal();

const migrationPath = resolve(
  projectRoot,
  "supabase/migrations/20260718194500_create_project_progress.sql",
);
const migrationSql = readFileSync(migrationPath, "utf8");
const projectRef = getProjectRef();

if (!projectRef) {
  console.error("Could not resolve Supabase project ref from SUPABASE_URL.");
  process.exit(1);
}

let applied = false;

const token = readAccessToken();
if (token) {
  try {
    await runSqlViaManagementApi(token, projectRef, migrationSql);
    applied = true;
    console.log("Applied project_progress migration via Supabase Management API.");
  } catch (error) {
    console.warn(error instanceof Error ? error.message : error);
  }
}

if (!applied) {
  try {
    const ok = await runSqlViaPostgres(projectRef, migrationSql);
    if (ok) {
      applied = true;
      console.log("Applied project_progress migration via Postgres connection.");
    }
  } catch (error) {
    console.warn(error instanceof Error ? error.message : error);
  }
}

if (!applied) {
  console.error(
    "Could not apply migration automatically. Add SUPABASE_DB_PASSWORD to .env.local, run `npx supabase login`, or paste the migration SQL into the Supabase SQL editor.",
  );
  process.exit(1);
}
