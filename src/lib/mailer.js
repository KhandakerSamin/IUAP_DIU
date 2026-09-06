import nodemailer from "nodemailer";
import path from "node:path";
import { existsSync } from "node:fs";
import { BANK_DETAILS, SECRETARIAT_EMAIL } from "@/lib/wire";

const SIGNATURE_LOGO_PATH = path.join(process.cwd(), "public", "iauplogo.jpg");

function getSignatureAttachment() {
  if (existsSync(SIGNATURE_LOGO_PATH)) {
    return [
      {
        filename: "iauplogo.jpg",
        path: SIGNATURE_LOGO_PATH,
        cid: "iaup-signature-logo",
      },
    ];
  }
  return [];
}

function getEmailSignatureHtml() {
  return `<div style="margin-top: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.6;">
  <p style="font-style: italic; margin: 0 0 16px 0; color: #1e293b; font-size: 14px;">Regards,</p>
  <p style="margin: 0 0 3px 0; font-weight: bold; font-size: 14px; color: #0f172a;">Event Secretariat</p>
  <p style="margin: 0 0 3px 0; color: #1e293b;">IAUP Semi Annual Meeting 2026</p>
  <p style="margin: 0 0 3px 0; color: #1e293b;">Hosted by <a href="https://daffodilvarsity.edu.bd" target="_blank" style="color: #0b3d91; text-decoration: underline;">Daffodil International University</a></p>
  <p style="margin: 0 0 3px 0; color: #1e293b;">Daffodil Smart City, Birulia, Savar, Dhaka &ndash; 1216, Bangladesh</p>
  <p style="margin: 0 0 3px 0; color: #1e293b;">Mobile: <a href="tel:+8801920012744" style="color: #0b3d91; text-decoration: underline;">+8801920012744</a>, <a href="tel:+8801847334763" style="color: #0b3d91; text-decoration: underline;">+8801847334763</a></p>
  <p style="margin: 0 0 16px 0; color: #1e293b;">Whatsapp: <a href="https://wa.me/8801920012744" style="color: #0b3d91; text-decoration: underline;">+8801920012744</a></p>
  <div style="margin-top: 14px;">
    <img src="cid:iaup-signature-logo" alt="IAUP Semi-Annual Meeting 2026" width="260" style="width: 260px; max-width: 100%; height: auto; display: block;" />
  </div>
</div>`;
}

function getEmailSignatureText() {
  return `Regards,

Event Secretariat
IAUP Semi Annual Meeting 2026
Hosted by Daffodil International University
Daffodil Smart City, Birulia, Savar, Dhaka – 1216, Bangladesh
Mobile: +8801920012744, +8801847334763
Whatsapp: +8801920012744`;
}

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

export async function sendInvoiceEmail({ to, participantName, reffId, invoiceNumber, amount, currency, pdfBuffer }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[mailer] SMTP not configured; skipping email to", to);
    return { sent: false, reason: "smtp-not-configured" };
  }
  if (!to) {
    return { sent: false, reason: "missing-recipient" };
  }

  const displayAmount = `${Number(amount || 0).toFixed(2)} ${currency || "BDT"}`;
  const invNo = invoiceNumber || (reffId?.startsWith?.("reg-") ? "IAUP-DIU-2026/101" : reffId);
  const safeInvNo = String(invNo).replace(/[^a-zA-Z0-9-_]/g, "");
  const isFree = Number(amount) === 0;
  const paymentLine = isFree
    ? "Your registration has been confirmed at no charge (coupon applied). Your invoice is attached to this email."
    : `We have received your payment of ${displayAmount}. Your invoice is attached to this email.`;

  const text = `Dear ${participantName || "Participant"},

Thank you for registering for the IAUP Semi-Annual Meeting 2026 hosted by Daffodil International University.

${paymentLine}

Invoice Number: ${invNo}
Registration Reference: ${reffId}

Should you have any queries, feel free to contact us at iaup-bd2026@daffodilvarsity.edu.bd.

${getEmailSignatureText()}`;

  const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.5; background-color: #f8fafc; padding: 20px;">
