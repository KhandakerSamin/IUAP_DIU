import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteCoupon, insertCoupon, setCouponActive } from "@/lib/db";

export const dynamic = "force-dynamic";

// Cookie is SameSite=Lax, but mutating admin calls also require a same-origin
// Origin header as defence in depth against CSRF.
async function ensureAuthed(request) {
  const origin = request.headers.get("origin");
  if (origin) {
    let originHost;
    try {
      originHost = new URL(origin).host;
    } catch {
      return false;
    }
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
    if (originHost !== host) return false;
  }
  return isAdminAuthenticated();
}

const CODE_PATTERN = /^[A-Z0-9][A-Z0-9_-]{2,31}$/;
const MAX_FIXED_USD = 5000;

export async function POST(request) {
  if (!(await ensureAuthed(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (!CODE_PATTERN.test(code)) {
    return Response.json(
      { error: "Code must be 3–32 characters: letters, numbers, dashes or underscores." },
      { status: 400 }
    );
  }

  const discountType = body?.discount_type === "fixed" ? "fixed" : "percent";
  const discountValue = Math.round(Number(body?.discount_value) * 100) / 100;
  if (!Number.isFinite(discountValue) || discountValue <= 0) {
    return Response.json({ error: "Enter a discount value greater than 0." }, { status: 400 });
  }
  if (discountType === "percent" && discountValue > 100) {
    return Response.json({ error: "Percentage discount cannot exceed 100." }, { status: 400 });
  }
  if (discountType === "fixed" && discountValue > MAX_FIXED_USD) {
    return Response.json({ error: `Fixed discount cannot exceed USD ${MAX_FIXED_USD}.` }, { status: 400 });
  }

  let maxUses = null;
  if (body?.max_uses !== null && body?.max_uses !== undefined && body?.max_uses !== "") {
    const parsed = Number(body.max_uses);
    if (!Number.isInteger(parsed) || parsed < 1) {
      return Response.json({ error: "Max uses must be a positive whole number." }, { status: 400 });
    }
    maxUses = parsed;
  }

  const expiresAt = typeof body?.expires_at === "string" && body.expires_at ? body.expires_at : null;
  if (expiresAt && !/^\d{4}-\d{2}-\d{2}$/.test(expiresAt)) {
    return Response.json({ error: "Invalid expiry date." }, { status: 400 });
  }
  const note = typeof body?.note === "string" ? body.note.trim().slice(0, 200) || null : null;

  try {
    const id = insertCoupon({
      code,
      note,
      max_uses: maxUses,
      expires_at: expiresAt,
      discount_type: discountType,
      discount_value: discountValue,
    });
    return Response.json({ id });
  } catch (err) {
    if (String(err?.message || "").includes("UNIQUE")) {
      return Response.json({ error: "A coupon with this code already exists." }, { status: 409 });
    }
    console.error("[admin/coupons] create failed", err);
    return Response.json({ error: "Could not create coupon." }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await ensureAuthed(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = Number(body?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ error: "Missing coupon id." }, { status: 400 });
  }

  const result = setCouponActive(id, Boolean(body?.active));
  if (!result.changes) {
    return Response.json({ error: "Coupon not found." }, { status: 404 });
  }

  return Response.json({ updated: result.changes });
}

export async function DELETE(request) {
  if (!(await ensureAuthed(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const id = Number(body?.id);
  if (!Number.isInteger(id) || id <= 0) {
    return Response.json({ error: "Missing coupon id." }, { status: 400 });
  }

  const result = deleteCoupon(id);
  if (!result.changes) {
    return Response.json({ error: "Coupon not found." }, { status: 404 });
  }

  return Response.json({ deleted: result.changes });
}
