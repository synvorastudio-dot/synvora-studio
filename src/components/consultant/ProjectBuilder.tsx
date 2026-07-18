import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { saveProject } from "@/lib/projectStore";
import { submitProjectBrief } from "@/lib/project-brief.functions";
// ————————————————————————————————————————————————————————————————
// Data
// ————————————————————————————————————————————————————————————————

type Service = {
  id: string;
  label: string;
  basePrice: number;      // starting price in EUR
  minDays: number;
  maxDays: number;
  nextStep: string;
};

const SERVICES: Service[] = [
  { id: "landing",     label: "Landing Page",             basePrice:   999, minDays:  2, maxDays:  5,  nextStep: "Design brief + wireframes within 48h." },
  { id: "corporate",   label: "Corporate Website",        basePrice: 2490, minDays:  5, maxDays: 14, nextStep: "Sitemap, content plan and design system." },
  { id: "ecommerce",   label: "E-commerce Store",         basePrice: 3490, minDays: 10, maxDays: 21, nextStep: "Catalogue architecture and checkout blueprint." },
  { id: "chatbot",     label: "AI Chatbot & Assistant",   basePrice: 1990, minDays:  2, maxDays:  7, nextStep: "Knowledge-base audit and assistant scope." },
  { id: "automation",  label: "AI Business Automation",   basePrice: 2990, minDays:  3, maxDays: 14, nextStep: "Process map of automations to deploy." },
  { id: "crm",         label: "CRM System",               basePrice: 4990, minDays: 14, maxDays: 30, nextStep: "Pipeline modelling and roles workshop." },
  { id: "webapp",      label: "Web Application",          basePrice: 4990, minDays: 14, maxDays: 45, nextStep: "Technical scope and architecture proposal." },
  { id: "mobile",      label: "Mobile Application",       basePrice: 6990, minDays: 21, maxDays: 60, nextStep: "Platform strategy (iOS/Android) and MVP scope." },
  { id: "saas",        label: "SaaS Platform",            basePrice: 9990, minDays: 30, maxDays: 90, nextStep: "Multi-tenant architecture and billing design." },
  { id: "portal",      label: "Client Portal",            basePrice: 4990, minDays: 14, maxDays: 45, nextStep: "Access control and portal feature map." },
  { id: "booking",     label: "Booking System",           basePrice: 2990, minDays:  7, maxDays: 21, nextStep: "Scheduling logic and payment integration plan." },
  { id: "internal",    label: "Internal Business System", basePrice: 7990, minDays: 30, maxDays: 90, nextStep: "Operational audit and system architecture." },
];

const INDUSTRIES = [
  "Healthcare", "Finance", "Retail", "Real Estate", "Logistics",
  "Manufacturing", "Education", "Hospitality", "Legal", "Technology",
  "Marketing", "Other",
];

type Feature = { id: string; label: string; add: number; days: number };

const FEATURES: Feature[] = [
  { id: "ai",         label: "AI Integration",       add: 1500, days: 5 },
  { id: "crm",        label: "CRM Integration",      add:  900, days: 3 },
  { id: "payments",   label: "Payments",             add:  700, days: 3 },
  { id: "booking",    label: "Booking / Scheduling", add:  800, days: 4 },
  { id: "admin",      label: "Admin Dashboard",      add: 1200, days: 5 },
  { id: "analytics",  label: "Analytics",            add:  600, days: 2 },
  { id: "api",        label: "Custom API",           add: 1000, days: 4 },
  { id: "seo",        label: "SEO Package",          add:  400, days: 2 },
  { id: "i18n",       label: "Multi-language",       add:  700, days: 3 },
  { id: "notify",     label: "Notifications",        add:  400, days: 2 },
  { id: "auth",       label: "Authentication",       add:  500, days: 2 },
  { id: "storage",    label: "File Storage",         add:  400, days: 2 },
];

type Complexity = {
  id: "simple" | "standard" | "advanced" | "enterprise";
  label: string;
  desc: string;
  mult: number;
  dayMult: number;
};

