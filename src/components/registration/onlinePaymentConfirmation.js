"use client";

import Link from "next/link";
import { useState } from "react";

export default function OnlinePaymentConfirmation({ participantName = "Participant", participantEmail = "" }) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);

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
          </div>

          {!paymentCompleted && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <p>
                You selected <strong>Online Payment</strong>. After the payment is completed, the following message
                will be sent by email with your payment receipt attached.
              </p>
              <button
                type="button"
                onClick={() => setPaymentCompleted(true)}
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
              >
                Mark Payment as Completed
              </button>
            </div>
          )}

          {paymentCompleted && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
              <p>A Payment receipt will be sent as an attachment with this email:</p>
              <p className="mt-4">Dear {participantName},</p>
              <p className="mt-3">
                You have successfully submitted the registration form and completed the registration payment. You can
                find the attached payment receipt along with this email. Thank you for your interest in joining the IAUP
                Semi Annual Meeting 2026 to be held at Dhaka, Bangladesh!
              </p>
              <p className="mt-3">
                Should you have any queries, feel free to contact us at iaup-bd2026@daffodilvarsity.edu.bd
              </p>
              <p className="mt-6">Best regards,</p>
              <p className="mt-1">DIU Secretariat, IAUP Semi-Annual Meeting 2026</p>
              <p>Daffodil International University, Bangladesh</p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registration"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Registration
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
