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
    { id: "day-1", label: "Day 1", sub: "19 November" },
    { id: "day-2", label: "Day 2", sub: "20 November" },
    { id: "day-3", label: "Day 3", sub: "21 November" },
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
              Program Schedule &middot; Tentative
            </p>
            <h1 className="mt-4 font-serif text-[38px] font-semibold leading-[1.08] text-[#16241C] sm:text-[56px]">
              IAUP Semi-Annual Meeting 2026, Dhaka, Bangladesh
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
                  className={`flex shrink-0 cursor-pointer items-baseline gap-2 rounded-full border px-5 py-2.5 font-sans text-[14px] font-semibold transition-all duration-200 ${isActive
                    ? "border-primaryDark bg-primary text-white shadow-sm"
                    : "border-[#E3E0D6] bg-white text-[#16241C] hover:border-primaryDark hover:text-primaryDark"
                    }`}
                >
                  {tab.label}
                  <span
                    className={`font-normal ${isActive ? "text-white/80" : "text-[#8A8577]"
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
              <Item time="Day Long" type="logistics" title="Early and Regular Check-In">
                Airport pick-up from Hazrat Shahjalal International Airport with
                transfer to designated hotels. Conference help desk open in the
                hotel lobby for visa, transport, local SIM, and city information.
              </Item>
              <Item time="09:00am – 05:00pm" type="logistics" title="Registration and Kit Distribution">
                Delegate badge and conference kit distribution.
              </Item>
              <Item time="09:30am – 11:00am" type="social" title="Complementary Golf play at Kurmitola Golf Club">
                Kurmitola Golf Club for early-arriving guests (on request).
              </Item>
              <Item time="11:30am – 12:30pm" type="meeting" title="IAUP Executive Committee Meeting">
                Venue: Hotel Sheraton Dhaka
              </Item>
              <Item time="12:30pm – 01:30pm" type="meeting" title="IAUP Board of Directors Meeting followed by Lunch">
                Venue: Hotel Sheraton Dhaka
              </Item>
              <Item time="02:30pm – 03:00pm" type="logistics" title="Transfer to Bangladesh National Parliament" />
              <Item time="03:00pm – 05:00pm" type="campus" title="Explore Bangladesh National Parliament" />
              <Item time="05:00pm – 05:30pm" type="logistics" title="Transfer from Bangladesh National Parliament to Daffodil Tower" />
              <Item time="06:00pm – 08:30pm" type="social" title="Welcome Reception">
                Informal welcome by DIU leadership and IAUP representatives, with
                a light cultural performance and networking dinner.
              </Item>
              <Item time="08:30pm – 09:00pm" type="logistics" title="Transfer to Hotel Sheraton and other program partner hotels." />
            </DaySection>
          )}

          {/* DAY 2 */}
          {activeTab === "day-2" && (
            <DaySection
              eyebrow="Day 2 · Friday"
              title="Global Vision"
              dateLabel="20 November 2026"
              venue="Conference Sheraton Hotel Ballroom, Dhaka"
              accent="#0F6E4F"
            >
              <Item time="08:30am – 10:00am" type="logistics" title="Registration, Kit Distribution and Networking Breakfast">
                Final registration for local and international delegates, and
                opening networking for presidents, rectors, vice chancellors,
                senior leaders, partners, and speakers.
              </Item>
              <Item time="10:00am – 11:00am" type="ceremony" title="Opening Ceremony of the IAUP Semi-Annual Conference 2026" dressCode="Formal">
                National anthem of Bangladesh; welcome video on transforming
                higher education; Bangladeshi cultural performance; welcome
                remarks by DIU leadership; address by the IAUP President;
                special address by the Minister of Education; international
                partner messages; conference inauguration, group photo, and
                media interaction.
              </Item>
              <Item
                time="11:00am – 11:30am"
                type="keynote"
                title="Keynote: Universities After AI — Reimagining Higher Education for the Next Decade"
              >
                Flagship keynote framing the transition from digital
                universities to AI-native universities, covering leadership,
                governance, ethics, quality, employability, innovation, and
                global partnerships.
              </Item>
              <Item time="11:30am – 11:45am" type="logistics" title="Tea Break" />
              <Item
                time="11:45am – 12:30pm"
                type="dialogue"
                title="Global Leaders Dialogue: The Future of Universities — From Traditional Institutions to AI-Native Ecosystems"
              >
                University presidents and senior leaders from the USA, UK,
                Canada, Australia, China, Japan, Europe, the Middle East,
                Africa, and Latin America on disruption, AI, sustainability,
                entrepreneurship, rankings, equity, and institutional
                transformation.
              </Item>
              <Item time="12:30pm – 01:50pm" type="logistics" title="Lunch & Jumma Prayer Break" />
              <Item
                time="02:00pm – 02:45pm"
                type="panel"
                title="Panel 1: Building Entrepreneurial Universities for Sustainable Economic Growth"
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
              <Item time="02:45pm – 03:00pm" type="logistics" title="Tea Break" />
              <Item
                time="03:00pm – 03:45pm"
                type="panel"
                title="Panel 2: Transforming Higher Education to Empower Women in an AI-Driven World"
              >
                Women&apos;s leadership in academia; research and innovation for
                women&apos;s empowerment; climate change, sustainability, and
                gender; AI, ethics, and social justice.
              </Item>
              <Item time="03:45pm – 04:00pm" type="logistics" title="Tea Break" />
              <Item time="04:00pm – 05:00pm" type="panel" title="Panel 3: Sustainable Universities for a Sustainable Planet">
                Solar campuses, green buildings, ESG, SDGs, circular economy,
                energy, waste, and biodiversity; case studies on carbon-neutral
                campuses and carbon credits.
                <br className="hidden sm:block" />
                <span className="mt-1 block text-[13.5px] font-medium text-[#0F6E4F]">
                  Expected outputs: green campus roadmap; carbon-neutral campus
                  commitments and indicators.
                </span>
              </Item>
              <Item time="05:00pm – 06:30pm" type="logistics" title="Break and Rest Time" />
              <Item
                time="06:30pm – 09:00pm"
                type="social"
                title="Book Launching, Bangladesh Cultural Night, and Networking Dinner"
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
              venue="Daffodil International University at Daffodil Smart City"
              accent="#C6892E"
            >
              <Item time="08:30am – 09:15am" type="logistics" title="Transfer from Hotels to Daffodil Smart City" />
              <Item
                time="09:15am – 10:30am"
                type="campus"
                title="Morning Tea, Parade, Campus Tour and Celebration of the 25th Year Anniversary of DIU"
              />
              <Item time="10:30am – 11:15am" type="panel" title="Panel 4: Open Science, AI, and the Future of Academic Research">
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
                time="11:15am – 12:00pm"
                type="panel"
                title="Parallel Sessions"
              >
                <div className="space-y-1">
                  <p><strong className="font-semibold text-[#16241C]">Parallel Session 1:</strong> (Title will be confirmed)</p>
                  <p><strong className="font-semibold text-[#16241C]">Parallel Session 2:</strong> (Title will be confirmed)</p>
                </div>
              </Item>
              <Item time="12:00pm – 12:30pm" type="ceremony" title="Closing Ceremony">
                Conference recap documentary and experience sharing by student
                volunteers; closing remarks by IAUP leadership, host university
                leadership, invited guests, and partners; token of appreciation,
                group photo, and vote of thanks.
              </Item>
              <Item time="12:30pm – 01:20pm" type="ceremony" title="MoU signing Ceremony / Closed- Door Women’s Tea Session" />
              <Item time="01:30pm – 02:30pm" type="social" title="Farewell Lunch" />
              <Item time="02:30pm – 06:30pm" type="social" title="Optional City Tour">
                Visit to the Red Fort and shopping at Aarong.
              </Item>
              <Item time="07:00pm" type="logistics" title="Drop to Program Hotels" />
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