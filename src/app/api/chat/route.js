import fs from "node:fs";
import path from "node:path";
import faq from "@/lib/faq";

const MODEL = process.env.OPENROUTER_MODEL || "google/gemma-3-27b-it";
const FALLBACK_MODEL = process.env.OPENROUTER_FALLBACK_MODEL || "mistralai/mistral-nemo";
const schedule = fs.readFileSync(path.join(process.cwd(), "src/content/schedule.md"), "utf8");

const SYSTEM = `You are the FAQ assistant for the IAUP Semi-Annual Meeting 2026 (Daffodil International University, Dhaka, 19-21 Nov 2026).
Answer ONLY from the facts below. Be concise (max ~120 words). If the answer isn't in the facts, say you don't know and give the contact: iaup-bd2026@daffodilvarsity.edu.bd, +880 1811-458865. Never invent prices, dates or links. Reply in the user's language.

FAQ:
${faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

PROGRAM SCHEDULE (markdown):
${schedule}`;

// ponytail: in-memory per-IP limit (resets on restart, per-instance). Use Redis/edge limits if scaled out.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 20;
}

export async function POST(request) {
  if (!process.env.OPENROUTER_API_KEY) return Response.json({ error: "not configured" }, { status: 503 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "rate limited" }, { status: 429 });

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }))
    : [];
  if (!messages.length || messages.at(-1).role !== "user") return Response.json({ error: "bad request" }, { status: 400 });

  // Free models 429 often; paid ones rarely do: try primary, fallback, primary again.
  let reply;
  for (const model of [MODEL, FALLBACK_MODEL, MODEL]) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, max_tokens: 1500, temperature: 0.2, reasoning: { effort: "low" }, messages: [{ role: "system", content: SYSTEM }, ...messages] }), // reasoning models burn tokens thinking; keep it cheap
      signal: AbortSignal.timeout(25_000),
    }).catch(() => null);
    const data = res?.ok ? await res.json() : null;
    reply = data?.choices?.[0]?.message?.content?.trim();
    if (reply) break;
    console.error("[chat]", model, res?.status ?? "network error");
  }
  if (!reply) return Response.json({ error: "upstream failed" }, { status: 502 });
  return Response.json({ reply });
}
