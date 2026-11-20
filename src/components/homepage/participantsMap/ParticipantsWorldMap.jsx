"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { WORLD_VIEW, COUNTRY_PATHS, COUNTRY_POS } from "./world-paths";
import {
  participants as defaultParticipants,
  HOST_COUNTRY_CODE,
} from "./participants-data";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

// Flags come from flagcdn.com (free, no API key). Swap this for local files
// (e.g. `/flags/${code}.svg` in /public) if you prefer to self-host them.
const defaultFlagSrc = (code) =>
  `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// Every participating country gets its own hue (golden-angle spacing keeps
// neighbours distinct). Soft by default, fully saturated when selected.
const hueFor = (i) => Math.round((i * 137.508) % 360);
const baseColor = (i) => `hsl(${hueFor(i)} 72% 66%)`;
const activeColor = (i) => `hsl(${hueFor(i)} 78% 42%)`;

const formatNumber = (n) => new Intl.NumberFormat("en-US").format(n);
const formatPercent = (n) => `${n.toFixed(1)}%`;

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                      */
/* -------------------------------------------------------------------------- */

function useInView(ref, threshold = 0.25) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

function useCountUp(target, run, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return value;
}

function useElementHeight(ref) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return height;
}

/* -------------------------------------------------------------------------- */
/*  Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function Flag({ src, className = "" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        e.currentTarget.style.visibility = "hidden";
      }}
      className={`shrink-0 object-cover shadow-sm ring-1 ring-black/10 ${className}`}
    />
  );
}

function Tooltip({ country, pos, mapHeight, total, color, isHost, flagSrc }) {
  const TOOLTIP_H = 150;
  const below = (pos.y / 100) * mapHeight < TOOLTIP_H + 12;
  const align = pos.x < 14 ? "left" : pos.x > 86 ? "right" : "center";

  const translateX =
    align === "center" ? "-50%" : align === "left" ? "-22px" : "calc(-100% + 22px)";
  const gap = 12;
  const translateY = below ? `${gap}px` : `calc(-100% - ${gap}px)`;

  const share = (country.count / total) * 100;
  const arrowX =
    align === "center" ? "left-1/2 -translate-x-1/2" : align === "left" ? "left-4" : "right-4";

  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-30"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(${translateX}, ${translateY})`,
      }}
    >
      <div
        className={`pm-tooltip relative w-60 rounded-2xl border border-border bg-white p-4 text-left shadow-2xl shadow-primary/15 ${
          below ? "pm-from-below" : ""
        }`}
      >
        <span
          className={`absolute h-3 w-3 rotate-45 border-border bg-white ${arrowX} ${
            below ? "-top-1.5 border-l border-t" : "-bottom-1.5 border-b border-r"
          }`}
        />
        <div className="flex items-center gap-3">
          <Flag src={flagSrc(country.code)} className="h-8 w-12 rounded-md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-dark">
              {country.name}
            </p>
            <p
              className="text-[11px] font-medium uppercase tracking-wider"
              style={{ color }}
            >
              {isHost ? "Host country" : "International"}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          <p className="text-3xl font-bold leading-none tracking-tight text-dark tabular-nums">
            {formatNumber(country.count)}
          </p>
          <p className="pb-0.5 text-xs text-muted">
            participant{country.count === 1 ? "" : "s"}
          </p>
        </div>

        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-light">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.max(share, 2)}%`, backgroundColor: color }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-muted">
            {formatPercent(share)} of all participants
          </p>
        </div>
      </div>
    </div>
  );
}

const icons = {
  users: (
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  globe: (
    <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-10-10h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
  ),
  home: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" />,
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
  ),
};

