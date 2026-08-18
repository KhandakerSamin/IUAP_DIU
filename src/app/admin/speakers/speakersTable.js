"use client";

import { useRouter } from "next/navigation";
import { Fragment, useMemo, useState } from "react";
import { shortPanelLabel } from "@/lib/panels";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso + (iso.endsWith("Z") ? "" : "Z")).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function ConfirmModal({ open, title, message, onConfirm, onCancel, busy }) {
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
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {busy ? "Working\u2026" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SpeakersTable({ rows }) {
  const router = useRouter();
  const [selected, setSelected] = useState(() => new Set());
  const [expanded, setExpanded] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const allIds = useMemo(() => rows.map((r) => r.proposal_id), [rows]);
  const allChecked = rows.length > 0 && selected.size === rows.length;
  const someChecked = selected.size > 0 && selected.size < rows.length;

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => (prev.size === rows.length ? new Set() : new Set(allIds)));
  };

  const performDelete = async (proposalIds) => {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/speakers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal_ids: proposalIds }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data?.error || "Delete failed.");
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
    performDelete(deleteTarget.kind === "bulk" ? Array.from(selected) : [deleteTarget.proposalId]);
  };

  return (
    <>
      {selected.size > 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-900 bg-slate-900 px-4 py-2 text-sm text-white">
          <span>{selected.size} selected</span>
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
              <th className="px-4 py-3">Proposal ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Institution</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Panel</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-500">
                  No speaker proposals match your filters.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const checked = selected.has(r.proposal_id);
              const isOpen = expanded === r.proposal_id;
              return (
                <Fragment key={r.id}>
                  <tr className={checked ? "bg-slate-50" : "hover:bg-slate-50"}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOne(r.proposal_id)}
                        className="h-4 w-4 rounded border-slate-300"
                        aria-label={`Select ${r.full_name}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{r.proposal_id}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-slate-900">{r.full_name}</span>
                      {r.designation ? (
                        <span className="block text-xs text-slate-500">{r.designation}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {r.institution || "\u2014"}
                      {r.country ? <span className="block text-xs text-slate-500">{r.country}</span> : null}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.email}</td>
                    <td className="px-4 py-3">
                      <span
                        title={r.panel || ""}
                        className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                      >
                        {shortPanelLabel(r.panel)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(r.created_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : r.proposal_id)}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          {isOpen ? "Hide" : "View"}
                        </button>
                        {r.cv_path ? (
                          <a
                            href={`/api/admin/files/${r.cv_path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                          >
                            CV
                          </a>
                        ) : null}
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({ kind: "single", proposalId: r.proposal_id, name: r.full_name })
                          }
                          className="rounded-lg border border-red-300 bg-white px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-slate-50/70">
                      <td colSpan={8} className="px-4 py-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Preferred panel
                            </h4>
                            <p className="text-sm text-slate-800">{r.panel || "\u2014"}</p>
                          </div>
                          <div>
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Contact
                            </h4>
                            <p className="text-sm text-slate-800">
                              <a href={`mailto:${r.email}`} className="text-primary hover:underline">
                                {r.email}
                              </a>
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Session abstract
                            </h4>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                              {r.abstract || "\u2014"}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Short bio
                            </h4>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800">
                              {r.bio || "\u2014"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.kind === "bulk" ? `Delete ${selected.size} proposals?` : "Delete proposal?"}
        message={
          deleteTarget?.kind === "bulk"
            ? "This permanently removes the selected speaker proposals and their uploaded CVs. This cannot be undone."
            : `This permanently removes ${deleteTarget?.name || "this proposal"} and the uploaded CV. This cannot be undone.`
        }
        busy={busy}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
