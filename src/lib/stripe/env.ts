function readProcessEnv(name: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export function getStripeSecretKey(): string | undefined {
  return readProcessEnv("STRIPE_SECRET_KEY");
}

export function getStripeWebhookSecret(): string | undefined {
  return readProcessEnv("STRIPE_WEBHOOK_SECRET");
}

export function getStripePublishableKey(): string | undefined {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY) {
    return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  }
  return readProcessEnv("VITE_STRIPE_PUBLISHABLE_KEY");
}

export function getSiteUrl(): string {
  return (
    readProcessEnv("SITE_URL") ??
    readProcessEnv("VITE_SITE_URL") ??
    "http://localhost:8080"
  );
}

export function isStripeConfigured(): boolean {
  const key = getStripeSecretKey();
  return Boolean(key && !key.includes("placeholder") && key.startsWith("sk_"));
}

export function isStripeWebhookConfigured(): boolean {
  const secret = getStripeWebhookSecret();
  return Boolean(secret && !secret.includes("placeholder") && secret.startsWith("whsec_"));
}
