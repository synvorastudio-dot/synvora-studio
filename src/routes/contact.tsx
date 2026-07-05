import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Eyebrow } from "@/components/ui-lib/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Synvora" },
      { name: "description", content: "Tell us about your project. We respond within one business day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />
        <div
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[600px]"
          style={{ background: "var(--gradient-radial-glow)" }}
        />
        <div className="container-page py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h1 className="mt-6 font-display text-[44px] leading-[1.03] tracking-[-0.04em] text-gradient md:text-[64px]">
                Tell us about<br />what you're building.
              </h1>
              <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted-foreground">
                We respond within one business day with a plan, a price, and a timeline.
              </p>

              <dl className="mt-12 space-y-6">
                {[
                  { icon: Mail, k: "Email", v: "studio@synvora.com" },
                  { icon: MapPin, k: "Studios", v: "London · New York · Singapore" },
                  { icon: Clock, k: "Response", v: "Within one business day" },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl hairline bg-[var(--surface)] text-[var(--electric)]">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <dt className="text-[11.5px] uppercase tracking-[0.18em] text-muted-foreground">{k}</dt>
                      <dd className="mt-1 text-[15px] text-foreground">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-3xl hairline bg-[var(--surface)] p-6 md:p-10"
            >
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full hairline bg-[var(--surface-elevated)] text-[var(--electric)] glow-electric">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-tight">Message received.</h3>
                  <p className="mt-2 max-w-sm text-[14.5px] text-muted-foreground">
                    Thanks — a founding partner will personally reply within one business day.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Jane Doe" required />
                    <Field label="Work email" name="email" type="email" placeholder="jane@company.com" required />
                  </div>
                  <Field label="Company" name="company" placeholder="Company or project name" />
                  <div>
                    <label className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                      What are you building?
                    </label>
                    <select className="mt-2 w-full appearance-none rounded-xl hairline bg-black/30 px-4 py-3 text-[14.5px] text-foreground outline-none focus:border-[var(--electric)]">
                      {["Website", "Web App", "Mobile App", "SaaS Platform", "CRM System", "AI Assistant / Chatbot", "AI Automation", "Not sure yet"].map((o) => (
                        <option key={o} className="bg-black">{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                      Project details
                    </label>
                    <textarea
                      rows={5}
                      placeholder="A few sentences about your goals, timeline and budget."
                      className="mt-2 w-full resize-none rounded-xl hairline bg-black/30 px-4 py-3 text-[14.5px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[var(--electric)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-[14px] font-medium text-black transition-transform hover:-translate-y-0.5"
                  >
                    Send message
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl hairline bg-black/30 px-4 py-3 text-[14.5px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-[var(--electric)]"
      />
    </div>
  );
}
