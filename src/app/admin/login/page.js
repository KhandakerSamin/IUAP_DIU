import LoginForm from "./LoginForm";

export const metadata = {
  title: "Admin Login | IAUP Semi-Annual Meeting 2026",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full rounded-3xl border border-slate-700 bg-slate-800 p-6 sm:p-8 shadow-xl">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">IAUP Admin</h1>
          <p className="mt-1 text-sm text-slate-400">
            Sign in to manage registrations for IAUP Semi-Annual Meeting 2026.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
