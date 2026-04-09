import { CheckCircle2 } from "lucide-react";

export default function Iaup2026Section() {
  const highlights = [
    "IAUP Executive Committee and Board of Directors meetings",
    "Participation of 100 to 150 global university leaders",
    "Keynote and plenary sessions on higher education leadership",
    "Parallel thematic discussions on innovation and sustainability",
    "Campus Tour: Daffodil International University at Daffodil Smart City",
    "Celebration of 25 years of Daffodil International University",
    "MoU signing and international networking sessions",
    "Cultural programs and Dhaka city sightseeing",
    "Optional post-event tour programs",
  ];

  return (
    <section id="iaup-2026" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 ">
          {/* Content Column */}
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              The Event
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-8 reveal reveal-delay-1">
              IAUP Semi-Annual <span className="gradient-text">Meeting 2026</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              The IAUP Semi-Annual Meeting 2026 will be hosted by Daffodil International University in Dhaka, Bangladesh, from 19 to 21 November 2026. The meeting will bring together presidents, rectors, vice chancellors, and senior university leaders from around the world for high-level dialogue, governance meetings, and strategic engagement on key issues in global higher education leadership.
            </p>
            <p className="text-muted leading-relaxed mb-6 reveal reveal-delay-3">
              The program will include meetings of the Executive Committee and Board of Directors of the International Association of University Presidents (IAUP), along with keynote addresses, plenary discussions, and parallel sessions focused on leadership, innovation, sustainability, and international cooperation.
            </p>
            <p className="text-muted leading-relaxed reveal reveal-delay-4">
              In addition to the formal academic agenda, participants will take part in cultural programs, institutional visits, and networking activities that encourage collaboration and knowledge exchange. The meeting is expected to welcome 100 to 150 from local and international delegates and will coincide with the celebration of 25 years of Daffodil International University, highlighting the institution&apos;s commitment to global engagement and academic leadership.
            </p>
          </div>

          {/* Highlights Column */}
          <div className="reveal reveal-delay-2">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-border h-full">
              <h3 className="font-display text-2xl font-bold text-dark mb-8 pb-4 border-b border-border">
                Key Highlights
              </h3>
              <ul className="space-y-6">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="text-primary mt-1 shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="text-muted font-medium">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}