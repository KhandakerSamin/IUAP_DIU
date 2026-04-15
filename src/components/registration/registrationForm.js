"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const REGISTRATION_PLANS = [
  {
    id: "member",
    name: "IAUP / AUAP Member",
    subtitle: "Special member rates",
    pricing: [
      { label: "Early Bird", price: "USD 400" },
      { label: "General", price: "USD 500" },
      { label: "Late", price: "USD 600" },
    ],
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
    ],
  },
  {
    id: "non-member",
    name: "Non-Member",
    subtitle: "Standard registration rates",
    pricing: [
      { label: "Early Bird", price: "USD 500" },
      { label: "General", price: "USD 600" },
      { label: "Late", price: "USD 700" },
    ],
    features: [
      "All conference sessions",
      "Conference kit and materials",
      "Lunch and coffee breaks",
      "Gala dinner and cultural night",
    ],
  },
  {
    id: "family",
    name: "Participant Family",
    subtitle: "Accompanying person package",
    pricing: [{ label: "Flat Rate", price: "USD 400" }],
    features: [
      "Welcome reception",
      "Gala dinner",
      "Cultural program",
      "Dhaka city tour",
    ],
  },
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

const ATTENDEE_TYPES = REGISTRATION_PLANS.map((plan) => plan.name);
const planMap = new Map(REGISTRATION_PLANS.map((plan) => [plan.id, plan.name]));

const isSafeText = (value) => !/[<>]/.test(value);

function normalizeSpaces(value) {
  return value.replace(/\s+/g, " ").trim();
}

function getAttendeeNameFromId(attendeeId) {
  return planMap.get(attendeeId) ?? "";
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

export default function RegistrationForm({ initialAttendeeId = "" }) {
  const [formValues, setFormValues] = useState(() => ({
    ...INITIAL_FORM,
    attendeeType: getAttendeeNameFromId(initialAttendeeId),
  }));
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPlan = useMemo(
    () => REGISTRATION_PLANS.find((plan) => plan.name === formValues.attendeeType) ?? null,
    [formValues.attendeeType]
  );

  const handleAttendeePick = (attendeeType) => {
    setFormValues((prev) => {
      const updated = { ...prev, attendeeType };
      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }
      return updated;
    });
  };

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
    <section className="relative overflow-hidden py-10 sm:py-14 ">
      <div className="absolute inset-0" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-340 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5  sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">IAUP 2026</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Registration & Payment </h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600 sm:text-base">
              Complete your profile on the left, choose your attendee type on the right, and proceed to payment when ready.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-10 self-center">
            <Image
              src="/navLogo.png"
              alt="DIU Navigation Logo"
              width={160}
              height={44}
              className="h-15 w-auto object-contain"
              priority
            />
            <Image
              src="/diuLogo.png"
              alt="DIU Logo"
              width={90}
              height={64}
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200 bg-white p-6  sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-700">Attendee Information Form</p>
                <Link
                  href="/"
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Back to Home
                </Link>
              </div>

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

          <aside className="lg:col-span-1">
            <div className="space-y-5 lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 ">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-bold text-slate-900">Selected Type</h2>
                </div>

                {selectedPlan ? (
                  <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-sm font-semibold text-primary">{selectedPlan.name}</p>
                    <p className="mt-1 text-xs text-slate-600">{selectedPlan.subtitle}</p>
                    <ul className="mt-3 space-y-2">
                      {selectedPlan.pricing.map((item) => (
                        <li key={`${selectedPlan.id}-${item.label}`} className="flex items-center justify-between text-sm text-slate-700">
                          <span>{item.label}</span>
                          <strong className="font-display text-slate-900">{item.price}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-600">Choose an attendee card below to auto-select it in the form.</p>
                )}
                <p className="mt-3 text-xs text-slate-500">You can change the attendee type anytime from cards or the form dropdown.</p>
              </div>

              <div className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 ">
                <p className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Registration Plans</p>
                {REGISTRATION_PLANS.map((plan) => {
                  const isSelected = formValues.attendeeType === plan.name;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handleAttendeePick(plan.name)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 bg-white hover:border-primary/40 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                          <p className="mt-1 text-xs text-slate-600">{plan.subtitle}</p>
                        </div>
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                            isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isSelected ? "Selected" : "Change"}
                        </span>
                      </div>
                      <div className="mt-3 text-xs text-slate-600">
                        {plan.pricing.map((tier) => `${tier.label}: ${tier.price}`).join(" | ")}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
