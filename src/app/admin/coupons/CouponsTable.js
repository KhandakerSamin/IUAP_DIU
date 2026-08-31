"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TH = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500";
const TD = "px-3 py-2 align-top text-sm text-slate-700";

function couponStatus(row) {
  if (!row.active) return { label: "Disabled", cls: "bg-slate-100 text-slate-700" };
  if (row.expires_at && new Date(row.expires_at) <= new Date()) {
    return { label: "Expired", cls: "bg-amber-100 text-amber-800" };
  }
  if (row.max_uses != null && row.uses_count >= row.max_uses) {
    return { label: "Exhausted", cls: "bg-red-100 text-red-800" };
  }
  return { label: "Active", cls: "bg-emerald-100 text-emerald-800" };
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso + (iso.endsWith("Z") ? "" : "Z")).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function CouponsTable({ rows, baseUrl }) {
  const router = useRouter();
  const [form, setForm] = useState({ code: "", note: "", max_uses: "", expires_at: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Could not create coupon.");
        return;
      }
      setForm({ code: "", note: "", max_uses: "", expires_at: "" });
      router.refresh();
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async (row) => {
    setBusy(true);
    try {
      await fetch("/api/admin/coupons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id, active: row.active ? 0 : 1 }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Delete coupon ${row.code}? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await fetch("/api/admin/coupons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleCreate}
        className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Code</label>
          <input
            type="text"
            required
            value={form.code}
            onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
            placeholder="IAUP-VIP"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Note</label>
          <input
            type="text"
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            placeholder="e.g. Keynote speakers"
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Max uses</label>
          <input
            type="number"
            min="1"
            value={form.max_uses}
            onChange={(e) => setForm((prev) => ({ ...prev, max_uses: e.target.value }))}
            placeholder="Unlimited"
            className="w-28 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-500">Expires</label>
          <input
            type="date"
            value={form.expires_at}
            onChange={(e) => setForm((prev) => ({ ...prev, expires_at: e.target.value }))}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
        >
          Create coupon
        </button>
        {error && <p className="w-full text-sm text-red-600">{error}</p>}
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className={TH}>Code</th>
              <th className={TH}>Uses</th>
              <th className={TH}>Status</th>
              <th className={TH}>Created</th>
              <th className={TH}>Registration link</th>
              <th className={TH}>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td className={`${TD} text-slate-500`} colSpan={6}>
                  No coupons yet.
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const status = couponStatus(row);
              const link = `${baseUrl}/registration?coupon=${encodeURIComponent(row.code)}`;
              return (
                <tr key={row.id}>
                  <td className={TD}>
                    <div className="font-mono font-semibold text-slate-900">{row.code}</div>
                    {row.note && <div className="text-xs text-slate-500">{row.note}</div>}
                  </td>
                  <td className={TD}>
                    {row.uses_count}/{row.max_uses ?? "∞"}
                  </td>
                  <td className={TD}>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${status.cls}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className={`${TD} whitespace-nowrap`}>{formatDate(row.created_at)}</td>
                  <td className={TD}>
                    <input
                      type="text"
                      readOnly
                      value={link}
                      onClick={(e) => e.target.select()}
                      className="w-64 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600"
                    />
                  </td>
                  <td className={TD}>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => toggleActive(row)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-60"
                      >
                        {row.active ? "Disable" : "Enable"}
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => remove(row)}
                        className="rounded-lg border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
