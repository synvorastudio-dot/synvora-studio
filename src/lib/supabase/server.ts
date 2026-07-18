import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "./env";

export function createServerSupabaseClient(): SupabaseClient<Database> {
  if (typeof window !== "undefined") {
    throw new Error("createServerSupabaseClient() must only be called on the server.");
  }

  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
