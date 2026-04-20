"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
