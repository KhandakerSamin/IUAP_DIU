import {
  getFamilyMembersForRegistration,
  getRegistrationByReffId,
  markInvoiceSent,
  setInvoicePath,
} from "@/lib/db";
import { writeInvoiceToDisk } from "@/lib/invoice";
import { sendInvoiceEmail } from "@/lib/mailer";

// In-flight deduplication so concurrent calls (IPN + payment-result page load)
// don't both generate the invoice and double-send emails.
const inFlight = new Map();

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

  if (!registration.invoice_sent_at) {
    try {
      if (!pdfBuffer && invoicePath) {
        const { readInvoiceFromDisk } = await import("@/lib/invoice");
        pdfBuffer = await readInvoiceFromDisk(invoicePath).catch(() => null);
      }
      const result = await sendInvoiceEmail({
        to: registration.email,
        participantName: `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant",
        reffId,
        amount: registration.payment_amount,
        currency: registration.payment_currency,
        pdfBuffer,
      });
      if (result.sent) {
        markInvoiceSent(reffId);
      }
    } catch (err) {
      console.error("[finalize] email send failed", reffId, err);
    }
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
