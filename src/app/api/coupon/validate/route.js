import { getCouponByCode } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request) {
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

  const coupon = getCouponByCode(code);
  if (!coupon || !coupon.active) {
    return Response.json({ valid: false, reason: "Invalid coupon code." });
  }
  if (coupon.expires_at && new Date(coupon.expires_at) <= new Date()) {
    return Response.json({ valid: false, reason: "This coupon has expired." });
  }
  if (coupon.max_uses != null && coupon.uses_count >= coupon.max_uses) {
    return Response.json({ valid: false, reason: "This coupon has already been fully used." });
  }

  return Response.json({ valid: true, code });
}
