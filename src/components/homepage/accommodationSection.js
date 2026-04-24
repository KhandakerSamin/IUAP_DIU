import Image from "next/image";
import { BedDouble, Hotel } from "lucide-react";

const accommodations = [
  {
    name: "Hotel Sheraton",
    image: "/venue1.png",
    alt: "Hotel Sheraton",
  },
  {
    name: "Hotel Sarina",
    image: "/sarina.jpg",
    alt: "Hotel Sherina",
  },
];

export default function AccommodationSection() {
  return (
    <section id="accommodation" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
            Stay Options
          </span>
          <div className="section-divider mx-auto mb-8 reveal reveal-delay-1" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
            Accommodation <span className="gradient-text">Options</span>
          </h2>
          <p className="text-lg text-muted reveal reveal-delay-2">
            The following hotels are available for delegates and accompanying family members during the conference period.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {accommodations.map((hotel, index) => (
            <article
              key={hotel.name}
              className={`card-hover overflow-hidden rounded-3xl border border-border bg-white shadow-sm reveal ${
                index > 0 ? `reveal-delay-${index}` : ""
              }`}
            >
              <div className="relative h-96 sm:h-112 bg-slate-200">
                <Image
                  src={hotel.image}
                  alt={hotel.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  <BedDouble className="h-4 w-4" />
                  Recommended Hotel
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">{hotel.name}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center reveal reveal-delay-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-10 py-4 text-base font-semibold text-white transition hover:bg-primary-dark"
          >
            <Hotel className="h-5 w-5" />
            Book Hotel
          </button>
        </div>
      </div>
    </section>
  );
}
