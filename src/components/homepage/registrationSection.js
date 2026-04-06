const pricingPlans = [
  {
    name: "International",
    subtitle: "Non-Bangladeshi Participants",
    oldPrice: "$350",
    price: "$280",
    badge: "Early Bird",
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
    ],
    buttonClass: "w-full py-4 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors",
  },
  {
    name: "Local Participant",
    subtitle: "Bangladeshi Nationals",
    oldPrice: "BDT 15,000",
    price: "BDT 12,000",
    badge: "Early Bird",
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
      "Certificate of participation",
    ],
    featured: true,
    buttonClass: "btn-primary w-full text-center",
  },
  {
    name: "Accompanying",
    subtitle: "Family Members",
    oldPrice: "BDT 8,000",
    price: "BDT 6,000",
    badge: "Early Bird",
    features: ["Welcome reception", "Gala dinner", "Cultural program", "Sonargaon tour"],
    buttonClass: "w-full py-4 px-6 rounded-xl border-2 border-secondary text-secondary font-semibold hover:bg-secondary hover:text-white transition-colors",
  },
];

export default function RegistrationSection() {
  return (
    <section id="registration" className="py-24 lg:py-32 bg-light relative">
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
            Fees and Conditions
          </span>
          <div className="section-divider mx-auto mb-8 reveal reveal-delay-1" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
            Registration <span className="gradient-text">Options</span>
          </h2>
          <p className="text-lg text-muted reveal reveal-delay-2">
            Registration to the meeting is now open. DIU 2026 will take place as an in-person event only. Early Bird
            registration ends on September 30, 2026.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 items-start">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`card-hover bg-white rounded-3xl p-8 border border-border reveal ${
                plan.featured ? "pricing-featured reveal-delay-1" : ""
              }`}
            >
              <div className={`text-center mb-8 ${plan.featured ? "pt-4" : ""}`}>
                <h3 className="font-display text-2xl font-bold text-dark mb-2">{plan.name}</h3>
                <p className="text-muted text-sm">{plan.subtitle}</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-muted line-through text-lg">{plan.oldPrice}</span>
                <div className={`font-display text-5xl font-bold mt-2 ${plan.featured ? "gradient-text" : "text-dark"}`}>
                  {plan.price}
                </div>
                <span className="text-muted text-sm">{plan.badge}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <button type="button" className={plan.buttonClass}>
                Register Now
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
