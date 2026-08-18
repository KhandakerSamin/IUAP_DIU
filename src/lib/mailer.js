import nodemailer from "nodemailer";
import { SECRETARIAT_EMAIL } from "@/lib/wire";

let cachedTransporter = null;

function isConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  if (!isConfigured()) return null;

  const secure = String(process.env.SMTP_SECURE || "false").toLowerCase() === "true";
  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return cachedTransporter;
}

function fromAddress() {
  const email = process.env.SMTP_FROM || process.env.SMTP_USER || "no-reply@example.com";
  const name = process.env.SMTP_FROM_NAME || "IAUP Secretariat";
  return `${name} <${email}>`;
}

export async function sendInvoiceEmail({ to, participantName, reffId, amount, currency, pdfBuffer }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[mailer] SMTP not configured; skipping email to", to);
    return { sent: false, reason: "smtp-not-configured" };
  }
  if (!to) {
    return { sent: false, reason: "missing-recipient" };
  }

  const displayAmount = `${Number(amount || 0).toFixed(2)} ${currency || "BDT"}`;

  const text = `Dear ${participantName || "Participant"},

Thank you for registering for the IAUP Semi-Annual Meeting 2026 hosted by Daffodil International University.

We have received your payment of ${displayAmount}. Your invoice is attached to this email.

Reference: ${reffId}

Should you have any queries, feel free to contact us at iaup-bd2026@daffodilvarsity.edu.bd.

Best regards,
DIU Secretariat, IAUP Semi-Annual Meeting 2026
Daffodil International University, Bangladesh`;

  const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, Segoe UI, sans-serif; color: #0f172a; line-height: 1.5;">
<p>Dear ${participantName || "Participant"},</p>
<p>Thank you for registering for the <strong>IAUP Semi-Annual Meeting 2026</strong> hosted by Daffodil International University.</p>
<p>We have received your payment of <strong>${displayAmount}</strong>. Your invoice is attached to this email.</p>
<p>Reference: <code>${reffId}</code></p>
<p>Should you have any queries, feel free to contact us at <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd">iaup-bd2026@daffodilvarsity.edu.bd</a>.</p>
<p>Best regards,<br/>DIU Secretariat, IAUP Semi-Annual Meeting 2026<br/>Daffodil International University, Bangladesh</p>
</body></html>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      subject: `IAUP 2026 Registration — Payment Received (${reffId})`,
      text,
      html,
      attachments: pdfBuffer
        ? [
            {
              filename: `IAUP-2026-Invoice-${reffId}.pdf`,
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ]
        : [],
    });
    console.log("[mailer] invoice emailed to", to, "messageId=", info?.messageId);
    return { sent: true, messageId: info?.messageId };
  } catch (err) {
    console.error("[mailer] send failed to", to, err?.message || err);
    return { sent: false, reason: "send-failed", error: err?.message };
  }
}

export async function sendWireConfirmationEmail({
  to,
  participantName,
  reffId,
  amount,
  currency,
  dueDate,
  pdfBuffer,
}) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[mailer] SMTP not configured; skipping wire confirmation to", to);
    return { sent: false, reason: "smtp-not-configured" };
  }
  if (!to) {
    return { sent: false, reason: "missing-recipient" };
  }

  const displayAmount = `${Number(amount || 0).toFixed(2)} ${currency || "USD"}`;
  const dueLine = dueDate ? `The registration fee is due on or before ${dueDate}.` : "";

  const text = `Dear ${participantName || "Participant"},

Thank you for registering for the IAUP Semi-Annual Meeting 2026 hosted by Daffodil International University.

Your registration has been confirmed and recorded. You have chosen to pay by wire transfer; the invoice attached to this email shows the amount due: ${displayAmount}.

Invoice number: ${reffId}
${dueLine}

Our Secretariat will contact you at this email address with the wire transfer instructions. Please quote the invoice number in all correspondence.

Should you have any queries in the meantime, feel free to contact us at ${SECRETARIAT_EMAIL}.

Best regards,
DIU Secretariat, IAUP Semi-Annual Meeting 2026
Daffodil International University, Bangladesh`;

  const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, Segoe UI, sans-serif; color: #0f172a; line-height: 1.5;">
<p>Dear ${participantName || "Participant"},</p>
<p>Thank you for registering for the <strong>IAUP Semi-Annual Meeting 2026</strong> hosted by Daffodil International University.</p>
<p>Your registration has been <strong>confirmed</strong> and recorded. You have chosen to pay by <strong>wire transfer</strong>; the invoice attached to this email shows the amount due: <strong>${displayAmount}</strong>.</p>
<p>Invoice number: <code>${reffId}</code>${dueLine ? `<br/>${dueLine}` : ""}</p>
<p>Our Secretariat will contact you at this email address with the wire transfer instructions. Please quote the invoice number in all correspondence.</p>
<p>Should you have any queries in the meantime, feel free to contact us at <a href="mailto:${SECRETARIAT_EMAIL}">${SECRETARIAT_EMAIL}</a>.</p>
<p>Best regards,<br/>DIU Secretariat, IAUP Semi-Annual Meeting 2026<br/>Daffodil International University, Bangladesh</p>
</body></html>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      subject: `IAUP 2026 Registration Confirmed — Invoice ${reffId}`,
      text,
      html,
      attachments: pdfBuffer
        ? [
            {
              filename: `IAUP-2026-Proforma-Invoice-${reffId}.pdf`,
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ]
        : [],
    });
    console.log("[mailer] wire confirmation emailed to", to, "messageId=", info?.messageId);
    return { sent: true, messageId: info?.messageId };
  } catch (err) {
    console.error("[mailer] wire send failed to", to, err?.message || err);
    return { sent: false, reason: "send-failed", error: err?.message };
  }
}
