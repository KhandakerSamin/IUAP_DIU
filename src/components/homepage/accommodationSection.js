import Image from "next/image";
import { BedDouble, FileText, Hotel } from "lucide-react";

const accommodations = [
  {
    name: "Hotel Sheraton",
    image: "/venue1.png",
    alt: "Hotel Sheraton",
    bookingUrl:
      "https://drive.google.com/file/d/1SqHQpCIUsCcQ3Z0LS5mKe5ednIX4fwxn/view?usp=sharing",
  },
  {
    name: "Hotel Sarina",
    image: "/sarina.jpg",
    alt: "Hotel Sarina",
    bookingUrl:
      "https://drive.google.com/file/d/15BmjKxrBMmQNglJs9xV8T2YheFlMzggN/view?usp=sharing",
  },
];

export default function AccommodationSection() {
  return (
    <section id="accommodation" className="py-15 lg:py-24 bg-slate-100">
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
              className={`card-hover overflow-hidden rounded-3xl border border-border bg-white shadow-sm reveal ${index > 0 ? `reveal-delay-${index}` : ""
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

              <div className="px-5 py-5 sm:px-6">
                <a
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-dark transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Booking Instructions
                  <span className="sr-only"> for {hotel.name}</span>
                </a>
                <p className="mt-2 text-xs text-muted">
                  Discounted IAUP 2026 rates, inclusions, and reservation contacts.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
