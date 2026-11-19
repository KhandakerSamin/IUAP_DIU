"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, RotateCcw, Send, X } from "lucide-react";
import Image from "next/image";
import faq from "@/lib/faq";
import logo from "../../../public/iauplogo.jpg";

const Logo = ({ size }) => <Image src={logo} alt="IAUP" width={size} height={size} className="rounded-full bg-white object-contain" style={{ width: size, height: size }} />;

const STOP = new Set("the a an is are do i can how what when where to of in for my me and or it be on at we you your".split(" "));
const words = (s) => s.toLowerCase().match(/[a-z0-9]+/g)?.filter((w) => !STOP.has(w)) ?? [];
const GREETING = { bot: true, t: "Hi! 👋 I'm the **IAUP 2026** assistant. Ask me about registration, fees, schedule, venues, visas, hotels or tours." };
const CONTACT = "I couldn't find that in my notes. Please contact the secretariat: iaup-bd2026@daffodilvarsity.edu.bd or +880 1811-458865.";

// ponytail: keyword overlap fallback when the LLM is unavailable.
function answer(text) {
  const ws = words(text);
  let best = null, top = 0;
  for (const f of faq) {
    const hay = words(`${f.q} ${f.k}`);
    const score = ws.reduce((n, w) => n + (hay.some((h) => h === w || (w.length > 3 && h.startsWith(w.slice(0, 4)))) ? 1 : 0), 0);
    if (score > top) [best, top] = [f, score];
  }
  return top ? best.a : CONTACT;
}

// Tiny safe markdown: **bold**, [text](url), bare urls, emails, phones. No raw HTML.
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s)]+|[\w.+-]+@[\w-]+\.[\w.-]+|\+880[\d\s-]{9,}\d)/g;
const linkCls = "font-medium underline underline-offset-2 break-words";
function inline(text) {
  return text.split(TOKEN).map((p, i) => {
    if (i % 2 === 0) return p;
    if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    const md = p.match(/^\[([^\]]+)\]\((.+)\)$/);
    if (md) return <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer" className={linkCls}>{md[1]}</a>;
    if (p.includes("@") && !p.startsWith("http")) return <a key={i} href={`mailto:${p}`} className={linkCls}>{p}</a>;
    if (p.startsWith("+")) return <a key={i} href={`tel:${p.replace(/[^\d+]/g, "")}`} className={linkCls}>{p}</a>;
    return <a key={i} href={p} target="_blank" rel="noopener noreferrer" className={linkCls}>{p}</a>;
  });
}
function Rich({ text }) {
  const blocks = [];
  for (const line of text.split("\n").map((l) => l.trim()).filter(Boolean)) {
    const li = line.match(/^[-*•]\s+(.*)/);
    const last = blocks.at(-1);
    if (li && last?.ul) last.items.push(li[1]);
    else if (li) blocks.push({ ul: true, items: [li[1]] });
    else blocks.push({ p: line.replace(/^#+\s*/, "") });
  }
  return blocks.map((b, i) =>
    b.ul ? (
      <ul key={i} className="my-1 list-disc space-y-0.5 pl-4">{b.items.map((x, j) => <li key={j}>{inline(x)}</li>)}</ul>
    ) : (
      <p key={i} className={i ? "mt-1.5" : ""}>{inline(b.p)}</p>
    ),
  );
}

export default function FaqChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, busy, open]);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const ask = async (q) => {
    q = q.trim();
    if (!q || busy) return;
    const history = [...msgs.slice(1), { t: q }].map((m) => ({ role: m.bot ? "assistant" : "user", content: m.t }));
    setMsgs((m) => [...m, { t: q }]);
    setInput("");
    setBusy(true);
    let t;
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }) });
      t = r.ok ? (await r.json()).reply : null;
    } catch {}
    setMsgs((m) => [...m, { bot: true, t: t || answer(q) }]);
    setBusy(false);
  };

  const asked = new Set(msgs.map((m) => m.t));
  const chips = faq.filter((f) => !asked.has(f.q)).slice(0, msgs.length === 1 ? 6 : 3);
  const lastIsContact = msgs.at(-1).bot && msgs.at(-1).t.includes("secretariat");

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans sm:bottom-6 sm:right-6">
      {open && (
        <section
          role="dialog"
          aria-label="IAUP 2026 FAQ assistant"
          className="faq-pop fixed inset-0 flex flex-col overflow-hidden bg-white sm:absolute sm:inset-auto sm:bottom-[4.5rem] sm:right-0 sm:h-[36rem] sm:max-h-[calc(100dvh-7rem)] sm:w-[24rem] sm:rounded-2xl sm:shadow-2xl sm:ring-1 sm:ring-black/10"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-primaryDark to-primary px-4 py-3 text-white">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <Logo size={40} />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-primary" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-sm font-semibold">IAUP 2026 Assistant</p>
              <p className="truncate text-xs text-white/75">Ask about the Dhaka meeting</p>
            </div>
            <button onClick={() => setMsgs([GREETING])} aria-label="Restart chat" title="Restart chat" className="rounded-full p-2 hover:bg-white/15"><RotateCcw size={18} /></button>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 hover:bg-white/15"><X size={20} /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-3 text-sm" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.bot ? "" : "justify-end"}`}>
                {m.bot && <span className="mb-0.5 shrink-0"><Logo size={28} /></span>}
                <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${m.bot ? "rounded-bl-sm bg-white text-slate-800" : "rounded-br-sm bg-primary text-white [&_a]:text-white"} ${m.bot ? "[&_a]:text-primary" : ""}`}>
                  <Rich text={m.t} />
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex items-end gap-2">
                <Logo size={28} />
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm" aria-label="Typing">
                  {[0, 150, 300].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            )}
            {!busy && lastIsContact && (
              <div className="flex gap-2 pl-9">
                <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd" className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"><Mail size={14} />Email</a>
                <a href="tel:+8801811458865" className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-white"><Phone size={14} />Call</a>
              </div>
            )}
            {!busy && chips.length > 0 && (
              <div className="pl-9">
                <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">{msgs.length === 1 ? "Popular questions" : "You may also ask"}</p>
                <div className="flex flex-wrap gap-1.5">
                  {chips.map((f) => (
                    <button key={f.q} onClick={() => ask(f.q)} className="rounded-full border border-primary/30 bg-white px-3 py-1.5 text-left text-xs text-primary transition hover:bg-primary hover:text-white">{f.q}</button>
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex items-center gap-2 border-t bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} maxLength={300} placeholder="Type your question…" aria-label="Your question" className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-base text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-sm" />
            <button disabled={busy || !input.trim()} aria-label="Send" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition enabled:hover:bg-primaryDark disabled:opacity-40"><Send size={18} /></button>
          </form>
          <p className="bg-white pb-2 text-center text-[10px] text-slate-400">AI answers may be inaccurate — confirm key details with the secretariat.</p>
        </section>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close FAQ chat" : "Open FAQ chat"}
        className={`${open ? "max-sm:hidden" : ""} group flex h-14 items-center gap-2 rounded-full bg-gradient-to-br from-primary to-primaryDark px-4 text-white shadow-xl transition hover:scale-105`}
      >
        {open ? <X size={26} /> : <Logo size={36} />}
        {!open && <span className="hidden pr-1 text-sm font-semibold sm:inline">Ask us</span>}
      </button>
    </div>
  );
}
