import Link from "next/link";
import AdminShell from "../AdminShell";
import RegistrationsTable from "./registrationsTable";
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

      <RegistrationsTable rows={rows} />
    </AdminShell>
  );
}
