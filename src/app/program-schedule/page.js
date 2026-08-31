"use client";

import { useState } from "react";
import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";

const TYPE_STYLES = {
  ceremony: { label: "Ceremony", dot: "bg-primaryDark" },
  keynote: { label: "Keynote", dot: "bg-emerald-600" },
  panel: { label: "Panel", dot: "bg-primary" },
  dialogue: { label: "Dialogue", dot: "bg-teal-700" },
  social: { label: "Social", dot: "bg-amber-600" },
  campus: { label: "Campus", dot: "bg-orange-600" },
  logistics: { label: "Logistics", dot: "bg-slate-600" },
  meeting: { label: "Meeting", dot: "bg-slate-800" },
};

function Item({ time, type, title, children }) {
  const t = TYPE_STYLES[type] || TYPE_STYLES.logistics;
  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        className={`absolute left-[3px] top-2.5 h-3 w-3 rounded-full ring-4 ring-slate-200 ${t.dot}`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2 pb-8 sm:flex-row sm:gap-8">
        <div className="shrink-0 sm:w-48">
          <span className="inline-block whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-[14px] font-bold tracking-tight text-slate-900 shadow-xs sm:text-[15px]">
            {time}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
            <h3 className="text-[17px] font-bold leading-snug text-slate-950 sm:text-[19px]">
              {title}
            </h3>
          </div>
          {children && (
            <div className="mt-1 text-[15px] leading-relaxed text-slate-700 font-medium">
              {children}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function DaySection({ eyebrow, title, dateLabel, venue, children }) {
  return (
    <section className="py-8 sm:py-10">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-[24px] font-bold leading-tight text-slate-950 sm:text-[32px]">
            {title}
          </h2>
          <p className="mt-1 text-[15px] font-semibold text-slate-600">{dateLabel}</p>
        </div>
        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-[14px] text-slate-900 shadow-xs sm:text-right">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-600 mb-0.5">
            Program Venue
          </span>
          <span className="font-bold text-slate-900">{venue}</span>
        </div>
      </div>
      <ol className="relative before:absolute before:left-1 before:top-2 before:h-[calc(100%-1.5rem)] before:w-0.5 before:bg-slate-300">
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
      <main className="min-h-screen bg-slate-100/70 pb-24 pt-20">
        {/* Header Hero */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-340 px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.28em] text-primary">
              Program Schedule
            </p>
            <h1 className="mt-3 text-[30px] font-bold leading-[1.15] text-slate-950 sm:text-[44px]">
              IAUP Semi-Annual Meeting 2026
            </h1>
            <p className="mt-3 text-[17px] font-bold text-slate-800 sm:text-[19px]">
              19-21 November 2026 | Dhaka, Bangladesh
            </p>
            <p className="mt-2 max-w-4xl text-[16px] leading-relaxed text-slate-600 sm:text-[18px]">
              Transforming Higher Education for a Sustainable, Innovative, and AI-Enabled Future
            </p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-[14px] text-slate-800">
              <span className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full bg-primary" />
                All times shown in GMT+6
              </span>
            </div>
          </div>
        </section>

        {/* Sticky Day Navigation Tabs */}
        <nav className="sticky top-20 z-30 border-b border-slate-300 bg-white/95 shadow-xs backdrop-blur-md">
          <div className="mx-auto flex max-w-340 gap-3 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 cursor-pointer items-baseline gap-2.5 rounded-full border px-5 py-2.5 text-[14px] font-bold transition-all duration-200 ${
                    isActive
                      ? "border-primaryDark bg-primary text-white shadow-md"
                      : "border-slate-300 bg-white text-slate-900 hover:border-primary hover:text-primary"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`font-semibold ${isActive ? "text-white/90" : "text-slate-600"}`}
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
              eyebrow="DAY 1 · THURSDAY"
              title="Arrival, Meetings & Welcome Reception"
              dateLabel="19 November 2026"
              venue="Program at Daffodil Tower and Dhaka"
            >
              <Item time="Day Long" type="logistics" title="Early and Regular Check-In" />
              <Item time="09:00am-05:00pm" type="logistics" title="Registration and Kit Distribution" />
              <Item
                time="09:30am-11:00 am"
                type="social"
                title="Complementary Golf play at Kurmitola Golf Club for early-arriving guests (on request)"
              />
              <Item
                time="11:30am-12:30pm"
                type="meeting"
                title="IAUP Executive Committee Meeting"
              >
                Venue: Hotel Sheraton Dhaka
              </Item>
              <Item
                time="12:30pm-01:30pm"
                type="meeting"
                title="IAUP Board of Directors Meeting followed by Lunch"
              >
                Venue: Hotel Sheraton Dhaka
              </Item>
              <Item time="02:30pm-03:00pm" type="logistics" title="Transfer to Bangladesh National Parliament" />
              <Item time="03:00pm – 5:00pm" type="campus" title="Explore Bangladesh National Parliament" />
              <Item
                time="05:00pm-05:30pm"
                type="logistics"
                title="Transfer from Bangladesh National Parliament to Daffodil Tower"
              />
              <Item time="06:00pm-08:30pm" type="social" title="Welcome Reception" />
              <Item
                time="08:30pm-09:00pm"
                type="logistics"
                title="Transfer to Hotel Sheraton and other program partner hotels."
              />
            </DaySection>
          )}

          {/* DAY 2 */}
          {activeTab === "day-2" && (
            <DaySection
              eyebrow="DAY 2 · FRIDAY"
              title="Main Conference, Dialogue & Cultural Night"
              dateLabel="20 November 2026"
              venue="Program at Conference Sheraton Hotel Ballroom, Dhaka"
            >
              <Item
                time="08:30am-10:00am"
                type="logistics"
                title="Registration, Kit Distribution and Networking Breakfast"
              />
              <Item
                time="10:00am-11:00am"
                type="ceremony"
                title="Opening Ceremony of the IAUP Semi-Annual Conference 2026"
              />
              <Item
                time="11:00am-11:30am"
                type="keynote"
                title="Keynote: Universities After AI - Reimagining Higher Education for the Next Decade"
              />
              <Item time="11:30am-11:45am" type="logistics" title="Tea Break" />
              <Item
                time="11:45am-12:30pm"
                type="dialogue"
                title="Global Leaders Dialogue: The Future of Universities - From Traditional Institutions to AI-Native Ecosystems"
              />
              <Item time="12:30pm-01:50pm" type="logistics" title="Lunch & Jumma Prayer Break" />
              <Item
                time="02:00pm-02:45pm"
                type="panel"
                title="Panel 1: Building Entrepreneurial Universities for Sustainable Economic Growth"
              />
              <Item time="02:45pm-03:00pm" type="logistics" title="Tea Break" />
              <Item
                time="03:00pm-03:45pm"
                type="panel"
                title="Panel 2: Transforming Higher Education to Empower Women in an AI-Driven World"
              />
              <Item time="03:45pm-04:00pm" type="logistics" title="Tea Break" />
              <Item
                time="04:00pm-05:00pm"
                type="panel"
                title="Panel 3: Sustainable Universities for a Sustainable Planet"
              />
              <Item time="05:00pm-6:30pm" type="logistics" title="Break and Rest Time" />
              <Item
                time="06:30pm-09:00pm"
                type="social"
                title="Book Launching, Bangladesh Cultural Night, and Networking Dinner"
              />
            </DaySection>
          )}

          {/* DAY 3 */}
          {activeTab === "day-3" && (
            <DaySection
              eyebrow="DAY 3 · SATURDAY"
              title="DIU 25th Anniversary Celebration & Closing"
              dateLabel="21 November 2026"
              venue="Program at Daffodil International University at Daffodil Smart City"
            >
              <Item
                time="08:30am-09:15am"
                type="logistics"
                title="Transfer from Hotels to Daffodil Smart City"
              />
              <Item
                time="09:15am - 10:30am"
                type="campus"
                title="Morning Tea, Parade, Campus Tour and Celebration of the 25th Year Anniversary of DIU"
              />
              <Item
                time="10:30am-11:15am"
                type="panel"
                title="Panel 4: Open Science, AI, and the Future of Academic Research"
              />
              <Item
                time="11:15am-12:00pm"
                type="panel"
                title="Parallel Sessions"
              >
                <div className="space-y-1">
                  <p><strong>Parallel Session 1:</strong> (Title will be confirmed)</p>
                  <p><strong>Parallel Session 2:</strong> (Title will be confirmed)</p>
                </div>
              </Item>
              <Item time="12:00pm-12:30pm" type="ceremony" title="Closing Ceremony" />
              <Item
                time="12:30pm-1:20pm"
                type="ceremony"
                title="MoU signing Ceremony / Closed- Door Women’s Tea Session"
              />
              <Item time="1:30pm-02:30pm" type="social" title="Farewell Lunch" />
              <Item time="02:30pm-06:30pm" type="social" title="Optional City Tour" />
              <Item time="07:00pm" type="logistics" title="Drop to Program Hotels" />
            </DaySection>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}