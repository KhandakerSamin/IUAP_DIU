import { CalendarDays, MapPin } from "lucide-react";

const schedule = [
  {
    day: "19 November 2026 (Thursday)",
    venue: "Daffodil Plaza and Dhaka",
    title: "Day 1 Program",
    events: [
      "Day Long — Early and Regular Check-In",
      "09:00am-05:00pm — Registration and Kit Distribution Venue: Registration Booth at Hotel Sheraton, Lobby",
      "08:15am-10:30am — Complementary Golf play at Army Golf Club for early-arriving guests (on request)",
      "12:00noon-12:20pm — IAUP Executive Committee Meeting (Online)",
      "12:30pm-01:30pm — IAUP Board Meeting followed by Lunch Venue: Studio Meeting Room (Level 12), Hotel Sheraton Dhaka",
      "02:30pm-03:00pm — Transfer to Bangladesh National Parliament Trip (Pickup from Hotel: 02:15pm)",
      "03:00pm-05:00pm — Explore Bangladesh National Parliament",
      "05:00pm-05:20pm — Transfer from Bangladesh National Parliament to Daffodil Plaza",
      "05:30pm-06:30pm — Networking Hour, Welcome Performance and light music Venue: 10th floor, Rooftop, Daffodil Plaza",
      "06:30pm-08:00pm — Welcome Reception and Buffet Dinner Venue: Hall Room, 9th floor, Daffodil Plaza",
      "08:00pm-08:45pm — Transfer to Hotel Sheraton and other program partner hotels",
    ],
  },
  {
    day: "20 November 2026 (Friday)",
    venue: "Ballroom, Hotel Sheraton, Dhaka",
    title: "Day 2 Program",
    events: [
      "08:00am-09:15am — Registration, Kit Distribution and Networking Hour",
      "09:30am-10:30am — Opening Ceremony of the IAUP Semi-Annual Conference 2026",
      "10:30am-11:00am — Keynote: Universities After AI - Reimagining Higher Education for the Next Decade",
      "11:00am-11:15am — Tea Break",
      "11:15am-12:00noon — Global Leaders Dialogue: The Future of Universities - From Traditional Institutions to AI-Native Ecosystems",
      "12:01pm-01:15pm — Lunch",
      "01:15pm-02:00pm — Jumma Prayer Break",
      "02:10pm-02:55pm — Panel 1: Building Entrepreneurial Universities for Sustainable Economic Growth",
      "02:55pm-03:00pm — Session Break",
      "03:00pm-03:45pm — Panel 2: Transforming Higher Education to Empower Women in an AI-Driven World",
      "03:45pm-04:00pm — Tea Break",
      "04:00pm-04:45pm — Panel 3: Sustainable Universities for a Sustainable Planet",
      "04:45pm-06:15pm — Break and Rest Time",
      "06:30pm-09:00pm — Bangladesh Cultural Night and Gala Dinner",
    ],
  },
  {
    day: "21 November 2026 (Saturday)",
    venue: "Daffodil International University at Daffodil Smart City",
    title: "Day 3 Program",
    events: [
      "08:00am-08:45am — Transfer from Hotels to Daffodil Smart City (Pickup from Hotel: 08:00am)",
      "08:45am-10:30am — Morning Tea, Guard of Honor, Campus Tour and Inauguration of Oitijjher Haat",
      "10:30am-11:15am — Panel 4: Open Science, AI, and the Future of Academic Research",
      "11:15am-12:00noon — Parallel Session 1: Creating a Culture of Philanthropy; Parallel Session 2: Women’s Tea Session; Parallel Session 3: (TBA)",
      "12:01pm-12:30pm — Closing Ceremony",
      "12:30pm-01:15pm — Memorandum of Understanding (MoU) Signing Ceremony",
      "01:20pm-02:20pm — Farewell Lunch",
      "02:30pm-06:30pm — Optional City Tour (For International Delegates)",
      "07:00pm — Drop-off to Program Hotels",
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
            Program <span className="gradient-text">Schedule</span>
          </h2>
          <p className="text-lg text-slate-700 font-medium leading-relaxed">
            Transforming Higher Education for a Sustainable, Innovative, and AI-Enabled Future
          </p>
        </div>

        {/* Schedule */}
        <div className="max-w-5xl mx-auto mb-24 border-t border-slate-200">
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
                    {`DAY ${idx + 1}`}
                  </span>
                </div>
                <h4 className="font-display font-bold text-xl sm:text-2xl text-dark mb-4 leading-snug">
                  {item.day}
                </h4>
                {item.venue && (
                  <div className="inline-flex items-center gap-2 bg-slate-100 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 w-fit mt-auto border border-slate-200">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold">{item.venue}</span>
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="md:w-2/3 flex flex-col justify-center">
                <ul className="space-y-3">
                  {item.events.map((event, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-800 font-medium text-sm sm:text-base">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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