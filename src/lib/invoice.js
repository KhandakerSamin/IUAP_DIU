import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import { dataDir } from "@/lib/db";

const PRIMARY = "#0b3d91";
const MUTED = "#64748b";
const LINE = "#e2e8f0";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
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
    paddingBottom: 18,
  },
  eventTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: PRIMARY },
  eventSubtitle: { fontSize: 10, color: MUTED, marginTop: 3 },
  invoiceTitle: { fontSize: 28, fontFamily: "Helvetica-Bold", color: PRIMARY, letterSpacing: 2 },
  invoiceMetaRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 4 },
  invoiceMetaLabel: { fontSize: 9, color: MUTED, marginRight: 6 },
  invoiceMetaValue: { fontSize: 9, fontFamily: "Helvetica-Bold" },
  section: { marginTop: 22 },
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  tableRowLast: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cellDesc: { flex: 3 },
  cellQty: { flex: 0.6, textAlign: "right" },
  cellAmount: { flex: 1.2, textAlign: "right" },
  muted: { color: MUTED, fontSize: 9, marginTop: 3 },

  totalsWrap: { flexDirection: "row", justifyContent: "flex-end", marginTop: 14 },
  totalsBox: { width: 220 },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalsLabel: { color: MUTED },
  totalsDivider: { borderTopWidth: 1, borderTopColor: LINE, marginVertical: 4 },
  totalsTotalLabel: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  totalsTotalValue: { fontFamily: "Helvetica-Bold", fontSize: 12, color: PRIMARY },

  paymentGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 6 },
  paymentItem: { width: "50%", marginBottom: 6 },
  paymentLabel: { fontSize: 9, color: MUTED },
  paymentValue: { fontSize: 10 },

  footer: {
    position: "absolute",
    left: 40,
    right: 40,
    bottom: 24,
    fontSize: 9,
    color: MUTED,
    borderTopWidth: 1,
    borderTopColor: LINE,
    paddingTop: 8,
    textAlign: "center",
  },

  paidPill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    borderRadius: 10,
  },
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

function InvoiceDoc({ registration, familyMembers }) {
  const fullName = `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant";
  const amount = registration.payment_amount || "0";
  const currency = (registration.payment_currency || "BDT").toUpperCase();
  const tranId = registration.payment_tran_id || "—";
  const reffId = registration.payment_reff_id || "—";
  const familyCount = familyMembers.length;

  const lineItem = familyCount
    ? `IAUP Semi-Annual Meeting 2026 — Registration (1 participant + ${familyCount} family member${familyCount > 1 ? "s" : ""})`
    : "IAUP Semi-Annual Meeting 2026 — Registration";

  return (
    <Document title={`IAUP Invoice ${reffId}`} author="IAUP Secretariat">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eventTitle}>IAUP Semi-Annual Meeting 2026</Text>
            <Text style={styles.eventSubtitle}>Daffodil International University, Dhaka · 19–21 November 2026</Text>
            <Text style={styles.paidPill}>PAID</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Invoice #</Text>
              <Text style={styles.invoiceMetaValue}>{reffId}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Date</Text>
              <Text style={styles.invoiceMetaValue}>{formatDate(registration.updated_at || new Date().toISOString())}</Text>
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
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.cellDesc]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.cellQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.cellAmount]}>Amount</Text>
            </View>
            <View style={styles.tableRowLast}>
              <View style={styles.cellDesc}>
                <Text>{lineItem}</Text>
                {familyCount > 0 ? (
                  <Text style={styles.muted}>
                    Accompanying: {familyMembers.map((f) => f.full_name).filter(Boolean).join(", ")}
                  </Text>
                ) : null}
              </View>
              <Text style={styles.cellQty}>1</Text>
              <Text style={styles.cellAmount}>{formatAmount(amount, currency)}</Text>
            </View>
          </View>

          <View style={styles.totalsWrap}>
            <View style={styles.totalsBox}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Subtotal</Text>
                <Text>{formatAmount(amount, currency)}</Text>
              </View>
              <View style={styles.totalsDivider} />
              <View style={styles.totalsRow}>
                <Text style={styles.totalsTotalLabel}>Total</Text>
                <Text style={styles.totalsTotalValue}>{formatAmount(amount, currency)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment details</Text>
          <View style={styles.paymentGrid}>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Transaction ID</Text>
              <Text style={styles.paymentValue}>{tranId}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Gateway reference</Text>
              <Text style={styles.paymentValue}>{reffId}</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Method</Text>
              <Text style={styles.paymentValue}>Online Payment · 1Card</Text>
            </View>
            <View style={styles.paymentItem}>
              <Text style={styles.paymentLabel}>Currency</Text>
              <Text style={styles.paymentValue}>{currency}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for registering. For any queries contact iaup-bd2026@daffodilvarsity.edu.bd · IAUP Secretariat,
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
