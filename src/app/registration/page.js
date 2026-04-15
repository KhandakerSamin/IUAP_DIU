import Footer from "@/components/global/footer";
import RegistrationForm from "@/components/registration/registrationForm";
import RegistrationNav from "@/components/registration/registrationNav";

export const metadata = {
  title: "Registration | IAUP Semi-Annual Meeting 2026",
  description: "Submit your registration details and proceed to payment for IAUP 2026.",
};

export default function RegistrationPage() {
  return (
    <>
      <RegistrationNav />
      <main className="min-h-screen">
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
