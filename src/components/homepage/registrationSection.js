import Link from "next/link";

const pricingPlans = [
  {
    name: "IAUP & AUAP Members",
    subtitle: "Special rate for association members",
    pricing: [
      { label: "Early Bird", price: "USD 400" },
      { label: "General", price: "USD 500" },
      { label: "Late Registration", price: "USD 600" },
    ],
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
    ],
    featured: true,
    buttonClass: "w-full py-4 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors mt-8",
  },
  {
    name: "Non-Members",
    subtitle: "Standard registration rate",
    pricing: [
      { label: "Early Bird", price: "USD 500" },
      { label: "General", price: "USD 600" },
      { label: "Late Registration", price: "USD 700" },
    ],
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
    ],
    buttonClass: "w-full py-4 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors mt-8",
  },
  {
    name: "Participants' Family",
    subtitle: "Accompanying persons",
    pricing: [
      { label: "Flat Rate", price: "USD 400" },
    ],
    features: [
      "Welcome reception",
      "Gala dinner",
      "Cultural program",
      "Dhaka city tour",
    ],
    buttonClass: "w-full py-4 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors mt-8",
  },
];

export default function RegistrationSection() {
  return (
    <section id="registration" className="py-24 lg:py-32 bg-light relative">
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
            Fees and Conditions
          </span>
          <div className="section-divider mx-auto mb-8 reveal reveal-delay-1" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
            Registration <span className="gradient-text">Options</span>
          </h2>
          <p className="text-lg text-muted reveal reveal-delay-2">
            Registration to the meeting is now open. DIU 2026 will take place as an in-person event only.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-stretch">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`card-hover bg-white rounded-3xl p-8 border border-border reveal flex flex-col h-full ${
                plan.featured ? "pricing-featured reveal-delay-1" : ""
              }`}
            >
              <div className={`text-center mb-8 ${plan.featured ? "pt-4" : ""}`}>
                <h3 className="font-display text-2xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-muted text-sm">{plan.subtitle}</p>
              </div>

              <div className="mb-8 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="space-y-3">
                  {plan.pricing.map((tier, idx) => (
                    <div key={idx} className="flex justify-between items-center pb-3 last:pb-0 border-b border-slate-200 last:border-0 border-dashed">
                      <span className="text-sm font-medium text-slate-600">{tier.label}</span>
                      <span className={`font-display font-bold text-lg ${plan.featured && idx === 0 ? "text-primary" : "text-dark"}`}>
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ul className="space-y-4 mb-auto">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                    <span className="text-muted text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/registration" className={`${plan.buttonClass} inline-flex items-center justify-center`}>
                Register Now
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
