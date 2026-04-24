import Link from "next/link";
import { notFound } from "next/navigation";
import AdminShell from "../../AdminShell";
import { requireAdmin } from "@/lib/adminAuth";
import { getFamilyMembersForRegistration, getRegistrationByRegId } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Registration Detail | IAUP Admin",
  robots: { index: false, follow: false },
};

const STATUS_BADGE = {
  paid: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
};

function fileHref(relPath) {
  if (!relPath) return null;
  const clean = String(relPath).replace(/^\/+/, "");
  return `/api/admin/files/${clean}`;
}

function isImagePath(relPath) {
  const ext = String(relPath || "").toLowerCase();
  return ext.endsWith(".jpg") || ext.endsWith(".jpeg") || ext.endsWith(".png") || ext.endsWith(".webp");
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso + (iso.endsWith("Z") ? "" : "Z")).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function Field({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900 break-words">{value || "—"}</dd>
    </div>
  );
}

function FileBlock({ label, relPath }) {
  const href = fileHref(relPath);
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      {href ? (
        <dd className="mt-2">
          {isImagePath(relPath) ? (
            <a href={href} target="_blank" rel="noreferrer" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={href}
                alt={label}
                className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
              />
            </a>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Open file
            </a>
          )}
        </dd>
      ) : (
        <dd className="mt-1 text-sm text-slate-500">Not uploaded</dd>
      )}
    </div>
  );
}

export default async function RegistrationDetailPage({ params }) {
  await requireAdmin();
  const { regId } = await params;
  const row = getRegistrationByRegId(regId);
  if (!row) notFound();

  const family = getFamilyMembersForRegistration(row.id);
  const badge = STATUS_BADGE[row.payment_status] || "bg-slate-100 text-slate-700";
  const fullName = `${row.given_name || ""} ${row.surname || ""}`.trim() || "—";

  return (
    <AdminShell>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/admin/registrations" className="text-sm text-slate-500 hover:text-slate-900">
            ← Back to list
          </Link>
          <h1 className="font-display mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{fullName}</h1>
          <p className="mt-1 font-mono text-xs text-slate-500">{row.reg_id}</p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${badge}`}>
          {row.payment_status}
        </span>
      </div>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Payment</h2>
        <dl className="grid gap-4 sm:grid-cols-3">
          <Field label="Amount" value={row.payment_amount ? `${row.payment_amount} ${row.payment_currency || ""}` : null} />
          <Field label="Period" value={row.registration_period ? row.registration_period.replace(/^\w/, (c) => c.toUpperCase()) : null} />
          <Field label="Reff ID" value={row.payment_reff_id} />
          <Field label="Transaction ID" value={row.payment_tran_id} />
          <Field label="Method" value={row.payment_method} />
          <Field label="Submitted" value={formatDate(row.created_at)} />
          <Field label="Updated" value={formatDate(row.updated_at)} />
        </dl>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Participant</h2>
        <dl className="grid gap-4 sm:grid-cols-3">
          <Field label="Title" value={[row.title, row.other_title].filter(Boolean).join(" ") || row.title} />
          <Field label="Given Name" value={row.given_name} />
          <Field label="Surname" value={row.surname} />
          <Field label="Gender" value={row.gender} />
          <Field label="Date of Birth" value={row.date_of_birth} />
          <Field label="Nationality" value={row.nationality} />
          <Field label="Passport No" value={row.passport_no} />
          <Field label="Email" value={row.email} />
          <Field label="Alternative Email" value={row.alternative_email} />
          <Field label="Phone" value={row.phone} />
          <Field label="WhatsApp" value={row.whatsapp} />
          <Field label="Organization" value={row.organization} />
          <Field label="Position" value={row.position} />
          <Field label="Department" value={row.department} />
          <Field label="Address" value={row.address} />
          <Field label="City" value={row.city} />
          <Field label="Zip code" value={row.zip_code} />
          <Field label="Country" value={row.country} />
          <Field label="T-shirt size" value={row.tshirt_size} />
          <Field label="Food requirement" value={[row.food_requirement, row.other_food].filter(Boolean).join(" · ")} />
          <Field label="IAUP/AUAP/Partner university" value={row.is_member_university} />
          <Field label="Needs invitation letter" value={row.needs_invitation_letter} />
          <Field
            label="Family members"
            value={
              row.has_family_members === "Yes"
                ? `${family.length} (${row.family_members_count}${
                    row.family_members_other ? ` / ${row.family_members_other}` : ""
                  })`
                : "No"
            }
          />
        </dl>
      </section>

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold text-slate-900">Documents</h2>
        <dl className="grid gap-6 sm:grid-cols-2">
          <FileBlock label="Profile Picture" relPath={row.profile_photo_path} />
          <FileBlock label="Passport Front Page" relPath={row.passport_scan_path} />
        </dl>
      </section>

      {family.length > 0 && (
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">Family Members</h2>
          <div className="space-y-6">
            {family.map((fm, idx) => (
              <div key={fm.id} className="rounded-xl border border-slate-200 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-900">
                  #{idx + 1} · {fm.full_name || "—"}
                </p>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <Field label="Passport No" value={fm.passport_no} />
                  <Field label="Email" value={fm.email} />
                  <Field label="Phone" value={fm.phone} />
                  <Field label="T-shirt size" value={fm.tshirt_size} />
                  {fm.relationship ? <Field label="Relationship" value={fm.relationship} /> : null}
                  <FileBlock label="Profile Picture" relPath={fm.profile_photo_path} />
                  <FileBlock label="Passport Front Page" relPath={fm.passport_scan_path} />
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}
    </AdminShell>
  );
}
