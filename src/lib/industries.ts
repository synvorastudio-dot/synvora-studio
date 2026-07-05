import {
  HeartPulse,
  Building2,
  ShoppingBag,
  Truck,
  Hotel,
  Wrench,
  HardHat,
  Landmark,
  Scale,
  GraduationCap,
  Car,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Industry = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  solutions: string[];
  aiAutomations: string[];
  crmFeatures: string[];
  startingPrice: string;
  problems: string[];
  synvoraSolution: string;
  aiOpportunities: string[];
  techStack: string[];
  workflow: { title: string; steps: string[] };
  outcomes: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: HeartPulse,
    tagline: "Digital systems for clinics, practices and medical groups.",
    description:
      "Patient-facing portals, appointment platforms and clinical operations software engineered for privacy, reliability and speed.",
    solutions: [
      "Patient portal & appointment booking",
      "Electronic intake & consent forms",
      "Clinic website with service catalogue",
      "Internal staff dashboards",
    ],
    aiAutomations: [
      "24/7 AI triage & FAQ assistant",
      "Automated appointment reminders",
      "Follow-up messaging workflows",
      "Document summarisation for staff",
    ],
    crmFeatures: [
      "Patient records & history",
      "Referral tracking",
      "Multi-clinic segmentation",
      "Communication timeline",
    ],
    startingPrice: "From €4,990",
    problems: [
      "Manual scheduling and phone-heavy operations",
      "Fragmented patient data across tools",
      "Slow intake and paperwork bottlenecks",
      "Lack of digital presence for new patients",
    ],
    synvoraSolution:
      "A unified patient platform combining a premium public website, secure booking, digital intake and an internal operations dashboard — connected to a lightweight CRM tuned for clinical workflows.",
    aiOpportunities: [
      "AI receptionist to answer common patient questions",
      "Smart appointment routing based on symptoms and provider availability",
      "Auto-generated visit summaries for staff review",
      "Automated recall and follow-up campaigns",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Patient intake automation",
      steps: [
        "Patient books an appointment through the portal",
        "AI assistant collects intake details and consent",
        "System routes the case to the correct provider",
        "Automated reminders sent by email / SMS",
        "Post-visit follow-up and review request triggered",
      ],
    },
    outcomes: [
      "Reduced phone volume and admin workload",
      "Faster patient onboarding",
      "Higher appointment attendance rates",
      "A modern digital experience patients trust",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: Building2,
    tagline: "Property platforms, agent CRMs and buyer automation.",
    description:
      "Listing platforms, buyer portals and AI-powered lead qualification systems for agencies, developers and property managers.",
    solutions: [
      "Property listing website",
      "Buyer & investor portal",
      "Agent dashboard",
      "Landing pages per development",
    ],
    aiAutomations: [
      "AI lead qualification assistant",
      "Automatic property matching",
      "Viewing scheduling bot",
      "Follow-up drip campaigns",
    ],
    crmFeatures: [
      "Contacts, deals & pipelines",
      "Property inventory",
      "Interest & preference tracking",
      "Agent performance analytics",
    ],
    startingPrice: "From €3,490",
    problems: [
      "Slow lead response and cold pipelines",
      "Listings scattered across portals",
      "No unified view of buyers and preferences",
      "Manual follow-ups falling through the cracks",
    ],
    synvoraSolution:
      "A premium listings site connected to a custom CRM and AI qualification assistant — every enquiry is captured, scored and routed to the right agent within minutes.",
    aiOpportunities: [
      "Instant AI response to new enquiries",
      "Automatic buyer-to-property matching",
      "Predictive lead scoring",
      "AI-generated listing descriptions",
    ],
    techStack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "Lead-to-viewing automation",
      steps: [
        "Buyer submits enquiry on a listing",
        "AI qualifies budget, timing and preferences",
        "Matching properties suggested automatically",
        "Viewing scheduled with the assigned agent",
        "Post-viewing follow-up sequence runs automatically",
      ],
    },
    outcomes: [
      "Faster response times and higher conversion",
      "Every lead captured and tracked",
      "Agents focused on qualified buyers only",
      "Clear visibility of the full pipeline",
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    icon: ShoppingBag,
    tagline: "E-commerce, in-store systems and customer intelligence.",
    description:
      "Modern storefronts, loyalty programmes and inventory-aware operations that connect online and physical retail.",
    solutions: [
      "E-commerce store",
      "Loyalty & rewards portal",
      "Inventory & order dashboard",
      "Product landing pages",
    ],
    aiAutomations: [
      "AI product recommendation engine",
      "Abandoned cart recovery",
      "Support chatbot for orders & returns",
      "Automated restock alerts",
    ],
    crmFeatures: [
      "Customer profiles & segments",
      "Purchase history",
      "Loyalty tiers",
      "Campaign tracking",
    ],
    startingPrice: "From €3,490",
    problems: [
      "Manual order and inventory tracking",
      "Low repeat purchase rates",
      "Fragmented online and in-store data",
      "Slow response to customer support queries",
    ],
    synvoraSolution:
      "A unified retail platform combining a premium storefront, loyalty layer and back-office dashboard — with an AI concierge for customers and automated operations for staff.",
    aiOpportunities: [
      "Personalised product recommendations",
      "AI concierge for pre-sale questions",
      "Automated review and reorder campaigns",
      "Demand forecasting from historical data",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Order & retention automation",
      steps: [
        "Customer completes an order",
        "Confirmation, receipt and shipping updates sent automatically",
        "AI recommends complementary products",
        "Loyalty points awarded and status updated",
        "Reorder reminder scheduled based on product cycle",
      ],
    },
    outcomes: [
      "Higher average order value",
      "Stronger repeat purchase rate",
      "Lower support workload",
      "Cleaner data across all channels",
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    icon: Truck,
    tagline: "Operations dashboards, tracking portals and dispatch automation.",
    description:
      "Real-time operations software for carriers, freight forwarders and last-mile teams — from dispatch to client tracking.",
    solutions: [
      "Client tracking portal",
      "Dispatch & operations dashboard",
      "Driver-facing mobile app",
      "Corporate website & quote engine",
    ],
    aiAutomations: [
      "Automated status notifications",
      "AI-assisted route optimisation",
      "Document extraction from invoices & POD",
      "Client support assistant",
    ],
    crmFeatures: [
      "Client accounts & contracts",
      "Shipment history",
      "Quote & pricing history",
      "SLA and issue tracking",
    ],
    startingPrice: "From €4,990",
    problems: [
      "Manual status updates and constant client calls",
      "Paper-based dispatch and proof of delivery",
      "No single view of operations",
      "Slow quote turnaround for new business",
    ],
    synvoraSolution:
      "An end-to-end operations platform combining dispatch, tracking, driver tools and a client portal — with AI automations that remove repetitive updates and paperwork.",
    aiOpportunities: [
      "Automatic ETA and delay notifications",
      "AI extraction of shipping documents",
      "Predictive routing suggestions",
      "Automated quote generation",
    ],
    techStack: ["React", "Node.js", "Flutter", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "Shipment lifecycle automation",
      steps: [
        "Client submits shipment request through portal",
        "System generates quote and confirmation",
        "Dispatch assigns route to driver via mobile app",
        "Status updates auto-sent at each milestone",
        "POD captured and shared with client automatically",
      ],
    },
    outcomes: [
      "Fewer manual updates and support calls",
      "Faster quote-to-booking cycle",
      "Full operational visibility",
      "Higher client retention",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    tagline: "Booking systems, guest portals and concierge automation.",
    description:
      "Booking platforms, guest experience portals and revenue-aware operations for hotels, restaurants and venues.",
    solutions: [
      "Booking & reservation system",
      "Guest experience portal",
      "Restaurant / venue website",
      "Loyalty programme",
    ],
    aiAutomations: [
      "AI concierge chatbot",
      "Automated pre-arrival messaging",
      "Review request campaigns",
      "Upsell suggestions during stay",
    ],
    crmFeatures: [
      "Guest profiles & preferences",
      "Stay & visit history",
      "VIP segmentation",
      "Feedback tracking",
    ],
    startingPrice: "From €2,990",
    problems: [
      "Dependence on third-party booking platforms",
      "Impersonal guest experience",
      "Manual reminder and feedback handling",
      "Limited insight into guest preferences",
    ],
    synvoraSolution:
      "A direct booking platform paired with a guest CRM and AI concierge — increasing direct revenue, personalising the experience and automating the guest journey end to end.",
    aiOpportunities: [
      "24/7 AI concierge for enquiries and bookings",
      "Personalised upsells based on guest history",
      "Automated review generation",
      "Predictive occupancy insights",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Guest journey automation",
      steps: [
        "Guest books directly through the website",
        "Pre-arrival details and upsells offered automatically",
        "AI concierge handles in-stay requests",
        "Post-stay thank-you and review request sent",
        "Guest profile updated for future personalisation",
      ],
    },
    outcomes: [
      "Higher direct booking share",
      "Improved guest satisfaction scores",
      "More repeat and referral business",
      "Lower dependency on external platforms",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Wrench,
    tagline: "Internal systems, production tracking and B2B portals.",
    description:
      "Production dashboards, B2B customer portals and internal automation for manufacturers and industrial suppliers.",
    solutions: [
      "B2B client portal",
      "Production & inventory dashboard",
      "Corporate website & catalogue",
      "Quote request system",
    ],
    aiAutomations: [
      "Automated quote generation",
      "Document extraction from RFQs",
      "Client support assistant",
      "Predictive maintenance alerts",
    ],
    crmFeatures: [
      "Accounts & buyers",
      "Quote & order history",
      "Contract management",
      "Sales pipeline",
    ],
    startingPrice: "From €5,990",
    problems: [
      "Slow, manual quote and order processes",
      "Disconnected production and sales data",
      "Limited digital presence for B2B buyers",
      "High dependency on spreadsheets",
    ],
    synvoraSolution:
      "A modern B2B platform combining a premium website, self-service client portal and internal operations dashboard — removing spreadsheet chaos and shortening the quote-to-order cycle.",
    aiOpportunities: [
      "Automatic quote drafting from client requests",
      "AI extraction of order and RFQ documents",
      "Predictive maintenance from equipment data",
      "AI copilots for sales and support teams",
    ],
    techStack: ["React", "Next.js", "Node.js", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "Quote-to-order automation",
      steps: [
        "Buyer submits RFQ through the portal",
        "AI extracts key parameters and drafts a quote",
        "Sales approves and sends within minutes",
        "Order confirmed and pushed to production dashboard",
        "Client tracks status in real time",
      ],
    },
    outcomes: [
      "Shorter sales cycles",
      "Reduced manual admin",
      "Better visibility across production",
      "A more professional B2B experience",
    ],
  },
  {
    slug: "construction",
    name: "Construction",
    icon: HardHat,
    tagline: "Project portals, client dashboards and site operations.",
    description:
      "Project management portals, client dashboards and internal systems for contractors, developers and design-build firms.",
    solutions: [
      "Client project portal",
      "Internal project dashboard",
      "Portfolio & services website",
      "Quote & proposal system",
    ],
    aiAutomations: [
      "Automated progress updates",
      "AI document search across projects",
      "Estimate generation assistant",
      "Site issue reporting bot",
    ],
    crmFeatures: [
      "Client & project accounts",
      "Proposal history",
      "Change order tracking",
      "Supplier & sub-contractor records",
    ],
    startingPrice: "From €4,990",
    problems: [
      "Clients kept in the dark on progress",
      "Documents scattered across email and drives",
      "Manual estimating and proposal work",
      "No unified view across active projects",
    ],
    synvoraSolution:
      "A construction operations platform combining a client-facing project portal, internal dashboard and a searchable document layer — with AI to speed up estimates and daily reporting.",
    aiOpportunities: [
      "AI-assisted estimating from historical projects",
      "Automated weekly progress reports",
      "Searchable AI across drawings and documents",
      "Automated change order tracking",
    ],
    techStack: ["React", "Next.js", "Node.js", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "Project reporting automation",
      steps: [
        "Site team logs updates and photos",
        "AI compiles a weekly progress report",
        "Client receives update through their portal",
        "Change orders and approvals tracked in one place",
        "Financials and timeline updated automatically",
      ],
    },
    outcomes: [
      "Higher client trust and transparency",
      "Faster estimating and proposals",
      "Fewer disputes over scope and changes",
      "Cleaner records across every project",
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    icon: Landmark,
    tagline: "Client portals, advisory platforms and compliance-ready systems.",
    description:
      "Secure client portals, advisory dashboards and back-office platforms for advisory firms, fintech teams and financial services.",
    solutions: [
      "Client portal with documents & reporting",
      "Advisor dashboard",
      "Corporate website",
      "Onboarding & KYC flows",
    ],
    aiAutomations: [
      "AI assistant for client FAQs",
      "Automated onboarding & document collection",
      "Report generation from data",
      "Meeting summarisation for advisors",
    ],
    crmFeatures: [
      "Client accounts & households",
      "Portfolio & product tracking",
      "Compliance & task workflows",
      "Communication history",
    ],
    startingPrice: "From €5,990",
    problems: [
      "Manual onboarding and KYC processes",
      "Email-heavy client communication",
      "Disconnected reporting and portfolio tools",
      "Compliance overhead consuming advisor time",
    ],
    synvoraSolution:
      "A secure client portal integrated with an advisor CRM and automated onboarding — replacing email threads with a structured, auditable client experience.",
    aiOpportunities: [
      "AI onboarding assistant that collects and verifies documents",
      "Automated report drafts for advisor review",
      "Meeting notes and follow-up task generation",
      "Client-facing FAQ assistant",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Client onboarding automation",
      steps: [
        "Prospect completes intake form online",
        "AI assistant collects required documents",
        "System runs checks and flags exceptions",
        "Advisor reviews and approves in dashboard",
        "Client granted portal access and welcome flow",
      ],
    },
    outcomes: [
      "Dramatically faster onboarding",
      "Fewer manual compliance errors",
      "More advisor time on real client work",
      "A high-trust digital experience",
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    tagline: "Client portals, matter management and legal AI copilots.",
    description:
      "Client portals, intake systems and matter dashboards for law firms and in-house teams — with AI copilots tuned to legal work.",
    solutions: [
      "Client portal for cases & documents",
      "Matter management dashboard",
      "Firm website with practice areas",
      "Digital intake system",
    ],
    aiAutomations: [
      "AI intake assistant",
      "Document summarisation",
      "Deadline & task reminders",
      "Contract clause search",
    ],
    crmFeatures: [
      "Clients & matters",
      "Conflict checks",
      "Time & activity tracking",
      "Referral pipeline",
    ],
    startingPrice: "From €4,990",
    problems: [
      "Fragmented client communication",
      "Manual, repetitive intake",
      "Documents lost across email and folders",
      "No clear view of matter status",
    ],
    synvoraSolution:
      "A firm-wide platform combining a modern public website, client portal and internal matter dashboard — with an AI intake and document assistant tuned to legal workflows.",
    aiOpportunities: [
      "AI intake bot to qualify and route new matters",
      "Contract summarisation and clause extraction",
      "Automatic status updates for clients",
      "Searchable AI across firm knowledge",
    ],
    techStack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "New matter intake automation",
      steps: [
        "Potential client submits an enquiry",
        "AI assistant collects details and runs conflict checks",
        "Matter routed to the correct practice area",
        "Client receives portal access and next steps",
        "Ongoing status updates automated",
      ],
    },
    outcomes: [
      "Faster, more consistent intake",
      "Less time lost on admin",
      "Better client experience and communication",
      "Cleaner records for every matter",
    ],
  },
  {
    slug: "education",
    name: "Education",
    icon: GraduationCap,
    tagline: "Student portals, learning platforms and admissions automation.",
    description:
      "Admissions portals, learning platforms and internal systems for schools, academies and training providers.",
    solutions: [
      "Admissions & enrolment portal",
      "Student & parent dashboard",
      "Course & content platform",
      "Institution website",
    ],
    aiAutomations: [
      "AI admissions assistant",
      "Automated enrolment workflows",
      "Personalised study recommendations",
      "Support chatbot for common questions",
    ],
    crmFeatures: [
      "Applicant & student records",
      "Parent contacts",
      "Course & cohort tracking",
      "Communication history",
    ],
    startingPrice: "From €3,490",
    problems: [
      "Slow, paper-heavy admissions",
      "Fragmented communication with parents",
      "Manual scheduling and enrolment",
      "Limited data on student engagement",
    ],
    synvoraSolution:
      "A unified education platform combining a premium website, admissions portal and student dashboard — with AI to guide applicants and reduce administrative load.",
    aiOpportunities: [
      "AI admissions guide answering questions 24/7",
      "Automated enrolment and payment flows",
      "Personalised learning recommendations",
      "Insights on student engagement",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Admissions automation",
      steps: [
        "Prospective student explores programmes online",
        "AI assistant answers questions and captures intent",
        "Application submitted and status tracked",
        "Automated notifications to applicant and staff",
        "Enrolment confirmed and student onboarded",
      ],
    },
    outcomes: [
      "Higher application-to-enrolment conversion",
      "Less admin workload for staff",
      "Better parent and student experience",
      "Clear data across the institution",
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: Car,
    tagline: "Dealership platforms, service booking and buyer automation.",
    description:
      "Digital showrooms, service booking systems and dealer CRMs for dealerships, garages and mobility businesses.",
    solutions: [
      "Digital showroom & inventory site",
      "Service booking system",
      "Dealer dashboard",
      "Test-drive request flows",
    ],
    aiAutomations: [
      "AI lead qualification bot",
      "Automated test-drive scheduling",
      "Service reminders",
      "Follow-up drip campaigns",
    ],
    crmFeatures: [
      "Buyers & vehicle interests",
      "Service history",
      "Deal pipeline",
      "Post-purchase communication",
    ],
    startingPrice: "From €3,490",
    problems: [
      "Slow lead response on online enquiries",
      "Manual service booking by phone",
      "Fragmented buyer and service history",
      "Inconsistent follow-up after purchase",
    ],
    synvoraSolution:
      "A modern dealership platform combining a digital showroom, service booking and a dealer CRM — with AI to qualify enquiries, schedule test drives and keep customers engaged.",
    aiOpportunities: [
      "Instant response to online buyer enquiries",
      "Automated test-drive and service booking",
      "AI-generated service reminders",
      "Predictive next-purchase timing",
    ],
    techStack: ["Next.js", "React", "Node.js", "OpenAI", "Make", "Cloudflare"],
    workflow: {
      title: "Buyer & service automation",
      steps: [
        "Buyer enquires about a vehicle online",
        "AI qualifies the lead and books a test drive",
        "Sale recorded and buyer added to CRM",
        "Automated service reminders sent over time",
        "Repeat-purchase campaign triggered when relevant",
      ],
    },
    outcomes: [
      "Faster response and higher conversion",
      "Recurring service revenue captured",
      "Stronger customer lifetime value",
      "Cleaner, unified customer data",
    ],
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    icon: Sparkles,
    tagline: "Booking systems, client portals and loyalty automation.",
    description:
      "Booking platforms, client portals and loyalty programmes for salons, spas, clinics and wellness studios.",
    solutions: [
      "Online booking system",
      "Client portal",
      "Brand & services website",
      "Loyalty & rewards programme",
    ],
    aiAutomations: [
      "AI booking assistant",
      "Automated reminders & confirmations",
      "Review request campaigns",
      "Personalised offers based on history",
    ],
    crmFeatures: [
      "Client profiles & preferences",
      "Visit history",
      "Loyalty status",
      "Communication timeline",
    ],
    startingPrice: "From €2,990",
    problems: [
      "Bookings taken by phone and DMs",
      "High no-show rate",
      "Limited repeat visit strategy",
      "No unified view of client preferences",
    ],
    synvoraSolution:
      "A premium booking platform paired with a client CRM and automated reminders and offers — turning one-off visits into loyal, repeat clients.",
    aiOpportunities: [
      "24/7 AI booking assistant on website and chat",
      "Personalised offers based on past services",
      "Automated review generation",
      "Predictive rebooking prompts",
    ],
    techStack: ["Next.js", "React", "Node.js", "Stripe", "OpenAI", "Cloudflare"],
    workflow: {
      title: "Booking & retention automation",
      steps: [
        "Client books online or via AI assistant",
        "Confirmation and reminders sent automatically",
        "Visit completed and preferences captured",
        "Review request and loyalty points triggered",
        "Personalised rebooking offer sent at the right time",
      ],
    },
    outcomes: [
      "Lower no-show rate",
      "Higher repeat visit frequency",
      "More five-star reviews",
      "A premium, modern client experience",
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
