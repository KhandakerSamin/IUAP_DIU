import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import Link from "next/link";
import { getRegistrationByReffId, markPaymentStatus } from "@/lib/db";
import { verifyPayment } from "@/lib/payment";
import { finalizePaidPayment } from "@/lib/paymentFinalize";

export const metadata = {
  title: "Payment Status | IAUP Semi-Annual Meeting 2026",
  description: "Status of your IAUP 2026 registration payment.",
};

export const dynamic = "force-dynamic";

const STATE_STYLES = {
  success: {
    title: "Payment Received",
    box: "border-emerald-200 bg-emerald-50 text-emerald-900",
    actionBorder: "border-emerald-300 hover:bg-emerald-100",
  },
  failed: {
    title: "Payment Not Completed",
    box: "border-red-200 bg-red-50 text-red-900",
    actionBorder: "border-red-300 hover:bg-red-100",
  },
  pending: {
    title: "Payment Pending",
    box: "border-amber-200 bg-amber-50 text-amber-900",
    actionBorder: "border-amber-300 hover:bg-amber-100",
  },
  error: {
    title: "Verification Issue",
    box: "border-slate-200 bg-slate-50 text-slate-900",
    actionBorder: "border-slate-300 hover:bg-slate-100",
  },
};

export default async function PaymentResultPage({ searchParams }) {
  const sp = await searchParams;
  const raw = sp?.reff_id;
  const reffId = Array.isArray(raw) ? raw[0] : raw;

  const result = await verifyPayment(reffId);

  if (reffId) {
    try {
      if (result.state === "success") {
        markPaymentStatus(reffId, "paid", { tran_id: result.details?.tran_id });
      } else if (result.state === "failed") {
        markPaymentStatus(reffId, "failed");
      }
    } catch (err) {
      console.error("[payment-result] DB update failed", reffId, err);
    }

    if (result.state === "success") {
      await finalizePaidPayment(reffId).catch((err) =>
        console.error("[payment-result] finalize error", reffId, err)
      );
    }
  }

  let invoiceAvailable = false;
  if (reffId && result.state === "success") {
    const row = getRegistrationByReffId(reffId);
    invoiceAvailable = Boolean(row?.invoice_path);
  }

  const styles = STATE_STYLES[result.state] || STATE_STYLES.error;
  const details = result.state === "success" ? result.details : null;

  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <section className="relative overflow-hidden py-10 sm:py-14">
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className={`rounded-3xl border p-6 sm:p-8 ${styles.box}`}>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">{styles.title}</h1>
              <p className="mt-3 text-sm sm:text-base">{result.message}</p>

              {details && (
                <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  {details.tran_id && (
                    <div>
                      <dt className="font-semibold">Transaction ID</dt>
                      <dd className="font-mono break-all">{details.tran_id}</dd>
                    </div>
                  )}
                  {details.amount && (
                    <div>
                      <dt className="font-semibold">Amount</dt>
                      <dd>
                        {details.amount} {details.currency || ""}
                      </dd>
                    </div>
                  )}
                  {details.card_brand && (
                    <div>
                      <dt className="font-semibold">Card</dt>
                      <dd>
                        {details.card_brand}
                        {details.card_no ? ` · ${details.card_no}` : ""}
                      </dd>
                    </div>
                  )}
                  {details.tran_date && (
                    <div>
                      <dt className="font-semibold">Date</dt>
                      <dd>{details.tran_date}</dd>
                    </div>
                  )}
                </dl>
              )}

              {reffId && (
                <p className="mt-6 text-xs">
                  Reference: <strong className="font-mono break-all">{reffId}</strong>
                </p>
              )}

              <p className="mt-4 text-sm">
                Need help? Contact{" "}
                <a className="underline" href="mailto:iaup-bd2026@daffodilvarsity.edu.bd">
                  iaup-bd2026@daffodilvarsity.edu.bd
                </a>
                .
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {result.state === "success" && invoiceAvailable && reffId && (
                  <a
                    href={`/api/invoice/${encodeURIComponent(reffId)}`}
                    className={`rounded-xl border bg-white px-4 py-2 text-sm font-semibold transition ${styles.actionBorder}`}
                  >
                    Download Invoice (PDF)
                  </a>
                )}
                {result.state === "failed" && (
                  <>
                    <Link
                      href="/registration/online-payment"
                      className={`rounded-xl border bg-white px-4 py-2 text-sm font-medium transition ${styles.actionBorder}`}
                    >
                      Retry Payment
                    </Link>
                    <Link
                      href="/registration"
                      className={`rounded-xl border bg-white px-4 py-2 text-sm font-medium transition ${styles.actionBorder}`}
                    >
                      Edit Registration
                    </Link>
                  </>
                )}
                {result.state === "pending" && reffId && (
                  <Link
                    href={`/registration/payment-result?reff_id=${encodeURIComponent(reffId)}`}
                    className={`rounded-xl border bg-white px-4 py-2 text-sm font-medium transition ${styles.actionBorder}`}
                  >
                    Refresh Status
                  </Link>
                )}
                {result.state === "error" && reffId && (
                  <Link
                    href={`/registration/payment-result?reff_id=${encodeURIComponent(reffId)}`}
                    className={`rounded-xl border bg-white px-4 py-2 text-sm font-medium transition ${styles.actionBorder}`}
                  >
                    Retry
                  </Link>
                )}
                <Link
                  href="/"
                  className={`rounded-xl border bg-white px-4 py-2 text-sm font-medium transition ${styles.actionBorder}`}
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
