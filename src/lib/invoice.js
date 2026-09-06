import fs from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import React from "react";
import { Document, Page, Text, View, Image, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { dataDir } from "@/lib/db";
import { calculatePricing, FAMILY_MEMBER_FEE_USD, REGISTRATION_PERIODS } from "@/lib/pricing";
import { BANK_DETAILS, WIRE_NOTE } from "@/lib/wire";

const LOGO_PATH = existsSync(path.join(process.cwd(), "public", "iauplogo.jpg"))
  ? path.join(process.cwd(), "public", "iauplogo.jpg")
  : path.join(process.cwd(), "public", "iuap_invoice.jpg");
const LOGO_DATA_URI = existsSync(LOGO_PATH)
  ? `data:image/jpeg;base64,${readFileSync(LOGO_PATH).toString("base64")}`
  : null;

const DIU_LOGO_PATH = existsSync(path.join(process.cwd(), "public", "diuLogo.png"))
  ? path.join(process.cwd(), "public", "diuLogo.png")
  : path.join(process.cwd(), "public", "diu-logo-transparent.png");
const DIU_LOGO_DATA_URI = existsSync(DIU_LOGO_PATH)
  ? `data:image/png;base64,${readFileSync(DIU_LOGO_PATH).toString("base64")}`
  : null;

const PRIMARY = "#0b3d91";
const MUTED = "#64748b";
const LINE = "#e2e8f0";

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY,
    paddingBottom: 16,
  },
  eventTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: PRIMARY },
  eventSubtitle: { fontSize: 10, color: MUTED, marginTop: 3 },
  headerLogo: { width: 220, height: 78, objectFit: "contain" },
  diuHeaderLogo: { width: 140, height: 50, objectFit: "contain", marginBottom: 8 },
  invoiceTitle: { fontSize: 26, fontFamily: "Helvetica-Bold", color: PRIMARY, letterSpacing: 2 },
  invoiceMetaRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4 },
  invoiceMetaLabel: { fontSize: 9, color: MUTED, marginRight: 6 },
  invoiceMetaValue: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 9,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: MUTED,
    marginBottom: 6,
    fontFamily: "Helvetica-Bold",
  },
  billedText: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  billedLine: { fontSize: 10, marginBottom: 1, color: "#334155" },

  table: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  tableHeaderCell: { fontSize: 9, fontFamily: "Helvetica-Bold", color: MUTED },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  tableRowLast: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  cellDesc: { flex: 3 },
  cellQty: { flex: 0.6, textAlign: "right" },
  cellAmount: { flex: 1.2, textAlign: "right" },
  muted: { color: MUTED, fontSize: 9, marginTop: 3 },

  totalsWrap: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  totalsBox: { width: 220 },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
  totalsLabel: { color: MUTED },
  totalsDivider: { borderTopWidth: 1, borderTopColor: LINE, marginVertical: 4 },
  totalsTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  totalsTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 12, color: PRIMARY },

  paymentGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  paymentItem: { width: "50%", marginBottom: 4 },
  paymentLabel: { fontSize: 8.5, color: MUTED },
  paymentValue: { fontSize: 9.5 },

  bankBox: {
    marginTop: 6,
    padding: 8,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: LINE,
    borderRadius: 4,
  },
  bankTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    marginBottom: 4,
  },
  bankGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  bankItem: {
    width: "50%",
    marginBottom: 3,
  },
  bankLabel: {
    fontSize: 8,
    color: MUTED,
  },
  bankValue: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  bankNote: {
    fontSize: 8,
    color: "#b45309",
    fontFamily: "Helvetica-Bold",
    marginTop: 3,
  },

  autoGenNote: {
    fontSize: 8,
    color: MUTED,
    fontStyle: "italic",
    marginTop: 10,
  },

  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 16,
    fontSize: 8,
    color: MUTED,
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 6,
    textAlign: "center",
    lineHeight: 1.3,
  },

  wireNote: { fontSize: 8.5, color: MUTED, marginTop: 4, lineHeight: 1.35 },
});

