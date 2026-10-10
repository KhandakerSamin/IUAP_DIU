import {
  attachReffIdToRegistration,
  claimAdminNotification,
  claimInvoiceSend,
  getFamilyMembersForRegistration,
  getRegistrationByRegId,
  getRegistrationByReffId,
  releaseAdminNotificationClaim,
  releaseInvoiceSendClaim,
  resolveAmountDue,
  setInvoicePath,
} from "@/lib/db";
import { writeInvoiceToDisk, getInvoiceNumber } from "@/lib/invoice";
import { sendInvoiceEmail, sendRegistrationAdminNotification, sendWireConfirmationEmail } from "@/lib/mailer";
import { calculatePricing } from "@/lib/pricing";

// In-flight deduplication so concurrent calls (IPN + payment-result page load)
// don't both generate the invoice and double-send emails.
const inFlight = new Map();

// Admin only hears about a registration once it has actually gone through —
// a coupon redemption, a confirmed gateway charge, or a recorded wire
// transfer — never at submit time, so a pending payment can't be mistaken for
// a completed one. Independent of the participant's email: a bad participant
// address or an SMTP hiccup on that send must not hide the registration from
// the secretariat. The coupon code (if any) rides along on `registration` so
// admin sees it was a complimentary entry.
async function notifyAdminOnce({ registration, familyMembers, pdfBuffer, logTag }) {
  const reffId = registration.payment_reff_id;
  if (registration.admin_notified_at || !claimAdminNotification(reffId)) return;
  try {
    const result = await sendRegistrationAdminNotification({ registration, familyMembers, pdfBuffer });
    if (!result.sent) releaseAdminNotificationClaim(reffId);
  } catch (err) {
    console.error(`[${logTag}] admin notification failed`, reffId, err);
    releaseAdminNotificationClaim(reffId);
  }
}

async function loadPdf(pdfBuffer, invoicePath) {
  if (pdfBuffer || !invoicePath) return pdfBuffer;
  const { readInvoiceFromDisk } = await import("@/lib/invoice");
  return readInvoiceFromDisk(invoicePath).catch(() => null);
}

async function runFinalize(reffId) {
  const registration = getRegistrationByReffId(reffId);
  if (!registration) {
    return { state: "not-found" };
  }
  if (registration.payment_status !== "paid") {
    return { state: "not-paid", payment_status: registration.payment_status };
  }

  const familyMembers = getFamilyMembersForRegistration(registration.id);

  let invoicePath = registration.invoice_path;
  let pdfBuffer = null;

  if (!invoicePath) {
    try {
      const { relativePath, buffer } = await writeInvoiceToDisk({ registration, familyMembers });
      invoicePath = relativePath;
      pdfBuffer = buffer;
      setInvoicePath(reffId, invoicePath);
    } catch (err) {
      console.error("[finalize] invoice generation failed", reffId, err);
      return { state: "invoice-failed", error: err?.message };
    }
  }

  if (!registration.invoice_sent_at && claimInvoiceSend(reffId)) {
    try {
      pdfBuffer = await loadPdf(pdfBuffer, invoicePath);
      const invoiceNumber = getInvoiceNumber(registration);
      const result = await sendInvoiceEmail({
        to: registration.email,
        participantName: `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant",
        reffId,
        invoiceNumber,
        amount: registration.payment_amount,
        currency: registration.payment_currency,
        pdfBuffer,
      });
      if (!result.sent) {
        releaseInvoiceSendClaim(reffId);
      }
    } catch (err) {
      console.error("[finalize] email send failed", reffId, err);
      releaseInvoiceSendClaim(reffId);
    }
  }

  if (!registration.admin_notified_at) {
    pdfBuffer = await loadPdf(pdfBuffer, invoicePath);
    await notifyAdminOnce({ registration, familyMembers, pdfBuffer, logTag: "finalize" });
  }

  return { state: "ok", invoice_path: invoicePath };
}

export async function finalizePaidPayment(reffId) {
  if (!reffId) return { state: "missing-reff-id" };

  if (inFlight.has(reffId)) {
    return inFlight.get(reffId);
  }

  const promise = runFinalize(reffId).finally(() => {
    inFlight.delete(reffId);
  });

  inFlight.set(reffId, promise);
  return promise;
}

async function runWireFinalize(regId) {
  const existing = getRegistrationByRegId(regId);
  if (!existing) {
    return { state: "not-found" };
  }

  const familyMembers = getFamilyMembersForRegistration(existing.id);

  // A wire transfer has no gateway reference, so the registration id doubles as
  // the invoice lookup reference.
  if (!existing.payment_reff_id) {
    const pricing = calculatePricing({
      isLocal: existing.is_local_participant === "Yes",
      isMember: existing.is_member_university === "Yes",
      familyMembersCount: familyMembers.length,
    });
    attachReffIdToRegistration(
      regId,
      regId,
      String(resolveAmountDue(existing, pricing)),
      pricing.currency,
      pricing.period.key
    );
  }

  // Re-read: the amount, currency and period were just written and the invoice
  // renders from the row.
  const registration = getRegistrationByRegId(regId);

  let invoicePath = registration.invoice_path;
  let pdfBuffer = null;

  if (!invoicePath) {
    try {
      const { relativePath, buffer } = await writeInvoiceToDisk({ registration, familyMembers });
      invoicePath = relativePath;
      pdfBuffer = buffer;
      setInvoicePath(registration.payment_reff_id, invoicePath);
    } catch (err) {
      console.error("[finalize:wire] invoice generation failed", regId, err);
      return { state: "invoice-failed", error: err?.message };
    }
  }

  let emailSent = Boolean(registration.invoice_sent_at);
  if (!registration.invoice_sent_at && claimInvoiceSend(registration.payment_reff_id)) {
    try {
      pdfBuffer = await loadPdf(pdfBuffer, invoicePath);
      const pricing = calculatePricing({
        isMember: registration.is_member_university === "Yes",
        familyMembersCount: familyMembers.length,
      });
      const invoiceNumber = getInvoiceNumber(registration);
      const result = await sendWireConfirmationEmail({
        to: registration.email,
        participantName:
          `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant",
        reffId: registration.payment_reff_id,
        invoiceNumber,
        amount: registration.payment_amount,
        currency: registration.payment_currency,
        dueDate: new Date(pricing.period.endsISO).toLocaleDateString("en-GB", { dateStyle: "long" }),
        pdfBuffer,
      });
      emailSent = result.sent === true;
      if (!result.sent) {
        releaseInvoiceSendClaim(registration.payment_reff_id);
      }
    } catch (err) {
      console.error("[finalize:wire] email send failed", regId, err);
      releaseInvoiceSendClaim(registration.payment_reff_id);
    }
  }

  if (!registration.admin_notified_at) {
    pdfBuffer = await loadPdf(pdfBuffer, invoicePath);
    await notifyAdminOnce({ registration, familyMembers, pdfBuffer, logTag: "finalize:wire" });
  }

  return { state: "ok", invoice_path: invoicePath, email_sent: emailSent };
}

// Wire-transfer registrations are invoiced up front: proforma PDF + payment
// instructions by email. Shares the in-flight map with the paid flow; the key
// spaces don't overlap (reg-… vs iaup-…).
export async function finalizeWireRegistration(regId) {
  if (!regId) return { state: "missing-reg-id" };

  if (inFlight.has(regId)) {
    return inFlight.get(regId);
  }

  const promise = runWireFinalize(regId).finally(() => {
    inFlight.delete(regId);
  });

  inFlight.set(regId, promise);
  return promise;
}