<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 28px;">
<p>Dear ${participantName || "Participant"},</p>
<p>Thank you for registering for the <strong>IAUP Semi-Annual Meeting 2026</strong> hosted by Daffodil International University.</p>
<p>${isFree ? "Your registration has been confirmed at <strong>no charge</strong> (coupon applied). Your invoice is attached to this email." : `We have received your payment of <strong>${displayAmount}</strong>. Your invoice is attached to this email.`}</p>
<p><strong>Invoice Number:</strong> <code style="background:#e0e7ff; color:#1e1b4b; padding:3px 8px; border-radius:4px; font-weight:bold;">${invNo}</code></p>
<p style="font-size:12px; color:#64748b;">Registration Reference: <code>${reffId}</code></p>
<p>Should you have any queries, feel free to contact us at <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd" style="color: #0b3d91;">iaup-bd2026@daffodilvarsity.edu.bd</a>.</p>
${getEmailSignatureHtml()}
</div>
</body></html>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      subject: isFree
        ? `IAUP 2026 Registration Confirmed — Complimentary (${invNo})`
        : `IAUP 2026 Registration — Payment Received (${invNo})`,
      text,
      html,
      attachments: [
        ...(pdfBuffer
          ? [
              {
                filename: `IAUP-DIU-2026-Invoice-${safeInvNo}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf",
              },
            ]
          : []),
        ...getSignatureAttachment(),
      ],
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
  invoiceNumber,
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
  const invNo = invoiceNumber || (reffId?.startsWith?.("reg-") ? "IAUP-DIU-2026/101" : reffId);
  const safeInvNo = String(invNo).replace(/[^a-zA-Z0-9-_]/g, "");

  const text = `Dear ${participantName || "Participant"},

Thank you for registering for the IAUP Semi-Annual Meeting 2026 hosted by Daffodil International University.

Your registration has been recorded. You have chosen to pay by wire transfer; the invoice attached to this email shows the registration amount: ${displayAmount}.

Invoice Number: ${invNo}
Registration Reference: ${reffId}

Account Information for Bank Transfer:
----------------------------------------
Account Name   : ${BANK_DETAILS.accountName}
Account Number : ${BANK_DETAILS.accountNumber}
Swift Code     : ${BANK_DETAILS.swiftCode}
Bank Name      : ${BANK_DETAILS.bankName}
Branch         : ${BANK_DETAILS.branch}
Zip Code       : ${BANK_DETAILS.zipCode}

** Note: ${BANK_DETAILS.note}

Once you complete the bank transfer, please reply or send a copy of your transaction/payment receipt to ${SECRETARIAT_EMAIL} for payment verification. Please quote your Invoice Number (${invNo}) in all correspondence.

Should you have any queries in the meantime, feel free to contact us at ${SECRETARIAT_EMAIL}.

${getEmailSignatureText()}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; line-height: 1.5; background-color: #f8fafc; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0b3d91; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; color: #1e293b; }
    .bank-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 18px 0; }
    .bank-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
    .bank-table td { padding: 5px 8px; vertical-align: top; }
    .bank-table td.label { width: 35%; color: #64748b; font-weight: 600; }
    .bank-table td.val { color: #0f172a; font-weight: 700; font-family: monospace, sans-serif; }
    .note { color: #b45309; font-size: 12px; font-weight: 600; margin-top: 10px; }
    .alert-box { background: #eff6ff; border-left: 4px solid #0b3d91; padding: 12px; margin: 16px 0; font-size: 13px; color: #1e40af; }
    .footer { font-size: 12px; color: #94a3b8; text-align: center; padding: 16px 24px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>Registration Confirmed — IAUP 2026</h2>
      <p>Daffodil International University, Bangladesh</p>
    </div>
    <div class="content">
      <p>Dear ${participantName || "Participant"},</p>
      <p>Thank you for registering for the <strong>IAUP Semi-Annual Meeting 2026</strong>. Your registration has been recorded. You have chosen to pay by <strong>wire transfer</strong>; the invoice attached to this email shows the registration amount: <strong>${displayAmount}</strong>.</p>
      <p><strong>Invoice Number:</strong> <code style="background:#e0e7ff; color:#1e1b4b; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:15px;">${invNo}</code></p>
      <p style="font-size:12px; color:#64748b;">Registration Reference: <code>${reffId}</code></p>
      
      <div class="bank-box">
        <h4 style="margin:0 0 8px; color:#0b3d91; font-size:14px;">Account Information for Bank Transfer:</h4>
        <table class="bank-table">
          <tr><td class="label">Account Name:</td><td class="val">${BANK_DETAILS.accountName}</td></tr>
          <tr><td class="label">Account Number:</td><td class="val">${BANK_DETAILS.accountNumber}</td></tr>
          <tr><td class="label">Swift Code:</td><td class="val">${BANK_DETAILS.swiftCode}</td></tr>
          <tr><td class="label">Bank Name:</td><td class="val">${BANK_DETAILS.bankName}</td></tr>
          <tr><td class="label">Branch:</td><td class="val">${BANK_DETAILS.branch}</td></tr>
          <tr><td class="label">Zip Code:</td><td class="val">${BANK_DETAILS.zipCode}</td></tr>
        </table>
        <p class="note">** Note: ${BANK_DETAILS.note}</p>
      </div>

      <div class="alert-box">
        <strong>Next Step:</strong> Once you complete the bank transfer, please reply or send a copy of your transaction/payment receipt to <a href="mailto:${SECRETARIAT_EMAIL}" style="color:#0b3d91; font-weight:bold;">${SECRETARIAT_EMAIL}</a> for payment verification. Please quote your Invoice Number (<code>${invNo}</code>) in all correspondence.
      </div>

      ${getEmailSignatureHtml()}
    </div>
    <div class="footer">
      Auto-generated invoice &middot; IAUP Secretariat, Daffodil International University
    </div>
  </div>
</body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to,
      subject: `IAUP 2026 Registration Confirmed — Invoice ${invNo}`,
      text,
      html,
      attachments: [
        ...(pdfBuffer
          ? [
              {
                filename: `IAUP-DIU-2026-Invoice-${safeInvNo}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf",
              },
            ]
          : []),
        ...getSignatureAttachment(),
      ],
    });
    console.log("[mailer] wire confirmation emailed to", to, "messageId=", info?.messageId);
    return { sent: true, messageId: info?.messageId };
  } catch (err) {
    console.error("[mailer] wire send failed to", to, err?.message || err);
    return { sent: false, reason: "send-failed", error: err?.message };
  }
}

export async function sendRegistrationAdminNotification({
  registration,
  familyMembers = [],
  pricing,
  pdfBuffer,
}) {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || SECRETARIAT_EMAIL;

  if (!transporter) {
    console.log("[mailer] SMTP not configured; skipping admin notification to", adminEmail);
    return { sent: false, reason: "smtp-not-configured" };
  }

  const fullName = [registration.title, registration.other_title, registration.given_name, registration.surname]
    .filter(Boolean)
    .join(" ")
    .trim() || "Participant";

  const feeDisplay = pricing
    ? `${pricing.totalFee} ${pricing.currency}`
    : registration.payment_amount
    ? `${registration.payment_amount} ${registration.payment_currency || ""}`
    : "Pending calculation";

  const familyListText =
    familyMembers.length > 0
      ? familyMembers
          .map(
            (fm, i) =>
              `  ${i + 1}. ${fm.fullName || fm.full_name || "—"} | Passport: ${fm.passportNo || fm.passport_no || "—"} | Email: ${fm.email || "—"} | Phone: ${fm.phone || "—"} | T-shirt: ${fm.tShirtSize || fm.tshirt_size || "—"}`
          )
          .join("\n")
      : "None";

  const text = `New Registration Received for IAUP Semi-Annual Meeting 2026

Registration ID: ${registration.reg_id}
Participant Name: ${fullName}
Email: ${registration.email}
Alternative Email: ${registration.alternative_email || "N/A"}
Phone: ${registration.phone || "N/A"}
WhatsApp: ${registration.whatsapp || "N/A"}
Organization: ${registration.organization || "N/A"}
Position/Designation: ${registration.position || "N/A"}
Department: ${registration.department || "N/A"}
Address: ${[registration.address, registration.city, registration.zip_code, registration.country].filter(Boolean).join(", ") || "N/A"}
Nationality: ${registration.nationality || "N/A"}
Passport No: ${registration.passport_no || "N/A"}
Date of Birth: ${registration.date_of_birth || "N/A"}
Gender: ${registration.gender || "N/A"}
T-Shirt Size: ${registration.tshirt_size || "N/A"}
Food Requirement: ${[registration.food_requirement, registration.other_food].filter(Boolean).join(" - ") || "N/A"}
Local Participant: ${registration.is_local_participant || "No"}
Member University: ${registration.is_member_university || "No"}
Affiliation: ${registration.member_affiliation || "N/A"}
Needs Invitation Letter: ${registration.needs_invitation_letter || "No"}
Optional Post-Event Tour: ${registration.post_event_tour || "No"}
Payment Method: ${registration.payment_method || "N/A"}
Payment Status: ${registration.payment_status || "pending"}
Registration Fee: ${feeDisplay}

Accompanying Family Members (${familyMembers.length}):
${familyListText}

Submitted at: ${new Date().toISOString()}

---
${getEmailSignatureText()}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 20px; }
    .card { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
    .header { background: #0b3d91; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; font-size: 14px; line-height: 1.6; }
    .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .table th, .table td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #f1f5f9; }
    .table th { width: 35%; color: #64748b; font-weight: 600; font-size: 13px; }
    .table td { color: #0f172a; font-weight: 500; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #e0f2fe; color: #0369a1; }
    .badge-paid { background: #dcfce7; color: #15803d; }
    .badge-pending { background: #fef3c7; color: #b45309; }
    .family-box { margin-top: 16px; background: #f8fafc; border-radius: 8px; padding: 12px; border: 1px solid #e2e8f0; }
    .footer { font-size: 12px; color: #94a3b8; text-align: center; padding: 16px 24px; border-top: 1px solid #f1f5f9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h2>New Registration Received</h2>
      <p>IAUP Semi-Annual Meeting 2026 | Daffodil International University</p>
    </div>
    <div class="content">
      <p style="margin-top: 0;">A new participant registration has just been submitted:</p>
      <table class="table">
        <tr><th>Registration ID</th><td><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px;">${registration.reg_id}</code></td></tr>
        <tr><th>Full Name</th><td><strong>${fullName}</strong></td></tr>
        <tr><th>Email</th><td><a href="mailto:${registration.email}">${registration.email}</a></td></tr>
        ${registration.alternative_email ? `<tr><th>Alt. Email</th><td>${registration.alternative_email}</td></tr>` : ""}
        <tr><th>Phone</th><td>${registration.phone || "—"}</td></tr>
        ${registration.whatsapp ? `<tr><th>WhatsApp</th><td>${registration.whatsapp}</td></tr>` : ""}
        <tr><th>Organization / University</th><td>${registration.organization || "—"}</td></tr>
        <tr><th>Position / Designation</th><td>${registration.position || "—"}</td></tr>
        <tr><th>Department</th><td>${registration.department || "—"}</td></tr>
        <tr><th>Country</th><td>${registration.country || "—"}</td></tr>
        <tr><th>City / Address</th><td>${[registration.address, registration.city, registration.zip_code].filter(Boolean).join(", ") || "—"}</td></tr>
        <tr><th>Nationality</th><td>${registration.nationality || "—"}</td></tr>
        <tr><th>Passport No</th><td>${registration.passport_no || "—"}</td></tr>
        <tr><th>T-Shirt Size</th><td>${registration.tshirt_size || "—"}</td></tr>
        <tr><th>Food Requirement</th><td>${[registration.food_requirement, registration.other_food].filter(Boolean).join(" - ") || "—"}</td></tr>
        <tr><th>Local Participant</th><td><strong>${registration.is_local_participant || "No"}</strong></td></tr>
        <tr><th>Member University</th><td>${registration.is_member_university || "No"}</td></tr>
        ${registration.member_affiliation ? `<tr><th>Affiliation</th><td><span class="badge">${registration.member_affiliation}</span></td></tr>` : ""}
        <tr><th>Needs Invitation Letter</th><td>${registration.needs_invitation_letter || "No"}</td></tr>
        <tr><th>Post-Event Tour</th><td>${registration.post_event_tour || "No"}</td></tr>
        <tr><th>Payment Method</th><td><strong>${registration.payment_method === "wire-transfer" ? "Wire Transfer" : "Online Payment"}</strong></td></tr>
        <tr><th>Payment Status</th><td><span class="badge ${registration.payment_status === "paid" ? "badge-paid" : "badge-pending"}">${registration.payment_status || "pending"}</span></td></tr>
        <tr><th>Registration Fee</th><td><strong style="color:#0b3d91; font-size:15px;">${feeDisplay}</strong></td></tr>
      </table>

      ${
        familyMembers.length > 0
          ? `<div class="family-box">
               <h4 style="margin: 0 0 8px; font-size: 13px; color: #334155;">Accompanying Family Members (${familyMembers.length}):</h4>
               <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569;">
                 ${familyMembers
                   .map(
                     (fm) =>
                       `<li><strong>${fm.fullName || fm.full_name || "—"}</strong> &middot; Passport: ${fm.passportNo || fm.passport_no || "—"} &middot; Email: ${fm.email || "—"} &middot; Phone: ${fm.phone || "—"} &middot; T-Shirt: ${fm.tShirtSize || fm.tshirt_size || "—"}</li>`
                   )
                   .join("")}
               </ul>
             </div>`
          : ""
      }

      ${getEmailSignatureHtml()}
    </div>
    <div class="footer">
      Auto-generated notification &middot; IAUP Secretariat, Daffodil International University, Bangladesh
    </div>
  </div>
</body>
</html>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress(),
      to: adminEmail,
      subject: `New Registration: ${fullName} (${registration.reg_id})`,
      text,
      html,
      attachments: [
        ...(pdfBuffer
          ? [
              {
                filename: `IAUP-DIU-2026-Invoice-${registration.reg_id}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf",
              },
            ]
          : []),
        ...getSignatureAttachment(),
      ],
    });
    console.log("[mailer] admin notification sent to", adminEmail, "messageId=", info?.messageId);
    return { sent: true, messageId: info?.messageId };
  } catch (err) {
    console.error("[mailer] admin notification failed", err?.message || err);
    return { sent: false, reason: "send-failed", error: err?.message };
  }
}

