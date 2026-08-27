import { CalendarDays, MapPin } from "lucide-react";

const schedule = [
  {
    day: "19 Nov 2026 (Thursday)",
    venue: "Daffodil Tower & Dhaka",
    title: "Arrival, Meetings & Welcome Reception",
    events: [
      "Early & Regular Check-In & Kit Distribution",
      "Complementary Golf at Kurmitola Golf Club",
      "IAUP Executive Committee & Board of Directors Meetings (Hotel Sheraton)",
      "Explore Bangladesh National Parliament",
      "Welcome Reception hosted by Daffodil International University",
    ],
  },
  {
    day: "20 Nov 2026 (Friday)",
    venue: "Conference Sheraton Hotel Ballroom, Dhaka",
    title: "Main Conference, Dialogue & Cultural Night",
    events: [
      "Registration, Kit Distribution & Networking Breakfast",
      "Opening Ceremony & Keynote: Universities After AI",
      "Global Leaders Dialogue: Traditional Institutions to AI-Native Ecosystems",
      "Panel Sessions: Entrepreneurial Universities, Women Empowerment, & Sustainability",
      "Book Launching, Bangladesh Cultural Night & Networking Dinner",
    ],
  },
  {
    day: "21 Nov 2026 (Saturday)",
    venue: "Daffodil Smart City, Birulia",
    title: "25th Anniversary Celebration & Closing",
    events: [
      "Morning Tea, Parade & Campus Tour (Celebrating 25th Anniversary of DIU)",
      "Panel 4: Open Science, AI, and the Future of Academic Research",
      "Parallel Sessions 1 & 2",
      "Closing Ceremony & MoU Signing / Closed-Door Women’s Tea Session",
      "Farewell Lunch & Optional City Tour",
    ],
  },
];

export default function TentativeProgramSection() {
  return (
    <section id="program" className="pt-10 md:py-24 px-3 lg:pt-32 bg-white relative">
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
            Program Schedule
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

        

      </div>
    </section>
  );
}