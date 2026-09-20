"use client";

import { useState } from "react";
import Image from "next/image";
import { Helicopter, X } from "lucide-react";

const EXCURSION_HIGHLIGHTS = [
  {
    title: "Tea Gardens of Sreemangal",
    body: "Explore the lush and picturesque tea estates of Sreemangal, renowned as the tea capital of Bangladesh. The endless green plantations, tranquil surroundings, and rolling landscapes offer a unique opportunity to experience one of Bangladesh's most distinctive natural and cultural treasures.",
  },
  {
    title: "The Scenic Beauty of Jaflong",
    body: "Experience the spectacular natural beauty of Jaflong, located along the Bangladesh–India border and framed by the hills of Meghalaya. Its flowing streams, stone beds, green hills, and pristine surroundings make Jaflong one of Bangladesh's most remarkable scenic destinations.",
  },
  {
    title: "An Exclusive Helicopter Journey",
    body: "Adding an extraordinary dimension to the experience, transportation between destinations will be arranged by helicopter. Delegates will have the privilege of viewing Bangladesh's magnificent landscapes from the sky while enjoying a comfortable and time-efficient journey.",
  },
  {
    title: "Luxury Stay at The Palace Luxury Resort",
    body: "Participants will enjoy an overnight stay at The Palace Luxury Resort, an elegant retreat surrounded by the natural beauty of Sylhet. The resort offers a perfect setting for relaxation, informal networking, and enjoying Bangladesh's renowned hospitality.",
  },
  {
    title: "An Experience Beyond the Conference",
    body: "The Sylhet excursion offers delegates more than sightseeing—it provides an opportunity to discover Bangladesh beyond its conference rooms. It brings together nature, culture, hospitality, relaxation, and informal networking in an exceptional two-day experience.",
  },
];

const EXCURSION_DETAILS = [
  { label: "Date", value: "22–23 November 2026" },
  { label: "Destination", value: "Sylhet – Sreemangal & Jaflong" },
  { label: "Transportation", value: "Helicopter" },
  { label: "Accommodation", value: "The Palace Luxury Resort" },
  { label: "Enrollment Fee", value: "USD 1,120 per participant" },
  { label: "Participation", value: "Optional Post-Conference Excursion" },
];

function ExcursionDetailsModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto py-6 sm:py-10 px-4 thin-scrollbar"
      role="dialog"
      aria-modal="true"
      aria-labelledby="excursion-details-title"
    >
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm cursor-default"
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border">
        <div className="flex items-start justify-between gap-4 px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-border">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-xs mb-2">
              Additional Fees Apply
            </span>
            <h3 id="excursion-details-title" className="font-display text-2xl sm:text-3xl font-bold text-dark">
              Post-Conference Excursion: Discover the Natural Beauty of Sylhet
            </h3>
            <p className="mt-2 text-sm font-semibold text-primary">22–23 November 2026 | Sylhet, Bangladesh</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-muted hover:text-dark hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 sm:px-10 py-8 max-h-[70vh] overflow-y-auto thin-scrollbar">
          <p className="text-muted leading-relaxed">
            As a special extension of the IAUP Semi-Annual Conference 2026, distinguished delegates will have
            the opportunity to experience the breathtaking natural beauty, cultural heritage, and warm
            hospitality of Sylhet, one of Bangladesh&apos;s most captivating destinations.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            This exclusive two-day post-conference excursion is designed to take participants beyond the
            conference hall and into the heart of northeastern Bangladesh—featuring magnificent tea gardens,
            dramatic landscapes, rolling hills, rivers, and world-class hospitality.
          </p>

          <h4 className="mt-8 font-display text-lg font-bold text-dark">Highlights of the Excursion</h4>
          <ol className="mt-4 space-y-4 list-decimal list-inside">
            {EXCURSION_HIGHLIGHTS.map((item) => (
              <li key={item.title} className="text-dark font-semibold">
                {item.title}
                <p className="mt-1 text-sm font-normal text-muted leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ol>

          <h4 className="mt-8 font-display text-lg font-bold text-dark">Excursion Details</h4>
          <dl className="mt-4 divide-y divide-border rounded-2xl border border-border overflow-hidden">
            {EXCURSION_DETAILS.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="font-semibold text-dark">{row.label}</dt>
                <dd className="text-muted text-right">{row.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm font-semibold text-primary bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
            Please note: The excursion is not included in the conference registration fee. Participation is
            optional and requires an additional fee of USD 1,120 per participant.
          </p>

          <h4 className="mt-8 font-display text-lg font-bold text-dark">
            Join Us in Discovering the Green Heart of Bangladesh
          </h4>
          <p className="mt-2 text-muted leading-relaxed">
            We warmly invite our distinguished IAUP delegates and accompanying participants to join this
            exclusive post-conference experience and discover the extraordinary natural beauty, cultural
            richness, and warm hospitality of Bangladesh.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PostEventSection() {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <section id="post-event-tour" className="py-20 lg:pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal">
          <div className="text-center mb-12">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-4">
              Optional Post-Event Tour
            </h3>
            <p className="text-muted text-lg">
              Extend your trip and discover the natural beauty of Bangladesh with exclusive
              helicopter tours.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary">
                <Helicopter className="h-4 w-4 shrink-0" aria-hidden="true" />
                Travel by Helicopter
              </span>
              <span className="text-sm font-semibold text-dark">Additional fees apply</span>
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary-dark transition-colors"
              >
                See Details
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/jaflong.jpg"
                  alt="Tea Gardens in Sreemangal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    Tea Gardens in Sreemangal
                  </h4>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/jaflong2.jpg"
                  alt="Jaflong view"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    Scenic Beauty of Jaflong
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-16">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-3">
              Site Visit Highlights
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/img1.jpg"
                  alt="Dhaka City Exploration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    Dhaka City Exploration
                  </h4>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/img2.jpeg"
                  alt="Bangladesh Parliament Visit"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                    Bangladesh Parliament Visit
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 mb-8">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-3">
              Optional Leisure Activities
            </h3>
            <p className="text-muted">
              Playing golf at DSC/Kurmitola Golf Club (Pre-Confirmation Required)
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/img3.jpg"
                  alt="Leisure activity 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/img4.jpg"
                  alt="Leisure activity 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExcursionDetailsModal open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </section>
  );
}