function formatAmount(n, currency = "BDT") {
  const num = Number(n);
  const safe = Number.isFinite(num) ? num : 0;
  return `${safe.toFixed(2)} ${currency}`;
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(typeof value === "string" && !value.endsWith("Z") ? `${value}Z` : value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" });
}

export function getInvoiceNumber(registration) {
  const idNum = Number(registration?.id);
  if (Number.isFinite(idNum) && idNum > 0) {
    return `IAUP-DIU-2026/${100 + idNum}`;
  }
  return "IAUP-DIU-2026/101";
}

function InvoiceDoc({ registration, familyMembers }) {
  const fullName = `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant";
  const amount = registration.payment_amount || "0";
  const currency = (registration.payment_currency || "USD").toUpperCase();
  const tranId = registration.payment_tran_id || "—";
  const reffId = registration.payment_reff_id || "—";
  const invoiceNo = getInvoiceNumber(registration);
  const isPaid = registration.payment_status === "paid";
  const familyCount = familyMembers.length;
  const isLocal = registration.is_local_participant === "Yes";
  const isMember = registration.is_member_university === "Yes";
  const isWire = registration.payment_method === "wire-transfer";
  const couponCode = registration.coupon_code;

  const storedPeriodKey = registration.registration_period;
  const periodMeta = REGISTRATION_PERIODS.find((p) => p.key === storedPeriodKey);
  const pricing = calculatePricing({
    isLocal,
    isMember,
    familyMembersCount: familyCount,
  });
  const periodLabel = periodMeta?.label || pricing.period.label;
  const periodRange = periodMeta?.range || pricing.period.range;
  const baseFee = pricing.baseFee;
  const familyFee = pricing.familyFeeUsd;
  const feeCurrency = pricing.currency;

  const baseLabel = isLocal
    ? `IAUP Semi-Annual Meeting 2026 — Registration (Local Participant · ${periodLabel})`
    : `IAUP Semi-Annual Meeting 2026 — Registration (${isMember ? "Member" : "Non-member"} · ${periodLabel})`;

  return (
    <Document title={`IAUP Invoice ${invoiceNo}`} author="IAUP Secretariat">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {DIU_LOGO_DATA_URI ? <Image src={DIU_LOGO_DATA_URI} style={styles.diuHeaderLogo} /> : null}
            {LOGO_DATA_URI ? (
              <Image src={LOGO_DATA_URI} style={styles.headerLogo} />
            ) : (
              <>
                <Text style={styles.eventTitle}>IAUP Semi-Annual Meeting 2026</Text>
                <Text style={styles.eventSubtitle}>Daffodil International University, Dhaka · 19–21 November 2026</Text>
              </>
            )}
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Invoice #</Text>
              <Text style={styles.invoiceMetaValue}>{invoiceNo}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Date</Text>
              <Text style={styles.invoiceMetaValue}>{formatDate(registration.updated_at || new Date().toISOString())}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Reg ID</Text>
              <Text style={styles.invoiceMetaValue}>{registration.reg_id || reffId}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Billed to</Text>
          <Text style={styles.billedText}>{fullName}</Text>
          <Text style={styles.billedLine}>{registration.email || ""}</Text>
          {registration.phone ? <Text style={styles.billedLine}>{registration.phone}</Text> : null}
          {registration.organization ? <Text style={styles.billedLine}>{registration.organization}</Text> : null}
          {[registration.address, registration.city, registration.country].filter(Boolean).length > 0 ? (
            <Text style={styles.billedLine}>
              {[registration.address, registration.city, registration.zip_code, registration.country]
                .filter(Boolean)
                .join(", ")}
            </Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.muted}>Registration period: {periodLabel} ({periodRange})</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.cellDesc]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.cellQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.cellAmount]}>Amount</Text>
            </View>
            <View style={familyCount > 0 ? styles.tableRow : styles.tableRowLast}>
              <View style={styles.cellDesc}>
                <Text>{baseLabel}</Text>
              </View>
              <Text style={styles.cellQty}>1</Text>
              <Text style={styles.cellAmount}>{formatAmount(baseFee, feeCurrency)}</Text>
            </View>
            {familyCount > 0 ? (
              <View style={styles.tableRowLast}>
                <View style={styles.cellDesc}>
                  <Text>Accompanying family members</Text>
                  <Text style={styles.muted}>
                    {familyMembers.map((f) => f.full_name).filter(Boolean).join(", ")}
                  </Text>
                </View>
                <Text style={styles.cellQty}>{familyCount}</Text>
                <Text style={styles.cellAmount}>{formatAmount(familyFee, "USD")}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.totalsWrap}>
            <View style={styles.totalsBox}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Subtotal</Text>
                <Text>{formatAmount(baseFee + (isLocal ? 0 : familyFee), feeCurrency)}</Text>
              </View>
              {couponCode ? (
                <View style={styles.totalsRow}>
                  <Text style={styles.totalsLabel}>Discount (Coupon: {couponCode})</Text>
                  <Text>-{formatAmount(baseFee + (isLocal ? 0 : familyFee), feeCurrency)}</Text>
                </View>
              ) : null}
              <View style={styles.totalsDivider} />
              <View style={styles.totalsRow}>
                <Text style={styles.totalsTotalLabel}>Total</Text>
                <Text style={styles.totalsTotalValue}>{formatAmount(amount, currency)}</Text>
              </View>
            </View>
          </View>
        </View>

        {isWire ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment details</Text>
            <View style={styles.paymentGrid}>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Method</Text>
                <Text style={styles.paymentValue}>Wire Transfer</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Invoice Number</Text>
                <Text style={styles.paymentValue}>{invoiceNo}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Currency</Text>
                <Text style={styles.paymentValue}>{currency}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Status</Text>
                <Text style={styles.paymentValue}>{isPaid ? "Paid" : "Awaiting transfer"}</Text>
              </View>
            </View>

            <View style={styles.bankBox}>
              <Text style={styles.bankTitle}>Account Information (Bank Transfer)</Text>
              <View style={styles.bankGrid}>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Account Name</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.accountName}</Text>
                </View>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Account Number</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.accountNumber}</Text>
                </View>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Swift Code</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.swiftCode}</Text>
                </View>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Bank Name</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.bankName}</Text>
                </View>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Branch</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.branch}</Text>
                </View>
                <View style={styles.bankItem}>
                  <Text style={styles.bankLabel}>Zip Code</Text>
                  <Text style={styles.bankValue}>{BANK_DETAILS.zipCode}</Text>
                </View>
              </View>
              <Text style={styles.bankNote}>** Note: {BANK_DETAILS.note}</Text>
            </View>

            <Text style={styles.wireNote}>{WIRE_NOTE}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment details</Text>
            <View style={styles.paymentGrid}>
              {couponCode ? null : (
                <View style={styles.paymentItem}>
                  <Text style={styles.paymentLabel}>Transaction ID</Text>
                  <Text style={styles.paymentValue}>{tranId}</Text>
                </View>
              )}
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Invoice Number</Text>
                <Text style={styles.paymentValue}>{invoiceNo}</Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Method</Text>
                <Text style={styles.paymentValue}>
                  {couponCode ? `Complimentary (Coupon: ${couponCode})` : "Online Payment · 1Card"}
                </Text>
              </View>
              <View style={styles.paymentItem}>
                <Text style={styles.paymentLabel}>Currency</Text>
                <Text style={styles.paymentValue}>{currency}</Text>
              </View>
            </View>
          </View>
        )}

        <Text style={styles.autoGenNote}>
          * This invoice is auto-generated and does not require a physical signature.
        </Text>

        <Text style={styles.footer}>
          This invoice is auto-generated. Thank you for registering. For any queries contact iaup-bd2026@daffodilvarsity.edu.bd · IAUP Secretariat,
          Daffodil International University, Bangladesh
        </Text>
      </Page>
    </Document>
  );
}

export async function generateInvoiceBuffer({ registration, familyMembers }) {
  return renderToBuffer(<InvoiceDoc registration={registration} familyMembers={familyMembers || []} />);
}

export async function writeInvoiceToDisk({ registration, familyMembers }) {
  const reffId = registration?.payment_reff_id;
  if (!reffId) throw new Error("writeInvoiceToDisk: missing payment_reff_id");

  const buffer = await generateInvoiceBuffer({ registration, familyMembers });
  const dir = path.join(dataDir(), "invoices");
  await fs.mkdir(dir, { recursive: true });
  const safeReff = String(reffId).replace(/[^a-zA-Z0-9-_]/g, "");
  const fileName = `${safeReff}.pdf`;
  const abs = path.join(dir, fileName);
  await fs.writeFile(abs, buffer, { mode: 0o600 });
  return { relativePath: path.join("invoices", fileName), buffer };
}

export async function readInvoiceFromDisk(relativePath) {
  const safeRelative = path.posix.normalize(String(relativePath || "")).replace(/^\/+/, "");
  if (safeRelative.includes("..") || path.isAbsolute(safeRelative)) {
    throw new Error("Invalid invoice path.");
  }
  const abs = path.join(dataDir(), safeRelative);
  return fs.readFile(abs);
}
