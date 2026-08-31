import { isAdminAuthenticated } from "@/lib/adminAuth";
import { deleteCoupon, insertCoupon, setCouponActive } from "@/lib/db";

export const dynamic = "force-dynamic";

async function ensureAuthed() {
  return isAdminAuthenticated();
}

export async function POST(request) {
  if (!(await ensureAuthed())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  if (!code) {
    return Response.json({ error: "Coupon code is required." }, { status: 400 });
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
  const note = typeof body?.note === "string" ? body.note.trim() || null : null;

  try {
    const id = insertCoupon({ code, note, max_uses: maxUses, expires_at: expiresAt });
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
  if (!(await ensureAuthed())) {
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
  if (!(await ensureAuthed())) {
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
