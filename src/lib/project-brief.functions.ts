import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ————————————————————————————————————————————————————————————————
// Schema — server-side validation of the full project brief
// ————————————————————————————————————————————————————————————————

const briefSchema = z.object({
  service: z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    basePrice: z.number().nonnegative(),
    minDays: z.number().int().nonnegative(),
    maxDays: z.number().int().nonnegative(),
    nextStep: z.string().min(1),
  }),
  industry: z.string().min(1).max(80),
  features: z.array(
    z.object({ id: z.string().min(1), label: z.string().min(1) }),
  ),
  complexity: z.object({
    id: z.enum(["simple", "standard", "advanced", "enterprise"]),
    label: z.string().min(1),
  }),
  businessDescription: z.string().min(5).max(1200),
  estimate: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
    minDays: z.number().nonnegative(),
    maxDays: z.number().nonnegative(),
  }),
  contact: z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(40).optional().default(""),
    company: z.string().trim().max(160).optional().default(""),
    country: z.string().trim().max(80).optional().default(""),
    description: z.string().trim().min(5).max(1200),
  }),
});

export type ProjectBriefInput = z.infer<typeof briefSchema>;

// ————————————————————————————————————————————————————————————————
// Helpers
// ————————————————————————————————————————————————————————————————

function generateProjectId(): string {
  // SYN-YYYYMMDD-XXXXXX (URL-safe, human readable, unique enough for the brief)
  const now = new Date();
  const date =
    `${now.getUTCFullYear()}` +
    String(now.getUTCMonth() + 1).padStart(2, "0") +
    String(now.getUTCDate()).padStart(2, "0");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  return `SYN-${date}-${suffix}`;
}

function buildSummary(input: ProjectBriefInput): string {
  const featureList = input.features.length
    ? input.features.map((f) => f.label).join(", ")
    : "no additional features";
  const company = input.contact.company
    ? `${input.contact.company}`
    : "an independent client";
  const country = input.contact.country ? ` based in ${input.contact.country}` : "";
  return (
    `${input.contact.name} from ${company}${country} is planning a ` +
    `${input.service.label.toLowerCase()} for the ${input.industry.toLowerCase()} industry. ` +
    `Complexity is rated ${input.complexity.label.toLowerCase()}, with ${featureList}. ` +
    `Estimated investment: €${input.estimate.min.toLocaleString("en-US")}–` +
    `€${input.estimate.max.toLocaleString("en-US")} over ` +
    `${input.estimate.minDays}–${input.estimate.maxDays} days. ` +
    `Recommended next step: ${input.service.nextStep}`
  );
}

// ————————————————————————————————————————————————————————————————
// Server function
// ————————————————————————————————————————————————————————————————

export const submitProjectBrief = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => briefSchema.parse(data))
  .handler(async ({ data }) => {
    const projectId = generateProjectId();
    const receivedAt = new Date().toISOString();
    const summary = buildSummary(data);

    const payload = {
      projectId,
      receivedAt,
      summary,
      brief: data,
    };

    // Server-side log so operators can trace new briefs in Cloud logs
    // until CRM/DB persistence is wired up.
    console.log("[project-brief] submitted", {
      projectId,
      service: data.service.id,
      industry: data.industry,
      complexity: data.complexity.id,
      contactEmail: data.contact.email,
    });

    // ————————————————————————————————————————————————————————
    // Future integration hooks (intentionally stubbed — not enabled yet)
    // ————————————————————————————————————————————————————————
    // TODO(CRM): Persist `payload` to Lovable Cloud table `project_briefs`
    //            and forward to CRM (HubSpot / Pipedrive / custom).
    // TODO(EMAIL): Send confirmation email to `data.contact.email` and
    //              internal notification to the Synvora inbox.
    // TODO(PDF): Generate branded proposal PDF from `payload` and attach
    //            a signed download URL to the confirmation email.

    return {
      ok: true as const,
      projectId,
      receivedAt,
      summary,
    };
  });