const COMPLEXITIES: Complexity[] = [
  { id: "simple",     label: "Simple",     desc: "Focused scope, minimal integrations.",              mult: 1.0, dayMult: 1.0 },
  { id: "standard",   label: "Standard",   desc: "Balanced scope with a few integrations.",           mult: 1.4, dayMult: 1.2 },
  { id: "advanced",   label: "Advanced",   desc: "Complex logic, multiple integrations, custom UX.",  mult: 1.9, dayMult: 1.5 },
  { id: "enterprise", label: "Enterprise", desc: "Mission-critical, high-scale, deep customisation.", mult: 2.8, dayMult: 1.9 },
];

// ————————————————————————————————————————————————————————————————
// Types
// ————————————————————————————————————————————————————————————————

type Contact = {
  name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  description: string;
};

const EMPTY_CONTACT: Contact = {
  name: "", email: "", phone: "", company: "", country: "", description: "",
};

// ————————————————————————————————————————————————————————————————
// Component
// ————————————————————————————————————————————————————————————————

const TOTAL_STEPS = 6;

export default function ProjectBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [complexityId, setComplexityId] = useState<Complexity["id"] | null>(null);
  const [businessDesc, setBusinessDesc] = useState("");
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);


  const service = useMemo(() => SERVICES.find((s) => s.id === serviceId) ?? null, [serviceId]);
  const complexity = useMemo(() => COMPLEXITIES.find((c) => c.id === complexityId) ?? null, [complexityId]);
  const features = useMemo(() => FEATURES.filter((f) => featureIds.includes(f.id)), [featureIds]);

  const estimate = useMemo(() => {
    if (!service) return null;
    return {
      startPrice: service.basePrice,
      minD: service.minDays,
      maxD: service.maxDays,
    };
  }, [service]);


  const canNext = (() => {
    switch (step) {
      case 0: return !!serviceId;
      case 1: return !!industry;
      case 2: return true;
      case 3: return !!complexityId;
      case 4: return businessDesc.trim().length > 4;
      case 5: return true; // review
      default: return true;
    }
  })();

  const toggleFeature = (id: string) =>
    setFeatureIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const contactValid =
    contact.name.trim().length >= 2 &&
    /.+@.+\..+/.test(contact.email) &&
    contact.description.trim().length >= 5;

  const canSubmit =
    !!service &&
    !!industry &&
    !!complexity &&
    !!estimate &&
    businessDesc.trim().length >= 5 &&
    contactValid &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !service || !industry || !complexity || !estimate) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const featurePrice = features.reduce((sum, feature) => sum + feature.add, 0);
      const featureDays = features.reduce((sum, feature) => sum + feature.days, 0);
      const min = Math.round(service.basePrice * complexity.mult + featurePrice);
      const max = Math.round(min * 1.2);
      const minDays = Math.round((service.minDays + featureDays) * complexity.dayMult);
      const maxDays = Math.round((service.maxDays + featureDays) * complexity.dayMult);

      const response = await submitProjectBrief({
        data: {
          service: {
            id: service.id,
            label: service.label,
            basePrice: service.basePrice,
            minDays: service.minDays,
            maxDays: service.maxDays,
            nextStep: service.nextStep,
          },
          industry,
          features: features.map((feature) => ({
            id: feature.id,
            label: feature.label,
          })),
          complexity: {
            id: complexity.id,
            label: complexity.label,
          },
          businessDescription: businessDesc,
          estimate: {
            min,
            max,
            minDays,
            maxDays,
          },
          contact: {
            name: contact.name.trim(),
            email: contact.email.trim(),
            phone: contact.phone.trim(),
            company: contact.company.trim(),
            country: contact.country.trim(),
            description: contact.description.trim(),
          },
        },
      });

      saveProject({
        projectId: response.projectId,
        createdAt: response.receivedAt,
        currentStageId: "submitted",
        service: { id: service.id, label: service.label },
        industry,
        complexity: { id: complexity.id, label: complexity.label },
        features: features.map((feature) => ({ id: feature.id, label: feature.label })),
        estimate: { startPrice: estimate.startPrice, minD: estimate.minD, maxD: estimate.maxD },
        businessDesc,
        contact: { ...contact },
      });

      await navigate({
        to: "/my-project/$projectId",
        params: { projectId: response.projectId },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };


  const reset = () => {
    setStep(0);
    setServiceId(null);
    setIndustry(null);
    setFeatureIds([]);
    setComplexityId(null);
    setBusinessDesc("");
    setContact(EMPTY_CONTACT);
    setSubmitError(null);
  };

  const returnHome = () => {
    reset();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ——— Builder ————————————————————————————————————————————————
  return (
    <div className="relative overflow-hidden rounded-3xl glass-strong">
      <AmbientWash />

      {/* Header / progress */}
      <div className="relative flex items-center justify-between gap-4 border-b border-[var(--hairline)] px-6 py-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)]">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
          <div>
            <div className="font-display text-[13.5px] tracking-[-0.01em] text-foreground">
              AI Project Builder
            </div>
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
              Step {Math.min(step + 1, TOTAL_STEPS)} of {TOTAL_STEPS}
            </div>
          </div>
        </div>
        <div className="hidden w-40 sm:block">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-linear-to-r from-[var(--electric)] to-[oklch(0.6_0.22_290)] transition-all duration-500"
              style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative px-6 py-8 md:px-8 md:py-10">
        {step === 0 && (
          <StepShell title="What are we building?" subtitle="Pick the service that best matches your project.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <ChoiceCard
                  key={s.id}
                  active={serviceId === s.id}
                  onClick={() => setServiceId(s.id)}
                  title={s.label}
                  meta={`From €${s.basePrice.toLocaleString("en-US")} · ${s.minDays}–${s.maxDays} days`}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 1 && (
          <StepShell title="What industry are you in?" subtitle="We adapt the proposal to your sector.">
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {INDUSTRIES.map((i) => (
                <ChoiceCard
                  key={i}
                  active={industry === i}
                  onClick={() => setIndustry(i)}
                  title={i}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell title="Which features do you need?" subtitle="Select any that apply. You can add more later.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <ChoiceCard
                  key={f.id}
                  active={featureIds.includes(f.id)}
                  onClick={() => toggleFeature(f.id)}
                  title={f.label}
                  check
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 3 && (
          <StepShell title="How complex is your project?" subtitle="This shapes the timeline and budget range.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {COMPLEXITIES.map((c) => (
                <ChoiceCard
                  key={c.id}
                  active={complexityId === c.id}
                  onClick={() => setComplexityId(c.id)}
                  title={c.label}
                  meta={c.desc}
                />
              ))}
            </div>
          </StepShell>
        )}

        {step === 4 && (
          <StepShell title="Tell us about your business" subtitle="A short description — goals, audience, what you want the product to achieve.">
            <textarea
              value={businessDesc}
              onChange={(e) => setBusinessDesc(e.target.value)}
              rows={7}
              maxLength={1200}
              placeholder="e.g. We run a boutique real-estate agency in Milan and want a modern platform to showcase listings, capture leads and let clients book viewings…"
              className="w-full resize-none rounded-2xl hairline bg-[var(--surface)] px-4 py-3.5 text-[14px] leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-[color:var(--hairline-strong)]"
            />
            <div className="mt-2 text-right text-[11px] text-muted-foreground">
              {businessDesc.length}/1200
            </div>
          </StepShell>
        )}

        {step === 5 && service && complexity && estimate && (
          <StepShell title="Your tailored proposal" subtitle="Review the summary, then leave your details so our AI can prepare the next step.">
            {/* Proposal card */}
            <div className="relative overflow-hidden rounded-2xl hairline bg-[var(--surface)] p-6 md:p-7">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.35), transparent 70%)" }}
              />
              <div className="relative grid gap-5 sm:grid-cols-2">
                <ProposalRow k="Service"       v={service.label} />
                <ProposalRow k="Industry"      v={industry ?? "—"} />
                <ProposalRow k="Complexity"    v={complexity.label} />
                <ProposalRow k="Features"      v={features.length ? features.map((f) => f.label).join(", ") : "None selected"} />
                <ProposalRow k="Estimated budget" v={`From €${estimate.startPrice.toLocaleString("en-US")}`} highlight />
                <ProposalRow k="Estimated timeline" v={`${estimate.minD}–${estimate.maxD} days`} highlight />
              </div>
              <div className="relative mt-6 rounded-xl hairline bg-white/[0.02] p-4">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Recommended next step
                </div>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-foreground/90">
                  {service.nextStep}
                </p>
              </div>
              <p className="relative mt-4 text-[11.5px] leading-relaxed text-muted-foreground">
                AI-assisted delivery allows Synvora to reduce production time compared with traditional development. Final estimates depend on scope, integrations, content readiness and approval speed.
              </p>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
              <Field label="Name"     value={contact.name}    onChange={(v) => setContact({ ...contact, name: v })}     required />
              <Field label="Email"    value={contact.email}   onChange={(v) => setContact({ ...contact, email: v })}    type="email" required />
              <Field label="Phone"    value={contact.phone}   onChange={(v) => setContact({ ...contact, phone: v })}    type="tel" />
              <Field label="Company"  value={contact.company} onChange={(v) => setContact({ ...contact, company: v })}  />
              <Field label="Country"  value={contact.country} onChange={(v) => setContact({ ...contact, country: v })}  className="sm:col-span-2" />
              <div className="sm:col-span-2">
                <Label>Project Description</Label>
                <textarea
                  value={contact.description}
                  onChange={(e) => setContact({ ...contact, description: e.target.value })}
                  rows={4}
                  maxLength={1200}
                  required
                  placeholder="What outcome do you want? Any deadlines, integrations or constraints we should know?"
                  className="mt-1.5 w-full resize-none rounded-2xl hairline bg-[var(--surface)] px-4 py-3 text-[14px] leading-relaxed text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-[color:var(--hairline-strong)]"
                />
              </div>
              <div className="sm:col-span-2 mt-2 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2.5 text-[13px] text-foreground/85 transition hover:bg-white/[0.08]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:-translate-y-px"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Start My Project
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-px group-hover:translate-x-px" />
                    </>
                  )}
                </button>
              </div>
              {submitError && (
                <div className="sm:col-span-2 rounded-xl hairline bg-[oklch(0.5_0.2_25/0.08)] px-4 py-3 text-[12.5px] text-[oklch(0.85_0.15_25)]">
                  {submitError}
                </div>
              )}
            </form>
          </StepShell>
        )}
      </div>

      {/* Footer nav — hidden on final step (form owns its own buttons) */}
      {step < 5 && (
        <div className="relative flex items-center justify-between gap-3 border-t border-[var(--hairline)] px-6 py-4 md:px-8">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2 text-[12.5px] text-foreground/85 transition disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
            className="group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[12.5px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:-translate-y-px"
          >
            {step === 4 ? "Generate proposal" : "Continue"}
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ————————————————————————————————————————————————————————————————
// Bits
// ————————————————————————————————————————————————————————————————

function AmbientWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background:
          "radial-gradient(600px circle at 15% 10%, oklch(0.72 0.22 250 / 0.12), transparent 60%), radial-gradient(500px circle at 90% 100%, oklch(0.6 0.22 290 / 0.10), transparent 60%)",
      }}
    />
  );
}

