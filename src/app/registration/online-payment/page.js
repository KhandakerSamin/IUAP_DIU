import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import OnlinePaymentConfirmation from "@/components/registration/onlinePaymentConfirmation";

export const metadata = {
  title: "Online Payment | IAUP Semi-Annual Meeting 2026",
  description: "Complete online payment for IAUP Semi-Annual Meeting 2026 registration.",
};

export default async function OnlinePaymentPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const rawName = resolvedSearchParams?.name;
  const rawEmail = resolvedSearchParams?.email;

  const participantName = Array.isArray(rawName) ? rawName[0] : rawName;
  const participantEmail = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail;

  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <OnlinePaymentConfirmation
          participantName={typeof participantName === "string" && participantName.trim() ? participantName : "Participant"}
          participantEmail={typeof participantEmail === "string" ? participantEmail : ""}
        />
      </main>
      <Footer />
    </>
  );
}
