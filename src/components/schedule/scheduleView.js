"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CalendarDays, Clock, MapPin, UserRound } from "lucide-react";

// dot = timeline marker, bar = card accent. Colour only; text is never altered.
const TONE = {
  ceremony: { dot: "bg-primaryDark", bar: "border-l-primaryDark" },
  keynote: { dot: "bg-emerald-600", bar: "border-l-emerald-600" },
  panel: { dot: "bg-primary", bar: "border-l-primary" },
  dialogue: { dot: "bg-teal-600", bar: "border-l-teal-600" },
  social: { dot: "bg-amber-500", bar: "border-l-amber-500" },
  campus: { dot: "bg-orange-500", bar: "border-l-orange-500" },
  logistics: { dot: "bg-slate-400", bar: "border-l-slate-300" },
  meeting: { dot: "bg-indigo-600", bar: "border-l-indigo-600" },
};

function typeOf(text) {
  if (/Transfer|Drop-off|Registration|Break|Check-In|Lunch/i.test(text)) return "logistics";
  if (/Meeting/i.test(text)) return "meeting";
  if (/Keynote/i.test(text)) return "keynote";
  if (/Dialogue/i.test(text)) return "dialogue";
  if (/Panel|Parallel/i.test(text)) return "panel";
  if (/Ceremony|Opening/i.test(text)) return "ceremony";
  if (/Explore|Campus/i.test(text)) return "campus";
  return "social";
}

const mdComponents = {
  p: (p) => <p className="my-0" {...p} />,
  strong: (p) => <strong className="font-bold text-slate-950" {...p} />,
  a: (p) => <a className="font-semibold text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer" {...p} />,
};

function Md({ children }) {
  return (
    <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
      {children}
    </Markdown>
  );
}

// The source has no line breaks inside cells; split at known labels purely for layout.
// Words are untouched; `**` is re-balanced so bold pairs survive the split.
const BREAK = /(?<!Special)\s+(?=(?:\*\*)?(?:Venues?:|Welcome by |Welcome remarks|Welcome Performance|Panelists?:|Moderator:|Presented by|Buffet Dinner|National Anthem|Address by |Special Address|Conference Inauguration|Country Representation|Pickup Time|Route-\d|Not Attending|Closing Remarks|Vote of Thanks|Thematic|Token of))/u;
const PERSON_BREAK = /(?<=[\p{L})]\s+)(?=\*\*(?:Dr\.|Prof\.|Mr\.|Ms\.|Robert))/u;

function segments(text) {
  const raw = text
    .split(BREAK)
    .flatMap((s) => s.split(PERSON_BREAK))
    .map((s) => s.trim())
    .filter(Boolean);
  let open = false;
  return raw.map((seg) => {
    if (open) seg = `**${seg}`;
    const odd = ((seg.match(/\*\*/g) || []).length % 2) === 1;
    open = odd;
    return odd ? `${seg}**` : seg;
  });
}

const ROLE = /^[^*]{3,90}:\s+\*\*/;

function kindOf(seg) {
  if (/^\**Venues?:/.test(seg)) return "venue";
  if (ROLE.test(seg)) return "role";
  if (/^(Buffet Dinner|Welcome Performance|National Anthem|Conference Inauguration|Country Representation)/.test(seg)) return "bullet";
  if (/^\**(Panelists?|Moderator):?/.test(seg) || /^\*\*(Dr\.|Prof\.|Mr\.|Ms\.|Robert)/.test(seg)) return "person";
  return "line";
}

const BLOCK = {
  venue: "mt-2.5 flex items-start gap-2 rounded-lg bg-primary/5 px-3 py-2 text-[14.5px] text-slate-800",
  bullet: "mt-1.5 flex gap-2.5 text-[15px] before:mt-[9px] before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary/60 before:content-['']",
  role: "mt-2 rounded-xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-slate-100",
  person: "mt-1.5 border-l-2 border-primary/25 pl-3 text-[14.5px]",
  line: "mt-1.5 text-[15px]",
};

