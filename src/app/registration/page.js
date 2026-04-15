import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import RegistrationForm from "@/components/registration/registrationForm";

export const metadata = {
  title: "Registration | IAUP Semi-Annual Meeting 2026",
  description: "Submit your registration details and proceed to payment for IAUP 2026.",
};

export default async function RegistrationPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawAttendee = resolvedSearchParams?.attendee;
  const attendeeId = Array.isArray(rawAttendee) ? rawAttendee[0] : rawAttendee;

  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <RegistrationForm initialAttendeeId={typeof attendeeId === "string" ? attendeeId : ""} />
      </main>
      <Footer />
    </>
  );
}
