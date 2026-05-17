import Image from "next/image";

const universityStats = [
  { value: "25K+", label: "Students" },
  { value: "30+", label: "Departments" },
  { value: "100+", label: "International Students" },
  { value: "600+", label: "International Partner Institutions" },
];

export default function AboutDiuSection() {
  return (
    <section id="about-diu" className="py-24 lg:py-32 bg-white">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Host Institution
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              About <span className="gradient-text">DIU</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed text-justify mb-6 reveal reveal-delay-2">
              Daffodil International University (DIU), a leading private university in Bangladesh, recognized in world university rankings such as QS and Times Higher Education (THE).DIU is ranked 221st in Asia (QS Asia 2026) and 1st in Bangladesh (THE WUR 2026), Ist in Bangladesh in both THE Impact Rankings 2025 and QS Sustainability Rankings 2026 with strong performance in research and interdisciplinary innovation.
            </p>
            <p className="text-muted leading-relaxed text-justify mb-6 reveal reveal-delay-3">
             DIU is the number one private university in Bangladesh in terms of Scopus and Web of Science indexed research publications. QS World University Rankings also recognizes DIU as a &quot;Very High Research Intensive University&quot;.
            </p>
            <p className="text-muted leading-relaxed text-justify mb-8 reveal reveal-delay-4">
             The university maintains over 600 international partnerships and actively engages in student and faculty exchange, international internships, research collaboration, scholarships, and global mobility programs
            </p>
            <p className="text-muted leading-relaxed text-justify mb-8 reveal reveal-delay-4">
             The university has also successfully hosted major international events, including the AUPF 2019 and the AUAP General Conference 2022.
            </p>
          </div>

          <div className="reveal mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 reveal reveal-delay-2">
              {universityStats.map((item) => (
                <div key={item.label} className="p-1 sm:p-2">
                  <div className="font-display text-2xl sm:text-3xl font-bold gradient-text">{item.value}</div>
                  <div className="text-xs sm:text-sm text-muted mt-1">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="relative rounded-3xl w-full aspect-video overflow-hidden bg-slate-100 shadow-md">
                <Image 
                  src="/aboutDIU.png" 
                  alt="About DIU Campus" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-border">
                <div className="font-display font-bold text-dark text-sm sm:text-base">Top Ranked University in Bangladesh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
