import { Award, CalendarDays, CheckCircle2, Download, ExternalLink, Printer } from "lucide-react";

const themes = [
  "Higher Education Innovation and Transformation",
  "Internationalization of Higher Education",
  "Climate Change and Sustainability Initiatives",
  "Research and Innovation Ecosystems",
  "Student Success and Employability",
  "Entrepreneurship and Innovation",
  "Quality Assurance and Academic Excellence",
  "Sustainable Development Goals (SDGs)",
  "Digital Transformation and AI in Education",
  "Industry-Academia Collaboration",
  "Community Engagement and Social Impact",
  "Global Partnerships and Leadership",
];

// The practical constraints presenters need before they start designing. The
// full structure and presentation rules stay in the downloadable guidelines.
const posterSpecs = [
  ["Poster Size", "A0 — Portrait orientation"],
  ["Dimensions", "84.1 cm × 118.9 cm"],
  ["Language", "English"],
  ["Title Font", "Minimum 72 pt"],
  ["Headings", "32 – 40 pt"],
  ["Body Text", "24 – 28 pt"],
];

const applyUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdB0zO6KKHtXTUQR6ZIHeI7iJWJURtyaopiqs6uQ8WgNFl7ZQ/viewform";
// ponytail: served from public/ rather than Drive so the download never hits a
// permission wall and the file keeps the name the guidelines refer to.
const guidelinesUrl = "/IAUP_Poster_Guidelines.pdf";

export default function PosterPresentationSection() {
  return (
    <section
      id="poster-presentation"
      className="py-16 md:py-24 max-w-7xl mx-auto bg- relative overflow-hidden"
    >
      {/* <div className="absolute inset-x-0 top-0 h-1 gradient-bg" /> */}
      {/* <div className="absolute top-10 left-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-6 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="max-w-340 mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-12 items-start">
          <div className="reveal">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
              Call for Participation
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 leading-tight">
              Call for <span className="gradient-text">Poster Presentation</span>
            </h2>

            <div className="rounded-full border border-red-300 bg-red-50 text-red-700 px-5 py-2.5 inline-flex items-center gap-2 mb-8">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-semibold">
                Best Poster Award — Top three posters will be recognized with
                Best Poster Awards during the conference closing ceremony
              </span>
            </div>

            <div className="space-y-5 text-lg text-muted leading-relaxed">
              <p className="text-justify">
                Daffodil International University (DIU) is pleased to organize
                a Poster Presentation Session as part of the IAUP Semi-Annual
                Conference, showcasing innovative research, best practices,
                institutional initiatives, and transformative ideas related to
                higher education, sustainability, leadership, innovation, global
                partnerships, and the SDGs.
              </p>
              <p className="text-justify">
                The poster session offers a unique platform for academics,
                researchers, university leaders, students, and practitioners to
                exchange knowledge, foster collaboration, and highlight
                impactful contributions to higher education and global
                development.
              </p>
            </div>

            <div className="bg-slate-50 text-lg rounded-2xl p-5 mt-6 border border-slate-200">
              <div className="flex items-center gap-3 text-slate-800 font-medium">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span>Deadline: 30 September 2026</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href={guidelinesUrl}
                download
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                View Guidelines
                <Download className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primaryDark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Apply Now
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-2 mt-8 lg:mt-0">
            <h3 className="text-2xl font-bold tracking-[0.18em] uppercase text-primary mb-6 flex items-center gap-3">
              <span className="inline-block w-1.5  h-5 bg-primary" />
              Suggested Themes
            </h3>
            <div className="space-y-3">
              {themes.map((theme) => (
                <div
                  key={theme}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-base leading-snug">{theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal mt-12 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="text-2xl font-bold tracking-[0.18em] uppercase text-primary mb-6 flex items-center gap-3">
            <span className="inline-block w-1.5 h-5 bg-primary" />
            Poster Format Requirements
          </h3>

          <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {posterSpecs.map(([label, value]) => (
              <div key={label} className="border-b border-slate-100 pb-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</dt>
                <dd className="mt-1 text-base font-medium text-dark">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-5 py-4 text-slate-700">
            <Printer className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              All accepted posters will be professionally printed by DIU and displayed at the
              conference venue — reaching university leaders, academics, policymakers, and
              international delegates.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
