import Image from "next/image";

const stats = [
  { value: 500, label: "Expected Attendees" },
  { value: 50, label: "Partner Institutions" },
  { value: 30, label: "Keynote Sessions" },
  { value: 35, label: "Countries Represented" },
];

export default function WelcomeSection() {
  return (
    <section id="welcome" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-light to-transparent opacity-50" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Welcome to DIU 2026
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              Universities Leading <span className="gradient-text">Global Transformation</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              Welcome to the DIU Semi-Annual Meeting 2026 in Dhaka, Bangladesh - a global gathering where university
              leaders, innovators, and partners come together to shape the future of higher education.
            </p>
            <p className="text-muted leading-relaxed mb-8 reveal reveal-delay-3">
              Under the theme &ldquo;Resilient Minds, Innovative Pathways,&rdquo; we will focus on how universities can
              strengthen resilience, drive innovation, and create meaningful impact.
            </p>
            <a
              href="#registration"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all reveal reveal-delay-4"
            >
              Secure Your Spot
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 reveal">
            {stats.map((item) => (
              <div key={item.label} className="card-hover bg-light rounded-2xl p-8 border border-border">
                <div className="w-14 h-14 flex items-center justify-center mb-5 ">
                  <Image src="/diu.png" alt="DIU Logo" width={50} height={50} className="object-contain" />
                </div>
                <div className="stat-value" data-target={item.value}>
                  0
                </div>
                <div className="text-muted font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
