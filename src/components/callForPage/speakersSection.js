"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CalendarDays,
  Mic2,
  X,
  Send,
  CheckCircle,
  UserRoundPen,
  UploadCloud,
  FileCheck2,
} from "lucide-react";

const PANELS = [
  "Panel Discussion 1: Building Entrepreneurial Universities for Sustainable Economic Growth",
  "Panel Discussion 2: Transforming Higher Education to Empower Women in an AI-Driven World",
  "Panel Discussion 3: Sustainable Universities for a Sustainable Planet",
  "Panel Discussion 4: Open Science, AI, and the Future of Academic Research",
  "Panel Discussion 5: One Student, One AI: Preparing Every Learner for an AI-Powered World",
];

const EMPTY_FORM = {
  fullName: "",
  designation: "",
  institution: "",
  country: "",
  email: "",
  panel: "",
  abstract: "",
  bio: "",
};

function wordCount(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

function SpeakerFormModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm(EMPTY_FORM);
      setFile(null);
      setFileName("");
      setSubmitted(false);
    }, 200);
  };

  const abstractWords = wordCount(form.abstract);
  const bioWords = wordCount(form.bio);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto py-6 sm:py-10 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-form-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close form"
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm cursor-default border-none w-full h-full"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 z-10 my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 sm:px-10 pt-8 sm:pt-10 pb-6 border-b border-slate-100 bg-white">
          <div>
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-xs mb-2">
              Panel Speaker Proposal
            </span>
            <h3
              id="speaker-form-title"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Become a Speaker
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div className="px-6 sm:px-10 py-14 flex flex-col items-center text-center gap-4 bg-white">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-primary" />
            </div>
            <h4 className="font-display text-xl font-bold text-slate-900">
              Proposal received
            </h4>
            <p className="text-slate-600 leading-relaxed max-w-sm">
              Thank you for your interest in speaking at IAUP Semi-Annual
              Meeting 2026. Our team will review your proposal and get back to
              you before the panel selections are finalized.
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
            className="px-6 sm:px-10 py-8 max-h-[75vh] overflow-y-auto bg-white"
          >
            <p className="text-slate-600 leading-relaxed mb-8">
              Share your expertise at the IAUP Semi-Annual Meeting 2026 by
              submitting your panel speaker proposal.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Full Name" required>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={update("fullName")}
                  placeholder="Dr. Jane Rahman"
                  className={inputClass}
                />
              </Field>

              <Field label="Designation" required>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={update("designation")}
                  placeholder="Vice-Chancellor"
                  className={inputClass}
                />
              </Field>

              <Field label="Institution/Organization" required>
                <input
                  type="text"
                  required
                  value={form.institution}
                  onChange={update("institution")}
                  placeholder="Daffodil International University"
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

              <Field label="Email Address" required className="sm:col-span-2">
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@institution.edu"
                  className={inputClass}
                />
              </Field>

              <Field label="Preferred Panel" required className="sm:col-span-2">
                <select
                  required
                  value={form.panel}
                  onChange={update("panel")}
                  className={`${inputClass} appearance-none bg-white text-slate-800`}
                >
                  <option value="" disabled>
                    Select a panel discussion
                  </option>
                  {PANELS.map((panel) => (
                    <option key={panel} value={panel}>
                      {panel}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Session Abstract"
                hint="200–300 words"
                counter={`${abstractWords} words`}
                className="sm:col-span-2"
              >
                <textarea
                  rows={4}
                  value={form.abstract}
                  onChange={update("abstract")}
                  placeholder="Summarize the focus and key argument of your proposed session..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <Field
                label="Short Bio"
                hint="100–150 words"
                counter={`${bioWords} words`}
                className="sm:col-span-2"
              >
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={update("bio")}
                  placeholder="A brief professional biography..."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <Field label="Share Your CV" required className="sm:col-span-2">
                <label
                  htmlFor="cv-upload"
                  className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  {fileName ? (
                    <FileCheck2 className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <UploadCloud className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span
                    className={`text-sm truncate ${
                      fileName ? "text-slate-900 font-medium" : "text-slate-500"
                    }`}
                  >
                    {fileName || "Click to upload PDF or Word document"}
                  </span>
                  <input
                    id="cv-upload"
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
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors"
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

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

function Field({
  label,
  required,
  hint,
  counter,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between mb-1.5">
        <label className="text-sm font-semibold text-slate-800">
          {label}
          {required && <span className="text-primary"> *</span>}
          {hint && (
            <span className="text-slate-500 font-normal"> ({hint})</span>
          )}
        </label>
        {counter && (
          <span className="text-xs text-slate-400 tabular-nums">{counter}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function SpeakersSection() {
  const [formOpen, setFormOpen] = useState(false);

  const themes = [
    "AI-Enhanced Pedagogies and Learning Innovation",
    "Leadership, Governance, and Institutional Transformation in Higher Education",
    "Higher Education Contributions to Sustainability and SDG Implementation",
    "Entrepreneurial Universities, Innovation Hubs, and Industry Partnerships",
  ];

  return (
    <>
      {/* Call for Speakers Section */}
      <section
        id="call-for-speakers"
        className="py-20 lg:py-28 bg-slate-50 relative border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <span className="inline-block text-primary font-semibold tracking-wide uppercase text-sm mb-4">
              Call for Participation
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Call for <span className="text-primary">Panel Speakers</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              The International Association of University Presidents (IAUP)
              Semi-Annual Meeting 2026 invites distinguished university
              leaders, academics, researchers, and experts to serve as panel
              speakers in its thematic sessions. Hosted by Daffodil
              International University, this global forum will bring
              together thought leaders to exchange insights and shape the
              future of higher education.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Themes */}
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-sm h-full">
              <h3 className="font-display text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
                Thematic Areas
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                We welcome expressions of interest from individuals with
                demonstrated expertise and leadership in the following
                areas:
              </p>
              <ul className="space-y-6">
                {themes.map((theme, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-primary mt-1 shrink-0 w-6 h-6" />
                    <span className="text-slate-800 font-medium leading-relaxed">
                      {theme}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-50 text-lg rounded-2xl p-5 my-6 border border-slate-200">
                <div className="flex items-center gap-3 text-slate-800 font-medium">
                  <CalendarDays className="w-5 h-5 text-primary" />
                  <span>Deadline: 30th September 2026</span>
                </div>
              </div>
            </div>

            {/* Right Column: Become a Speaker CTA */}
            <div className="flex flex-col gap-6 h-full">
              <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200 shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mic2 className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      Ready to Share Your Expertise?
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Submit a brief proposal covering your preferred panel,
                    session abstract, and short bio. Selected panelists will
                    engage with global peers, contribute to high-level
                    discussions, and expand international collaboration
                    networks.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <UserRoundPen className="text-primary w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900">
                      Who Should Apply
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Presidents, Vice-Chancellors, Rectors, senior academics,
                    policymakers, researchers and industry leaders with
                    relevant experience and a strong track record in the
                    respective themes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(true)}
                  className="self-start px-7 py-3.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Become a Speaker
                  <Mic2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpeakerFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}