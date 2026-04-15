"use client";

import Link from "next/link";
import { useState } from "react";

const ATTENDEE_TYPES = [
  "IAUP / AUAP Member",
  "Non-Member",
  "Participant Family",
];

const FIELD_LIMITS = {
  fullName: 80,
  email: 120,
  phone: 20,
  institution: 120,
  designation: 80,
  country: 56,
  dietaryRequirements: 150,
  notes: 400,
  website: 120,
};

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  designation: "",
  country: "",
  attendeeType: "",
  dietaryRequirements: "",
  notes: "",
  agreeToPolicy: false,
  website: "",
};

const isSafeText = (value) => !/[<>]/.test(value);

function normalizeSpaces(value) {
  return value.replace(/\s+/g, " ").trim();
}

function validateForm(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (!/^[A-Za-z][A-Za-z .'-]{1,79}$/.test(values.fullName.trim())) {
    errors.fullName = "Use letters only. Special characters are limited to . ' and -.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\+?[0-9()\-\s]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Use 7-20 digits and optional +, parentheses, spaces, or -.";
  }

  if (!values.institution.trim()) {
    errors.institution = "Institution is required.";
  } else if (values.institution.trim().length < 2) {
    errors.institution = "Institution name is too short.";
  }

  if (!values.designation.trim()) {
    errors.designation = "Designation is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required.";
  } else if (!/^[A-Za-z][A-Za-z\s-]{1,55}$/.test(values.country.trim())) {
    errors.country = "Enter a valid country name.";
  }

  if (!values.attendeeType || !ATTENDEE_TYPES.includes(values.attendeeType)) {
    errors.attendeeType = "Select your attendee type.";
  }

  if (values.dietaryRequirements.length > FIELD_LIMITS.dietaryRequirements) {
    errors.dietaryRequirements = "Dietary requirements are too long.";
  }

  if (values.notes.length > FIELD_LIMITS.notes) {
    errors.notes = "Notes are too long.";
  }

  if (!values.agreeToPolicy) {
    errors.agreeToPolicy = "You need to confirm your details before proceeding.";
  }

  if (!isSafeText(values.fullName) || !isSafeText(values.institution) || !isSafeText(values.designation) || !isSafeText(values.country)) {
    errors.security = "Please remove unsupported characters like < or > from text fields.";
  }

  return errors;
}

export default function RegistrationForm() {
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prev) => {
      let nextValue = type === "checkbox" ? checked : value;

      if (type !== "checkbox") {
        if (name === "email") {
          nextValue = value.trim().toLowerCase();
        } else if (name === "phone") {
          nextValue = value.replace(/[^0-9()+\-\s]/g, "");
        } else if (name !== "website") {
          nextValue = value.replace(/[<>]/g, "").replace(/^\s+/, "");
        }

        if (typeof nextValue === "string" && FIELD_LIMITS[name]) {
          nextValue = nextValue.slice(0, FIELD_LIMITS[name]);
        }
      }

      const updated = { ...prev, [name]: nextValue };

      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }

      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHasSubmitted(true);
    setStatus(null);

    if (formValues.website.trim()) {
      setStatus({
        type: "error",
        message: "Unable to process this request.",
      });
      return;
    }

    const normalized = {
      ...formValues,
      fullName: normalizeSpaces(formValues.fullName),
      institution: normalizeSpaces(formValues.institution),
      designation: normalizeSpaces(formValues.designation),
      country: normalizeSpaces(formValues.country),
      dietaryRequirements: formValues.dietaryRequirements.trim(),
      notes: formValues.notes.trim(),
    };

    const nextErrors = validateForm(normalized);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before proceeding to payment.",
      });
      return;
    }

    setFormValues(normalized);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus({
        type: "success",
        message: "Registration details are validated. Payment API placeholder is ready for your integration.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">IAUP 2026</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Registration</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Fill in your details to continue to payment. The payment API is intentionally left as a placeholder for your later integration.
            </p>
          </div>
          <Link
            href="/"
            className="shrink-0 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formValues.fullName}
                onChange={handleChange}
                autoComplete="name"
                maxLength={FIELD_LIMITS.fullName}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Your full name"
                required
              />
              {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                autoComplete="email"
                maxLength={FIELD_LIMITS.email}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                autoComplete="tel"
                inputMode="tel"
                maxLength={FIELD_LIMITS.phone}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="+880..."
                required
              />
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="institution" className="mb-2 block text-sm font-semibold text-slate-700">
                Institution
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                value={formValues.institution}
                onChange={handleChange}
                autoComplete="organization"
                maxLength={FIELD_LIMITS.institution}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Your university or organization"
                required
              />
              {errors.institution && <p className="mt-2 text-sm text-red-600">{errors.institution}</p>}
            </div>

            <div>
              <label htmlFor="designation" className="mb-2 block text-sm font-semibold text-slate-700">
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                value={formValues.designation}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.designation}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Professor, Dean, Director"
                required
              />
              {errors.designation && <p className="mt-2 text-sm text-red-600">{errors.designation}</p>}
            </div>

            <div>
              <label htmlFor="country" className="mb-2 block text-sm font-semibold text-slate-700">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                value={formValues.country}
                onChange={handleChange}
                autoComplete="country-name"
                maxLength={FIELD_LIMITS.country}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Country"
                required
              />
              {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="attendeeType" className="mb-2 block text-sm font-semibold text-slate-700">
                Attendee Type
              </label>
              <select
                id="attendeeType"
                name="attendeeType"
                value={formValues.attendeeType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                required
              >
                <option value="">Select an option</option>
                {ATTENDEE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.attendeeType && <p className="mt-2 text-sm text-red-600">{errors.attendeeType}</p>}
            </div>

            <div>
              <label htmlFor="dietaryRequirements" className="mb-2 block text-sm font-semibold text-slate-700">
                Dietary Requirements (Optional)
              </label>
              <input
                id="dietaryRequirements"
                name="dietaryRequirements"
                type="text"
                value={formValues.dietaryRequirements}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.dietaryRequirements}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Vegetarian, allergies, etc."
              />
              {errors.dietaryRequirements && <p className="mt-2 text-sm text-red-600">{errors.dietaryRequirements}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-slate-700">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formValues.notes}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.notes}
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Any additional details you want us to know"
              />
              <p className="mt-2 text-xs text-slate-500">{formValues.notes.length}/{FIELD_LIMITS.notes}</p>
              {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                value={formValues.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                name="agreeToPolicy"
                checked={formValues.agreeToPolicy}
                onChange={handleChange}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                required
              />
              <span>I confirm the above details are correct and ready for payment processing.</span>
            </label>
            {errors.agreeToPolicy && <p className="mt-2 text-sm text-red-600">{errors.agreeToPolicy}</p>}
            {errors.security && <p className="mt-2 text-sm text-red-600">{errors.security}</p>}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">This form performs client-side validation and basic bot protection.</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Validating..." : "Proceed to Payment"}
            </button>
          </div>

          {status && (
            <p
              className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