function StatCard({ icon, label, value, suffix, accent, run, delay = 0 }) {
  const shown = useCountUp(value, run, 1300 + delay);
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div
        className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ring-1 sm:h-8 sm:w-8 sm:rounded-lg ${accent}`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5 sm:h-4 sm:w-4"
          aria-hidden="true"
        >
          {icons[icon]}
        </svg>
      </div>
      <div className="min-w-0">
        <p className="font-display text-base font-bold leading-none tracking-tight text-dark tabular-nums sm:text-xl">
          {formatNumber(shown)}
          {suffix && (
            <span className="ml-1 text-xs font-medium text-muted">{suffix}</span>
          )}
        </p>
        <p className="mt-0.5 text-[10px] leading-tight text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function ParticipantsWorldMap({
  data = defaultParticipants,
  hostCode = HOST_COUNTRY_CODE,
  eyebrow = "Global Participation",
  title = "One event, voices from across the world",
  description,
  getFlagSrc = defaultFlagSrc,
}) {
  const [activeCode, setActiveCode] = useState(null);
  const mapRef = useRef(null);
  const scrollRef = useRef(null);
  const statsRef = useRef(null);
  const mapHeight = useElementHeight(mapRef);
  const statsInView = useInView(statsRef);

  const { countries, total, hostCount, host } = useMemo(() => {
    const sorted = [...data].sort(
      (a, b) => b.count - a.count || a.name.localeCompare(b.name)
    );
    const total = sorted.reduce((sum, c) => sum + c.count, 0);
    const host = sorted.find((c) => c.code === hostCode);
    return {
      countries: sorted,
      total,
      host,
      hostCount: host?.count ?? 0,
    };
  }, [data, hostCode]);

  const byCode = useMemo(
    () => Object.fromEntries(countries.map((c) => [c.code, c])),
    [countries]
  );

  const internationalCount = total - hostCount;
  const internationalCountries = countries.length - (host ? 1 : 0);
  const hostShare = total ? (hostCount / total) * 100 : 0;

  
  // Close an open tooltip with Escape.
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActiveCode(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On small screens the map scrolls sideways — start it centred on the host country.
  useEffect(() => {
    const el = scrollRef.current;
    const pos = COUNTRY_POS[hostCode];
    if (!el || !pos || el.scrollWidth <= el.clientWidth) return;
    el.scrollLeft = (pos[0] / 100) * el.scrollWidth - el.clientWidth / 2;
  }, [hostCode]);

  const active = countries.find((c) => c.code === activeCode);

  return (
    <section
      aria-labelledby="participants-map-title"
      id="participants" className="relative isolate overflow-hidden bg-light py-24 text-dark lg:py-32"
    >
      {/* Tooltip entrance animation (respects reduced motion) */}
      <style>{`
        @keyframes pm-in { from { opacity: 0; transform: translateY(6px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes pm-in-below { from { opacity: 0; transform: translateY(-6px) scale(.97); } to { opacity: 1; transform: none; } }
        .pm-tooltip { animation: pm-in 160ms ease-out both; }
        .pm-tooltip.pm-from-below { animation-name: pm-in-below; }
        @media (prefers-reduced-motion: reduce) { .pm-tooltip { animation: none; } }
      `}</style>

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(9,80,158,0.07),transparent_70%),radial-gradient(40%_40%_at_85%_70%,rgba(57,178,74,0.08),transparent_70%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <div className="section-divider mx-auto mt-4" />
          <h2
            id="participants-map-title"
            className="font-display mt-8 text-4xl font-bold tracking-tight text-balance text-dark sm:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-5 text-base text-muted text-pretty sm:text-lg">
            {description ??
              `${formatNumber(total)} participants joined us from ${
                countries.length
              } countries. Hover over or tap a country to see who came from where.`}
          </p>
        </div>

        {/* Map card */}
        <div className="relative mt-12 rounded-3xl border border-border bg-white p-3 shadow-xl shadow-primary/5 sm:mt-16 sm:p-6">
          {/* Legend */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1 sm:mb-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-5 rounded-[3px] bg-gradient-to-r from-rose-400 via-amber-300 via-emerald-400 to-sky-400 ring-1 ring-black/10" />
                Participating countries
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-5 rounded-[3px] bg-[#e6ebf1] ring-1 ring-black/10" />
                No participants
              </span>
            </div>
            <p className="text-xs text-muted md:hidden">Swipe to explore →</p>
          </div>

          <div
            ref={scrollRef}
            className="-mx-3 overflow-x-auto overscroll-x-contain px-3 [scrollbar-width:thin] sm:-mx-6 sm:px-6 md:mx-0 md:overflow-visible md:px-0">
            <div
              ref={mapRef}
              className="relative min-w-[720px] rounded-2xl bg-[#f1f7fd] p-2 md:min-w-0"
              onClick={() => setActiveCode(null)}
            >
              <svg
                viewBox={`0 0 ${WORLD_VIEW.width} ${WORLD_VIEW.height}`}
                className="block h-auto w-full select-none"
              >
                {COUNTRY_PATHS.map((c, i) => {
                  const data = c.code ? byCode[c.code] : null;
                  const idx = data ? countries.indexOf(data) : -1;
                  const isActive = c.code && c.code === activeCode;
                  return (
                    <path
                      key={c.code ?? `w${i}`}
                      d={c.d}
                      stroke="#fff"
                      strokeWidth={0.6}
                      strokeLinejoin="round"
                      style={{
                        fill: isActive
                          ? activeColor(idx)
                          : data
                          ? baseColor(idx)
                          : "#e6ebf1",
                        cursor: data ? "pointer" : "default",
                        transition: "fill 180ms ease",
                      }}
                      tabIndex={data ? 0 : undefined}
                      role={data ? "button" : undefined}
                      aria-label={
                        data ? `${data.name}: ${data.count} participants` : undefined
                      }
                      onFocus={data ? () => setActiveCode(c.code) : undefined}
                      onBlur={
                        data
                          ? () => setActiveCode((cur) => (cur === c.code ? null : cur))
                          : undefined
                      }
                      className="outline-none"
                      onPointerEnter={
                        data
                          ? (e) => e.pointerType === "mouse" && setActiveCode(c.code)
                          : undefined
                      }
                      onPointerLeave={
                        data
                          ? (e) =>
                              e.pointerType === "mouse" &&
                              setActiveCode((cur) => (cur === c.code ? null : cur))
                          : undefined
                      }
                      onClick={
                        data
                          ? (e) => {
                              e.stopPropagation();
                              setActiveCode(c.code);
                            }
                          : undefined
                      }
                    />
                  );
                })}
              </svg>

              {/* Statistics — sit in the empty ocean at the bottom-left of the map */}
              <div
                ref={statsRef}
                className="absolute bottom-2 left-2 z-10 w-[19%] min-w-[150px] max-w-[230px] space-y-1.5 rounded-xl border border-border bg-white/90 p-2 shadow-lg shadow-primary/10 backdrop-blur sm:space-y-2 sm:p-3"
              >
<StatCard
            icon="users"
            label="Total participants"
            value={total}
            accent="bg-dark/5 text-dark ring-dark/10"
            run={statsInView}
          />
          <StatCard
            icon="globe"
            label="Countries represented"
            value={countries.length}
            accent="bg-accent/20 text-amber-700 ring-accent/40"
            run={statsInView}
            delay={100}
          />
          <StatCard
            icon="home"
            label={`From ${host?.name ?? "host country"}`}
            value={hostCount}
            accent="bg-secondary/10 text-secondaryDark ring-secondary/30"
            run={statsInView}
            delay={200}
          />
          <StatCard
            icon="plane"
            label={`International · ${internationalCountries} countries`}
            value={internationalCount}
            accent="bg-primary/10 text-primary ring-primary/25"
            run={statsInView}
            delay={300}
          />
                <div className="border-t border-border pt-1.5 sm:pt-2">
                  <div className="flex items-baseline justify-between gap-2 text-[10px] sm:text-xs">
                    <span className="font-semibold text-dark">Participant mix</span>
                  </div>
                  <div
                    className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-light sm:h-2.5"
                    role="img"
                    aria-label={`${formatPercent(hostShare)} from ${
                      host?.name ?? "host country"
                    }, ${formatPercent(100 - hostShare)} international`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-secondaryDark to-secondary transition-[width] duration-1000 ease-out motion-reduce:transition-none"
                      style={{ width: statsInView ? `${hostShare}%` : "0%" }}
                    />
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primaryDark transition-[width] delay-150 duration-1000 ease-out motion-reduce:transition-none"
                      style={{ width: statsInView ? `${100 - hostShare}%` : "0%" }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between gap-2 text-[10px] text-muted sm:text-xs">
                    <span className="inline-flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {host?.name ?? "Host"}
                      <b className="font-semibold text-dark tabular-nums">
                        {formatPercent(hostShare)}
                      </b>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Intl.
                      <b className="font-semibold text-dark tabular-nums">
                        {formatPercent(100 - hostShare)}
                      </b>
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                  </div>
                </div>
                      </div>

              <div className="pointer-events-none absolute inset-0">
                {active && (
                  <Tooltip
                    country={active}
                    pos={{ x: COUNTRY_POS[active.code][0], y: COUNTRY_POS[active.code][1] }}
                    color={activeColor(countries.indexOf(active))}
                    mapHeight={mapHeight}
                    total={total}
                    isHost={active.code === hostCode}
                    flagSrc={getFlagSrc}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
