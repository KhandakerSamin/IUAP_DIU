import { markPaymentStatus } from "@/lib/db";
import { verifyPayment } from "@/lib/payment";
import { finalizePaidPayment } from "@/lib/paymentFinalize";

export const dynamic = "force-dynamic";

async function readBody(request) {
  const contentType = (request.headers.get("content-type") || "").toLowerCase();

  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  const raw = await request.text().catch(() => "");
  if (!raw) return {};

  if (contentType.includes("application/x-www-form-urlencoded") || raw.includes("=")) {
    return Object.fromEntries(new URLSearchParams(raw));
  }

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function POST(request) {
  const body = await readBody(request);
  const reffId = body?.reff_id || body?.ref_id;

  if (!reffId) {
    console.warn("[payment/ipn] missing reff_id in callback", body);
    return Response.json({ message: "failed" }, { status: 400 });
  }

  const result = await verifyPayment(reffId);
  console.log("[payment/ipn]", reffId, "->", result.state);

  try {
    if (result.state === "success") {
      markPaymentStatus(reffId, "paid", { tran_id: result.details?.tran_id });
    } else if (result.state === "failed") {
      markPaymentStatus(reffId, "failed");
    }
  } catch (err) {
    console.error("[payment/ipn] DB update failed", reffId, err);
  }

  if (result.state === "success") {
    finalizePaidPayment(reffId).catch((err) =>
      console.error("[payment/ipn] finalize error", reffId, err)
    );
    return Response.json({ message: "success" });
  }

  return Response.json({ message: "failed" });
}
