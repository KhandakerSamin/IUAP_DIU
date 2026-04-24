"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const STATUS_BADGE = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "paid", label: "Paid" },
  { value: "failed", label: "Failed" },
];

const EDIT_FIELDS = [
  { key: "given_name", label: "Given Name", type: "text" },
  { key: "surname", label: "Surname", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "whatsapp", label: "WhatsApp", type: "tel" },
  { key: "organization", label: "Organization", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "payment_status", label: "Payment Status", type: "select", options: STATUS_OPTIONS },
];

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso + (iso.endsWith("Z") ? "" : "Z")).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, busy, danger }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${
              danger ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"
            }`}
          >
            {busy ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ row, onClose, onSaved }) {
  const [values, setValues] = useState(() => {
    const seed = {};
    for (const f of EDIT_FIELDS) seed[f.key] = row?.[f.key] ?? "";
    return seed;
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  if (!row) return null;

  const handleChange = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSave = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_id: row.reg_id, updates: values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Failed to save.");
        setBusy(false);
        return;
      }
      onSaved();
    } catch {
      setError("Network error.");
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Edit registration</h3>
            <p className="font-mono text-xs text-slate-500">{row.reg_id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {EDIT_FIELDS.map((f) => (
              <div key={f.key} className={f.key === "given_name" || f.key === "surname" ? "" : ""}>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {f.label}
                </label>
                {f.type === "select" ? (
                  <select
                    value={values[f.key] || ""}
                    onChange={handleChange(f.key)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary"
                  >
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    value={values[f.key] || ""}
                    onChange={handleChange(f.key)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary"
                  />
                )}
              </div>
            ))}
          </div>
          {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={busy}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationsTable({ rows }) {
  const router = useRouter();
  const [selected, setSelected] = useState(() => new Set());
  const [editRow, setEditRow] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const allRegIds = useMemo(() => rows.map((r) => r.reg_id), [rows]);
  const allChecked = rows.length > 0 && selected.size === rows.length;
  const someChecked = selected.size > 0 && selected.size < rows.length;

  const toggleOne = (regId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(regId)) next.delete(regId);
      else next.add(regId);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => (prev.size === rows.length ? new Set() : new Set(allRegIds)));
  };

  const performDelete = async (regIds) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_ids: regIds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || "Delete failed.");
        setBusy(false);
        return;
      }
      setSelected(new Set());
      setDeleteTarget(null);
      router.refresh();
    } catch {
      alert("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const ids = deleteTarget.kind === "bulk" ? Array.from(selected) : [deleteTarget.regId];
    performDelete(ids);
  };

  const handleSaved = () => {
    setEditRow(null);
    router.refresh();
  };

  return (
    <>
      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-900 bg-slate-900 px-4 py-2 text-sm text-white">
          <span>
            {selected.size} selected
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium hover:bg-slate-700"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setDeleteTarget({ kind: "bulk" })}
              className="rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold hover:bg-red-700"
            >
              Delete selected
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3 w-8">
                <input
                  type="checkbox"
                  checked={allChecked}
                  ref={(el) => {
                    if (el) el.indeterminate = someChecked;
                  }}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-slate-300"
                  aria-label="Select all"
                />
              </th>
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
                <td colSpan={9} className="px-4 py-12 text-center text-sm text-slate-500">
                  No registrations match your filters.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const fullName = `${r.given_name || ""} ${r.surname || ""}`.trim() || "—";
              const badge = STATUS_BADGE[r.payment_status] || "bg-slate-100 text-slate-700";
              const detailHref = `/admin/registrations/${encodeURIComponent(r.reg_id)}`;
              const checked = selected.has(r.reg_id);
              return (
                <tr key={r.id} className={checked ? "bg-slate-50" : "hover:bg-slate-50"}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOne(r.reg_id)}
                      className="h-4 w-4 rounded border-slate-300"
                      aria-label={`Select ${fullName}`}
                    />
                  </td>
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
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={detailHref}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => setEditRow(r)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ kind: "single", regId: r.reg_id, name: fullName })}
                        className="rounded-lg border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
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

      {editRow && <EditModal row={editRow} onClose={() => setEditRow(null)} onSaved={handleSaved} />}

      <ConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.kind === "bulk" ? `Delete ${selected.size} registrations?` : "Delete registration?"}
        message={
          deleteTarget?.kind === "bulk"
            ? "This permanently removes the selected registrations, their family members, and all uploaded files. This cannot be undone."
            : `This permanently removes ${deleteTarget?.name || "this registration"} and all related files. This cannot be undone.`
        }
        confirmLabel="Delete"
        danger
        busy={busy}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
