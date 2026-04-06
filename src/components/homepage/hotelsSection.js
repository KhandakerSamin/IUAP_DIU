const hotels = [
  {
    name: "Radisson Blu Dhaka",
    rating: "5 Star Hotel",
    travel: "45 min from venue | Shuttle included",
    single: "$140 / night",
    double: "$165 / night",
  },
  {
    name: "Le Meridien Dhaka",
    rating: "5 Star Hotel",
    travel: "40 min from venue | Shuttle included",
    single: "$155 / night",
    double: "$180 / night",
  },
  {
    name: "Pan Pacific Sonargaon",
    rating: "4 Star Hotel",
    travel: "35 min from venue | Shuttle included",
    single: "$110 / night",
    double: "$135 / night",
  },
];

export default function HotelsSection() {
  return (
    <section id="hotels" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
            Book Your Stay
          </span>
          <div className="section-divider mx-auto mb-8 reveal reveal-delay-1" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
            Partner <span className="gradient-text">Hotels</span>
          </h2>
          <p className="text-lg text-muted reveal reveal-delay-2">
            A limited number of rooms at special rates have been reserved for DIU 2026 participants. Daily shuttle
            transportation to the conference venue will be provided from these hotels.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hotels.map((hotel, index) => (
            <article key={hotel.name} className={`card-hover bg-white rounded-3xl border border-border overflow-hidden reveal ${index > 0 ? `reveal-delay-${index}` : ""}`}>
              <div className="img-placeholder h-52 flex items-center justify-center">
                <div className="text-center text-white">
                  <span className="text-sm opacity-75">{hotel.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-2">{hotel.name}</h3>
                <p className="text-primary font-medium text-sm mb-4">{hotel.travel}</p>
                <div className="bg-light rounded-xl p-4 mb-5">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted text-sm">Single Room</span>
                    <span className="font-semibold text-dark">{hotel.single}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted text-sm">Double Room</span>
                    <span className="font-semibold text-dark">{hotel.double}</span>
                  </div>
                </div>
                <a
                  href="#"
                  className="block text-center py-3 px-6 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Book Now
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
