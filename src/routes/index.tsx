import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Zap,
  Bot,
  Globe,
  Layers,
  Cpu,
  LineChart,
  Workflow,
  ShoppingBag,
  Building2,
  HeartPulse,
  Landmark,
  GraduationCap,
  Truck,
  Scissors,
  Utensils,
  Scale,
  Dumbbell,
  Hotel,
  Wrench,
  Check,
  Plus,
  Minus,
  Compass,
  Rocket,
  Cog,
  TrendingUp,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Section, SectionHeading, Eyebrow } from "@/components/ui-lib/Section";
import HeroScene from "@/components/hero/HeroScene";
import ProjectBuilder from "@/components/consultant/ProjectBuilder";

export const Route = createFileRoute("/")({
  component: Home,
});

// ————————————————————————————————————————————————————————————————
// Data
// ————————————————————————————————————————————————————————————————

const TRUSTED = [
  "React", "Next.js", "Firebase", "Supabase",
  "Stripe", "OpenAI", "Make", "Cloudflare",
];

const CAPABILITIES = [
  {
    icon: Globe,
    title: "Landing Pages",
    price: "From €999",
    timeline: "2–5 days",
    desc: "High-converting single-page sites engineered for launches, campaigns and product releases.",
    includes: [
      "Custom premium design",
      "Copy structure & CTA strategy",
      "Analytics + lead capture",
      "SEO essentials & fast hosting",
    ],
  },
  {
    icon: Layers,
    title: "Corporate Websites",
    price: "From €2,490",
    timeline: "5–14 days",
    desc: "Editorial multi-page websites with premium design, CMS and SEO built for serious brands.",
    includes: [
      "Up to 8 tailored pages",
      "CMS for the marketing team",
      "SEO architecture & metadata",
      "Contact / lead workflows",
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Stores",
    price: "From €3,490",
    timeline: "10–21 days",
    desc: "Modern storefronts with payments, inventory and checkout tuned for revenue and scale.",
    includes: [
      "Product catalogue & variants",
      "Stripe / card payments",
      "Cart, checkout & orders",
      "Admin dashboard",
    ],
  },
  {
    icon: Workflow,
    title: "CRM Systems",
    price: "From €4,990",
    timeline: "14–30 days",
    desc: "Bespoke CRM platforms modelled around your pipeline, your team and your data.",
    includes: [
      "Custom pipeline & stages",
      "Contacts, deals & activities",
      "Roles & permissions",
      "Reports and exports",
    ],
  },
  {
    icon: Sparkles,
    title: "AI Chatbots",
    price: "From €1,990",
    timeline: "2–7 days",
    desc: "Custom AI assistants trained on your knowledge base and wired into your website and support flows.",
    includes: [
      "Knowledge-base ingestion",
      "Web + chat integration",
      "Lead capture & handoff",
      "Analytics & fine-tuning",
    ],
  },
  {
    icon: Bot,
    title: "AI Automations",
    price: "From €2,990",
    timeline: "3–14 days",
    desc: "Silent workflows that connect your tools, remove manual work and run your operations 24/7.",
    includes: [
      "Process mapping",
      "API & tool integrations",
      "Triggered workflows",
      "Monitoring & alerts",
    ],
  },
  {
    icon: Cpu,
    title: "Mobile Apps",
    price: "From €6,990",
    timeline: "21–60 days",
    desc: "Native-quality iOS and Android apps with premium UX, offline support and secure infrastructure.",
    includes: [
      "iOS + Android from one codebase",
      "Authentication & profiles",
      "Push notifications",
      "Store submission support",
    ],
  },
  {
    icon: Layers,
    title: "Web Applications",
    price: "From €4,990",
    timeline: "14–45 days",
    desc: "Custom web platforms with authentication, dashboards, databases and deep API integrations.",
    includes: [
      "Auth & user roles",
      "Dashboards & data views",
      "Database & API layer",
      "Third-party integrations",
    ],
  },
  {
    icon: Rocket,
    title: "SaaS Platforms",
    price: "From €9,990",
    timeline: "30–90 days",
    desc: "End-to-end SaaS products with multi-tenant architecture, billing, admin and analytics.",
    includes: [
      "Multi-tenant architecture",
      "Subscription billing",
      "Admin & customer dashboards",
      "Usage analytics",
    ],
  },
  {
    icon: LineChart,
    title: "Client Portals",
    price: "From €4,990",
    timeline: "14–45 days",
    desc: "Secure client-facing portals for documents, updates, communication and self-service workflows.",
    includes: [
      "Secure client accounts",
      "Documents & file sharing",
      "Messaging & notifications",
      "Self-service workflows",
    ],
  },
  {
    icon: Compass,
    title: "Booking Systems",
    price: "From €2,990",
    timeline: "7–21 days",
    desc: "Reservations, appointments and scheduling systems with payments, reminders and calendar sync.",
    includes: [
      "Availability & scheduling",
      "Payments & deposits",
      "Email / SMS reminders",
      "Calendar sync",
    ],
  },
  {
    icon: Cog,
    title: "Internal Business Systems",
    price: "From €7,990",
    timeline: "30–90 days",
    desc: "Custom internal tools, ERPs and operational systems that centralise how your business runs.",
    includes: [
      "Operational data model",
      "Roles & workflows",
      "Reporting & KPIs",
      "Integrations with existing tools",
    ],
  },
];



const INDUSTRIES = [
  { icon: HeartPulse,    title: "Healthcare" },
  { icon: Landmark,      title: "Finance" },
  { icon: ShoppingBag,   title: "Retail" },
  { icon: Building2,     title: "Real Estate" },
  { icon: Truck,         title: "Logistics" },
  { icon: Wrench,        title: "Manufacturing" },
  { icon: GraduationCap, title: "Education" },
  { icon: Hotel,         title: "Hospitality" },
];


const WORK = [
  {
    tag: "AI Platform",
    status: "Concept Project",
    title: "Aequor — generative operations",
    desc: "A private workspace where enterprise teams orchestrate LLM workflows across their SaaS stack.",
    accent: "from-[oklch(0.72_0.22_250)] to-[oklch(0.55_0.28_300)]",
  },
  {
    tag: "E-commerce System",
    status: "Demo System",
    title: "Meridian — editorial commerce",
    desc: "Headless storefront and configurator for a luxury fashion house shipping in 34 markets.",
    accent: "from-[oklch(0.78_0.22_235)] to-[oklch(0.62_0.24_260)]",
  },
  {
    tag: "Healthcare App",
    status: "Internal Prototype",
    title: "Halcyon — clinician copilot",
    desc: "HIPAA-conscious patient portal with an AI assistant embedded in the practitioner workflow.",
    accent: "from-[oklch(0.72_0.22_250)] to-[oklch(0.68_0.18_200)]",
  },
  {
    tag: "Fintech Dashboard",
    status: "Concept Project",
    title: "Volta — real-time treasury",
    desc: "A quiet, dense trading and treasury dashboard with sub-100ms interactions across markets.",
    accent: "from-[oklch(0.6_0.28_300)] to-[oklch(0.72_0.22_250)]",
  },
];

const PROCESS = [
  { icon: Compass,    k: "01", t: "Discovery",      d: "We map your business, users and constraints — no assumptions, no templates." },
  { icon: Sparkles,   k: "02", t: "Strategy",       d: "A written plan: scope, systems, timeline, price. You approve before we start." },
  { icon: Layers,     k: "03", t: "Design",         d: "Bespoke interfaces designed around your brand, your users and your goals." },
  { icon: Cog,        k: "04", t: "Development",    d: "Production-grade engineering with weekly demos and full transparency." },
  { icon: Bot,        k: "05", t: "AI Integration", d: "Copilots, automations and models wired deep into the product where they matter." },
  { icon: Rocket,     k: "06", t: "Launch",         d: "Migrations, hardening and go-live orchestration — the day itself feels quiet." },
  { icon: TrendingUp, k: "07", t: "Support",        d: "We stay on retainer: monitor, iterate and grow the product with you." },
];

const ADVANTAGES = [
  { k: "250+", l: "Products launched",  d: "Across SaaS, fintech, healthcare and retail — from MVP to enterprise scale." },
  { k: "98%",  l: "Client satisfaction", d: "Long-term retainers and multi-project relationships with almost every client." },
  { k: "24/7", l: "AI automation uptime", d: "Production-grade observability, SLAs and monitoring baked into every launch." },
  { k: "12",   l: "Countries served",   d: "A truly international studio serving founders and enterprises worldwide." },
];

const WHY_CHOOSE = [
  { icon: Sparkles,   t: "Senior team, no juniors",    d: "Every engagement is delivered by senior designers and engineers — no handoffs to trainees." },
  { icon: Bot,        t: "AI-native by default",       d: "AI is not an add-on. It is woven into the product, the workflows and the automations from day one." },
  { icon: Layers,     t: "One studio, end-to-end",     d: "Strategy, design, engineering, AI and launch under one roof — no fragmented vendors." },
  { icon: TrendingUp, t: "Built to scale",             d: "Every system we ship is architected for enterprise volume, security and long-term ownership." },
  { icon: Check,      t: "Transparent, fixed pricing", d: "Clear scopes, clear timelines, clear prices. No surprises, no billable-hour theatre." },
  { icon: Rocket,     t: "Ships in weeks, not quarters", d: "Refined delivery cadence: most products go live in 4–10 weeks, not 6 months." },
];


const FAQ = [
  {
    q: "What does Synvora build?",
    a: "Websites, web and mobile apps, SaaS platforms, CRM systems, AI assistants and automation infrastructure. One studio, end-to-end — from first pixel to production.",
  },
  {
    q: "How long does a project take?",
    a: "Most marketing sites ship in 2–4 weeks. Product MVPs in 6–10 weeks. Complex platforms are scoped in phases so you're always shipping — never waiting on a big-bang launch.",
  },
  {
    q: "Can you build AI automation?",
    a: "Yes. We design and ship internal AI copilots, customer-facing chatbots and silent background automations that connect your tools, data and workflows.",
  },
  {
    q: "Do you provide support?",
    a: "Every engagement includes a support window post-launch. Growth and Enterprise clients get retained squads with SLA-backed response times and 24/7 monitoring.",
  },
  {
    q: "Can you integrate with existing systems?",
    a: "Stripe, HubSpot, Salesforce, Slack, Notion, OpenAI, Supabase, your own APIs — we integrate with whatever powers your business, and design around your constraints.",
  },
];

// ————————————————————————————————————————————————————————————————
// Page
// ————————————————————————————————————————————————————————————————

function Home() {
  return (
    <SiteLayout>
      <HeroSection />
      <TrustedSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <ConfiguratorSection />
      <WorkSection />
      <ProcessSection />
      <WhyChooseSection />
      <FaqSection />
      <FinalCta />
    </SiteLayout>
  );
}

// ————————————————————————————————————————————————————————————————
// Sections
// ————————————————————————————————————————————————————————————————

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40" />
      {/* Ambient blue volumetric glow */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[820px]"
        style={{ background: "var(--gradient-radial-glow)" }}
      />
      {/* Soft violet accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{
          left: "60%",
          top: "20%",
          background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.4), transparent 70%)",
        }}
      />

      <div className="container-page pb-24 pt-14 md:pt-20 lg:min-h-[calc(100svh-88px)] lg:pb-20 lg:pt-16 lg:flex lg:items-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-14 xl:gap-20">
          {/* LEFT — 45% */}
          <div className="max-w-xl">
            <div className="animate-fade-up">
              <Eyebrow>International AI Product Studio</Eyebrow>
            </div>

            <h1
              className="mt-7 animate-fade-up font-display text-[42px] leading-[1.02] tracking-[-0.045em] text-gradient sm:text-[54px] lg:text-[60px] xl:text-[68px]"
              style={{ animationDelay: "80ms" }}
            >
              We engineer<br />
              <span className="text-electric-gradient italic font-normal">digital businesses.</span>
            </h1>

            <p
              className="mt-6 max-w-lg animate-fade-up text-[15px] leading-relaxed text-muted-foreground sm:text-[16px]"
              style={{ animationDelay: "180ms" }}
            >
              Synvora designs and engineers premium websites, AI systems, SaaS platforms, CRM solutions, business automation and custom software for ambitious companies worldwide.
            </p>

            <div
              className="mt-8 flex animate-fade-up flex-col items-start gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "280ms" }}
            >
              <a href="#project-builder" className="btn-primary group">
                Start Your Project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
              <a href="#project-builder" className="btn-ghost group">
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </div>

            <dl
              className="mt-10 grid animate-fade-up grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--hairline)] pt-7 sm:grid-cols-4"
              style={{ animationDelay: "380ms" }}
            >
              {[
                { v: "250+", l: "Projects" },
                { v: "98%",  l: "Client Satisfaction" },
                { v: "45+",  l: "Solutions Delivered" },
                { v: "24/7", l: "AI Automation" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-electric-gradient font-display text-[26px] leading-none tracking-[-0.03em] sm:text-[30px]">
                    {s.v}
                  </dt>
                  <dd className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* RIGHT — 55% */}
          <div
            className="relative animate-fade-up lg:pr-20"
            style={{ animationDelay: "460ms" }}
          >
            <div className="mx-auto w-full max-w-[560px] lg:max-w-none">
              <div className="relative aspect-square w-full">
                <HeroScene />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function TrustedSection() {
  return (
    <section className="container-page py-16">
      <p className="text-center text-[11px] uppercase tracking-[0.24em] text-muted-foreground/70">
        Technologies we build with
      </p>
      <div className="relative mt-8 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent"
        />
        <div className="flex w-max animate-marquee items-center gap-16 px-8">
          {[...TRUSTED, ...TRUSTED].map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-[20px] font-medium tracking-[-0.03em] text-foreground/40 grayscale transition-colors hover:text-foreground/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="Services"
        title={<>Services built by <span className="text-electric-gradient">Synvora.</span></>}
        description="A premium catalogue of twelve production-grade services — from launch-ready landing pages to enterprise internal systems. Every engagement is custom engineered, AI-assisted and delivered end-to-end."
      />

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {CAPABILITIES.map(({ icon: Icon, title, price, timeline, desc, includes }) => {
          const isOpen = openTitle === title;
          return (
            <article
              key={title}
              className="group relative flex flex-col overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)]"
            >
              {/* Ambient hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(500px circle at 50% 0%, oklch(0.72 0.22 250 / 0.18), transparent 65%)",
                }}
              />
              {/* Violet corner wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
                style={{ background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.35), transparent 70%)" }}
              />

              <div className="relative grid h-12 w-12 place-items-center rounded-2xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] shadow-[0_10px_30px_-15px_oklch(0.72_0.22_250/0.6)] transition-all duration-500 group-hover:shadow-[0_0_30px_-4px_var(--electric)]">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>

              <h3 className="relative mt-7 font-display text-[19px] leading-tight tracking-[-0.02em] text-foreground">
                {title}
              </h3>

              <p className="relative mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                {desc}
              </p>

              {/* Expandable "What's included" */}
              <div
                className={`relative grid transition-all duration-500 ${
                  isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="rounded-2xl hairline bg-white/[0.02] p-4">
                    <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      What's included
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                      {includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-foreground/85">
                          <Check className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[var(--electric)]" strokeWidth={2.25} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-[var(--hairline)] pt-5">
                <div>
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Starting
                  </div>
                  <div className="mt-1 font-display text-[20px] tracking-[-0.02em] text-electric-gradient">
                    {price}
                  </div>
                </div>
                <div>
                  <div className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Timeline
                  </div>
                  <div className="mt-1 font-display text-[15px] tracking-[-0.01em] text-foreground/90">
                    {timeline}
                  </div>
                </div>
              </div>

              <div className="relative mt-5 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setOpenTitle(isOpen ? null : title)}
                  aria-expanded={isOpen}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full hairline bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-foreground/85 transition-all duration-300 hover:bg-white/[0.08] hover:text-foreground"
                >
                  {isOpen ? "Show Less" : "Learn More"}
                  {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                </button>
                <a
                  href="#project-builder"
                  className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-black shadow-[0_1px_0_oklch(1_0_0/0.7)_inset,0_10px_30px_-12px_oklch(0.72_0.22_250/0.5)] transition-all duration-500 hover:-translate-y-px"
                >
                  Start Project
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:-translate-y-px group-hover/btn:translate-x-px" />
                </a>
              </div>
            </article>
          );
        })}
      </div>


      {/* Note under catalogue */}
      <p className="mx-auto mt-10 max-w-3xl text-center text-[13.5px] leading-relaxed text-muted-foreground">
        Prices are starting estimates. Final scope, timeline and production plan are generated automatically after completing the AI Project Builder.
      </p>

      {/* Transparent pricing block */}
      <div className="relative mt-14 overflow-hidden rounded-3xl glass-strong p-8 md:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(600px circle at 15% 20%, oklch(0.72 0.22 250 / 0.14), transparent 60%), radial-gradient(500px circle at 90% 100%, oklch(0.6 0.22 290 / 0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <Eyebrow>Transparent Pricing</Eyebrow>
          <h3 className="mt-5 font-display text-[26px] leading-tight tracking-[-0.03em] text-gradient md:text-[32px]">
            Custom engineered for every client.
          </h3>
          <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground md:text-[15.5px]">
            Every Synvora solution is custom engineered for each client. Prices displayed are starting estimates. Final pricing depends on project scope, integrations, business goals and technical complexity — a detailed proposal is generated by the AI Project Builder above.
          </p>
        </div>
      </div>
    </Section>
  );
}



function IndustriesSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Industry solutions"
        title={<>Purpose-built for the <span className="text-electric-gradient">industry you operate in.</span></>}
        description="We work across regulated, high-stakes and high-volume industries — with playbooks refined by real production launches."
      />

      <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {INDUSTRIES.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="card-elevated group flex items-center gap-3 p-4 transition-transform duration-500 hover:-translate-y-0.5 sm:p-5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg hairline bg-[var(--surface-elevated)] text-[var(--electric)] transition-all duration-500 group-hover:shadow-[0_0_18px_-4px_var(--electric)]">
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <span className="min-w-0 truncate font-display text-[14.5px] tracking-[-0.015em] text-foreground">
              {title}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ConfiguratorSection() {
  return (
    <Section id="project-builder" className="scroll-mt-24">

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            eyebrow="AI Project Builder"
            title={<>Design your project. <span className="text-electric-gradient">Get a tailored proposal.</span></>}
            description="Answer six quick questions and Synvora AI generates a bespoke proposal — service, industry fit, features, complexity, budget range and delivery timeline."
          />
          <ul className="mt-8 space-y-3 text-[13.5px] text-muted-foreground">
            {[
              "Six guided steps — takes about two minutes.",
              "Instant budget and timeline based on your scope.",
              "Leave your details to turn the brief into a real project.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <Check className="mt-1 h-3.5 w-3.5 text-[var(--electric)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <ProjectBuilder />
      </div>
    </Section>
  );
}



function WorkSection() {
  return (
    <Section>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Featured work"
          title={<>Products the industry has to <span className="text-electric-gradient">catch up to.</span></>}
          description="A selection of recent launches from the studio floor."
        />
        <Link
          to="/templates"
          className="group inline-flex items-center gap-1.5 rounded-full hairline bg-white/[0.02] px-4 py-2 text-[13px] text-foreground/80 transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          Full portfolio
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {WORK.map((w) => (
          <div
            key={w.title}
            className="card-elevated group relative overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7"
          >
            {/* preview mock */}
            <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-2xl hairline bg-linear-to-br ${w.accent}`}>
              <div
                aria-hidden
                className="absolute inset-0 grid-lines opacity-30"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 50% 60% at 30% 30%, oklch(1 0 0 / 0.35), transparent 70%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/50 p-3 backdrop-blur-md hairline">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] uppercase tracking-[0.2em] text-white/70">{w.tag}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--electric)] shadow-[0_0_10px_var(--electric)]" />
                </div>
                <p className="mt-1 font-display text-[14px] tracking-[-0.02em] text-white">{w.status}</p>
              </div>
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">{w.tag}</p>
                <h3 className="mt-2 font-display text-[22px] tracking-[-0.025em] text-foreground">
                  {w.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {w.desc}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProcessSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our process"
        title={<>Seven stages. <span className="text-electric-gradient">Zero surprises.</span></>}
        description="A rhythm refined across 250+ launches — designed so you always know what's happening, and why."
      />

      <div className="relative mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-transparent via-[var(--hairline-strong)] to-transparent lg:block"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {PROCESS.map(({ icon: Icon, k, t, d }) => (
            <div
              key={k}
              className="card-elevated group relative p-6 transition-transform duration-500 hover:-translate-y-0.5"
            >
              <div className="relative grid h-12 w-12 place-items-center rounded-xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] transition-all duration-500 group-hover:shadow-[0_0_24px_-6px_var(--electric)]">
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-[10.5px] uppercase tracking-[0.22em] text-muted-foreground">
                {k}
              </p>
              <h3 className="mt-2 font-display text-[19px] tracking-[-0.02em] text-foreground">
                {t}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WhyChooseSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why Synvora"
        title={<>The studio ambitious teams <span className="text-electric-gradient">actually trust.</span></>}
        description="Six reasons founders, operators and enterprise leaders choose Synvora over agencies, freelancers and internal teams."
      />

      {/* Headline statistics */}
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADVANTAGES.map((a) => (
          <div
            key={a.l}
            className="relative overflow-hidden rounded-3xl glass p-7 transition-transform duration-500 hover:-translate-y-1"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-50 blur-3xl"
              style={{ background: "radial-gradient(circle, oklch(0.6 0.22 290 / 0.35), transparent 70%)" }}
            />
            <div className="relative text-electric-gradient font-display text-[42px] leading-none tracking-[-0.035em]">
              {a.k}
            </div>
            <p className="relative mt-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {a.l}
            </p>
            <p className="relative mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
              {a.d}
            </p>
          </div>
        ))}
      </div>

      {/* Advantages grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE.map(({ icon: Icon, t, d }) => (
          <div
            key={t}
            className="group relative overflow-hidden rounded-3xl hairline bg-[var(--surface)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--hairline-strong)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(400px circle at 50% 0%, oklch(0.72 0.22 250 / 0.14), transparent 65%)",
              }}
            />
            <div className="relative grid h-11 w-11 place-items-center rounded-xl hairline bg-[var(--surface-elevated)] text-[var(--electric)] transition-all duration-500 group-hover:shadow-[0_0_24px_-6px_var(--electric)]">
              <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
            </div>
            <h3 className="relative mt-6 font-display text-[18px] tracking-[-0.02em] text-foreground">
              {t}
            </h3>
            <p className="relative mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
              {d}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}


function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <SectionHeading
          eyebrow="FAQ"
          title={<>Answers, <span className="text-electric-gradient">clearly.</span></>}
          description="The most common questions from founders and operators evaluating Synvora."
        />
        <div className="rounded-3xl hairline bg-[var(--surface)] p-2">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <button
                key={f.q}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full flex-col gap-2 rounded-2xl px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-[16.5px] tracking-[-0.015em] text-foreground">
                    {f.q}
                  </h3>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full hairline bg-white/[0.02] text-foreground/70">
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </div>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <p className="pr-10 text-[14px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[36px] hairline-strong bg-[var(--surface)] px-6 py-20 text-center sm:px-10 md:px-16 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid-lines opacity-30"
        />
        <div className="relative">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-[34px] leading-[1.05] tracking-[-0.035em] text-gradient sm:text-[46px] md:text-[60px]">
            Ready to build the
            <span className="text-electric-gradient"> future of your business?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
            Tell us about your product. We'll respond within one business day
            with a plan, a price, and a timeline.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#project-builder" className="btn-primary group">
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <a href="#project-builder" className="btn-ghost">
              Build My Proposal
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Silence unused warnings for icons kept as design tokens
void Zap;
