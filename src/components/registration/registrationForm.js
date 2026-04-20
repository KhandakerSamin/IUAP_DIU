"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "iaup_registration";

const TITLE_OPTIONS = ["Mr.", "Ms.", "Dr.", "Prof.", "Prof. Dr.", "Others"];
const GENDER_OPTIONS = ["Male", "Female"];
const TSHIRT_OPTIONS = ["S", "M", "L", "XL", "XXL"];
const FOOD_OPTIONS = ["Vegan", "Vegetarian", "Halal", "Other", "None"];
const YES_NO_OPTIONS = ["Yes", "No"];
const FAMILY_MEMBER_OPTIONS = ["1", "2", "3", "4", "Others"];
const COUNTRY_CODE_OPTIONS = [
  { value: "+880", label: "Bangladesh (+880)" },
  { value: "+1", label: "USA/Canada (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+91", label: "India (+91)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+65", label: "Singapore (+65)" },
  { value: "+60", label: "Malaysia (+60)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+86", label: "China (+86)" },
  { value: "+966", label: "Saudi Arabia (+966)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
];

const PAYMENT_OPTIONS = [
  { value: "wire-transfer", label: "Wire Transfer" },
  { value: "online-payment", label: "Online Payment" },
];

const FIELD_LIMITS = {
  givenName: 80,
  surname: 80,
  otherTitle: 50,
  passportNo: 20,
  nationality: 80,
  organization: 140,
  position: 120,
  department: 120,
  address: 240,
  zipCode: 20,
  city: 80,
  country: 80,
  phone: 24,
  whatsapp: 24,
  email: 120,
  alternativeEmail: 120,
  otherFood: 160,
  familyMembersOther: 2,
  website: 120,
  familyName: 80,
  familyPassportNo: 20,
  familyPhone: 24,
  familyEmail: 120,
};

const MEMBER_FEES_USD = {
  early: 400,
  general: 500,
  late: 600,
};

const NON_MEMBER_FEES_USD = {
  early: 500,
  general: 600,
  late: 700,
};

const FAMILY_MEMBER_FEE_USD = 400;

function buildEmptyFamilyMember() {
  return {
    name: "",
    passportNo: "",
    email: "",
    phoneCountryCode: "+880",
    phone: "",
    tShirtSize: "",
    passportScanName: "",
    profilePictureName: "",
  };
}

const INITIAL_FORM = {
  title: "",
  otherTitle: "",
  givenName: "",
  surname: "",
  gender: "",
  passportNo: "",
  nationality: "",
  organization: "",
  position: "",
  department: "",
  address: "",
  zipCode: "",
  city: "",
  country: "",
  phoneCountryCode: "+880",
  phone: "",
  whatsappCountryCode: "+880",
  whatsapp: "",
  email: "",
  alternativeEmail: "",
  tShirtSize: "",
  foodRequirement: "",
  otherFood: "",
  isMemberUniversity: "",
  hasFamilyMembers: "",
  familyMembersCount: "",
  familyMembersOther: "",
  familyMemberDetails: [],
  participantPassportScanName: "",
  participantProfilePictureName: "",
  needsInvitationLetter: "",
  paymentMethod: "",
  agreeToPolicy: false,
  website: "",
};

function normalizeSpaces(value) {
  return value.replace(/\s+/g, " ").trim();
}

function sanitizeBasicText(value) {
  return value.replace(/[<>]/g, "").replace(/^\s+/, "");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhoneNumber(value) {
  return /^[0-9()\-\s]{6,24}$/.test(value);
}

function resolveFamilyMemberCount(values) {
  if (values.hasFamilyMembers !== "Yes") return 0;

  if (values.familyMembersCount === "Others") {
    const count = Number(values.familyMembersOther);
    return Number.isInteger(count) && count > 0 ? count : 0;
  }

  const parsed = Number(values.familyMembersCount);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 0;
}

function syncFamilyMembers(existingMembers, count) {
  return Array.from({ length: count }, (_, index) => {
    const prev = existingMembers[index];
    if (!prev) return buildEmptyFamilyMember();
    return {
      ...buildEmptyFamilyMember(),
      ...prev,
    };
  });
}

function getRegistrationPeriod(now = new Date()) {
  const earlyEnd = new Date("2026-09-30T23:59:59");
  const generalEnd = new Date("2026-10-30T23:59:59");
  const lateEnd = new Date("2026-11-10T23:59:59");

  if (now <= earlyEnd) {
    return {
      key: "early",
      label: "Early Bird",
      range: "Up to September 30, 2026",
      isClosed: false,
    };
  }

  if (now <= generalEnd) {
    return {
      key: "general",
      label: "General",
      range: "October 1 - October 30, 2026",
      isClosed: false,
    };
  }

  if (now <= lateEnd) {
    return {
      key: "late",
      label: "Late Registration",
      range: "October 31 - November 10, 2026",
      isClosed: false,
    };
  }

  return {
    key: "late",
    label: "Late Registration",
    range: "October 31 - November 10, 2026",
    isClosed: true,
  };
}

function formatUsd(amount) {
  return `USD ${amount.toLocaleString()}`;
}

function calculatePricing(values) {
  const period = getRegistrationPeriod();
  const familyCount = resolveFamilyMemberCount(values);
  const isMemberSelected = values.isMemberUniversity === "Yes" || values.isMemberUniversity === "No";
  const isMember = values.isMemberUniversity === "Yes";
  const baseFeeUsd = isMemberSelected
    ? (isMember ? MEMBER_FEES_USD[period.key] : NON_MEMBER_FEES_USD[period.key])
    : 0;

  const familyFeeUsd = familyCount * FAMILY_MEMBER_FEE_USD;
  const totalFeeUsd = baseFeeUsd + familyFeeUsd;

  return {
    period,
    isMemberSelected,
    isMember,
    familyCount,
    baseFeeUsd,
    familyFeeUsd,
    totalFeeUsd,
  };
}

function validateForm(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Please select a title.";
  }

  if (values.title === "Others" && !values.otherTitle.trim()) {
    errors.otherTitle = "Please specify your title.";
  }

  if (!values.givenName.trim()) {
    errors.givenName = "Given name is required.";
  }

  if (!values.surname.trim()) {
    errors.surname = "Surname is required.";
  }

  if (!values.gender || !GENDER_OPTIONS.includes(values.gender)) {
    errors.gender = "Please select your gender.";
  }

  if (!values.passportNo.trim()) {
    errors.passportNo = "Passport number is required.";
  }

  if (!values.nationality.trim()) {
    errors.nationality = "Nationality is required.";
  }

  if (!values.organization.trim()) {
    errors.organization = "Name of the Organization/Institution is required.";
  }

  if (!values.position.trim()) {
    errors.position = "Position is required.";
  }

  if (!values.department.trim()) {
    errors.department = "Department/Office is required.";
  }

  if (!values.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!values.zipCode.trim()) {
    errors.zipCode = "Zip code is required.";
  }

  if (!values.city.trim()) {
    errors.city = "City is required.";
  }

  if (!values.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!values.phoneCountryCode || !COUNTRY_CODE_OPTIONS.some((code) => code.value === values.phoneCountryCode)) {
    errors.phoneCountryCode = "Please select a country code.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhoneNumber(values.phone.trim())) {
    errors.phone = "Please provide a valid phone number.";
  }

  if (values.whatsapp.trim()) {
    if (!values.whatsappCountryCode || !COUNTRY_CODE_OPTIONS.some((code) => code.value === values.whatsappCountryCode)) {
      errors.whatsappCountryCode = "Please select a country code.";
    }

    if (!isValidPhoneNumber(values.whatsapp.trim())) {
      errors.whatsapp = "Please provide a valid WhatsApp number.";
    }
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = "Please provide a valid email address.";
  }

  if (values.alternativeEmail.trim() && !isValidEmail(values.alternativeEmail.trim())) {
    errors.alternativeEmail = "Please provide a valid alternative email address.";
  }

  if (
    values.alternativeEmail.trim() &&
    values.email.trim() &&
    values.alternativeEmail.trim().toLowerCase() === values.email.trim().toLowerCase()
  ) {
    errors.alternativeEmail = "Alternative email should be different from the primary email.";
  }

  if (!values.tShirtSize || !TSHIRT_OPTIONS.includes(values.tShirtSize)) {
    errors.tShirtSize = "Please select your T-shirt size.";
  }

  if (!values.foodRequirement || !FOOD_OPTIONS.includes(values.foodRequirement)) {
    errors.foodRequirement = "Please select your food requirement.";
  }

  if (values.foodRequirement === "Other" && !values.otherFood.trim()) {
    errors.otherFood = "Please describe your food preferences.";
  }

  if (!values.participantPassportScanName) {
    errors.participantPassportScanName = "Please upload your passport front page scan copy.";
  }

  if (!values.participantProfilePictureName) {
    errors.participantProfilePictureName = "Please upload your profile picture.";
  }

  if (!values.isMemberUniversity || !YES_NO_OPTIONS.includes(values.isMemberUniversity)) {
    errors.isMemberUniversity = "Please select Yes or No.";
  }

  if (!values.hasFamilyMembers || !YES_NO_OPTIONS.includes(values.hasFamilyMembers)) {
    errors.hasFamilyMembers = "Please select Yes or No.";
  }

  const familyMemberCount = resolveFamilyMemberCount(values);
  if (values.hasFamilyMembers === "Yes") {
    if (!values.familyMembersCount || !FAMILY_MEMBER_OPTIONS.includes(values.familyMembersCount)) {
      errors.familyMembersCount = "Please select the number of accompanying family members.";
    }

    if (values.familyMembersCount === "Others") {
      const count = Number(values.familyMembersOther);
      if (!values.familyMembersOther.trim()) {
        errors.familyMembersOther = "Please specify the number of family members.";
      } else if (!Number.isInteger(count) || count < 1) {
        errors.familyMembersOther = "Please enter a valid number.";
      }
    }

    if (familyMemberCount > 0) {
      const familyErrors = {};

      for (let i = 0; i < familyMemberCount; i += 1) {
        const member = values.familyMemberDetails[i] || buildEmptyFamilyMember();
        const itemErrors = {};

        if (!member.name.trim()) {
          itemErrors.name = "Name is required.";
        }

        if (!member.passportNo.trim()) {
          itemErrors.passportNo = "Passport number is required.";
        }

        if (!member.email.trim()) {
          itemErrors.email = "Email is required.";
        } else if (!isValidEmail(member.email.trim())) {
          itemErrors.email = "Please provide a valid email address.";
        }

        if (!member.phoneCountryCode || !COUNTRY_CODE_OPTIONS.some((code) => code.value === member.phoneCountryCode)) {
          itemErrors.phoneCountryCode = "Please select a country code.";
        }

        if (!member.phone.trim()) {
          itemErrors.phone = "Phone number is required.";
        } else if (!isValidPhoneNumber(member.phone.trim())) {
          itemErrors.phone = "Please provide a valid phone number.";
        }

        if (!member.tShirtSize || !TSHIRT_OPTIONS.includes(member.tShirtSize)) {
          itemErrors.tShirtSize = "Please select a T-shirt size.";
        }

        if (!member.passportScanName) {
          itemErrors.passportScanName = "Please upload passport front page scan copy.";
        }

        if (!member.profilePictureName) {
          itemErrors.profilePictureName = "Please upload profile picture.";
        }

        if (Object.keys(itemErrors).length > 0) {
          familyErrors[i] = itemErrors;
        }
      }

      if (Object.keys(familyErrors).length > 0) {
        errors.familyMembers = familyErrors;
      }
    }
  }

  if (!values.needsInvitationLetter || !YES_NO_OPTIONS.includes(values.needsInvitationLetter)) {
    errors.needsInvitationLetter = "Please select Yes or No.";
  }

  if (!values.paymentMethod || !PAYMENT_OPTIONS.some((option) => option.value === values.paymentMethod)) {
    errors.paymentMethod = "Please select a payment method.";
  }

  if (!values.agreeToPolicy) {
    errors.agreeToPolicy = "You must agree before continuing to payment.";
  }

  return errors;
}

function OptionGroup({ legend, name, options, value, onChange, error }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-sm font-semibold text-slate-700">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={`${name}-${option}`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}

function FileUploadField({ id, name, label, helperText, onChange, error, selectedFileName }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*,.pdf"
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-primary"
      />
      {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
      {selectedFileName && <p className="mt-1 text-xs font-medium text-slate-700">Selected: {selectedFileName}</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default function RegistrationForm({ initialAttendeeId = "" }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;

      setFormValues((prev) => {
        const next = {
          ...prev,
          ...saved,
          familyMemberDetails: Array.isArray(saved.familyMemberDetails)
            ? saved.familyMemberDetails.map((member) => ({
                ...buildEmptyFamilyMember(),
                ...member,
              }))
            : prev.familyMemberDetails,
        };

        const familyMemberCount = resolveFamilyMemberCount(next);
        next.familyMemberDetails = syncFamilyMembers(next.familyMemberDetails, familyMemberCount);

        return next;
      });
    } catch {
      // ignore corrupt sessionStorage
    }
  }, []);

  useEffect(() => {
    if (!initialAttendeeId) return;

    setFormValues((prev) => {
      if (initialAttendeeId === "member" && !prev.isMemberUniversity) {
        return { ...prev, isMemberUniversity: "Yes" };
      }

      if (initialAttendeeId === "non-member" && !prev.isMemberUniversity) {
        return { ...prev, isMemberUniversity: "No" };
      }

      if (initialAttendeeId === "family" && prev.hasFamilyMembers !== "Yes") {
        const next = {
          ...prev,
          hasFamilyMembers: "Yes",
          familyMembersCount: prev.familyMembersCount || "1",
        };
        const count = resolveFamilyMemberCount(next);
        next.familyMemberDetails = syncFamilyMembers(next.familyMemberDetails, count);
        return next;
      }

      return prev;
    });
  }, [initialAttendeeId]);

  const participantName = `${normalizeSpaces(formValues.givenName)} ${normalizeSpaces(formValues.surname)}`.trim();
  const isOnlinePayment = formValues.paymentMethod === "online-payment";
  const pricing = useMemo(() => calculatePricing(formValues), [formValues]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prev) => {
      const updated = { ...prev };
      let nextValue = type === "checkbox" ? checked : value;

      if (type !== "checkbox") {
        if (name === "email" || name === "alternativeEmail") {
          nextValue = value.trim().toLowerCase();
        } else if (name === "phone" || name === "whatsapp") {
          nextValue = value.replace(/[^0-9()\-\s]/g, "");
        } else if (name === "passportNo") {
          nextValue = value.replace(/[^A-Za-z0-9\-]/g, "").toUpperCase();
        } else if (name === "zipCode") {
          nextValue = sanitizeBasicText(value).replace(/[^A-Za-z0-9\-\s]/g, "");
        } else if (name === "familyMembersOther") {
          nextValue = value.replace(/\D/g, "");
        } else {
          nextValue = sanitizeBasicText(value);
        }

        if (FIELD_LIMITS[name]) {
          nextValue = nextValue.slice(0, FIELD_LIMITS[name]);
        }
      }

      updated[name] = nextValue;

      if (name === "title" && nextValue !== "Others") {
        updated.otherTitle = "";
      }

      if (name === "foodRequirement" && nextValue !== "Other") {
        updated.otherFood = "";
      }

      if (name === "hasFamilyMembers" && nextValue !== "Yes") {
        updated.familyMembersCount = "";
        updated.familyMembersOther = "";
        updated.familyMemberDetails = [];
      }

      if (name === "familyMembersCount" && nextValue !== "Others") {
        updated.familyMembersOther = "";
      }

      const familyMemberCount = resolveFamilyMemberCount(updated);
      updated.familyMemberDetails = syncFamilyMembers(updated.familyMemberDetails, familyMemberCount);

      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }

      return updated;
    });
  };

  const handleParticipantFileChange = (event) => {
    const { name, files } = event.target;
    const fileName = files && files[0] ? files[0].name : "";

    setFormValues((prev) => {
      const updated = {
        ...prev,
        [name]: fileName,
      };

      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }

      return updated;
    });
  };

  const handleFamilyMemberChange = (index, field, rawValue) => {
    setFormValues((prev) => {
      const nextFamilyMembers = [...prev.familyMemberDetails];
      const current = {
        ...buildEmptyFamilyMember(),
        ...nextFamilyMembers[index],
      };

      let nextValue = rawValue;
      if (field === "email") {
        nextValue = rawValue.trim().toLowerCase();
      } else if (field === "passportNo") {
        nextValue = rawValue.replace(/[^A-Za-z0-9\-]/g, "").toUpperCase();
      } else if (field === "phone") {
        nextValue = rawValue.replace(/[^0-9()\-\s]/g, "");
      } else {
        nextValue = sanitizeBasicText(rawValue);
      }

      const limitMap = {
        name: FIELD_LIMITS.familyName,
        passportNo: FIELD_LIMITS.familyPassportNo,
        email: FIELD_LIMITS.familyEmail,
        phone: FIELD_LIMITS.familyPhone,
      };
      const limit = limitMap[field];
      if (limit) {
        nextValue = nextValue.slice(0, limit);
      }

      current[field] = nextValue;
      nextFamilyMembers[index] = current;

      const updated = {
        ...prev,
        familyMemberDetails: nextFamilyMembers,
      };

      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }

      return updated;
    });
  };

  const handleFamilyMemberFileChange = (index, field, files) => {
    const fileName = files && files[0] ? files[0].name : "";

    setFormValues((prev) => {
      const nextFamilyMembers = [...prev.familyMemberDetails];
      const current = {
        ...buildEmptyFamilyMember(),
        ...nextFamilyMembers[index],
      };
      current[field] = fileName;
      nextFamilyMembers[index] = current;

      const updated = {
        ...prev,
        familyMemberDetails: nextFamilyMembers,
      };

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
      setStatus({ type: "error", message: "Unable to process this request." });
      return;
    }

    const familyMemberCount = resolveFamilyMemberCount(formValues);
    const normalizedFamilyMembers = syncFamilyMembers(formValues.familyMemberDetails, familyMemberCount).map((member) => ({
      ...member,
      name: normalizeSpaces(member.name || ""),
      passportNo: (member.passportNo || "").trim().toUpperCase(),
      email: (member.email || "").trim().toLowerCase(),
      phone: (member.phone || "").trim(),
      phoneCountryCode: member.phoneCountryCode || "+880",
      passportScanName: member.passportScanName || "",
      profilePictureName: member.profilePictureName || "",
    }));

    const normalized = {
      ...formValues,
      otherTitle: normalizeSpaces(formValues.otherTitle),
      givenName: normalizeSpaces(formValues.givenName),
      surname: normalizeSpaces(formValues.surname),
      nationality: normalizeSpaces(formValues.nationality),
      organization: normalizeSpaces(formValues.organization),
      position: normalizeSpaces(formValues.position),
      department: normalizeSpaces(formValues.department),
      address: normalizeSpaces(formValues.address),
      city: normalizeSpaces(formValues.city),
      country: normalizeSpaces(formValues.country),
      otherFood: normalizeSpaces(formValues.otherFood),
      passportNo: formValues.passportNo.trim(),
      zipCode: formValues.zipCode.trim(),
      phone: formValues.phone.trim(),
      whatsapp: formValues.whatsapp.trim(),
      email: formValues.email.trim().toLowerCase(),
      alternativeEmail: formValues.alternativeEmail.trim().toLowerCase(),
      familyMembersOther: formValues.familyMembersOther.trim(),
      familyMemberDetails: normalizedFamilyMembers,
    };

    const computedPricing = calculatePricing(normalized);
    normalized.pricing = {
      registrationPeriodKey: computedPricing.period.key,
      registrationPeriodLabel: computedPricing.period.label,
      registrationPeriodRange: computedPricing.period.range,
      memberCategory: normalized.isMemberUniversity === "Yes" ? "Member / Partner Institution" : "Non-Member",
      baseFeeUsd: computedPricing.baseFeeUsd,
      familyMembersCount: computedPricing.familyCount,
      familyFeeUsd: computedPricing.familyFeeUsd,
      totalFeeUsd: computedPricing.totalFeeUsd,
      currency: "USD",
      isAfterDeadline: computedPricing.period.isClosed,
      calculatedAt: new Date().toISOString(),
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
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (normalized.paymentMethod === "wire-transfer") {
        setStatus({
          type: "wire",
          name: `${normalized.givenName} ${normalized.surname}`.trim(),
          totalFeeUsd: normalized.pricing.totalFeeUsd,
        });
        return;
      }

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...normalized,
            fullName: `${normalized.givenName} ${normalized.surname}`.trim(),
            phoneFull: `${normalized.phoneCountryCode} ${normalized.phone}`.trim(),
            whatsappFull: normalized.whatsapp ? `${normalized.whatsappCountryCode} ${normalized.whatsapp}`.trim() : "",
          })
        );
      } catch {
        // sessionStorage may be unavailable (private mode, quota); payment page will show a helpful error
      }

      router.push("/registration/online-payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const familyMembersToRender = useMemo(() => {
    const count = resolveFamilyMemberCount(formValues);
    return syncFamilyMembers(formValues.familyMemberDetails, count);
  }, [formValues]);

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">IAUP Semi Annual Meeting 2026</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Registration Form</h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">Daffodil International University | Event Date: 19-21 November 2026</p>
          </div>
          <div className="flex shrink-0 items-center gap-8 self-center">
            <Image
              src="/navLogo.png"
              alt="DIU Navigation Logo"
              width={160}
              height={44}
              className="h-10 md:h-14 w-auto object-contain"
              priority
            />
            <Image src="/diuLogo.png" alt="DIU Logo" width={90} height={64} className="h-9 md:h-12 w-auto object-contain" />
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700">Participant Information</p>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Back to Home
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <OptionGroup
              legend="Title"
              name="title"
              options={TITLE_OPTIONS}
              value={formValues.title}
              onChange={handleChange}
              error={errors.title}
            />

            {formValues.title === "Others" && (
              <div className="sm:col-span-2">
                <label htmlFor="otherTitle" className="mb-2 block text-sm font-semibold text-slate-700">
                  Other Title
                </label>
                <input
                  id="otherTitle"
                  name="otherTitle"
                  type="text"
                  value={formValues.otherTitle}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.otherTitle}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                  placeholder="Please specify your title"
                />
                {errors.otherTitle && <p className="mt-2 text-sm text-red-600">{errors.otherTitle}</p>}
              </div>
            )}

            <div>
              <label htmlFor="givenName" className="mb-2 block text-sm font-semibold text-slate-700">
                Given Name
              </label>
              <input
                id="givenName"
                name="givenName"
                type="text"
                value={formValues.givenName}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.givenName}
                autoComplete="given-name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Given name"
                required
              />
              {errors.givenName && <p className="mt-2 text-sm text-red-600">{errors.givenName}</p>}
            </div>

            <div>
              <label htmlFor="surname" className="mb-2 block text-sm font-semibold text-slate-700">
                Surname
              </label>
              <input
                id="surname"
                name="surname"
                type="text"
                value={formValues.surname}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.surname}
                autoComplete="family-name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Surname"
                required
              />
              {errors.surname && <p className="mt-2 text-sm text-red-600">{errors.surname}</p>}
            </div>

            <OptionGroup
              legend="Gender"
              name="gender"
              options={GENDER_OPTIONS}
              value={formValues.gender}
              onChange={handleChange}
              error={errors.gender}
            />

            <div>
              <label htmlFor="passportNo" className="mb-2 block text-sm font-semibold text-slate-700">
                Passport No
              </label>
              <input
                id="passportNo"
                name="passportNo"
                type="text"
                value={formValues.passportNo}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.passportNo}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Passport number"
                required
              />
              {errors.passportNo && <p className="mt-2 text-sm text-red-600">{errors.passportNo}</p>}
            </div>

            <div>
              <label htmlFor="nationality" className="mb-2 block text-sm font-semibold text-slate-700">
                Nationality (As per passport)
              </label>
              <input
                id="nationality"
                name="nationality"
                type="text"
                value={formValues.nationality}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.nationality}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Nationality"
                required
              />
              {errors.nationality && <p className="mt-2 text-sm text-red-600">{errors.nationality}</p>}
            </div>

            <div>
              <label htmlFor="organization" className="mb-2 block text-sm font-semibold text-slate-700">
                Name of the Organization/Institution
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formValues.organization}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.organization}
                autoComplete="organization"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Name of the Organization/Institution"
                required
              />
              {errors.organization && <p className="mt-2 text-sm text-red-600">{errors.organization}</p>}
            </div>

            <div>
              <label htmlFor="position" className="mb-2 block text-sm font-semibold text-slate-700">
                Position
              </label>
              <input
                id="position"
                name="position"
                type="text"
                value={formValues.position}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.position}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Position"
                required
              />
              {errors.position && <p className="mt-2 text-sm text-red-600">{errors.position}</p>}
            </div>

            <div>
              <label htmlFor="department" className="mb-2 block text-sm font-semibold text-slate-700">
                Department/Office
              </label>
              <input
                id="department"
                name="department"
                type="text"
                value={formValues.department}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.department}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Department/Office"
                required
              />
              {errors.department && <p className="mt-2 text-sm text-red-600">{errors.department}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.address}
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Address"
                required
              />
              {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="zipCode" className="mb-2 block text-sm font-semibold text-slate-700">
                Zip code
              </label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={formValues.zipCode}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.zipCode}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Zip code"
                required
              />
              {errors.zipCode && <p className="mt-2 text-sm text-red-600">{errors.zipCode}</p>}
            </div>

            <div>
              <label htmlFor="city" className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={formValues.city}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.city}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="City"
                required
              />
              {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
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
                maxLength={FIELD_LIMITS.country}
                autoComplete="country-name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Country"
                required
              />
              {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number (with country code)
              </label>
              <div className="flex gap-2">
                <select
                  id="phoneCountryCode"
                  name="phoneCountryCode"
                  value={formValues.phoneCountryCode}
                  onChange={handleChange}
                  className="w-48 rounded-xl border border-slate-300 px-3 py-3 text-slate-900 outline-none transition focus:border-primary"
                >
                  {COUNTRY_CODE_OPTIONS.map((option) => (
                    <option key={`phone-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.phone}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                  placeholder="Phone number"
                  required
                />
              </div>
              {(errors.phoneCountryCode || errors.phone) && (
                <p className="mt-2 text-sm text-red-600">{errors.phoneCountryCode || errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-slate-700">
                WhatsApp Number (optional)
              </label>
              <div className="flex gap-2">
                <select
                  id="whatsappCountryCode"
                  name="whatsappCountryCode"
                  value={formValues.whatsappCountryCode}
                  onChange={handleChange}
                  className="w-48 rounded-xl border border-slate-300 px-3 py-3 text-slate-900 outline-none transition focus:border-primary"
                >
                  {COUNTRY_CODE_OPTIONS.map((option) => (
                    <option key={`whatsapp-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  value={formValues.whatsapp}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.whatsapp}
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                  placeholder="WhatsApp number"
                />
              </div>
              {(errors.whatsappCountryCode || errors.whatsapp) && (
                <p className="mt-2 text-sm text-red-600">{errors.whatsappCountryCode || errors.whatsapp}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.email}
                autoComplete="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="you@example.com"
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="alternativeEmail" className="mb-2 block text-sm font-semibold text-slate-700">
                Alternative Email
              </label>
              <input
                id="alternativeEmail"
                name="alternativeEmail"
                type="email"
                value={formValues.alternativeEmail}
                onChange={handleChange}
                maxLength={FIELD_LIMITS.alternativeEmail}
                autoComplete="email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                placeholder="Alternative email (optional)"
              />
              {errors.alternativeEmail && <p className="mt-2 text-sm text-red-600">{errors.alternativeEmail}</p>}
            </div>

            <OptionGroup
              legend="T-Shirt Size"
              name="tShirtSize"
              options={TSHIRT_OPTIONS}
              value={formValues.tShirtSize}
              onChange={handleChange}
              error={errors.tShirtSize}
            />

            <OptionGroup
              legend="Any food requirements?"
              name="foodRequirement"
              options={FOOD_OPTIONS}
              value={formValues.foodRequirement}
              onChange={handleChange}
              error={errors.foodRequirement}
            />

            {formValues.foodRequirement === "Other" && (
              <div className="sm:col-span-2">
                <label htmlFor="otherFood" className="mb-2 block text-sm font-semibold text-slate-700">
                  Other Food Requirement
                </label>
                <input
                  id="otherFood"
                  name="otherFood"
                  type="text"
                  value={formValues.otherFood}
                  onChange={handleChange}
                  maxLength={FIELD_LIMITS.otherFood}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                  placeholder="Please describe your food preferences"
                />
                {errors.otherFood && <p className="mt-2 text-sm text-red-600">{errors.otherFood}</p>}
              </div>
            )}

            <fieldset className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <legend className="px-1 text-sm font-semibold text-slate-700">Participant Uploads</legend>
              <p className="mb-4 mt-2 text-sm text-slate-600">
                Upload both passport front page (scan copy) and profile picture.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <FileUploadField
                  id="participantPassportScanName"
                  name="participantPassportScanName"
                  label="Passport front page (scan copy)"
                  helperText="Accepted: image or PDF"
                  onChange={handleParticipantFileChange}
                  error={errors.participantPassportScanName}
                  selectedFileName={formValues.participantPassportScanName}
                />
                <FileUploadField
                  id="participantProfilePictureName"
                  name="participantProfilePictureName"
                  label="Profile picture"
                  helperText="Accepted: image"
                  onChange={handleParticipantFileChange}
                  error={errors.participantProfilePictureName}
                  selectedFileName={formValues.participantProfilePictureName}
                />
              </div>
            </fieldset>

            <OptionGroup
              legend="Are you/your university a member of IAUP/ AUAP/ DIU's Partner University?"
              name="isMemberUniversity"
              options={YES_NO_OPTIONS}
              value={formValues.isMemberUniversity}
              onChange={handleChange}
              error={errors.isMemberUniversity}
            />

            <OptionGroup
              legend="Will any of your family members join the event?"
              name="hasFamilyMembers"
              options={YES_NO_OPTIONS}
              value={formValues.hasFamilyMembers}
              onChange={handleChange}
              error={errors.hasFamilyMembers}
            />

            {formValues.hasFamilyMembers === "Yes" && (
              <fieldset className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <legend className="px-1 text-sm font-semibold text-slate-700">
                  Please select the number of accompanying family members (USD 400 per person)
                </legend>
                <div className="mt-3 flex flex-wrap gap-3">
                  {FAMILY_MEMBER_OPTIONS.map((option) => (
                    <label
                      key={`family-${option}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                    >
                      <input
                        type="radio"
                        name="familyMembersCount"
                        value={option}
                        checked={formValues.familyMembersCount === option}
                        onChange={handleChange}
                        className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {errors.familyMembersCount && <p className="mt-2 text-sm text-red-600">{errors.familyMembersCount}</p>}

                {formValues.familyMembersCount === "Others" && (
                  <div className="mt-4 max-w-xs">
                    <label htmlFor="familyMembersOther" className="mb-2 block text-sm font-semibold text-slate-700">
                      Specify Number
                    </label>
                    <input
                      id="familyMembersOther"
                      name="familyMembersOther"
                      type="text"
                      inputMode="numeric"
                      value={formValues.familyMembersOther}
                      onChange={handleChange}
                      maxLength={FIELD_LIMITS.familyMembersOther}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                      placeholder="Number"
                    />
                    {errors.familyMembersOther && <p className="mt-2 text-sm text-red-600">{errors.familyMembersOther}</p>}
                  </div>
                )}

                {familyMembersToRender.length > 0 && (
                  <div className="mt-6 space-y-6">
                    {familyMembersToRender.map((member, index) => {
                      const memberErrors = errors.familyMembers?.[index] || {};
                      return (
                        <div key={`family-member-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                          <h3 className="mb-4 text-sm font-semibold text-slate-800">Family Member {index + 1}</h3>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Name</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(event) => handleFamilyMemberChange(index, "name", event.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="Full name"
                              />
                              {memberErrors.name && <p className="mt-2 text-sm text-red-600">{memberErrors.name}</p>}
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Passport No</label>
                              <input
                                type="text"
                                value={member.passportNo}
                                onChange={(event) => handleFamilyMemberChange(index, "passportNo", event.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="Passport number"
                              />
                              {memberErrors.passportNo && <p className="mt-2 text-sm text-red-600">{memberErrors.passportNo}</p>}
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                              <input
                                type="email"
                                value={member.email}
                                onChange={(event) => handleFamilyMemberChange(index, "email", event.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="email@example.com"
                              />
                              {memberErrors.email && <p className="mt-2 text-sm text-red-600">{memberErrors.email}</p>}
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">Phone No</label>
                              <div className="flex gap-2">
                                <select
                                  value={member.phoneCountryCode}
                                  onChange={(event) =>
                                    handleFamilyMemberChange(index, "phoneCountryCode", event.target.value)
                                  }
                                  className="w-40 rounded-xl border border-slate-300 px-3 py-3 text-slate-900 outline-none transition focus:border-primary"
                                >
                                  {COUNTRY_CODE_OPTIONS.map((option) => (
                                    <option key={`family-code-${index}-${option.value}`} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="tel"
                                  value={member.phone}
                                  onChange={(event) => handleFamilyMemberChange(index, "phone", event.target.value)}
                                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                  placeholder="Phone number"
                                />
                              </div>
                              {(memberErrors.phoneCountryCode || memberErrors.phone) && (
                                <p className="mt-2 text-sm text-red-600">{memberErrors.phoneCountryCode || memberErrors.phone}</p>
                              )}
                            </div>

                            <div>
                              <label className="mb-2 block text-sm font-semibold text-slate-700">T-shirt Size</label>
                              <select
                                value={member.tShirtSize}
                                onChange={(event) => handleFamilyMemberChange(index, "tShirtSize", event.target.value)}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                              >
                                <option value="">Select size</option>
                                {TSHIRT_OPTIONS.map((size) => (
                                  <option key={`family-size-${index}-${size}`} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                              {memberErrors.tShirtSize && <p className="mt-2 text-sm text-red-600">{memberErrors.tShirtSize}</p>}
                            </div>

                            <FileUploadField
                              id={`family-${index}-passport-scan`}
                              name={`family-${index}-passport-scan`}
                              label="Passport front page (scan copy)"
                              helperText="Accepted: image or PDF"
                              onChange={(event) => handleFamilyMemberFileChange(index, "passportScanName", event.target.files)}
                              error={memberErrors.passportScanName}
                              selectedFileName={member.passportScanName}
                            />

                            <FileUploadField
                              id={`family-${index}-profile-picture`}
                              name={`family-${index}-profile-picture`}
                              label="Profile picture"
                              helperText="Accepted: image"
                              onChange={(event) => handleFamilyMemberFileChange(index, "profilePictureName", event.target.files)}
                              error={memberErrors.profilePictureName}
                              selectedFileName={member.profilePictureName}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            )}

            <OptionGroup
              legend="Do you need an Invitation Letter in order to apply for a Visa to Bangladesh?"
              name="needsInvitationLetter"
              options={YES_NO_OPTIONS}
              value={formValues.needsInvitationLetter}
              onChange={handleChange}
              error={errors.needsInvitationLetter}
            />

            <fieldset className="sm:col-span-2">
              <legend className="mb-2 block text-sm font-semibold text-slate-700">
                Which payment method do you want to choose for registration payment?
              </legend>
              <div className="flex flex-wrap gap-3">
                {PAYMENT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.value}
                      checked={formValues.paymentMethod === option.value}
                      onChange={handleChange}
                      className="h-4 w-4 border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.paymentMethod && <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>}
            </fieldset>

            <div className="sm:col-span-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <h2 className="mb-3 font-semibold text-blue-950">Automatic Registration Cost Summary</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                <p>
                  Registration Period (auto): <strong>{pricing.period.label}</strong>
                </p>
                <p>
                  Date Range: <strong>{pricing.period.range}</strong>
                </p>
                <p>
                  Participant Category:{" "}
                  <strong>
                    {formValues.isMemberUniversity === "Yes"
                      ? "IAUP/AUAP Member or DIU Partner Institution"
                      : formValues.isMemberUniversity === "No"
                        ? "Non-Member"
                        : "Select membership above"}
                  </strong>
                </p>
                <p>
                  Base Registration Fee: <strong>{formatUsd(pricing.baseFeeUsd)}</strong>
                </p>
                <p>
                  Family Members: <strong>{pricing.familyCount}</strong>
                </p>
                <p>
                  Family Cost ({formatUsd(FAMILY_MEMBER_FEE_USD)} x {pricing.familyCount}):{" "}
                  <strong>{formatUsd(pricing.familyFeeUsd)}</strong>
                </p>
              </div>
              <p className="mt-3 text-base">
                Total Payable: <strong>{formatUsd(pricing.totalFeeUsd)}</strong>
              </p>
              {pricing.period.isClosed && (
                <p className="mt-2 text-xs font-medium text-amber-700">
                  The official late registration deadline was November 10, 2026. Please contact the secretariat before proceeding.
                </p>
              )}
            </div>

            <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <h2 className="mb-3 font-semibold text-slate-900">Data Protection Statement & Personality/Image Rights</h2>
              <p>
                By filling out the registration form, the participant gives consent that IAUP Semi Annual Meeting 2026
                Secretariat can process the data provided within the framework of the conference and allow photographs to
                be made during the conference. This includes, unless registered participants object, all handling needed
                for the applicant&apos;s participation at the event and for the drafting of a list of participants which will
                be distributed at the conference, and placing photographs in the pictures gallery accessible only by
                participants and IAUP members, in the IAUP publications or selecting some for articles on the conference
                in a journal or newspaper, or in any other web/printed publication.
              </p>
              <p className="mt-3">
                Right of access: applicants have a right to access and ask for changing or deleting their personal data,
                which will be kept by IAUP Semi Annual Meeting 2026 Secretariat. IAUP Semi Annual Meeting 2026
                Secretariat would like to contact you occasionally to keep you informed of future IAUP and Daffodil
                International University events and other relevant information.
              </p>

              <label className="mt-4 inline-flex items-center gap-2 font-medium text-slate-900">
                <input
                  type="checkbox"
                  name="agreeToPolicy"
                  checked={formValues.agreeToPolicy}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span>I Agree</span>
              </label>
              {errors.agreeToPolicy && <p className="mt-2 text-sm text-red-600">{errors.agreeToPolicy}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formValues.website}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Participant: {participantName || "Please complete your name fields"} | Total: {formatUsd(pricing.totalFeeUsd)}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Processing..." : isOnlinePayment ? "Proceed to Payment" : "Submit Registration"}
            </button>
          </div>

          {status?.type === "error" && (
            <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{status.message}</p>
          )}

          {status?.type === "wire" && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
              <p>Dear {status.name || "Participant"},</p>
              <p className="mt-3">
                You have successfully submitted the registration form and your data has been recorded for further wire
                transfer guidelines from us. Thank you for your interest in joining the IAUP Semi Annual Meeting 2026.
              </p>
              <p className="mt-3">
                Total registration amount: <strong>{formatUsd(status.totalFeeUsd || 0)}</strong>
              </p>
              <p className="mt-3">
                Should you have any queries, feel free to contact us at iaup-bd2026@daffodilvarsity.edu.bd
              </p>
              <p className="mt-6">Best regards,</p>
              <p className="mt-1">DIU Secretariat, IAUP Semi-Annual Meeting 2026</p>
              <p>Daffodil International University, Bangladesh</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
