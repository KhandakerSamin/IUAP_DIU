"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Play,
  X,
  ExternalLink,
  Sparkles,
  Volume2,
} from "lucide-react";

// Inline YouTube brand icon SVG
const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const MESSAGES = [
  {
    id: "shawn-chen",
    name: "Dr. Shawn Chen",
    titles: [
      "Chairman, Sias University (China)",
      "President, International Association of University Presidents (IAUP)",
    ],
    youtubeUrl: "https://youtube.com/shorts/KOkIch3IEJ8?si=MElw5TNiBkidK3Rn",
    videoId: "KOkIch3IEJ8",
    isShort: true,
    thumbnail: "/shawn-chen-video-thumb.jpg",
    badge: "IAUP President",
  },
  {
    id: "alexander-mejia",
    name: "Mr. Alexander A. Mejia",
    titles: [
      "Director, Division for People and Social Development",
      "Managing Director, CIFAL Global Network",
      "United Nations Institute for Training and Research (UNITAR)",
    ],
    youtubeUrl: "https://www.youtube.com/@daffodiluniversity",
    videoId: null, // Welcome address preview
    thumbnail: "/Alexander.jpeg",
    badge: "Keynote Speaker",
  },
  {
    id: "mr-kabir",
    name: "Professor Dr. M. R. Kabir",
    titles: [
      "Vice Chancellor, Daffodil International University",
    ],
    youtubeUrl: "https://youtu.be/fo4PaV2hudg?si=aowOFjT_QVpBSDJ_",
    videoId: "fo4PaV2hudg",
    isShort: false,
    thumbnail: "/mr-kabir-video-thumb.jpg",
    badge: "Host Vice Chancellor",
  },
];

export default function WelcomeMessagesSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const handleOpenVideo = (msg) => {
    if (msg.videoId) {
      setActiveVideo(msg);
    } else if (msg.youtubeUrl) {
      window.open(msg.youtubeUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCloseVideo = () => {
    setActiveVideo(null);
  };

  return (
    <>
      <section
        id="welcome-messages"
        className="py-24 lg:py-32 bg-white relative overflow-hidden border-b border-slate-100"
      >
        {/* Ambient Decorative Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(9,80,158,0.08),transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-16 reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-primary/10 via-amber-500/10 to-secondary/10 border border-primary/20 text-primary font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Welcome Messages</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              A Warm Welcome to{" "}
              <span className="gradient-text">IAUP 2026</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Hear from distinguished leaders and representatives welcoming the
              global higher education community to the IAUP Semi-Annual Meeting 2026
              in Dhaka, Bangladesh.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-slate-200" />
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-slate-400">
                Featured Welcome Messages
              </span>
              <div className="h-px w-12 bg-slate-200" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {MESSAGES.map((msg, idx) => (
              <div
                key={msg.id}
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl hover:border-primary/40 transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Thumbnail / Video Preview Area */}
                <div
                  onClick={() => handleOpenVideo(msg)}
                  className="relative aspect-16/10 w-full bg-slate-900 overflow-hidden cursor-pointer group/thumb"
                >
                  <Image
                    src={msg.thumbnail}
                    alt={msg.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/thumb:scale-105 opacity-90 group-hover/thumb:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
                      {msg.badge}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 group-hover/thumb:bg-primary transition-all duration-300 ring-4 ring-white/30">
                      {msg.videoId ? (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      ) : (
                        <Volume2 className="w-6 h-6" />
                      )}
                    </div>
                  </div>

                  {/* Bottom Video Meta Indicator */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-white/90">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <YoutubeIcon className="w-4 h-4 text-red-500" />
                      <span>{msg.videoId ? "Click to play preview" : "Welcome Message"}</span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-white/70">
                      {msg.isShort ? "YouTube Short" : "Video"}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-200 mb-2">
                      {msg.name}
                    </h3>
                    <div className="space-y-1.5 mb-6">
                      {msg.titles.map((title, i) => (
                        <p
                          key={i}
                          className={`text-xs sm:text-sm leading-relaxed ${
                            i === 0
                              ? "text-slate-800 font-semibold"
                              : "text-slate-500"
                          }`}
                        >
                          {title}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Watch on YouTube Button */}
                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <a
                      href={msg.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group/btn"
                    >
                      <YoutubeIcon className="w-4 h-4" />
                      <span>Watch on YouTube</span>
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={handleCloseVideo}
          />

          <div
            className={`relative w-full rounded-3xl bg-slate-950 shadow-2xl border border-white/10 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 ${
              activeVideo.isShort ? "max-w-md" : "max-w-4xl"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 text-white bg-slate-900/80">
              <div className="flex items-center gap-3">
                <YoutubeIcon className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base leading-tight">
                    {activeVideo.name}
                  </h4>
                  <p className="text-xs text-slate-400">
                    IAUP Semi-Annual Meeting 2026 Welcome Message
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseVideo}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div
              className={`relative w-full ${
                activeVideo.isShort ? "aspect-9/16 max-h-[70vh]" : "aspect-video"
              } bg-black`}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                title={`${activeVideo.name} Welcome Message`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 truncate pr-3">
                {activeVideo.titles[0]}
              </span>
              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-300 shrink-0"
              >
                <span>Open in YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
