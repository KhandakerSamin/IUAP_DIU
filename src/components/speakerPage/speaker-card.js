"use client";

import { useState } from "react";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M14.167 6.667a2.083 2.083 0 1 0 0-4.167 2.083 2.083 0 0 0 0 4.167ZM5.833 12.083a2.083 2.083 0 1 0 0-4.166 2.083 2.083 0 0 0 0 4.166ZM14.167 17.5a2.083 2.083 0 1 0 0-4.167 2.083 2.083 0 0 0 0 4.167ZM7.608 10.983l4.792 2.784M12.392 6.233 7.608 9.017"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

export default function SpeakerCard({ speaker, showDownload }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: speaker.name,
      text: `${speaker.name} — ${speaker.sessionTitle}`,
      url: speaker.profileUrl,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or share failed, fall through to copy
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard && speaker.profileUrl) {
      try {
        await navigator.clipboard.writeText(speaker.profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available, silently ignore
      }
    }
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        {speaker.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={speaker.photoUrl}
            alt={speaker.name}
            className="h-16 w-16 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            {initials(speaker.name)}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-slate-900">{speaker.name}</h3>
          <p className="text-sm text-slate-600">{speaker.designation}</p>
          <p className="text-sm text-slate-500">
            {speaker.organization}
            {speaker.country ? ` · ${speaker.country}` : ""}
          </p>
        </div>
      </div>

      {speaker.sessionTitle && (
        <p className="mt-4 text-sm font-medium uppercase tracking-wide text-primary">
          {speaker.sessionTitle}
        </p>
      )}

      {speaker.bio && (
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{speaker.bio}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
        {speaker.profileUrl && (
          <a
            href={speaker.profileUrl}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Full profile
          </a>
        )}

        <button
          type="button"
          onClick={handleShare}
          className="ml-auto flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
        >
          <ShareIcon />
          {copied ? "Link copied" : "Share"}
        </button>

        {showDownload && speaker.cardUrl && (
          <a
            href={speaker.cardUrl}
            download
            className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            <DownloadIcon />
            I&apos;m Speaking card
          </a>
        )}
      </div>
    </article>
  );
}