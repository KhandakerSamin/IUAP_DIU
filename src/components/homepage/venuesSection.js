import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";

const venues = [
  {
    day: "Day 1",
    name: "Daffodil Plaza",
    address: "Dhanmondi, Dhaka",
    image: "/venu.jpg",
  },
  {
    day: "Day 2",
    name: "Hotel Sheraton Dhaka",
    address: "44 Kemal Ataturk Avenue, Banani, Dhaka",
    image: "/venue1.png",
  },
  {
    day: "Day 3",
    name: "Daffodil Smart City",
    address: "Birulia, Savar, Dhaka – 1216, Bangladesh",
    image: "/venue2.JPG",
  },
];

export default function VenuesSection() {
  return (
    <section id="venues" className="py-24 lg:py-32 bg-white">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4 reveal">
            Event Locations
          </span>
          <div className="section-divider mx-auto mb-8 reveal reveal-delay-1" />
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6 reveal reveal-delay-1">
            Conference <span className="gradient-text">Venues</span>
          </h2>
          <p className="text-lg text-muted reveal reveal-delay-2">
            The IAUP Semi-Annual Meeting 2026 will take place across three premium locations in Dhaka, progressing from the city center to our expansive smart campus.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 border-t border-slate-100 pt-8">
          {venues.map((venue, index) => (
            <article key={venue.name} className={`card-hover bg-slate-50 flex flex-col rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all reveal ${index > 0 ? `reveal-delay-${index}` : ""}`}>
              <div className="relative h-64 overflow-hidden bg-slate-200">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-white/50 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span className="text-xs tracking-wide uppercase font-bold text-slate-800">{venue.day}</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-display text-2xl font-bold text-dark mb-4">{venue.name}</h3>
                <div className="flex items-start gap-3 text-muted mt-auto bg-white p-4 rounded-2xl border border-slate-100">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{venue.address}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
