import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";

export const metadata = {
  title: "Why DIU | IAUP Semi-Annual Meeting 2026",
  description: "Learn why Daffodil International University is hosting the IAUP Semi-Annual Meeting 2026.",
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="mt-1 h-5 w-5 shrink-0 text-primary"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.25 10.25 8.75 12.75 13.75 7.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const whyChooseDiu = [
  {
    title: "Globally Recognized Institution",
    detail: "Committed to academic excellence, innovation, sustainability, and internationalization.",
  },
  {
    title: "Experienced International Host",
    detail: "A trusted organizer of prestigious global higher education conferences and forums.",
  },
  {
    title: "World-Class Campus",
    detail: "Daffodil Smart City offers modern conference facilities, smart classrooms, research centers, and a technology-enabled learning environment.",
  },
  {
    title: "Strong Global Network",
    detail: "Extensive partnerships with universities, industries, and international organizations that promote research, academic mobility, and collaborative innovation.",
  },
  {
    title: "Commitment to Sustainability",
    detail: "A green, smart, and future-focused campus aligned with the United Nations Sustainable Development Goals (SDGs).",
  },
  {
    title: "Innovation & Entrepreneurship Ecosystem",
    detail: "An ecosystem that empowers students, researchers, and educators through innovation, entrepreneurship, and industry engagement.",
  },
  {
    title: "Gateway to Bangladesh",
    detail: "A welcoming institution that showcases Bangladesh's hospitality, culture, and growing role in global higher education.",
  },
];

const smartCityHighlights = [
  {
    title: "World-Class Conference & Event Facilities",
    detail: "More than 25 modern venues with a combined seating capacity of 15,000+, including international conference halls, auditoriums, seminar rooms, meeting spaces, exhibition areas, VIP lounges, and smart event facilities equipped with advanced audio-visual technology and campus-wide high-speed Wi-Fi.",
  },
  {
    title: "A Smart, Green & Sustainable Campus",
    detail: "One of Bangladesh's greenest smart campuses, featuring landscaped gardens, eco-friendly infrastructure, digital services, and a serene environment that promotes sustainability and well-being.",
  },
  {
    title: "Lakeside Experience",
    detail: "The picturesque DSC Lake offers a tranquil setting with landscaped walking trails, boating, and kayaking facilities, providing delegates with an ideal space for relaxation, networking, and meaningful conversations beyond the conference sessions.",
  },
  {
    title: "Comprehensive Sports & Wellness Facilities",
    detail: "A vibrant sports ecosystem featuring cricket and football grounds, athletics facilities, basketball, volleyball, badminton, handball, table tennis, futsal, cycling tracks, swimming pool, gymnasiums, chess, carrom, and dedicated indoor and outdoor fitness facilities, encouraging an active and healthy lifestyle.",
  },
  {
    title: "On-Campus Accommodation",
    detail: "A vibrant residential community with accommodation for more than 8,000 students, along with housing for international students, faculty, and staff. Comfortable residences are supported by Wi-Fi, dining facilities, medical services, recreation spaces, laundry, 24/7 security, and other essential amenities.",
  },
  {
    title: "Innovation & Learning Ecosystem",
    detail: "Smart classrooms, advanced laboratories, libraries, research centers, startup incubation facilities, collaborative learning spaces, and entrepreneurship initiatives provide an ecosystem that inspires creativity, innovation, and academic excellence.",
  },
  {
    title: "Hospitality & Visitor Services",
    detail: "Delegates will enjoy diverse dining options, guest services, information desks, golf-cart transportation within the campus, medical and emergency support, ample parking, banking and ATM services, and convenient transportation supported by a fleet of 100+ buses.",
  },
  {
    title: "Safe & Secure Environment",
    detail: "A professionally managed campus with 24/7 security, over 1,500 CCTV cameras, trained security personnel, medical emergency services, and comprehensive visitor support.",
  },
];

export default function WhyDiuPage() {
  return (
    <>
      <Nev />
      <main className="min-h-screen pt-24 pb-16">
        {/* Hero */}
        <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Why DIU</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-5xl">Why DIU</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Daffodil International University is proud to host the IAUP Semi-Annual Meeting 2026,
              welcoming global higher education leaders to Bangladesh for strategic collaboration and
              innovative ideas that will shape the future of higher education.
            </p>
          </div>
        </section>

        {/* Why Daffodil International University */}
        <section className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About the Host</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Why Daffodil International University?
            </h2>

            <div className="mt-4 flex flex-col gap-4 text-base leading-7 text-slate-600">
              <p>
                Daffodil International University (DIU) is one of Bangladesh&apos;s leading private
                universities, recognized for its commitment to academic excellence, innovation,
                entrepreneurship, sustainability, and internationalization. Since its establishment in
                2002, DIU has cultivated a dynamic academic ecosystem that integrates quality education,
                impactful research, industry collaboration, and extensive global partnerships.
              </p>
              <p>
                Located within the state-of-the-art Daffodil Smart City, DIU offers world-class
                conference venues, smart learning environments, modern research facilities, and a
                vibrant, sustainable campus, providing an exceptional setting for international academic
                dialogue, collaboration, and knowledge exchange.
              </p>
              <p>
                DIU has a proven track record of successfully hosting prestigious international higher
                education events, including the 18th Asian University Presidents Forum (AUPF 2019) and
                the 15th AUAP General Conference 2022. These landmark gatherings welcomed university
                presidents, vice chancellors, policymakers, and academic leaders from across the globe,
                strengthening international partnerships and advancing collaborative initiatives in
                higher education.
              </p>
              <p>
                As the host of the IAUP 2026 Semi-Annual Meeting, DIU is honored to welcome global
                higher education leaders to Bangladesh for meaningful discussions, strategic
                collaboration, and innovative ideas that will contribute to shaping the future of higher
                education.
              </p>
            </div>

            {/* Why Choose DIU */}
            <h3 className="mt-10 text-xl font-bold text-slate-900 sm:text-2xl">Why Choose DIU?</h3>
            <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {whyChooseDiu.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="https://daffodilvarsity.edu.bd/article/at-a-glance"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              More details at a glance
            </a>
          </div>
        </section>

        {/* Daffodil Smart City Experience */}
        <section className="mx-auto mt-10 flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">The Venue</p>
            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              Daffodil Smart City Experience
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Experience the future of higher education at Daffodil Smart City (DSC)—Bangladesh&apos;s
              first integrated smart, green, and education-centric campus. Spread across 150+ acres of
              beautifully landscaped greenery, DSC is home to Daffodil International University (DIU)
              and offers a unique environment where education, technology, innovation, entrepreneurship,
              sustainability, and community living come together. As the venue of the IAUP 2026
              Semi-Annual Meeting, Daffodil Smart City provides an inspiring setting for meaningful
              dialogue, collaboration, and networking among global higher education leaders.
            </p>

            <h3 className="mt-10 text-xl font-bold text-slate-900 sm:text-2xl">What You&apos;ll Experience</h3>
            <ul className="mt-6 flex flex-col gap-5">
              {smartCityHighlights.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckIcon />
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base leading-7 text-slate-600">
              Daffodil Smart City is more than a university campus—it is a vibrant destination where
              academic excellence meets innovation, sustainability, recreation, and hospitality. During
              the IAUP 2026 Semi-Annual Meeting, delegates will experience a dynamic environment designed
              to foster collaboration, inspire new ideas, and showcase the future of higher education in
              Bangladesh.
            </p>

            <a
              href="https://annisulhuq.daffodil.university/vt/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:border-primary hover:text-primary"
            >
              Take the virtual tour
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}