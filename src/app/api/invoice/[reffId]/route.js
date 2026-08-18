import { getRegistrationByReffId } from "@/lib/db";
import { readInvoiceFromDisk } from "@/lib/invoice";
import { finalizePaidPayment, finalizeWireRegistration } from "@/lib/paymentFinalize";

export const dynamic = "force-dynamic";

export async function GET(_request, ctx) {
  const { reffId } = await ctx.params;
  if (!reffId) {
    return new Response("Not found", { status: 404 });
  }

  let row = getRegistrationByReffId(reffId);
  if (!row) {
    return new Response("Not found", { status: 404 });
  }
  // Wire transfers are invoiced before payment arrives, so an unpaid wire row
  // still gets its proforma; online payments must be validated first.
  const isWire = row.payment_method === "wire-transfer";
  if (!isWire && row.payment_status !== "paid") {
    return new Response("Payment not completed.", { status: 403 });
  }

  if (!row.invoice_path) {
    if (isWire) {
      await finalizeWireRegistration(row.reg_id).catch(() => null);
    } else {
      await finalizePaidPayment(reffId).catch(() => null);
    }
    row = getRegistrationByReffId(reffId);
  }

  if (!row?.invoice_path) {
    return new Response("Invoice is being generated. Please try again shortly.", { status: 503 });
  }

  let buffer;
  try {
    buffer = await readInvoiceFromDisk(row.invoice_path);
  } catch (err) {
    console.error("[invoice] read failed", reffId, err);
    return new Response("Invoice unavailable.", { status: 500 });
  }

  const safeReff = String(reffId).replace(/[^a-zA-Z0-9-_]/g, "");
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="IAUP-2026-${isWire ? "Proforma-" : ""}Invoice-${safeReff}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
