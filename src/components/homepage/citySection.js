const cityHighlights = [
  "Rich Mughal architecture and UNESCO World Heritage sites nearby",
  "World-renowned Bengali cuisine and vibrant cultural scene",
  "Easy access via Hazrat Shahjalal International Airport (DAC)",
];

export default function CitySection() {
  return (
    <section className="py-24 lg:py-32 bg-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 lg:order-1">
            <div className="relative">
              <div className="img-placeholder rounded-3xl h-96 overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <span className="text-lg font-medium opacity-75">Dhaka Cityscape</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl border border-border">
                <div className="font-display font-bold text-dark text-lg">Capital City of Bangladesh</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
              Host City
            </span>
            <div className="section-divider mb-8 reveal reveal-delay-1" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
              Discover <span className="gradient-text">Dhaka</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-6 reveal reveal-delay-2">
              Dhaka is where heritage meets innovation. A dynamic South Asian capital with a rapidly growing tech
              ecosystem, the city provides an inspiring environment for global collaboration and forward-thinking
              dialogue.
            </p>
            <div className="space-y-4 reveal reveal-delay-3">
              {cityHighlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  <span className="text-muted">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
