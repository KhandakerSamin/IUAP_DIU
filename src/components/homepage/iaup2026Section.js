
export default function IaupSemiAnnualSection() {
  return (
    <section
      id="semi-annual-meeting"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-slate-50 to-transparent opacity-50" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Label */}
        <div className="mb-4 reveal">
          <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm">
            The Event
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-8 leading-tight reveal">
          IAUP{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Semi-Annual
          </span>{" "}
          Meeting 2026
        </h2>

        {/* Description Paragraphs */}
        <div className="space-y-5 text-lg text-slate-600 leading-relaxed mb-12 max-w-5xl">
          <p className="reveal text-justify reveal-delay-1">
            The IAUP Semi-Annual Meeting 2026 will be hosted by Daffodil
            International University in Dhaka, Bangladesh, from 18 to 21
            November 2026. The meeting will bring together university presidents
            and leaders from around the world for high-level dialogue,
            governance meetings, and strategic engagement on key issues in
            global higher education.
          </p>
          <p className="reveal text-justify reveal-delay-2">
            The program will include meetings of the Executive Committee and
            Board of Directors of the International Association of University
            Presidents (IAUP), along with keynote addresses, plenary
            discussions, and parallel sessions focused on leadership, innovation,
            sustainability, and international cooperation. In addition to the
            formal academic agenda, participants will take part in cultural
            programs, institutional visits, and networking activities that
            encourage collaboration across borders and disciplines.
          </p>
        </div>

        {/* Two Boxes: Key Highlights + Promo Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 reveal reveal-delay-3">

          {/* Box 1: Key Highlights */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-primary rounded-full"></span>
              Key Highlights
            </h3>
            <ul className="space-y-4">
              {[
                "IAUP Executive Committee and Board of Directors meetings",
                "Participation of 100 to 150 global university leaders",
                "Keynote and plenary sessions on higher education leadership",
                "Campus Tour: Daffodil International University at Daffodil Smart City",
                "Celebration of 25 years of Daffodil International University",
                "MoU signing and international networking sessions",
                "Cultural programs and Dhaka city sightseeing",
                "Optional post-event tour programs",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-base leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            {/* Download Brochure Button */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <a
                href="/brochure-iaup-semi-annual-meeting-2026.pdf"
                download
                className="group inline-flex items-center gap-3 px-6 py-3 bg-primary text-white text-sm font-bold rounded-full shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg
                  className="w-4 h-4 shrink-0 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                  />
                </svg>
                Download Brochure
              </a>
            </div>
          </div>

          {/* Box 2: Promo Video */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-8 pt-8 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="inline-block w-1 h-6 bg-secondary rounded-full"></span>
                Promo Video
              </h3>
            </div>
            <div className="flex-1 px-8 pb-8">
              <div className="relative w-full rounded-xl overflow-hidden shadow-md"
                   style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/w9yUgCtWZtU?si=StHu1J7-Vgj0F4FJ"
                  title="IAUP Promotional Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="mt-4 text-sm text-slate-500 leading-relaxed">
                Watch the official promotional video for the IAUP Semi-Annual
                Meeting 2026, hosted at Daffodil International University,
                Dhaka, Bangladesh.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}