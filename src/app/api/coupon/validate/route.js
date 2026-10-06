import { getCouponByCode } from "@/lib/db";

export const dynamic = "force-dynamic";

// ponytail: per-process in-memory limiter — fine for the single VPS, move to a
// shared store if this ever runs on multiple instances.
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 10;
const hits = new Map();

function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] >= WINDOW_MS) hits.delete(key);
    }
  }
  return recent.length > MAX_ATTEMPTS;
}

// One message for unknown / disabled / expired / used-up codes so the endpoint
// can't be used to probe which codes exist.
const INVALID = { valid: false, reason: "This coupon code is invalid or no longer available." };

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (tooMany(ip)) {
    return Response.json(
      { valid: false, reason: "Too many attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ valid: false, reason: "Invalid request." }, { status: 400 });
  }

  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (!code) {
    return Response.json({ valid: false, reason: "Enter a coupon code." });
  }
  if (code.length > 64) return Response.json(INVALID);

  const coupon = getCouponByCode(code);
  if (
    !coupon ||
    !coupon.active ||
    (coupon.expires_at && new Date(coupon.expires_at) <= new Date()) ||
    (coupon.max_uses != null && coupon.uses_count >= coupon.max_uses)
  ) {
    return Response.json(INVALID);
  }

  return Response.json({
    valid: true,
    code,
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value,
  });
}
