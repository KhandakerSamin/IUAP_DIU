import AdminShell from "../AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { countPartnerProposals, listPartnerProposals } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Partner Proposals | IAUP Admin",
  robots: { index: false, follow: false },
};

const TH = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500";
const TD = "px-3 py-2 align-top text-sm text-slate-700";

export default async function AdminPartnersPage({ searchParams }) {
  await requireAdmin();
  const sp = (await searchParams) || {};
  const search = typeof sp.q === "string" ? sp.q : "";

  const total = countPartnerProposals();
  const rows = listPartnerProposals({ search, limit: 500 });

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Partner Proposals</h1>
          <p className="mt-1 text-sm text-slate-600">
            {total} proposal{total === 1 ? "" : "s"} submitted
          </p>
        </div>

        <form action="/admin/partners" method="get" className="flex flex-wrap gap-2">
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search organization, email, country&hellip;"
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

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className={TH}>Submitted</th>
              <th className={TH}>Organization</th>
              <th className={TH}>Type / Country</th>
              <th className={TH}>Contact</th>
              <th className={TH}>Interest</th>
              <th className={TH}>Proposal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td className={`${TD} text-slate-500`} colSpan={6}>
                  No proposals yet.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.proposal_id}>
                <td className={`${TD} whitespace-nowrap`}>{row.created_at}</td>
                <td className={TD}>
                  <div className="font-semibold text-slate-900">{row.org_name}</div>
                  <div className="font-mono text-xs text-slate-400">{row.proposal_id}</div>
                </td>
                <td className={TD}>
                  <div>{row.org_type || "—"}</div>
                  <div className="text-xs text-slate-500">{row.country || "—"}</div>
                </td>
                <td className={TD}>
                  <div>{row.contact_person || "—"}</div>
                  <div className="text-xs text-slate-500">{row.designation || "—"}</div>
                  <a href={`mailto:${row.email}`} className="text-xs text-primary hover:underline">
                    {row.email}
                  </a>
                </td>
                <td className={TD}>{row.interest || "—"}</td>
                <td className={TD}>
                  {row.proposal_path ? (
                    <a
                      href={`/api/admin/files/${row.proposal_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Download
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
