const SUPABASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof process !== "undefined" ? process.env.SUPABASE_URL : undefined) ||
  (typeof process !== "undefined" ? process.env.VITE_SUPABASE_URL : undefined);

const SUPABASE_ANON_KEY =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== "undefined" ? process.env.SUPABASE_ANON_KEY : undefined) ||
  (typeof process !== "undefined" ? process.env.VITE_SUPABASE_ANON_KEY : undefined);

const SUPABASE_SERVICE_ROLE_KEY =
  typeof process !== "undefined" ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined;

export function getSupabaseUrl(): string {
  if (!SUPABASE_URL) {
    throw new Error(
      "Missing Supabase URL. Set VITE_SUPABASE_URL (and SUPABASE_URL on the server) in .env.local.",
    );
  }
  return SUPABASE_URL;
}

export function getSupabaseAnonKey(): string {
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      "Missing Supabase anon key. Set VITE_SUPABASE_ANON_KEY in .env.local.",
    );
  }
  return SUPABASE_ANON_KEY;
}

export function getSupabaseServiceRoleKey(): string {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }
  return SUPABASE_SERVICE_ROLE_KEY;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export function isSupabaseServerConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}
