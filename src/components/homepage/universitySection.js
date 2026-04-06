const universityStats = [
  { value: "20+", label: "Years of Excellence" },
  { value: "25K+", label: "Students" },
  { value: "100+", label: "Programs" },
];

export default function UniversitySection() {
  return (
    <section id="university" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Host Institution
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              Daffodil <span className="gradient-text">International University</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              Recognized for strong international partnerships, future-oriented programs, and commitment to digital
              transformation, DIU proudly welcomes academic leaders from around the world to Dhaka.
            </p>
            <p className="text-muted leading-relaxed mb-8 reveal reveal-delay-3">
              With state-of-the-art facilities at Daffodil Smart City and a diverse student body from over 35
              countries, DIU provides an ideal setting for international academic gatherings and meaningful knowledge
              exchange.
            </p>
            <div className="grid grid-cols-3 gap-8 reveal reveal-delay-4">
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
              <div className="img-placeholder rounded-3xl h-96 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-lg font-medium opacity-75">DIU Campus</span>
                </div>
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
