import AdminShell from "../AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { listCoupons } from "@/lib/db";
import CouponsTable from "./CouponsTable";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Coupons | IAUP Admin",
  robots: { index: false, follow: false },
};

export default async function AdminCouponsPage() {
  await requireAdmin();
  const rows = listCoupons();
  const baseUrl = process.env.APP_BASE_URL || "";

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Coupons</h1>
        <p className="mt-1 text-sm text-slate-600">
          Create a code to let a guest register for $0. Share it directly, or hand out the link — it
          auto-applies the code on the registration form.
        </p>
      </div>

      <CouponsTable rows={rows} baseUrl={baseUrl} />
    </AdminShell>
  );
}