function StepShell({
  title, subtitle, children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-up">
      <h3 className="font-display text-[22px] leading-tight tracking-[-0.02em] text-gradient md:text-[26px]">
        {title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ChoiceCard({
  active, onClick, title, meta, check = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  meta?: string;
  check?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-start justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
        active
          ? "border-[color:var(--electric)] bg-[oklch(0.72_0.22_250/0.08)] shadow-[0_0_24px_-8px_var(--electric)]"
          : "border-[var(--hairline)] bg-[var(--surface)] hover:border-[color:var(--hairline-strong)] hover:bg-white/[0.04]"
      }`}
    >
      <div className="min-w-0">
        <div className="font-display text-[14.5px] tracking-[-0.01em] text-foreground">
          {title}
        </div>
        {meta && (
          <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            {meta}
          </div>
        )}
      </div>
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${
          active
            ? "border-[color:var(--electric)] bg-[var(--electric)] text-black"
            : "border-[var(--hairline-strong)] bg-transparent text-transparent"
        }`}
      >
        {check ? <Check className="h-3 w-3" strokeWidth={2.5} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      </span>
    </button>
  );
}

function ProposalRow({ k, v, highlight = false }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
        {k}
      </div>
      <div
        className={`mt-1.5 text-[14px] leading-snug ${
          highlight ? "font-display text-[18px] tracking-[-0.015em] text-electric-gradient" : "text-foreground/90"
        }`}
      >
        {v}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
      {children}
    </label>
  );
}

function Field({
  label, value, onChange, type = "text", required = false, className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}{required && <span className="text-[var(--electric)]"> *</span>}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1.5 w-full rounded-2xl hairline bg-[var(--surface)] px-4 py-2.5 text-[14px] text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-[color:var(--hairline-strong)]"
      />
    </div>
  );
}
