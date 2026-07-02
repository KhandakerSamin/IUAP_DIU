import { CheckCircle2, Mail, CalendarDays, UserSquare2 } from "lucide-react";

export default function SpeakersSection() {
  const themes = [
    "AI-Enhanced Pedagogies and Learning Innovation",
    "Leadership, Governance, and Institutional Transformation in Higher Education",
    "Higher Education Contributions to Sustainability and SDG Implementation",
    "Entrepreneurial Universities, Innovation Hubs, and Industry Partnerships"
  ];

  return (
    <>
      {/* Call for Speakers Section */}
      <section id="call-for-speakers" className="py-24 lg:py-32 bg-white relative border-b border-slate-100">
        <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 reveal">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
              Call for Participation
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
              Call for <span className="gradient-text">Panel Speakers</span>
            </h2>
            <p className="text-lg text-muted  leading-relaxed">
              The International Association of University Presidents (IAUP) Semi-Annual Meeting 2026 invites distinguished university leaders, academics, researchers, and experts to serve as panel speakers in its thematic sessions. Hosted by Daffodil International University, this global forum will bring together thought leaders to exchange insights and shape the future of higher education.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left Column: Themes */}
            <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-border shadow-sm reveal reveal-delay-1 h-full">
              <h3 className="font-display text-2xl font-bold text-dark mb-6 border-b border-border pb-4">Thematic Areas</h3>
              <p className="text-muted leading-relaxed mb-8">
                We welcome expressions of interest from individuals with demonstrated expertise and leadership in the following areas:
              </p>
              <ul className="space-y-6">
                {themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-primary mt-1 shrink-0 w-6 h-6" />
                    <span className="text-dark font-medium leading-relaxed">{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: How to apply */}
            <div className="flex flex-col gap-8 reveal reveal-delay-2 h-full">
              {/* Who Should Apply */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <UserSquare2 className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark">Who Should Apply</h3>
                </div>
                <p className="text-muted leading-relaxed">
                  Presidents, Vice-Chancellors, Rectors, senior academics, policymakers, researchers and industry leaders with relevant experience and a strong track record in the respective themes.
                </p>
              </div>

              {/* How to Express Interest */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm flex-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="text-primary w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-dark">How to Express Interest</h3>
                </div>
                <p className="text-muted leading-relaxed mb-6">
                  Interested speakers are requested to submit a brief profile, photo (150–200 words) along with their proposed contribution to the session theme.
                </p>
                <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
                  <div className="flex items-center gap-3 text-dark font-medium mb-3">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <span>Deadline: 30th September 2026</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark font-medium">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>
                      Email:{" "}
                      <a
                        href="mailto:iaup-bd2026@daffodilvarsity.edu.bd"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        iaup-bd2026@daffodilvarsity.edu.bd
                      </a>
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted italic border-l-2 border-primary pl-4">
                  Selected panelists will have the opportunity to engage with global peers, contribute to high-level discussions, and expand international collaboration networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}