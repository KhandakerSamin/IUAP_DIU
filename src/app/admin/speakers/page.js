import Link from "next/link";
import AdminShell from "../AdminShell";
import SpeakersTable from "./speakersTable";
import { requireAdmin } from "@/lib/adminAuth";
import { countSpeakerProposals, listSpeakerProposals } from "@/lib/db";
import { PANELS, shortPanelLabel } from "@/lib/panels";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Panel Speakers | IAUP Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSpeakersPage({ searchParams }) {
  await requireAdmin();
  const sp = (await searchParams) || {};
  const panel = typeof sp.panel === "string" ? sp.panel : "";
  const search = typeof sp.q === "string" ? sp.q : "";

  const counts = countSpeakerProposals();
  const rows = listSpeakerProposals({ panel: panel || undefined, search, limit: 500 });
  const perPanel = new Map(counts.byPanel.map((p) => [p.panel, p.n]));

  const filters = [{ key: "", label: "All", n: counts.total }].concat(
    PANELS.map((p) => ({ key: p, label: shortPanelLabel(p), n: perPanel.get(p) || 0 }))
  );

  return (
    <AdminShell>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">Panel Speakers</h1>
          <p className="mt-1 text-sm text-slate-600">
            {counts.total} proposal{counts.total === 1 ? "" : "s"} submitted
          </p>
        </div>

        <form action="/admin/speakers" method="get" className="flex flex-wrap gap-2">
          <input type="hidden" name="panel" value={panel} />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Search name, email, institution\u2026"
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
        {filters.map((f) => {
          const params = new URLSearchParams();
          if (f.key) params.set("panel", f.key);
          if (search) params.set("q", search);
          const qs = params.toString();
          const active = panel === f.key;
          return (
            <Link
              key={f.key || "all"}
              href={`/admin/speakers${qs ? `?${qs}` : ""}`}
              title={f.key || "All panels"}
              className={`rounded-full border px-3 py-1 transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {f.label} <span className={active ? "text-slate-300" : "text-slate-400"}>{f.n}</span>
            </Link>
          );
        })}
      </div>

      <SpeakersTable rows={rows} />
    </AdminShell>
  );
}
