"use client";

import { UsersRound } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M10 3.333v9.167m0 0-3.333-3.333M10 12.5l3.333-3.333M4.167 15h11.666"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpeakerPlaceholderCard({ count = 1 }) {
  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-slate-400">
        <UsersRound className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold text-slate-500">
        {count > 1 ? `${count} speakers to be announced` : "Speaker to be announced"}
      </p>
    </div>
  );
}

const DEFAULT_ACCENT = {
  ring: "border-primary/20 ring-primary/10",
  glow: "from-primary/30 via-secondary/20 to-primary/30",
  session: "text-primary",
  avatarRing: "ring-primary/20",
};

export default function SpeakerCard({ speaker, showDownload, size = "md", accent }) {
  const featured = size === "lg";
  const a = accent || DEFAULT_ACCENT;

  return (
    <div className={featured ? "group relative h-full" : "h-full"}>
      {featured && (
        <div
          aria-hidden="true"
          className={`absolute -inset-1 rounded-[28px] bg-linear-to-r ${a.glow} opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-90`}
        />
      )}
      <article
        className={`relative flex h-full flex-col rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
          featured ? `${a.ring} rounded-3xl p-8 ring-1` : "border-slate-200 p-6"
        }`}
      >
        <div className={`flex items-start gap-4 ${featured ? "sm:flex-col sm:items-center sm:text-center" : ""}`}>
          {speaker.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={speaker.photoUrl}
              alt={speaker.name}
              className={`shrink-0 rounded-full object-cover ${
                featured ? `h-32 w-32 sm:h-44 sm:w-44 ring-4 ${a.avatarRing}` : "h-20 w-20"
              }`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary ${
                featured ? `h-32 w-32 sm:h-44 sm:w-44 text-4xl ring-4 ${a.avatarRing}` : "h-20 w-20 text-xl"
              }`}
            >
              {initials(speaker.name)}
            </div>
          )}

          <div className={`min-w-0 ${featured ? "sm:mt-1" : ""}`}>
            <h3
              className={`truncate font-semibold text-slate-900 ${featured ? "text-xl" : "text-lg"} ${
                featured ? "sm:whitespace-normal" : ""
              }`}
            >
              {speaker.name}
            </h3>
            {speaker.titleLines?.length ? (
              speaker.titleLines.map((line) => (
                <p key={line} className="text-sm text-slate-600">
                  {line}
                </p>
              ))
            ) : (
              <>
                <p className="text-sm text-slate-600">{speaker.designation}</p>
                <p className="text-sm text-slate-500">
                  {speaker.organization}
                  {speaker.country ? ` · ${speaker.country}` : ""}
                </p>
              </>
            )}
          </div>
        </div>

        {speaker.sessionTitle && (
          <p
            className={`mt-4 text-sm font-medium uppercase tracking-wide ${featured ? `${a.session} sm:text-center` : "text-primary"}`}
          >
            {speaker.sessionTitle}
          </p>
        )}

        {speaker.bio && <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{speaker.bio}</p>}

        {showDownload && speaker.cardUrl && (
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            <a
              href={speaker.cardUrl}
              download
              className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
            >
              <DownloadIcon />
              I&apos;m Speaking card
            </a>
          </div>
        )}
      </article>
    </div>
  );
}