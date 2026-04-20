import Link from "next/link";
import AdminShell from "../AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { countRegistrationsByStatus, listRegistrations } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Registrations | IAUP Admin",
  robots: { index: false, follow: false },
};

const STATUS_FILTERS = [
  { key: "", label: "All" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
];

const STATUS_BADGE = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso + (iso.endsWith("Z") ? "" : "Z")).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminRegistrationsPage({ searchParams }) {
  await requireAdmin();
  const sp = (await searchParams) || {};
  const status = typeof sp.status === "string" ? sp.status : "";
  const search = typeof sp.q === "string" ? sp.q : "";

  const counts = countRegistrationsByStatus();
  const rows = listRegistrations({ status: status || undefined, search, limit: 500 });

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Registrations</h1>
          <p className="mt-1 text-sm text-slate-600">
            {counts.all} total · {counts.paid} paid · {counts.pending} pending · {counts.failed} failed
          </p>
        </div>

        <form action="/admin/registrations" method="get" className="flex flex-wrap gap-2">
          <input type="hidden" name="status" value={status} />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search name, email, phone…"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {STATUS_FILTERS.map((f) => {
          const href = `/admin/registrations${f.key ? `?status=${f.key}` : ""}${
            search ? `${f.key ? "&" : "?"}q=${encodeURIComponent(search)}` : ""
          }`;
          const active = status === f.key;
          return (
            <Link
              key={f.key || "all"}
              href={href}
              className={`rounded-full border px-3 py-1 transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Reg ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-500">
                  No registrations match your filters.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const fullName = `${r.given_name || ""} ${r.surname || ""}`.trim() || "—";
              const badge = STATUS_BADGE[r.payment_status] || "bg-slate-100 text-slate-700";
              const detailHref = `/admin/registrations/${encodeURIComponent(r.reg_id)}`;
              return (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">
                    <Link href={detailHref} className="hover:underline">
                      {r.reg_id}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={detailHref} className="hover:underline">
                      {fullName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{r.email}</td>
                  <td className="px-4 py-3 text-slate-700">{r.phone || "—"}</td>
                  <td className="px-4 py-3 text-slate-700">{r.country || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${badge}`}>
                      {r.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={detailHref}
                      className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
