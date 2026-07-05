import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are the Synvora AI Project Consultant — a warm, sharp, senior digital-product strategist for a premium AI product studio.

Your job: have a short, natural conversation with a prospective client to understand what they want to build, then produce a tailored proposal.

RULES:
- Ask ONLY ONE question at a time. Never bundle multiple questions.
- Keep messages short (1–3 sentences). No bullet lists, no markdown headings, no emojis.
- Sound like a real senior consultant, not a form. Reference their previous answers.
- Ask ONLY relevant follow-ups. If they say "landing page", do NOT ask about mobile apps or CRM.
- Aim for 5–8 questions total. Never more than 8. Stop asking as soon as you have enough.
- Cover, when relevant: what they want to build, industry, main goal, target users, must-have features (AI automation, CRM, payments, booking, multilingual, mobile), rough timeline, budget sensitivity.
- If the user gives short answers, still keep it concise.

WHEN YOU HAVE ENOUGH INFO:
Reply with ONE short closing sentence (e.g. "Perfect — here's what I recommend."), then on a new line output a single fenced JSON block exactly like this and nothing else after it:

\`\`\`proposal
{
  "summary": "One paragraph describing the project in the client's own context.",
  "recommendation": "One paragraph explaining the recommended solution and why it fits.",
  "timeline": "e.g. 5–14 days",
  "budgetMin": 8000,
  "budgetMax": 18000,
  "stack": ["Next.js", "TypeScript", "Supabase", "OpenAI", "Stripe"],
  "milestones": ["Discovery & design", "Core build", "AI integration", "Launch & handover"]
}
\`\`\`

TIMELINE RANGES (AI-assisted delivery — always express as "X–Y days", never weeks or months):
- Landing Page: 2–5 days
- Corporate Website: 5–14 days
- E-commerce Store: 10–21 days
- AI Chatbot: 2–7 days
- AI Automation: 3–14 days
- CRM System: 14–30 days
- Web App: 14–45 days
- Mobile App: 21–60 days
- SaaS Platform: 30–90 days
- Marketplace: 30–90 days
- Booking System: 7–21 days
- Client Portal: 14–45 days
- Internal Business System: 30–90 days
Pick the range matching the project. Do not invent slower timelines.

TECHNOLOGY NAMES — NEVER translate or localize these. Always write them in English exactly as shown, in any language:
Flutter, Firebase, Stripe, Cloudflare, OpenAI, Make, Node.js, React, Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS.
Never translate "Flutter" as "Порхание" or any other localized word — tech names are proper nouns.

Budget must be in EUR, realistic for a premium studio (min €1,500 landing page, up to €80,000+ for complex platforms). Never emit the proposal block before you have asked enough questions.`;

export const Route = createFileRoute("/api/consultant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const messages = Array.isArray(body.messages) ? body.messages : [];

        // Basic input validation
        if (messages.length > 40) {
          return new Response("Too many messages", { status: 400 });
        }
        for (const m of messages) {
          if (
            !m ||
            (m.role !== "user" && m.role !== "assistant") ||
            typeof m.content !== "string" ||
            m.content.length > 4000
          ) {
            return new Response("Invalid message", { status: 400 });
          }
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        try {
          const gateway = createLovableAiGatewayProvider(apiKey);
          const model = gateway("google/gemini-3-flash-preview");

          const { text } = await generateText({
            model,
            system: SYSTEM_PROMPT,
            messages,
          });

          // Extract proposal JSON if present
          const match = text.match(/```proposal\s*([\s\S]*?)```/);
          let proposal: unknown = null;
          let content = text;
          if (match) {
            try {
              proposal = JSON.parse(match[1].trim());
              content = text.replace(match[0], "").trim();
            } catch {
              // leave proposal null; keep raw text
            }
          }

          return Response.json({ content, proposal });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "AI request failed";
          const status = /rate|429/i.test(msg) ? 429 : /402|credit/i.test(msg) ? 402 : 500;
          return new Response(msg, { status });
        }
      },
    },
  },
});
