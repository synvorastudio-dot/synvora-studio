function isServerRuntime(): boolean {
  return typeof window === "undefined";
}

function readProcessEnv(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function resolveSupabaseUrl(): string | undefined {
  if (isServerRuntime()) {
    // Server functions and loaders must use runtime env (Lovable/Nitro injects these).
    return (
      readProcessEnv("SUPABASE_URL") ??
      readProcessEnv("VITE_SUPABASE_URL") ??
      import.meta.env?.VITE_SUPABASE_URL
    );
  }

  return import.meta.env?.VITE_SUPABASE_URL ?? readProcessEnv("VITE_SUPABASE_URL");
}

function resolveSupabaseAnonKey(): string | undefined {
  if (isServerRuntime()) {
    return (
      readProcessEnv("SUPABASE_ANON_KEY") ??
      readProcessEnv("VITE_SUPABASE_ANON_KEY") ??
      import.meta.env?.VITE_SUPABASE_ANON_KEY
    );
  }

  return import.meta.env?.VITE_SUPABASE_ANON_KEY ?? readProcessEnv("VITE_SUPABASE_ANON_KEY");
}

function resolveSupabaseServiceRoleKey(): string | undefined {
  if (!isServerRuntime()) return undefined;
  return readProcessEnv("SUPABASE_SERVICE_ROLE_KEY");
}

export function getSupabaseUrl(): string {
  const url = resolveSupabaseUrl();
  if (!url) {
    throw new Error(
      "Missing Supabase URL. Set VITE_SUPABASE_URL (and SUPABASE_URL on the server) in .env.local.",
    );
  }
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = resolveSupabaseAnonKey();
  if (!key) {
    throw new Error(
      "Missing Supabase anon key. Set VITE_SUPABASE_ANON_KEY in .env.local.",
    );
  }
  return key;
}

export function getSupabaseServiceRoleKey(): string {
  const key = resolveSupabaseServiceRoleKey();
  if (!key) {
    throw new Error(
      "Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    );
  }
  return key;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(resolveSupabaseUrl() && resolveSupabaseAnonKey());
}

export function isSupabaseServerConfigured(): boolean {
  return Boolean(resolveSupabaseUrl() && resolveSupabaseServiceRoleKey());
}
