"use client";

import { useState } from "react";
import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import { Fraunces, Inter } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// ---------------------------------------------------------------------------
// Design Tokens & Badges
// ---------------------------------------------------------------------------
const TYPE_STYLES = {
  ceremony: { label: "Ceremony", dot: "bg-[#16241C]" },
  keynote: { label: "Keynote", dot: "bg-[#0F6E4F]" },
  panel: { label: "Panel", dot: "bg-[#0F6E4F]" },
  dialogue: { label: "Dialogue", dot: "bg-[#0F6E4F]" },
  social: { label: "Social", dot: "bg-[#C6892E]" },
  campus: { label: "Campus", dot: "bg-[#C6892E]" },
  logistics: { label: "Logistics", dot: "bg-[#B9B4A4]" },
  meeting: { label: "Meeting", dot: "bg-[#16241C]" },
};

function Item({ time, type, title, children, dressCode }) {
  const t = TYPE_STYLES[type] || TYPE_STYLES.logistics;
  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        className={`absolute left-[3px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-[#F6F5F1] ${t.dot}`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:gap-8">
        <div className="shrink-0 sm:w-40">
          <span className="inline-block whitespace-nowrap rounded-lg border border-[#E3E0D6] bg-white px-3 py-1 font-sans text-[14.5px] font-bold tracking-tight text-[#16241C] sm:text-[15px]">
            {time}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-serif text-[18px] font-medium leading-snug text-[#16241C] sm:text-[20px]">
              {title}
            </h3>
            
            {dressCode && (
              <span className="rounded-full border border-[#E3E0D6] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#5B6660]">
                Dress code: {dressCode}
              </span>
            )}
          </div>
          {children && (
            <div className="mt-2 font-sans text-[15px] leading-relaxed text-[#454F49]">
              {children}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function DaySection({ eyebrow, dateLabel, title, venue, accent, children }) {
  return (
    <section className="py-10">
      <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p
            className="font-sans text-[12px] font-bold uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-[32px] font-semibold leading-none text-[#16241C] sm:text-[42px]">
            {title}
          </h2>
          <p className="mt-2 font-sans text-[15px] text-[#5B6660]">{dateLabel}</p>
        </div>
        <div className="rounded-2xl border border-[#E3E0D6] bg-white px-5 py-3 font-sans text-[14px] text-[#454F49] shadow-sm sm:text-right">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8577]">
            Venue
          </span>
          {venue}
        </div>
      </div>
      <ol className="relative before:absolute before:left-0.75 before:top-1 before:h-[calc(100%-1rem)] before:w-px before:bg-[#E3E0D6]">
        {children}
      </ol>
    </section>
  );
}

export default function ProgramSchedulePage() {
  const [activeTab, setActiveTab] = useState("day-1");

  const tabs = [
    { id: "day-1", label: "Day 1", sub: "19 Nov · Arrival" },
    { id: "day-2", label: "Day 2", sub: "20 Nov · Global Vision" },
    { id: "day-3", label: "Day 3", sub: "21 Nov · DIU Campus" },
  ];

  return (
    <>
      <Nev />
      <main
        className={`${display.variable} ${body.variable} min-h-screen bg-slate-150 pb-24 pt-20 font-sans`}
      >
        {/* Header Hero */}
        <section className="border-b border-[#E3E0D6]">
          <div className="mx-auto max-w-340 px-4 py-12 sm:px-6 lg:px-8">
            <p className="font-sans text-[12px] font-bold uppercase tracking-[0.28em] text-[#0F6E4F]">
              Program Schedule &middot; Draft
            </p>
            <h1 className="mt-4 font-serif text-[38px] font-semibold leading-[1.08] text-[#16241C] sm:text-[56px]">
              IAUP Semi-Annual Conference 2026
            </h1>
            <p className="mt-5 max-w-5xl font-serif text-[20px] italic leading-relaxed text-[#454F49] sm:text-[23px]">
              Transforming higher education for a sustainable, innovative, and
              AI-enabled future.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-sans text-[15px] text-[#454F49]">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16241C]" />
                19–21 November 2026
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16241C]" />
                Dhaka, Bangladesh
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#16241C]" />
                All times shown in GMT+6
              </span>
            </div>
          </div>
        </section>

        {/* Sticky Day Navigation Tabs — sits just below the fixed site header (Nev),
           so it needs its own top offset instead of top-0, or it hides underneath it. */}
        <nav className="sticky top-20 z-30 border-b border-[#E3E0D6] bg-[#F6F5F1]/95 shadow-sm backdrop-blur-sm">
          <div className="mx-auto flex max-w-340 gap-3 overflow-x-auto px-4 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 cursor-pointer items-baseline gap-2 rounded-full border px-5 py-2.5 font-sans text-[14px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-primaryDark bg-primary text-white shadow-sm"
                      : "border-[#E3E0D6] bg-white text-[#16241C] hover:border-primaryDark hover:text-primaryDark"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`font-normal ${
                      isActive ? "text-white/80" : "text-[#8A8577]"
                    }`}
                  >
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Schedule Content */}
        <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
          {/* DAY 1 */}
          {activeTab === "day-1" && (
            <DaySection
              eyebrow="Day 1 · Thursday"
              title="Arrival & Welcome"
              dateLabel="19 November 2026"
              venue="Daffodil Tower & Dhaka"
              accent="#8A8577"
            >
              <Item time="All Day" type="logistics" title="Early & regular check-in">
                Airport pick-up from Hazrat Shahjalal International Airport with
                transfer to designated hotels. Conference help desk open in the
                hotel lobby for visa, transport, local SIM, and city information.
              </Item>
              <Item time="9:00 AM – 5:00 PM" type="logistics" title="Registration & kit distribution">
                Delegate badge and conference kit distribution.
              </Item>
              <Item time="9:30 – 11:00 AM" type="social" title="Complimentary golf">
                Kurmitola Golf Club, for early-arrival guests, on request.
              </Item>
              <Item time="11:30 AM – 12:30 PM" type="meeting" title="IAUP Executive Committee Meeting">
                Venue: Hotel Sheraton Dhaka.
              </Item>
              <Item time="12:30 – 1:30 PM" type="meeting" title="IAUP Board of Directors Meeting & lunch">
                Venue: Hotel Sheraton Dhaka.
              </Item>
              <Item time="2:30 – 3:00 PM" type="logistics" title="Transfer to Bangladesh National Parliament" />
              <Item time="3:00 – 5:00 PM" type="campus" title="Explore Bangladesh National Parliament" />
              <Item time="5:00 – 5:30 PM" type="logistics" title="Transfer to Daffodil Tower" />
              <Item time="6:00 – 8:30 PM" type="social" title="Welcome reception">
                Informal welcome by DIU leadership and IAUP representatives, with
                a light cultural performance and networking dinner.
              </Item>
              <Item time="8:30 – 9:00 PM" type="logistics" title="Transfer to hotels" />
            </DaySection>
          )}

          {/* DAY 2 */}
          {activeTab === "day-2" && (
            <DaySection
              eyebrow="Day 2 · Friday"
              title="Global Vision"
              dateLabel="20 November 2026"
              venue="Sheraton Hotel Ballroom, Dhaka"
              accent="#0F6E4F"
            >
              <Item time="8:30 – 10:00 AM" type="logistics" title="Registration, kit distribution & networking breakfast">
                Final registration for local and international delegates, and
                opening networking for presidents, rectors, vice chancellors,
                senior leaders, partners, and speakers.
              </Item>
              <Item time="10:00 – 11:00 AM" type="ceremony" title="Opening ceremony" dressCode="Formal">
                National anthem of Bangladesh; welcome video on transforming
                higher education; Bangladeshi cultural performance; welcome
                remarks by DIU leadership; address by the IAUP President;
                special address by the Minister of Education; international
                partner messages; conference inauguration, group photo, and
                media interaction.
              </Item>
              <Item
                time="11:00 – 11:30 AM"
                type="keynote"
                title="Keynote — Universities After AI: Reimagining Higher Education for the Next Decade"
              >
                Flagship keynote framing the transition from digital
                universities to AI-native universities, covering leadership,
                governance, ethics, quality, employability, innovation, and
                global partnerships.
              </Item>
              <Item time="11:30 – 11:45 AM" type="logistics" title="Tea break" />
              <Item
                time="11:45 AM – 12:30 PM"
                type="dialogue"
                title="Global Leaders Dialogue — From Traditional Institutions to AI-Native Ecosystems"
              >
                University presidents and senior leaders from the USA, UK,
                Canada, Australia, China, Japan, Europe, the Middle East,
                Africa, and Latin America on disruption, AI, sustainability,
                entrepreneurship, rankings, equity, and institutional
                transformation.
              </Item>
              <Item time="12:30 – 1:50 PM" type="logistics" title="Lunch & Jumma prayer break" />
              <Item
                time="2:00 – 2:45 PM"
                type="panel"
                title="Panel 1 — Building Entrepreneurial Universities for Sustainable Economic Growth"
              >
                Startup universities, incubators, technology transfer, venture
                capital, commercialization, spin-offs, and student startups;
                GDP contribution and public policy; dialogue with government,
                industry, and development partners.
                <br className="hidden sm:block" />
                <span className="mt-1 block text-[13.5px] font-medium text-[#0F6E4F]">
                  Outcome: entrepreneurial university model; student startup and
                  commercialization action checklist.
                </span>
              </Item>
              <Item time="2:45 – 3:00 PM" type="logistics" title="Tea break" />
              <Item
                time="3:00 – 3:45 PM"
                type="panel"
                title="Panel 2 — Transforming Higher Education to Empower Women in an AI-Driven World"
              >
                Women&apos;s leadership in academia; research and innovation for
                women&apos;s empowerment; climate change, sustainability, and
                gender; AI, ethics, and social justice.
              </Item>
              <Item time="3:45 – 4:00 PM" type="logistics" title="Tea break" />
              <Item time="4:00 – 5:00 PM" type="panel" title="Panel 3 — Sustainable Universities for a Sustainable Planet">
                Solar campuses, green buildings, ESG, SDGs, circular economy,
                energy, waste, and biodiversity; case studies on carbon-neutral
                campuses and carbon credits.
                <br className="hidden sm:block" />
                <span className="mt-1 block text-[13.5px] font-medium text-[#0F6E4F]">
                  Expected outputs: green campus roadmap; carbon-neutral campus
                  commitments and indicators.
                </span>
              </Item>
              <Item time="5:00 – 6:30 PM" type="logistics" title="Break & rest time" />
              <Item
                time="6:30 – 9:00 PM"
                type="social"
                title="Book launch, Bangladesh Cultural Night & networking dinner"
                dressCode="Smart Casual / Traditional"
              >
                Launch of the conference book; cultural performances
                highlighting Bangladesh heritage and youth creativity; networking
                dinner for leaders, partners, speakers, sponsors, and delegates.
              </Item>
            </DaySection>
          )}

          {/* DAY 3 */}
          {activeTab === "day-3" && (
            <DaySection
              eyebrow="Day 3 · Saturday"
              title="DIU & the Road Ahead"
              dateLabel="21 November 2026"
              venue="Daffodil International University, Daffodil Smart City"
              accent="#C6892E"
            >
              <Item time="8:30 – 9:15 AM" type="logistics" title="Transfer from hotels to Daffodil Smart City" />
              <Item
                time="9:15 – 10:30 AM"
                type="campus"
                title="Morning tea, parade & campus tour — DIU's 25th anniversary celebration"
              />
              <Item time="10:30 – 11:15 AM" type="panel" title="Panel 4 — Open Science, AI, and the Future of Academic Research">
                Open science policies and global best practices; generative AI
                for scientific discovery; human and artificial intelligence in
                research.
                <br className="hidden sm:block" />
                <span className="mt-1 block text-[13.5px] font-medium text-[#0F6E4F]">
                  Expected outputs: international collaboration, responsible AI
                  use, and research ecosystems that accelerate discovery for
                  sustainable development.
                </span>
              </Item>
              <Item
                time="11:15 AM – 12:00 PM"
                type="panel"
                title="Panel 5 — One Student, One AI: Preparing Every Learner for an AI-Powered World"
              >
                A global discussion initiated by DIU on graduating with AI
                skills, a portfolio, a career pathway, entrepreneurship
                readiness, and global readiness — with a focus on inclusive AI
                literacy, employability, and learner agency.
              </Item>
              <Item time="12:00 – 12:30 PM" type="ceremony" title="Closing ceremony">
                Conference recap documentary and experience sharing by student
                volunteers; closing remarks by IAUP leadership, host university
                leadership, invited guests, and partners; token of appreciation,
                group photo, and vote of thanks.
              </Item>
              <Item time="12:30 – 1:20 PM" type="ceremony" title="MoU signing ceremony" />
              <Item time="1:30 – 2:30 PM" type="social" title="Farewell lunch" />
              <Item time="2:30 – 3:30 PM" type="logistics" title="Transfer to hotels/airport or optional city tour" />
              <Item time="3:30 – 6:30 PM" type="social" title="Optional city tour">
                Visit to the Red Fort and shopping at Aarong.
              </Item>
              <Item time="7:00 PM" type="logistics" title="Drop to program hotels" />
            </DaySection>
          )}
        </div>

        {/* Legend Footer */}
        <div className="mx-auto mt-4 max-w-340 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#E3E0D6] pt-6 font-sans text-[13px] text-[#5B6660]">
            {Object.values(TYPE_STYLES)
              .filter((v, i, arr) => arr.findIndex((x) => x.label === v.label) === i)
              .map((t) => (
                <span key={t.label} className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                  {t.label}
                </span>
              ))}
          </div>
          <p className="mt-6 font-sans text-[13px] text-[#8A8577]">
            Schedule is tentative and subject to change. Last updated ahead of
            the conference — please check this page for the latest version.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}