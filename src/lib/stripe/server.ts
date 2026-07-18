import Stripe from "stripe";
import { getStripeSecretKey } from "./env";

let stripeClient: Stripe | null = null;

export function createStripeClient(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = getStripeSecretKey();
  if (!secretKey) {
    throw new Error(
      "Stripe is not configured. Set STRIPE_SECRET_KEY in your server environment.",
    );
  }

  stripeClient = new Stripe(secretKey, {
    typescript: true,
  });

  return stripeClient;
}

export function resetStripeClientForTests() {
  stripeClient = null;
}
