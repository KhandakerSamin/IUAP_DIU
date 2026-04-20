"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { calculatePricing, formatUsd, FAMILY_MEMBER_FEE_USD } from "@/lib/pricing";

const STORAGE_KEY = "iaup_registration";

function readStoredRegistration() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function parseFamilyCount(registration) {
  if (!registration || registration.hasFamilyMembers !== "Yes") return 0;
  if (registration.familyMembersCount === "Others") {
    const n = parseInt(registration.familyMembersOther, 10);
    return Number.isInteger(n) && n > 0 ? n : 0;
  }
  const n = parseInt(registration.familyMembersCount, 10);
  return Number.isInteger(n) && n > 0 ? n : 0;
}

export default function OnlinePaymentConfirmation() {
  const searchParams = useSearchParams();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [registration, setRegistration] = useState(null);
  const [regId, setRegId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stored = readStoredRegistration();
    setRegistration(stored);

    const fromUrl = searchParams.get("reg_id");
    const fromStore = stored?.regId;
    setRegId(fromUrl || fromStore || "");
    setHasLoaded(true);
  }, [searchParams]);

  const participantName =
    registration?.fullName ||
    `${registration?.givenName || ""} ${registration?.surname || ""}`.trim() ||
    "Participant";
  const participantEmail = registration?.email || "";
  const participantPhone = registration?.phone || "";

  const pricing = useMemo(
    () =>
      calculatePricing({
        isMember: registration?.isMemberUniversity === "Yes",
        familyMembersCount: parseFamilyCount(registration),
      }),
    [registration]
  );

  const handlePay = async () => {
    if (!regId) {
      setError("Registration reference is missing. Please submit the form again.");
      return;
    }
    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_id: regId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        setError(data?.error || "Could not start payment. Please try again.");
        setIsProcessing(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setIsProcessing(false);
    }
  };

  if (!hasLoaded) {
    return (
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-sm text-slate-500">
            Loading payment details…
          </div>
        </div>
      </section>
    );
  }

  if (!regId) {
    return (
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8 text-amber-900">
            <h1 className="font-display text-2xl font-bold sm:text-3xl">No Registration Found</h1>
            <p className="mt-3 text-sm sm:text-base">
              We couldn’t find your registration reference. Please complete the registration form first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/registration"
                className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-100"
              >
                Go to Registration Form
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 transition hover:bg-amber-100"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const canPay = !isProcessing;

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Online Payment</h1>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            IAUP Semi Annual Meeting 2026 | Daffodil International University | Event Date: 19-21 November 2026
          </p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p>
              Participant: <strong>{participantName}</strong>
            </p>
            {participantEmail && <p className="mt-1">Primary Email: {participantEmail}</p>}
            {participantPhone && <p className="mt-1">Phone: {participantPhone}</p>}
            <p className="mt-1 text-xs text-slate-500 font-mono">Ref: {regId}</p>
          </div>

          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm text-slate-700">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">Amount to pay</p>
            <dl className="grid gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Period</dt>
                <dd className="font-semibold text-slate-900">
                  {pricing.period.label} <span className="font-normal text-slate-500">({pricing.period.range})</span>
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Category</dt>
                <dd className="font-semibold text-slate-900">
                  {pricing.isMember ? "IAUP / AUAP / DIU partner" : "Non-partner"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Base fee</dt>
                <dd className="font-semibold text-slate-900">{formatUsd(pricing.baseFeeUsd)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Family members</dt>
                <dd className="font-semibold text-slate-900">
                  {pricing.familyCount === 0
                    ? "None"
                    : `${pricing.familyCount} × ${formatUsd(FAMILY_MEMBER_FEE_USD)} = ${formatUsd(pricing.familyFeeUsd)}`}
                </dd>
              </div>
            </dl>
            <div className="mt-3 flex items-center justify-between border-t border-primary/20 pt-3">
              <span className="text-sm font-semibold text-slate-900">Total</span>
              <span className="font-display text-xl font-bold text-primary">{formatUsd(pricing.totalFeeUsd)}</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            <p>
              You will be redirected to the secure 1Card payment gateway. After payment, you will return to a
              confirmation page and a receipt will be emailed to {participantEmail ? <strong>{participantEmail}</strong> : "your email"}.
            </p>
            <button
              type="button"
              onClick={handlePay}
              disabled={!canPay}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isProcessing ? "Redirecting to gateway..." : "Pay Now"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registration"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Edit Registration
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
