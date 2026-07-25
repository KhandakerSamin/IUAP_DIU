"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  Handshake,
  X,
  Send,
  CheckCircle,
  UploadCloud,
  FileCheck2,
} from "lucide-react";

const PARTNERSHIP_TYPES = [
  "Sponsorship",
  "Academic Partner",
  "Industry Partner",
  "Media Partner",
  "Exhibition",
  "Other",
];

const EMPTY_FORM = {
  orgName: "",
  orgType: "",
  country: "",
  contactPerson: "",
  designation: "",
  email: "",
  interest: "",
};

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-2.5 text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

function Field({ label, required, className = "", children }) {
  return (
    <div className={className}>
      <label className="block text-sm font-semibold text-dark mb-1.5">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      {children}
    </div>
  );
}

function PartnerFormModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(EMPTY_FORM);
      setFileName("");
      setSubmitted(false);
    }, 200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto py-6 sm:py-10 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-form-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close form"
        onClick={handleClose}
        className="fixed inset-0 bg-dark/60 backdrop-blur-sm cursor-default"
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-border">
        <div className="flex items-start justify-between gap-4 px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-border">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-xs mb-2">
              Partnership Proposal
            </span>
            <h3
              id="partner-form-title"
              className="font-display text-2xl sm:text-3xl font-bold text-dark"
            >
              Become a Partner
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-muted hover:text-dark hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 sm:px-10 py-14 flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <h4 className="font-display text-xl font-bold text-dark">
              Proposal received
            </h4>
            <p className="text-muted leading-relaxed max-w-sm">
              Thank you for your interest in partnering with IAUP
              Semi-Annual Meeting 2026. Our team will review your proposal
              and reach out with next steps.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="px-6 sm:px-10 py-8 max-h-[70vh] overflow-y-auto"
          >
            <p className="text-muted leading-relaxed mb-8">
              Share your organization&apos;s details to partner with IAUP
              Semi-Annual Meeting 2026.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Organization Name" required>
                <input
                  type="text"
                  required
                  value={form.orgName}
                  onChange={update("orgName")}
                  placeholder="Acme University"
                  className={inputClass}
                />
              </Field>

              <Field label="Organization Type" required>
                <input
                  type="text"
                  required
                  value={form.orgType}
                  onChange={update("orgType")}
                  placeholder="University, Corporate, NGO..."
                  className={inputClass}
                />
              </Field>

              <Field label="Country" required>
                <input
                  type="text"
                  required
                  value={form.country}
                  onChange={update("country")}
                  placeholder="Bangladesh"
                  className={inputClass}
                />
              </Field>

              <Field label="Contact Person" required>
                <input
                  type="text"
                  required
                  value={form.contactPerson}
                  onChange={update("contactPerson")}
                  placeholder="Full name"
                  className={inputClass}
                />
              </Field>

              <Field label="Designation" required>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={update("designation")}
                  placeholder="Director of Partnerships"
                  className={inputClass}
                />
              </Field>

              <Field label="Email Address" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@organization.com"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Partnership Interest"
                required
                className="sm:col-span-2"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PARTNERSHIP_TYPES.map((type) => {
                    const selected = form.interest === type;
                    return (
                      <label
                        key={type}
                        className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium text-center transition-colors ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-dark hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="interest"
                          value={type}
                          checked={selected}
                          onChange={update("interest")}
                          required
                          className="sr-only"
                        />
                        {type}
                      </label>
                    );
                  })}
                </div>
              </Field>

              <Field
                label="Upload Brief Partnership/Sponsorship Proposal"
                required
                className="sm:col-span-2"
              >
                <label
                  htmlFor="proposal-upload"
                  className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-slate-50 px-4 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  {fileName ? (
                    <FileCheck2 className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <UploadCloud className="w-5 h-5 text-muted shrink-0" />
                  )}
                  <span
                    className={`text-sm truncate ${
                      fileName ? "text-dark font-medium" : "text-muted"
                    }`}
                  >
                    {fileName || "Click to upload PDF or Word document"}
                  </span>
                  <input
                    id="proposal-upload"
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="sr-only"
                  />
                </label>
              </Field>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 rounded-full border border-border text-dark font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Submit Proposal
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function PartnerSection() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section
      id="partner"
      className="pb-24 lg:pb-32 bg-slate-50 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
        <div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="font-display text-4xl font-bold text-dark mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-light">
            Association of Private Universities of Bangladesh
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="relative w-64 h-32 md:w-80 md:h-50">
            <Image
              src="/partner.jpg"
              alt="Our Partner"
              className="object-contain"
              fill
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Become a Partner
            <Handshake className="w-4 h-4" />
          </button>
        </div>
      </div>

      <PartnerFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
}