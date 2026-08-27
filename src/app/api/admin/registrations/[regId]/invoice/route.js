import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getFamilyMembersForRegistration, getRegistrationByRegId } from "@/lib/db";
import { generateInvoiceBuffer, readInvoiceFromDisk } from "@/lib/invoice";
import { calculatePricing } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function GET(_request, ctx) {
  const isAuthed = await isAdminAuthenticated();
  if (!isAuthed) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { regId } = await ctx.params;
  if (!regId) {
    return new Response("Not found", { status: 404 });
  }

  const registration = getRegistrationByRegId(regId);
  if (!registration) {
    return new Response("Registration not found", { status: 404 });
  }

  const familyMembers = getFamilyMembersForRegistration(registration.id);

  let effectiveReg = { ...registration };
  if (!effectiveReg.payment_amount) {
    const pricing = calculatePricing({
      isLocal: effectiveReg.is_local_participant === "Yes",
      isMember: effectiveReg.is_member_university === "Yes",
      familyMembersCount: familyMembers.length,
    });
    effectiveReg.payment_amount = String(pricing.totalFee);
    effectiveReg.payment_currency = pricing.currency;
    effectiveReg.registration_period = pricing.period.key;
  }

  let buffer = null;
  if (registration.invoice_path) {
    try {
      buffer = await readInvoiceFromDisk(registration.invoice_path);
    } catch {
      buffer = null;
    }
  }

  if (!buffer) {
    try {
      buffer = await generateInvoiceBuffer({
        registration: effectiveReg,
        familyMembers,
      });
    } catch (err) {
      console.error("[admin/invoice] error generating invoice buffer", err);
      return new Response("Could not generate invoice", { status: 500 });
    }
  }

  const safeRegId = String(registration.reg_id).replace(/[^a-zA-Z0-9-_]/g, "");

  return new Response(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="IAUP-DIU-2026-Invoice-${safeRegId}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
