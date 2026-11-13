import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import RegistrationForm from "@/components/registration/registrationForm";
import { REGISTRATION_CLOSED_MESSAGE, REGISTRATION_OPEN } from "@/lib/pricing";

export const metadata = {
  title: "Registration | IAUP Semi-Annual Meeting 2026",
  description: "Submit your registration details and proceed to payment for IAUP 2026.",
};

function RegistrationClosed() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">Registration Closed</h1>
          <p className="mt-4 text-base text-slate-600">{REGISTRATION_CLOSED_MESSAGE}</p>
          <p className="mt-2 text-sm text-slate-500">
            Thank you for your interest in the IAUP Semi-Annual Meeting 2026.
          </p>
        </div>
      </div>
    </section>
  );
}

export default async function RegistrationPage({ searchParams }) {
  if (!REGISTRATION_OPEN) {
    return (
      <>
        <Nev />
        <main className="min-h-screen pt-20 sm:pt-24">
          <RegistrationClosed />
        </main>
        <Footer />
      </>
    );
  }

  const resolvedSearchParams = await searchParams;
  const rawAttendee = resolvedSearchParams?.attendee;
  const attendeeId = Array.isArray(rawAttendee) ? rawAttendee[0] : rawAttendee;
  const rawCoupon = resolvedSearchParams?.coupon;
  const couponCode = Array.isArray(rawCoupon) ? rawCoupon[0] : rawCoupon;

  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <RegistrationForm
          initialAttendeeId={typeof attendeeId === "string" ? attendeeId : ""}
          initialCouponCode={typeof couponCode === "string" ? couponCode : ""}
        />
      </main>
      <Footer />
    </>
  );
}
