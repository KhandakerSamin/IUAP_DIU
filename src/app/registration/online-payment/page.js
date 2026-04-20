import { Suspense } from "react";
import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import OnlinePaymentConfirmation from "@/components/registration/onlinePaymentConfirmation";

export const metadata = {
  title: "Online Payment | IAUP Semi-Annual Meeting 2026",
  description: "Complete online payment for IAUP Semi-Annual Meeting 2026 registration.",
};

function Loading() {
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

export default function OnlinePaymentPage() {
  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <Suspense fallback={<Loading />}>
          <OnlinePaymentConfirmation />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
