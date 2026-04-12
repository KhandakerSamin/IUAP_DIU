import Image from "next/image";

const universityStats = [
  { value: "25K+", label: "Students" },
  { value: "30+", label: "Departments" },
  { value: "200+", label: "International Students" },
  { value: "600+", label: "International Partner Institution" },
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
              Founded in 2002, Daffodil International University (DIU) is one of the top universities in Bangladesh according to many national and international rankings, including THE, QS and Greenmetric for its green outlook. Daffodil International University (DIU) is a leading private university in Bangladesh, recognized in world university rankings such as QS and Times Higher Education (THE). DIU is ranked 221st in Asia (QS Asia 2026) and 1st in Bangladesh (THE WUR 2026), 1st in Bangladesh in both THE Impact Rankings 2025 and QS Sustainability Rankings 2026 with strong performance in research and interdisciplinary innovation.
            </p>
            <p className="text-muted leading-relaxed text-justify mb-6 reveal reveal-delay-3">
              Currently, DIU serves a diverse academic community of 25,000+ students across 6 faculties and 32 departments, including 200+ international students from various regions of the world. Our campus promotes a globally inclusive learning environment supported by modern infrastructure and strong industry linkages.
            </p>
            <p className="text-muted leading-relaxed text-justify mb-8 reveal reveal-delay-4">
              DIU has established over 600 active international partnerships worldwide and is a proud member of numerous prestigious global networks and associations. With global partners, DIU is mutually working in the area of student and faculty exchange programs, summer & winter programs, scholarship, international internship, research collaborations, short-term training programs, virtual mobility, etc.
            </p>
            <div className="grid grid-cols-4 gap-8 reveal reveal-delay-5">
              {universityStats.map((item) => (
                <div key={item.label}>
                  <div className="font-display text-4xl font-bold gradient-text">{item.value}</div>
                  <div className="text-sm text-muted mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="relative">
              <div className="relative rounded-3xl h-96 overflow-hidden bg-slate-100 shadow-md">
                <Image 
                  src="/aboutDIU.png" 
                  alt="About DIU Campus" 
                  fill 
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border border-border">
                <div className="font-display font-bold text-dark">Top Ranked in Bangladesh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
