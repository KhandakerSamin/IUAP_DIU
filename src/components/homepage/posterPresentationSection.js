import { Award, Download, ExternalLink } from "lucide-react";

const themes = [
  "Higher Education Innovation and Transformation",
  "Quality Assurance and Academic Excellence",
  "Internationalization of Higher Education",
  "Sustainable Development Goals (SDGs)",
  "Climate Change and Sustainability Initiatives",
  "Digital Transformation and AI in Education",
  "Research and Innovation Ecosystems",
  "Industry-Academia Collaboration",
  "Student Success and Employability",
  "Community Engagement and Social Impact",
  "Entrepreneurship and Innovation",
  "Global Partnerships and Leadership",
];

const applyUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSdB0zO6KKHtXTUQR6ZIHeI7iJWJURtyaopiqs6uQ8WgNFl7ZQ/viewform";
const guidelinesUrl =
  "https://drive.google.com/uc?export=download&id=1VKSHyrh-ovVEcj-jKp6gziBLLEzn0UAY";

export default function PosterPresentationSection() {
  return (
    <section
      id="poster-presentation"
      className="py-15 max-w-6xl mx-auto bg-white relative overflow-hidden"
    >
      {/* <div className="absolute inset-x-0 top-0 h-1 gradient-bg" /> */}
      {/* <div className="absolute top-10 left-6 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-6 w-72 h-72 bg-secondary/10 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
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
                Best Poster Award - Top 3 posters recognized at closing ceremony
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

            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href={guidelinesUrl}
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

          <div className="reveal reveal-delay-2 mt-30">
            <h3 className="text-sm font-bold tracking-[0.18em] uppercase text-primary mb-6 flex items-center gap-3">
              <span className="inline-block w-10  h-px bg-primary/40" />
              Suggested Themes
            </h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {themes.map((theme) => (
                <div
                  key={theme}
                  className="flex items-start gap-3 border-b border-slate-200 pb-3 text-slate-700"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-snug">{theme}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
