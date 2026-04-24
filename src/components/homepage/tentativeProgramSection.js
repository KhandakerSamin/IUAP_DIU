import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

const schedule = [

  {
    day: "19 Nov (Thursday)",
    venue: "Daffodil Plaza, Dhanmondi",
    title: "Meetings & Welcome",
    events: [
      "Registration & Welcome Coffee",
      "IAUP Executive Committee Meeting",
      "IAUP Board of Directors Meeting",
      "Welcome Dinner hosted by Daffodil International University",
    ],
  },
  {
    day: "20 Nov (Friday)",
    venue: "Hotel Sheraton, Banani",
    title: "Main Conference",
    events: [
      "Registration & Networking Coffee",
      "Opening Ceremony & Keynote Session",
      "Networking Lunch & Prayer",
      "Panel Session 1",
      "Coffee Break",
      "Panel Session 2",
      "Poster Presentation",
      "Session Break & Networking Time",
      "Gala Dinner & Cultural Program",
    ],
  },
  {
    day: "21 Nov (Saturday)",
    venue: "Daffodil Smart City, Birulia",
    title: "Anniversary & Closing",
    events: [
      "Reception",
      "Campus Tour – Daffodil Smart City",
      "Join 25th Anniversary Program",
      "MoU Signing Ceremony",
      "Closing Ceremony",
      "Lunch & Departure of Delegates",
    ],
  },
];

export default function TentativeProgramSection() {
  return (
    <section id="program" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            Event Schedule
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-dark mb-6">
            Tentative <span className="gradient-text">Schedule</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Join us for an exciting 3-day event packed with high-level dialogs, governance meetings, cultural immersions, and the grand celebration of DIU&apos;s 25th anniversary.
          </p>
        </div>

        {/* Premium Row-wise Schedule */}
        <div className="max-w-4xl mx-auto mb-24 border-t border-slate-200">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-12 border-b border-slate-200 hover:bg-slate-50/50 transition-colors duration-300 px-4 sm:px-8 reveal"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Left: Date & Venue */}
              <div className="md:w-1/3 shrink-0 flex flex-col relative md:pr-8 md:border-r md:border-slate-200 group-hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3 mb-3 text-primary">
                  <CalendarDays className="w-5 h-5" />
                  <span className="font-semibold tracking-wider uppercase text-sm">
                    {`Day ${idx + 1}`}
                  </span>
                </div>
                <h4 className="font-display font-bold text-2xl text-dark mb-4 leading-snug">
                  {item.day}
                </h4>
                {item.venue && (
                  <div className="inline-flex items-center gap-2 bg-white 0 rounded-full px-4 py-2 text-sm text-muted w-fit mt-auto group-hover:border-primary/30 transition-colors">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-medium">{item.venue}</span>
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="md:w-2/3 flex flex-col justify-center">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-dark mb-6 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <ul className="space-y-4">
                  {item.events.map((event, i) => (
                    <li key={i} className="flex items-start gap-4 text-muted group-hover:text-dark transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0 group-hover:bg-primary transition-colors duration-300" />
                      <span className="leading-relaxed">{event}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Optional Post-Event Grid */}
        <div className="reveal">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-4">
              Optional <span className="gradient-text">Post-Event Tour</span> (TBC)
            </h3>
            <p className="text-muted text-lg">Extend your trip and discover the natural beauty of Bangladesh.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Jaflong */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative h-80 w-full">
                {/* Fallback image if actual not present */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/jaflong.jpg"
                  alt="Tea Gardens in Jaflong"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-display text-3xl font-bold text-white mb-2">Tea Gardens in Jaflong</h4>
                  <p className="text-slate-200">Travel by helicopter or flight.</p>
                </div>
              </div>
            </div>

            {/* Sundarbans */}
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <div className="relative h-80 w-full">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src="/sundorban.jpg"
                  alt="Visiting the Sundarbans"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h4 className="font-display text-3xl font-bold text-white mb-2">The Sundarbans</h4>
                  <p className="text-slate-200">Visiting by helicopter.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}