import Footer from "@/components/global/footer";
import Nev from "@/components/global/nev";
import OnlinePaymentConfirmation from "@/components/registration/onlinePaymentConfirmation";

export const metadata = {
  title: "Online Payment | IAUP Semi-Annual Meeting 2026",
  description: "Complete online payment for IAUP Semi-Annual Meeting 2026 registration.",
};

export default function OnlinePaymentPage() {
  return (
    <>
      <Nev />
      <main className="min-h-screen pt-20 sm:pt-24">
        <OnlinePaymentConfirmation />
      </main>
      <Footer />
    </>
  );
}
