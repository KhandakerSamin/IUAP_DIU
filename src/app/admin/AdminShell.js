"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminShell({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin/registrations" className="text-base font-semibold text-slate-900">
            IAUP Admin
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="/admin/registrations"
              className="rounded-lg px-3 py-1.5 text-slate-700 hover:bg-slate-100"
            >
              Registrations
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