const EYEBROW = /^\*\*((?:Global Leaders Dialogue|Panel \d|Keynote Presentation|Parallel Session \d):)\s+(.*)$/s;
const PERSON = /^\*\*(Panelists?:|Moderator:)(?:\*\*)?\s+(?:\*\*)?(.*)$/s;

// Splits a speaker segment into label / name / affiliation; null if it doesn't fit.
function parsePerson(seg) {
  let label = "";
  let body = seg;
  const m = seg.match(PERSON);
  if (m) {
    label = m[1];
    body = `**${m[2]}`;
  }
  const n = body.match(/^\*\*(.+?)\*\*(.*)$/s);
  if (!n) return null;
  return { label, name: n[1].replace(/,$/, ""), aff: n[2].replace(/^,?\s*/, "") };
}

function PersonCard({ p }) {
  const mod = p.label === "Moderator:";
  return (
    <div className={`flex items-start gap-3 rounded-xl px-3.5 py-3 ring-1 ${mod ? "bg-primary/5 ring-primary/20" : "bg-slate-50 ring-slate-100"}`}>
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${mod ? "bg-primary text-white" : "bg-white text-primary ring-1 ring-slate-200"}`}>
        <UserRound className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        {mod && <div className="text-[12px] font-semibold uppercase tracking-wide text-primary">{p.label}</div>}
        <div className="text-[15px] font-bold leading-snug text-slate-950">{p.name}</div>
        {p.aff && <div className="mt-0.5 text-[14px] leading-snug text-slate-600">{p.aff}</div>}
      </div>
    </div>
  );
}

function SpeakerGroup({ label, people }) {
  return (
    <div className="mt-3">
      {label && <div className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-primary">{label}</div>}
      <div className="grid gap-2.5 sm:grid-cols-2">
        {people.map((p, i) => (
          <PersonCard key={i} p={p} />
        ))}
      </div>
    </div>
  );
}

function Item({ time, text }) {
  const [title, ...rest] = segments(text);
  const tone = TONE[typeOf(`${time} ${text}`)];
  const em = (title || "").match(EYEBROW);
  const titleEyebrow = em ? em[1] : "";
  const titleMain = em ? `**${em[2]}` : title;

  // Group consecutive panelists into one grid; everything else stays a single block.
  const blocks = [];
  for (const seg of rest) {
    const kind = kindOf(seg);
    const person = kind === "person" ? parsePerson(seg) : null;
    if (!person) {
      blocks.push({ seg, kind });
      continue;
    }
    const last = blocks[blocks.length - 1];
    if (person.label !== "Moderator:" && last?.people && !last.mod) {
      last.people.push(person);
    } else {
      blocks.push({ people: [person], label: /^Panelists?:/.test(person.label) ? person.label : "", mod: person.label === "Moderator:" });
    }
  }
  for (const b of blocks) if (b.people && b.label) b.people[0].label = "";
  // Mirrors the bullets in the original document.
  const titleBullet = /^(Networking Hour|\*\*IAUP (Executive|Board))/.test(title || "");
  return (
    <li className="relative pl-9 sm:pl-12">
      <span
        className={`absolute left-[7px] top-6 h-3.5 w-3.5 rounded-full ring-4 ring-white shadow ${tone.dot}`}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-3 pb-6 lg:flex-row lg:gap-6">
        <div className="shrink-0 lg:w-52 lg:pt-4">
          {time && (
            <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-primary/10 px-3.5 py-1.5 text-[13.5px] font-bold tracking-tight text-primaryDark">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {time.replace(/\*\*|\\/g, "")}
            </span>
          )}
        </div>
        <div
          className={`flex-1 rounded-2xl border border-l-4 border-slate-200 bg-white p-5 font-medium leading-relaxed text-slate-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200 ${tone.bar}`}
        >
          {titleEyebrow && <div className="mb-1 text-[12px] font-semibold uppercase tracking-wide text-primary">{titleEyebrow}</div>}
          {title && (
            <div className={`text-[17px] font-bold leading-snug text-slate-950 sm:text-[19px] [&_strong]:font-bold ${titleBullet ? "flex gap-2.5 before:mt-[11px] before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary before:content-['']" : ""}`}>
              <Md>{titleMain}</Md>
            </div>
          )}
          {blocks.map((b, i) => {
            if (b.people) return <SpeakerGroup key={i} label={b.label} people={b.people} />;
            const { seg, kind } = b;
            if (kind === "role") {
              const at = seg.indexOf(": **") + 1;
              return (
                <div key={i} className={BLOCK.role}>
                  <div className="text-[12px] font-semibold uppercase tracking-wide text-primary">{seg.slice(0, at)}</div>
                  <div className="mt-0.5 text-[15px]"><Md>{seg.slice(at).trim()}</Md></div>
                </div>
              );
            }
            return (
              <div key={i} className={BLOCK[kind]}>
                {kind === "venue" && <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
                <div><Md>{seg}</Md></div>
              </div>
            );
          })}
        </div>
      </div>
    </li>
  );
}

function Label({ text }) {
  return (
    <li className="relative flex justify-center pb-6 pt-4">
      <h3 className="inline-block rounded-full bg-linear-to-r from-primary to-secondary px-5 py-2 text-[16px] font-bold text-white shadow-md sm:text-[18px] [&_strong]:text-white">
        <Md>{text}</Md>
      </h3>
    </li>
  );
}

function DaySection({ day }) {
  const [, num] = day.label.split(" ");
  return (
    <section className="py-8 sm:py-10">
      <div className="mb-10 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primaryDark text-white shadow-md sm:h-20 sm:w-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Day</span>
            <span className="text-3xl font-bold leading-none sm:text-4xl">{num}</span>
          </div>
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-secondaryDark">{day.label}</p>
            <h2 className="mt-1 text-[22px] font-bold leading-tight text-slate-950 sm:text-[30px]">{day.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3.5 text-[14px] font-bold text-slate-900 ring-1 ring-slate-200 sm:max-w-sm">
          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <Md>{day.venue}</Md>
        </div>
      </div>
      <ol className="relative before:absolute before:bottom-6 before:left-3.5 before:top-6 before:w-0.5 before:rounded-full before:bg-linear-to-b before:from-primary/40 before:via-slate-200 before:to-secondary/40">
        {day.rows.map((r, i) =>
          r.label ? <Label key={i} text={r.label} /> : <Item key={i} time={r.time} text={r.text} />,
        )}
      </ol>
    </section>
  );
}

export default function ScheduleView({ intro, days }) {
  const [active, setActive] = useState(0);
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-100 via-slate-50 to-white pb-24 pt-16 sm:pt-20">
      <section className="relative overflow-hidden bg-linear-to-br from-primaryDark via-primary to-teal-700 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-340 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.25em] ring-1 ring-white/25 backdrop-blur">{intro[0]}</p>
          <h1 className="mt-5 text-[32px] font-bold leading-[1.1] sm:text-[52px]">{intro[1]}</h1>
          <p className="mt-4 inline-flex items-center gap-2.5 text-[17px] font-semibold text-white/95 sm:text-[20px]">
            <CalendarDays className="h-5 w-5 shrink-0" aria-hidden="true" />
            {intro[2]}
          </p>
          <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-white/80 sm:text-[19px]">{intro[3]}</p>
        </div>
      </section>

      <nav className="sticky top-16 z-30 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-md sm:top-20">
        <div className="mx-auto flex max-w-340 gap-3 overflow-x-auto px-4 py-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-6 lg:px-8">
          {days.map((d, i) => (
            <button
              key={d.label}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`flex shrink-0 cursor-pointer items-baseline gap-2.5 rounded-full border px-5 py-2.5 text-[14px] font-bold transition-all duration-200 ${
                active === i
                  ? "border-transparent bg-linear-to-r from-primary to-primaryDark text-white shadow-lg shadow-primary/30"
                  : "border-slate-200 bg-white text-slate-800 hover:border-primary hover:text-primary"
              }`}
            >
              {d.label}
              <span className={`font-semibold ${active === i ? "text-white/85" : "text-slate-500"}`}>{d.date}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <DaySection key={active} day={days[active]} />
      </div>
    </main>
  );
}
