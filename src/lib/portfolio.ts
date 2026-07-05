import {
  Utensils,
  HeartPulse,
  Building2,
  Truck,
  Users,
  GraduationCap,
  Sparkles,
  CalendarCheck,
  ShieldCheck,
  Package,
  LineChart,
  Bot,
  type LucideIcon,
} from "lucide-react";

export type PortfolioCategory = "Internal Products" | "Demo Systems" | "Concept Solutions";

export type PortfolioItem = {
  slug: string;
  title: string;
  category: PortfolioCategory;
  disclosure: "Concept Project" | "Internal Demonstration Project";
  icon: LucideIcon;
  gradient: string;
  shortDesc: string;
  features: string[];
  stack: string[];
  timeline: string;
  startingPrice: string;
  challenge: string;
  solution: string;
  aiCapabilities: string[];
  impact: string[];
};

const G = {
  blue:   "linear-gradient(135deg, oklch(0.72 0.22 250 / 0.55), oklch(0.55 0.24 275 / 0.55))",
  violet: "linear-gradient(135deg, oklch(0.6 0.24 290 / 0.55), oklch(0.5 0.22 260 / 0.55))",
  teal:   "linear-gradient(135deg, oklch(0.75 0.16 210 / 0.55), oklch(0.55 0.20 260 / 0.55))",
  amber:  "linear-gradient(135deg, oklch(0.78 0.16 60 / 0.45), oklch(0.55 0.22 300 / 0.55))",
  rose:   "linear-gradient(135deg, oklch(0.72 0.18 20 / 0.45), oklch(0.55 0.22 290 / 0.55))",
  mint:   "linear-gradient(135deg, oklch(0.78 0.14 170 / 0.45), oklch(0.55 0.20 260 / 0.55))",
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "ai-restaurant-ordering-platform",
    title: "AI Restaurant Ordering Platform",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: Utensils,
    gradient: G.amber,
    shortDesc:
      "A voice- and chat-driven ordering platform that lets restaurants take orders online, in-venue and via AI concierge.",
    features: [
      "AI ordering assistant (chat & voice)",
      "Menu, modifiers and combos",
      "Payments and receipts",
      "Kitchen-facing dashboard",
    ],
    stack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    timeline: "14–30 days",
    startingPrice: "From €3,490",
    challenge:
      "Restaurants lose revenue to slow ordering flows, third-party marketplace fees and staff time spent on repetitive requests. Menus change often and updating each channel manually is error-prone.",
    solution:
      "A unified ordering platform combining a branded website, direct checkout and an AI concierge that guides guests through the menu, upsells intelligently and dispatches confirmed orders straight to the kitchen dashboard.",
    aiCapabilities: [
      "Natural-language menu understanding",
      "Personalised upsell recommendations",
      "Automatic order clarification",
      "Post-order review generation",
    ],
    impact: [
      "Higher average order value",
      "Lower marketplace commission dependency",
      "Reduced staff time per order",
      "Cleaner data on guest preferences",
    ],
  },
  {
    slug: "ai-medical-appointment-system",
    title: "AI Medical Appointment System",
    category: "Demo Systems",
    disclosure: "Internal Demonstration Project",
    icon: HeartPulse,
    gradient: G.blue,
    shortDesc:
      "A clinic-facing appointment platform with AI triage, intake automation and provider dashboards.",
    features: [
      "Patient booking portal",
      "AI triage assistant",
      "Digital intake and consent",
      "Provider dashboard",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Stripe", "Cloudflare"],
    timeline: "21–45 days",
    startingPrice: "From €4,990",
    challenge:
      "Clinics rely on phone-based scheduling, paper intake and fragmented communication. Staff burn hours on repetitive triage and reminders while patients wait for confirmations.",
    solution:
      "A patient-first booking platform paired with an AI triage assistant that captures symptoms, collects intake and consent digitally, and routes cases to the correct provider — all visible in a provider dashboard.",
    aiCapabilities: [
      "Symptom-based routing",
      "Automated appointment reminders",
      "Follow-up messaging flows",
      "Visit-note summarisation",
    ],
    impact: [
      "Lower call volume",
      "Faster intake",
      "Higher appointment attendance",
      "Consistent digital patient experience",
    ],
  },
  {
    slug: "ai-real-estate-crm",
    title: "AI Real Estate CRM",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: Building2,
    gradient: G.violet,
    shortDesc:
      "A property CRM with AI buyer qualification, automatic property matching and agent-level pipelines.",
    features: [
      "Contacts, deals and pipelines",
      "Listing inventory",
      "AI lead qualification",
      "Agent analytics",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    timeline: "21–45 days",
    startingPrice: "From €4,990",
    challenge:
      "Agencies lose leads to slow response times and disorganised pipelines. Buyer preferences live in emails and heads, not in a system that can act on them.",
    solution:
      "A CRM designed around real estate: contacts, listings and pipelines connected to an AI qualification layer that reads enquiries, scores intent and matches buyers to the right properties automatically.",
    aiCapabilities: [
      "Instant enquiry qualification",
      "Buyer-to-property matching",
      "Predictive lead scoring",
      "AI-drafted listing descriptions",
    ],
    impact: [
      "Faster response cycle",
      "More qualified viewings",
      "Higher pipeline visibility",
      "Improved agent productivity",
    ],
  },
  {
    slug: "ai-logistics-dashboard",
    title: "AI Logistics Dashboard",
    category: "Demo Systems",
    disclosure: "Internal Demonstration Project",
    icon: Truck,
    gradient: G.teal,
    shortDesc:
      "An operations dashboard for dispatch, real-time tracking and AI-assisted document processing.",
    features: [
      "Dispatch board",
      "Client tracking portal",
      "Driver mobile app",
      "AI document extraction",
    ],
    stack: ["React", "Node.js", "Flutter", "OpenAI", "Make", "Cloudflare"],
    timeline: "30–60 days",
    startingPrice: "From €5,990",
    challenge:
      "Logistics teams juggle spreadsheets, phone updates and paper POD. Clients call constantly for status and dispatch has no single view of operations.",
    solution:
      "A single operations platform combining dispatch, driver tools and a client portal, with AI extracting key details from invoices and shipping documents so nothing is retyped.",
    aiCapabilities: [
      "Document OCR & extraction",
      "Automatic status notifications",
      "Route optimisation suggestions",
      "Client support assistant",
    ],
    impact: [
      "Fewer manual updates",
      "Faster quote-to-booking cycle",
      "Full operational visibility",
      "Higher client retention",
    ],
  },
  {
    slug: "ai-recruitment-platform",
    title: "AI Recruitment Platform",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: Users,
    gradient: G.rose,
    shortDesc:
      "An ATS-style platform with AI candidate screening, structured interviews and hiring analytics.",
    features: [
      "Job posting & careers site",
      "AI candidate screening",
      "Interview scheduling",
      "Hiring pipeline analytics",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    timeline: "21–45 days",
    startingPrice: "From €4,990",
    challenge:
      "Recruiters drown in unqualified CVs and spend hours on scheduling. Hiring managers lack a clear picture of pipeline quality.",
    solution:
      "A recruitment platform with a branded careers site, an AI layer that screens applicants against role requirements, and a pipeline dashboard that surfaces the strongest candidates first.",
    aiCapabilities: [
      "Resume parsing and scoring",
      "Role-fit assessment",
      "Automated interview scheduling",
      "Candidate communication drafts",
    ],
    impact: [
      "Shorter time-to-hire",
      "Higher candidate quality signal",
      "Less recruiter admin",
      "Better hiring decisions",
    ],
  },
  {
    slug: "ai-learning-platform",
    title: "AI Learning Platform",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: GraduationCap,
    gradient: G.mint,
    shortDesc:
      "A learning platform with AI-personalised study paths, progress tracking and instructor tools.",
    features: [
      "Courses and lessons",
      "Personalised study paths",
      "Progress analytics",
      "Instructor dashboard",
    ],
    stack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    timeline: "30–60 days",
    startingPrice: "From €4,990",
    challenge:
      "Traditional learning platforms treat every learner the same and leave instructors without meaningful signal on engagement.",
    solution:
      "A learning platform that adapts to each learner's level, recommends the next best lesson and gives instructors clear analytics on engagement and outcomes.",
    aiCapabilities: [
      "Adaptive study paths",
      "Automatic content summaries",
      "AI tutor for questions",
      "Engagement analytics",
    ],
    impact: [
      "Higher completion rates",
      "Better learning outcomes",
      "Reduced instructor workload",
      "Clear ROI on training programmes",
    ],
  },
  {
    slug: "ai-beauty-salon-management",
    title: "AI Beauty Salon Management",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: Sparkles,
    gradient: G.rose,
    shortDesc:
      "A booking and client-management platform for salons and studios with AI concierge and retention tools.",
    features: [
      "Online booking",
      "Client profiles & history",
      "Loyalty & rewards",
      "Automated reminders",
    ],
    stack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    timeline: "14–30 days",
    startingPrice: "From €2,990",
    challenge:
      "Salons take bookings across phone, DMs and walk-ins. No-shows are common and client preferences aren't consistently captured or used.",
    solution:
      "A booking platform paired with a client CRM and AI concierge — every booking is centralised, every client remembered, and every visit followed up automatically.",
    aiCapabilities: [
      "24/7 AI booking assistant",
      "Personalised offers",
      "Automatic review generation",
      "Predictive rebooking prompts",
    ],
    impact: [
      "Fewer no-shows",
      "Higher repeat frequency",
      "More five-star reviews",
      "A premium client experience",
    ],
  },
  {
    slug: "ai-booking-platform",
    title: "AI Booking Platform",
    category: "Demo Systems",
    disclosure: "Internal Demonstration Project",
    icon: CalendarCheck,
    gradient: G.blue,
    shortDesc:
      "A general-purpose booking and scheduling platform with payments, reminders and calendar sync.",
    features: [
      "Availability & scheduling",
      "Payments & deposits",
      "Reminders & confirmations",
      "Calendar sync",
    ],
    stack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    timeline: "10–21 days",
    startingPrice: "From €2,990",
    challenge:
      "Off-the-shelf booking tools force businesses into rigid workflows that don't fit their real service model.",
    solution:
      "A flexible booking platform designed to be tailored — service types, resources, pricing rules, deposits and reminders configured to match the business.",
    aiCapabilities: [
      "AI booking assistant",
      "Automated reminder flows",
      "Waitlist management",
      "Analytics on booking behaviour",
    ],
    impact: [
      "Higher booking conversion",
      "Lower cancellation rate",
      "Simpler staff operations",
      "Cleaner scheduling data",
    ],
  },
  {
    slug: "ai-client-portal",
    title: "AI Client Portal",
    category: "Internal Products",
    disclosure: "Internal Demonstration Project",
    icon: ShieldCheck,
    gradient: G.violet,
    shortDesc:
      "A secure client portal for documents, updates, communication and self-service workflows.",
    features: [
      "Secure client accounts",
      "Documents & file sharing",
      "Messaging & notifications",
      "Self-service workflows",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Cloudflare"],
    timeline: "21–45 days",
    startingPrice: "From €4,990",
    challenge:
      "Client-facing teams operate through fragmented email threads, shared drives and chat — creating a poor client experience and internal chaos.",
    solution:
      "A branded client portal that centralises documents, updates and communication with an AI assistant to handle common questions and route the rest.",
    aiCapabilities: [
      "AI answers on client-visible knowledge",
      "Automated status updates",
      "Smart document search",
      "Sentiment monitoring",
    ],
    impact: [
      "Cleaner client communication",
      "Faster response times",
      "Fewer internal follow-ups",
      "A premium, professional experience",
    ],
  },
  {
    slug: "ai-warehouse-management",
    title: "AI Warehouse Management",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: Package,
    gradient: G.teal,
    shortDesc:
      "A warehouse operations system with stock visibility, movement tracking and AI-assisted forecasting.",
    features: [
      "Inventory & stock levels",
      "Inbound / outbound flow",
      "Barcode & scanning",
      "AI demand forecasting",
    ],
    stack: ["React", "Node.js", "Flutter", "OpenAI", "Make", "Cloudflare"],
    timeline: "30–60 days",
    startingPrice: "From €5,990",
    challenge:
      "Warehouses run on spreadsheets and habit. Stock levels are unreliable, forecasting is guesswork and errors are expensive.",
    solution:
      "A warehouse platform combining real-time stock, scanning-based movements and AI-driven demand forecasting so ordering and staffing decisions are grounded in data.",
    aiCapabilities: [
      "Demand forecasting",
      "Anomaly detection on movements",
      "AI copilot for operators",
      "Automated low-stock alerts",
    ],
    impact: [
      "Fewer stockouts and overstocks",
      "Lower operational cost",
      "Higher fulfilment accuracy",
      "Clear operational KPIs",
    ],
  },
  {
    slug: "ai-retail-analytics",
    title: "AI Retail Analytics",
    category: "Concept Solutions",
    disclosure: "Concept Project",
    icon: LineChart,
    gradient: G.blue,
    shortDesc:
      "A retail analytics dashboard unifying sales, customer and product data with AI-driven insights.",
    features: [
      "Sales & revenue dashboards",
      "Customer segmentation",
      "Product performance",
      "AI-generated insights",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Cloudflare"],
    timeline: "21–45 days",
    startingPrice: "From €4,990",
    challenge:
      "Retailers have data everywhere — POS, e-commerce, loyalty — but no single view and no clear guidance on what to do about it.",
    solution:
      "A unified analytics layer that consolidates sales, product and customer data, then uses AI to surface trends, risks and actionable next steps for the team.",
    aiCapabilities: [
      "Trend and anomaly detection",
      "Automatic weekly reports",
      "Customer segment insights",
      "Product performance narratives",
    ],
    impact: [
      "Better commercial decisions",
      "Less time spent building reports",
      "Earlier detection of issues",
      "Focused marketing spend",
    ],
  },
  {
    slug: "ai-business-automation-dashboard",
    title: "AI Business Automation Dashboard",
    category: "Internal Products",
    disclosure: "Internal Demonstration Project",
    icon: Bot,
    gradient: G.violet,
    shortDesc:
      "A control centre for AI automations — orchestrating workflows, monitoring runs and measuring impact.",
    features: [
      "Workflow orchestration",
      "Integration catalogue",
      "Run history & monitoring",
      "Impact analytics",
    ],
    stack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    timeline: "30–60 days",
    startingPrice: "From €5,990",
    challenge:
      "Businesses adopt AI automations one at a time, but quickly lose track of what runs where, whether it works and what it's worth.",
    solution:
      "A single dashboard to design, monitor and measure AI automations across the business — with clear ownership, run history and impact metrics.",
    aiCapabilities: [
      "AI-assisted workflow design",
      "Anomaly alerts on runs",
      "Natural-language reporting",
      "Recommendation of new automations",
    ],
    impact: [
      "Full visibility on AI operations",
      "Faster iteration on automations",
      "Measurable ROI per workflow",
      "Coordinated automation strategy",
    ],
  },
];

export const CATEGORIES: PortfolioCategory[] = [
  "Internal Products",
  "Demo Systems",
  "Concept Solutions",
];

export function getPortfolioItem(slug: string): PortfolioItem | undefined {
  return PORTFOLIO.find((p) => p.slug === slug);
}
