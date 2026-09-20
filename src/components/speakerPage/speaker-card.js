"use client";

import { UsersRound, Sparkles, Crown, Building2, Globe, Award, ExternalLink, Clock } from "lucide-react";

function initials(name = "") {
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_ACCENT = {
  ring: "border-primary/20 ring-primary/10",
  glow: "from-primary/30 via-secondary/20 to-primary/30",
  session: "text-primary",
  avatarRing: "ring-primary/25",
  badge: "border-primary/20 bg-primary/10 text-primary",
  dot: "bg-primary",
  blob: "bg-primary/10",
};

/**
 * Enhanced Placeholder Card for TBC / Announced Speaker slots
 */
export function SpeakerPlaceholderCard({
  count = 1,
  role = "Speaker",
  sessionTitle = "",
  tbaNote,
  accent,
}) {
  const a = accent || DEFAULT_ACCENT;

  return (
    <div className="group relative h-full min-h-[380px] flex flex-col">
      {/* Subtle Ambient Pulsing Rim */}
      <div
        aria-hidden="true"
        className={`absolute -inset-1 rounded-3xl bg-linear-to-r ${a.glow} opacity-25 blur-lg transition-opacity duration-500 group-hover:opacity-60`}
      />

      <div className="relative flex h-full flex-col justify-between rounded-3xl border-2 border-dashed border-slate-300/90 bg-linear-to-b from-white/95 to-slate-50/70 p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
        {/* Top Session / Role Pill */}
        <div className="flex items-center justify-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.badge}`}
          >
            <Clock className="h-3 w-3 animate-pulse" aria-hidden="true" />
            {sessionTitle || role || "To Be Confirmed"}
          </span>
        </div>

        {/* Center Placeholder Graphic */}
        <div className="my-6 flex flex-col items-center">
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-linear-to-br from-slate-100 to-slate-200 text-slate-400 shadow-inner border border-slate-200">
            <UsersRound className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400" aria-hidden="true" />
            <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-sm ring-2 ring-white">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
          </div>

          <h3 className="font-display mt-5 text-xl font-bold text-slate-800">
            {count > 1 ? `${count} Speakers to be Announced` : "Honorable Dignitary"}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-primary/80">
            Announcement Coming Soon
          </p>

          <p className="mt-3 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-500">
            {tbaNote ||
              "The distinguished profile for this prestigious session will be officially unveiled shortly."}
          </p>
        </div>

        {/* Footer Status Chip */}
        <div className="border-t border-slate-200/60 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            Official Confirmation in Progress
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Main Speaker Card Component
 */
export default function SpeakerCard({
  speaker,
  showDownload,
  size = "md",
  accent,
}) {
  const a = accent || DEFAULT_ACCENT;

  // Render polished TBC card if speaker is marked as TBA or unnamed
  if (speaker.isTba || speaker.tba || speaker.name === "To Be Confirmed") {
    return (
      <SpeakerPlaceholderCard
        count={speaker.count || 1}
        role={speaker.role || "Chief Guest"}
        sessionTitle={speaker.sessionTitle}
        tbaNote={speaker.tbaNote}
        accent={a}
      />
    );
  }

  const featured = size === "lg";

  return (
    <div className="group relative h-full flex flex-col">
      {/* Ambient Multi-Color Background Rim Glow */}
      <div
        aria-hidden="true"
        className={`absolute -inset-1 rounded-3xl bg-linear-to-r ${a.glow} opacity-30 blur-lg transition-all duration-500 group-hover:opacity-75 group-hover:blur-xl`}
      />

      <article
        className={`relative flex h-full flex-col justify-between rounded-3xl border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${
          featured ? `${a.ring} border-2 p-6 sm:p-8 ring-1` : "border-slate-200/90 p-6"
        }`}
      >
        <div>
          {/* Top Session Capsule */}
          {speaker.sessionTitle && (
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${a.badge} shadow-2xs`}
              >
                {speaker.role === "Chief Guest" ? (
                  <Crown className="h-3 w-3" aria-hidden="true" />
                ) : speaker.role === "Keynote Speaker" ? (
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Award className="h-3 w-3" aria-hidden="true" />
                )}
                {speaker.sessionTitle}
              </span>

              {speaker.country && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                  <Globe className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  {speaker.country}
                </span>
              )}
            </div>
          )}

          {/* Photo and Identity Details */}
          <div
            className={`flex items-start gap-5 ${
              featured ? "flex-col sm:flex-row sm:items-center text-left" : "flex-row items-center"
            }`}
          >
            {/* Elevated Photo Frame */}
            <div className="relative shrink-0">
              <div
                className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white shadow-lg ring-4 ${a.avatarRing} transition-all duration-500 group-hover:ring-offset-2 group-hover:scale-105 bg-slate-100 ${
                  featured ? "h-28 w-28 sm:h-36 sm:w-36" : "h-22 w-22 sm:h-24 sm:w-24"
                }`}
              >
                {speaker.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={speaker.photoUrl}
                    alt={speaker.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className={`flex h-full w-full items-center justify-center bg-linear-to-br from-primary/15 to-primary/5 font-display font-bold text-primary ${
                      featured ? "text-3xl" : "text-xl"
                    }`}
                  >
                    {initials(speaker.name)}
                  </div>
                )}
              </div>

              {/* Decorative Corner Badge Icon */}
              <span
                className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-white bg-white shadow-sm ${
                  speaker.role === "Chief Guest"
                    ? "text-primary"
                    : speaker.role === "Keynote Speaker"
                    ? "text-amber-500"
                    : "text-secondary"
                }`}
              >
                {speaker.role === "Chief Guest" ? (
                  <Crown className="h-3 w-3" />
                ) : speaker.role === "Keynote Speaker" ? (
                  <Sparkles className="h-3 w-3" />
                ) : (
                  <Award className="h-3 w-3" />
                )}
              </span>
            </div>

            {/* Typography & Identity */}
            <div className="min-w-0 flex-1">
              <h3
                className={`font-display font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-tight ${
                  featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                }`}
              >
                {speaker.name}
              </h3>

              {speaker.titleLines?.length ? (
                <div className="mt-1.5 space-y-0.5">
                  {speaker.titleLines.map((line, idx) => (
                    <p
                      key={line}
                      className={
                        idx === 0
                          ? "text-sm font-semibold text-primary/90"
                          : "text-xs sm:text-sm text-slate-600 leading-snug"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="mt-1.5">
                  {speaker.designation && (
                    <p className="text-sm font-semibold text-primary/90">{speaker.designation}</p>
                  )}
                  {speaker.organization && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                      {speaker.organization}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Institutional Badges & Pill Tags (Requested Feature) */}
          {speaker.tags && speaker.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-2">
              {speaker.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200/90 bg-slate-50/80 px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <Building2 className="h-3 w-3 text-slate-400" aria-hidden="true" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bio / Description */}
          {speaker.bio && (
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-4 group-hover:line-clamp-none transition-all duration-300 border-t border-slate-100 pt-3">
              {speaker.bio}
            </p>
          )}
        </div>

        {/* Footer Actions (Speaking Card / Profile Link) */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          {speaker.profileUrl && speaker.profileUrl !== "#" ? (
            <a
              href={speaker.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              View Biography
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-xs font-medium text-slate-400">Distinguished Speaker</span>
          )}

          {showDownload && speaker.cardUrl && (
            <a
              href={speaker.cardUrl}
              download
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-medium text-white shadow-xs transition-opacity hover:opacity-90"
            >
              <DownloadIcon />
              I&apos;m Speaking card
            </a>
          )}
        </div>
      </article>
    </div>
  );
}