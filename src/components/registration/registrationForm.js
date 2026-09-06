"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import PhoneInputField from "@/components/registration/phoneInputField";
import { calculatePricing, formatCurrency, formatUsd, FAMILY_MEMBER_FEE_USD } from "@/lib/pricing";

const STORAGE_KEY = "iaup_registration";

const TITLE_OPTIONS = ["Mr.", "Ms.", "Dr.", "Prof.", "Prof. Dr.", "Others"];
const GENDER_OPTIONS = ["Male", "Female"];
const TSHIRT_OPTIONS = ["S", "M", "L", "XL", "XXL"];

// Indicative European unisex sizing (cm). Replace with the supplier's own spec
// sheet once the garment is confirmed — delegates order against these numbers.
const TSHIRT_SIZE_CHART = [
  { size: "S", chest: "88 – 96", length: "70", shoulder: "44" },
  { size: "M", chest: "96 – 104", length: "72", shoulder: "46" },
  { size: "L", chest: "104 – 112", length: "74", shoulder: "48" },
  { size: "XL", chest: "112 – 120", length: "76", shoulder: "50" },
  { size: "XXL", chest: "120 – 128", length: "78", shoulder: "52" },
];
const FOOD_OPTIONS = ["Vegan", "Vegetarian", "Halal", "Other", "None"];
const YES_NO_OPTIONS = ["Yes", "No"];
const AFFILIATION_OPTIONS = ["IAUP", "AUAP", "EURAS", "Partner Institution"];
const FAMILY_MEMBER_OPTIONS = ["1", "2", "3", "4", "Others"];
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
  familyFullName: 120,
  familyPassportNo: 20,
  familyEmail: 120,
  familyPhone: 24,
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_UPLOAD_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]);
const UPLOAD_ACCEPT_ATTR = "image/jpeg,image/png,image/webp,application/pdf";
const MAX_FAMILY_MEMBERS = 10;

function validateUpload(file) {
  if (!file) return "Please upload a file.";
  if (!ALLOWED_UPLOAD_TYPES.has(file.type)) return "Only JPG, PNG, WEBP, or PDF is allowed.";
  if (file.size > MAX_UPLOAD_BYTES) return "File must be 5 MB or smaller.";
  return null;
}

function emptyFamilyMember() {
  return {
    fullName: "",
    passportNo: "",
    email: "",
    phone: "",
    tShirtSize: "",
    profilePhoto: null,
    passportScan: null,
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
  phoneCountryIso2: "bd",
  phoneCountryCode: "+880",
  phone: "",
  whatsappCountryIso2: "bd",
  whatsappCountryCode: "+880",
  whatsapp: "",
  email: "",
  alternativeEmail: "",
  tShirtSize: "",
  foodRequirement: "",
  otherFood: "",
  isLocalParticipant: "",
  isMemberUniversity: "",
  memberAffiliation: "",
  hasFamilyMembers: "",
  familyMembersCount: "",
  familyMembersOther: "",
  needsInvitationLetter: "",
  postEventTour: "",
  paymentMethod: "",
  couponCode: "",
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

function isValidPhone(value) {
  return /^\+?[0-9()\-\s]{7,24}$/.test(value);
}

function normalizePhoneCountryCode(value) {
  const raw = String(value || "").trim();
  const normalized = raw.split(" ")[0];
  return /^\+\d{1,4}$/.test(normalized) ? normalized : "+880";
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
    errors.organization = "Organization/Institution is required.";
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

  if (!values.phoneCountryCode || !/^\+\d{1,4}$/.test(values.phoneCountryCode)) {
    errors.phoneCountryCode = "Please select a country code.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(values.phone.trim())) {
    errors.phone = "Please provide a valid phone number.";
  }

  // WhatsApp is optional; only the format is checked when something is entered.
  if (values.whatsapp.trim() && !isValidPhone(values.whatsapp.trim())) {
    errors.whatsapp = "Please provide a valid WhatsApp number.";
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

  if (!values.isLocalParticipant || !YES_NO_OPTIONS.includes(values.isLocalParticipant)) {
    errors.isLocalParticipant = "Please select Yes or No.";
  }

  if (!values.isMemberUniversity || !YES_NO_OPTIONS.includes(values.isMemberUniversity)) {
    errors.isMemberUniversity = "Please select Yes or No.";
  }

  if (values.isMemberUniversity === "Yes") {
    if (!values.memberAffiliation || !AFFILIATION_OPTIONS.includes(values.memberAffiliation)) {
      errors.memberAffiliation = "Please specify your affiliation.";
    }
  }

  if (!values.hasFamilyMembers || !YES_NO_OPTIONS.includes(values.hasFamilyMembers)) {
    errors.hasFamilyMembers = "Please select Yes or No.";
  }

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
  }

  if (!values.postEventTour || !YES_NO_OPTIONS.includes(values.postEventTour)) {
    errors.postEventTour = "Please select Yes or No.";
  }

  if (!values.needsInvitationLetter || !YES_NO_OPTIONS.includes(values.needsInvitationLetter)) {
    errors.needsInvitationLetter = "Please select Yes or No.";
  }

  if (
    values.paymentMethod !== "coupon" &&
    (!values.paymentMethod || !PAYMENT_OPTIONS.some((option) => option.value === values.paymentMethod))
  ) {
    errors.paymentMethod = "Please select a payment method.";
  }

  if (!values.agreeToPolicy) {
    errors.agreeToPolicy = "You must agree before continuing to payment.";
  }

  return errors;
}

function RequiredMark() {
  return <span className="ml-1 text-red-600">*</span>;
}

function OptionGroup({ legend, name, options, value, onChange, error, required = false }) {
  return (
    <fieldset className="sm:col-span-2">
      <legend className="mb-2 block text-sm font-semibold text-slate-700">
        {legend}
        {required && <RequiredMark />}
      </legend>
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

export default function RegistrationForm({ initialCouponCode = "" }) {
  const router = useRouter();
  const [formValues, setFormValues] = useState(() => ({
    ...INITIAL_FORM,
    couponCode: initialCouponCode || "",
  }));
  const [fileValues, setFileValues] = useState({ profilePhoto: null, passportScan: null });
  const [familyMembers, setFamilyMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [wireModalData, setWireModalData] = useState(null);
  const [couponStatus, setCouponStatus] = useState("idle"); // idle | checking | valid | invalid
  const [couponMessage, setCouponMessage] = useState("");

  const checkCoupon = async (rawCode) => {
    const code = String(rawCode || "").trim().toUpperCase();
    if (!code) {
      setCouponStatus("idle");
      setCouponMessage("");
      setFormValues((prev) => (prev.paymentMethod === "coupon" ? { ...prev, paymentMethod: "" } : prev));
      return;
    }
    setCouponStatus("checking");
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const payload = await res.json().catch(() => ({}));
      if (payload?.valid) {
        setCouponStatus("valid");
        setCouponMessage("Coupon applied — registration fee waived.");
        setFormValues((prev) => ({ ...prev, couponCode: code, paymentMethod: "coupon" }));
      } else {
        setCouponStatus("invalid");
        setCouponMessage(payload?.reason || "Invalid coupon code.");
        setFormValues((prev) => (prev.paymentMethod === "coupon" ? { ...prev, paymentMethod: "" } : prev));
      }
    } catch {
      setCouponStatus("invalid");
      setCouponMessage("Could not verify coupon. Please try again.");
    }
  };

  useEffect(() => {
    if (initialCouponCode) {
      checkCoupon(initialCouponCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== "object") return;
      setFormValues((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(prev)) {
          if (typeof saved[key] !== "undefined") {
            if (key === "phoneCountryCode" || key === "whatsappCountryCode") {
              next[key] = normalizePhoneCountryCode(saved[key]);
            } else if (key === "phoneCountryIso2" || key === "whatsappCountryIso2") {
              next[key] = String(saved[key] || "bd").toLowerCase();
            } else {
              next[key] = saved[key];
            }
          }
        }
        return next;
      });
    } catch {
      // ignore corrupt sessionStorage
    }
  }, []);

  useEffect(() => {
    let target = 0;
    if (formValues.hasFamilyMembers === "Yes") {
      if (formValues.familyMembersCount === "Others") {
        const parsed = parseInt(formValues.familyMembersOther, 10);
        if (Number.isInteger(parsed) && parsed > 0) {
          target = Math.min(parsed, MAX_FAMILY_MEMBERS);
        }
      } else {
        const parsed = parseInt(formValues.familyMembersCount, 10);
        if (Number.isInteger(parsed) && parsed > 0) {
          target = Math.min(parsed, MAX_FAMILY_MEMBERS);
        }
      }
    }

    setFamilyMembers((prev) => {
      if (prev.length === target) return prev;
      if (target === 0) return [];
      if (target < prev.length) return prev.slice(0, target);
      const next = prev.slice();
      while (next.length < target) next.push(emptyFamilyMember());
      return next;
    });
  }, [formValues.hasFamilyMembers, formValues.familyMembersCount, formValues.familyMembersOther]);

  const participantName = `${normalizeSpaces(formValues.givenName)} ${normalizeSpaces(formValues.surname)}`.trim();
  const isOnlinePayment = formValues.paymentMethod === "online-payment";

  const pricing = useMemo(
    () =>
      calculatePricing({
        isLocal: formValues.isLocalParticipant === "Yes",
        isMember: formValues.isMemberUniversity === "Yes",
        familyMembersCount: familyMembers.length,
      }),
    [formValues.isLocalParticipant, formValues.isMemberUniversity, familyMembers.length]
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((prev) => {
      const updated = { ...prev };
      let nextValue = type === "checkbox" ? checked : value;

      if (type !== "checkbox") {
        if (name === "email" || name === "alternativeEmail") {
          nextValue = value.trim().toLowerCase();
        } else if (name === "phone" || name === "whatsapp") {
          nextValue = value.replace(/[^0-9()+\-\s]/g, "");
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

      if (name === "isMemberUniversity" && nextValue !== "Yes") {
        updated.memberAffiliation = "";
      }

      if (name === "hasFamilyMembers" && nextValue !== "Yes") {
        updated.familyMembersCount = "";
        updated.familyMembersOther = "";
      }

      if (name === "familyMembersCount" && nextValue !== "Others") {
        updated.familyMembersOther = "";
      }

      if (hasSubmitted) {
        setErrors(validateForm(updated));
      }

      return updated;
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    const file = files?.[0] || null;

    if (file) {
      const err = validateUpload(file);
      if (err) {
        setErrors((prev) => ({ ...prev, [name]: err }));
        setFileValues((prev) => ({ ...prev, [name]: null }));
        event.target.value = "";
        return;
      }
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setFileValues((prev) => ({ ...prev, [name]: file }));
  };

  const handleFamilyTextChange = (index, field) => (event) => {
    const raw = event.target.value;
    let value = raw;

    if (field === "email") {
      value = raw.trim().toLowerCase();
    } else if (field === "passportNo") {
      value = raw.replace(/[^A-Za-z0-9\-]/g, "").toUpperCase();
    } else if (field === "phone") {
      value = raw.replace(/[^0-9()+\-\s]/g, "");
    } else {
      value = sanitizeBasicText(raw);
    }

    const limit = FIELD_LIMITS[
      field === "fullName"
        ? "familyFullName"
        : field === "passportNo"
          ? "familyPassportNo"
          : field === "email"
            ? "familyEmail"
            : field === "phone"
              ? "familyPhone"
              : "familyFullName"
    ];
    value = value.slice(0, limit);
    setFamilyMembers((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleFamilySelectChange = (index, field) => (event) => {
    const value = event.target.value;
    setFamilyMembers((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleFamilyFileChange = (index, field) => (event) => {
    const file = event.target.files?.[0] || null;
    const errorKey = `familyMembers[${index}][${field}]`;

    if (file) {
      const err = validateUpload(file);
      if (err) {
        setErrors((prev) => ({ ...prev, [errorKey]: err }));
        setFamilyMembers((prev) => {
          const next = prev.slice();
          next[index] = { ...next[index], [field]: null };
          return next;
        });
        event.target.value = "";
        return;
      }
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next[errorKey];
      return next;
    });
    setFamilyMembers((prev) => {
      const next = prev.slice();
      next[index] = { ...next[index], [field]: file };
      return next;
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
      phoneCountryCode: normalizePhoneCountryCode(formValues.phoneCountryCode),
      whatsappCountryCode: normalizePhoneCountryCode(formValues.whatsappCountryCode),
      otherFood: normalizeSpaces(formValues.otherFood),
      passportNo: formValues.passportNo.trim(),
      zipCode: formValues.zipCode.trim(),
      phone: formValues.phone.trim(),
      whatsapp: formValues.whatsapp.trim(),
      email: formValues.email.trim().toLowerCase(),
      alternativeEmail: formValues.alternativeEmail.trim().toLowerCase(),
      familyMembersOther: formValues.familyMembersOther.trim(),
    };

    const nextErrors = validateForm(normalized);

    if (!fileValues.profilePhoto) {
      nextErrors.profilePhoto = "Profile picture is required.";
    }
    if (!fileValues.passportScan) {
      nextErrors.passportScan = "Passport front page scan is required.";
    }

    familyMembers.forEach((fm, i) => {
      if (!fm.fullName.trim()) {
        nextErrors[`familyMembers[${i}][fullName]`] = "Full name is required.";
      }
      if (!fm.passportNo.trim()) {
        nextErrors[`familyMembers[${i}][passportNo]`] = "Passport number is required.";
      }
      if (!fm.email.trim()) {
        nextErrors[`familyMembers[${i}][email]`] = "Email is required.";
      } else if (!isValidEmail(fm.email.trim())) {
        nextErrors[`familyMembers[${i}][email]`] = "Please provide a valid email address.";
      }
      if (!fm.phone.trim()) {
        nextErrors[`familyMembers[${i}][phone]`] = "Phone number is required.";
      } else if (!isValidPhone(fm.phone.trim())) {
        nextErrors[`familyMembers[${i}][phone]`] = "Please provide a valid phone number.";
      }
      if (!fm.tShirtSize || !TSHIRT_OPTIONS.includes(fm.tShirtSize)) {
        nextErrors[`familyMembers[${i}][tShirtSize]`] = "Please select a T-shirt size.";
      }
      if (!fm.profilePhoto) {
        nextErrors[`familyMembers[${i}][profilePhoto]`] = "Profile picture is required.";
      }
      if (!fm.passportScan) {
        nextErrors[`familyMembers[${i}][passportScan]`] = "Passport scan is required.";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields before proceeding to payment.",
      });
      return;
    }

    const submissionValues = {
      ...normalized,
      phone: `${normalized.phoneCountryCode} ${normalized.phone}`.trim(),
      whatsapp: normalized.whatsapp
        ? `${normalized.whatsappCountryCode} ${normalized.whatsapp}`.trim()
        : "",
    };

    setFormValues(normalized);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(submissionValues)) {
        if (typeof value === "string") {
          formData.append(key, value);
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false");
        }
      }
      formData.append("profilePhoto", fileValues.profilePhoto);
      formData.append("passportScan", fileValues.passportScan);
      familyMembers.forEach((fm, i) => {
        formData.append(`familyMembers[${i}][fullName]`, fm.fullName);
        formData.append(`familyMembers[${i}][passportNo]`, fm.passportNo);
        formData.append(`familyMembers[${i}][email]`, fm.email);
        formData.append(`familyMembers[${i}][phone]`, fm.phone);
        formData.append(`familyMembers[${i}][tShirtSize]`, fm.tShirtSize);
        formData.append(`familyMembers[${i}][profilePhoto]`, fm.profilePhoto);
        formData.append(`familyMembers[${i}][passportScan]`, fm.passportScan);
      });

      let response;
      try {
        response = await fetch("/api/registration", { method: "POST", body: formData });
      } catch {
        setStatus({ type: "error", message: "Network error. Please try again." });
        return;
      }

      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload?.reg_id) {
        setStatus({
          type: "error",
          message: payload?.error || "Could not save your registration. Please try again.",
        });
        return;
      }

      if (payload.free) {
        setWireModalData({
          mode: "free",
          name: `${normalized.givenName} ${normalized.surname}`.trim(),
          regId: payload.reg_id,
          email: normalized.email,
          emailed: payload.invoice_emailed === true,
        });
        return;
      }

      if (normalized.paymentMethod === "wire-transfer") {
        setWireModalData({
          mode: "wire",
          name: `${normalized.givenName} ${normalized.surname}`.trim(),
          regId: payload.reg_id,
          email: normalized.email,
          emailed: payload.invoice_emailed === true,
        });
        return;
      }

      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            ...normalized,
            fullName: `${normalized.givenName} ${normalized.surname}`.trim(),
            regId: payload.reg_id,
          })
        );
      } catch {
        // sessionStorage may be unavailable; payment page can still work via URL param
      }

      router.push(`/registration/online-payment?reg_id=${encodeURIComponent(payload.reg_id)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <div className="absolute inset-0" />
      <div className="absolute -top-40 -right-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">IAUP Semi-Annual Meeting 2026, Dhaka, Bangladesh</p>
            <h1 className="font-display mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Registration Form</h1>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">Daffodil International University | Event Date: 19-21 November 2026</p>
          </div>
          <div className="flex shrink-0 items-center gap-6 sm:gap-8 self-center">
            <Image
              src="/diuLogo.png"
              alt="Daffodil International University Logo"
              width={140}
              height={50}
              className="h-9 md:h-12 w-auto object-contain"
              priority
            />
            <Image
              src="/navLogo.png"
              alt="IAUP Logo"
              width={160}
              height={44}
              className="h-10 md:h-14 w-auto object-contain"
            />
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
              required
            />

            {formValues.title === "Others" && (
              <div className="sm:col-span-2">
                <label htmlFor="otherTitle" className="mb-2 block text-sm font-semibold text-slate-700">
                  Other Title<RequiredMark />
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
                Given Name<RequiredMark />
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
                Surname<RequiredMark />
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
              required
            />

            <div>
              <label htmlFor="passportNo" className="mb-2 block text-sm font-semibold text-slate-700">
                Passport No<RequiredMark />
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
                Nationality (As per passport)<RequiredMark />
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
                Name of the Organization/Institution<RequiredMark />
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
                placeholder="Organization/Institution"
                required
              />
              {errors.organization && <p className="mt-2 text-sm text-red-600">{errors.organization}</p>}
            </div>

            <div>
              <label htmlFor="position" className="mb-2 block text-sm font-semibold text-slate-700">
                Position<RequiredMark />
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
                Department/Office<RequiredMark />
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
                Address<RequiredMark />
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
                Zip code<RequiredMark />
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
                City<RequiredMark />
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
                Country<RequiredMark />
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
              <label htmlFor="phone" className="mb-2 block text-sm text-start font-semibold text-slate-700">
                Phone Number<RequiredMark />
              </label>
              <PhoneInputField
                id="phone"
                name="phone"
                countryIso2={formValues.phoneCountryIso2}
                countryCode={formValues.phoneCountryCode}
                phoneValue={formValues.phone}
                onCountryChange={({ iso2, dialCode }) => {
                  setFormValues((prev) => {
                    const updated = {
                      ...prev,
                      phoneCountryIso2: iso2,
                      phoneCountryCode: dialCode,
                    };
                    if (hasSubmitted) {
                      setErrors(validateForm(updated));
                    }
                    return updated;
                  });
                }}
                onPhoneChange={(val) => {
                  setFormValues((prev) => {
                    const updated = {
                      ...prev,
                      phone: val,
                    };
                    if (hasSubmitted) {
                      setErrors(validateForm(updated));
                    }
                    return updated;
                  });
                }}
                maxLength={FIELD_LIMITS.phone}
                placeholder="Phone number"
                required
                error={errors.phone || errors.phoneCountryCode}
              />
              {errors.phoneCountryCode && <p className="mt-2 text-sm text-red-600">{errors.phoneCountryCode}</p>}
              {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="whatsapp" className="mb-2 block text-sm text-start font-semibold text-slate-700">
                WhatsApp No
              </label>
              <PhoneInputField
                id="whatsapp"
                name="whatsapp"
                countryIso2={formValues.whatsappCountryIso2}
                countryCode={formValues.whatsappCountryCode}
                phoneValue={formValues.whatsapp}
                onCountryChange={({ iso2, dialCode }) => {
                  setFormValues((prev) => {
                    const updated = {
                      ...prev,
                      whatsappCountryIso2: iso2,
                      whatsappCountryCode: dialCode,
                    };
                    if (hasSubmitted) {
                      setErrors(validateForm(updated));
                    }
                    return updated;
                  });
                }}
                onPhoneChange={(val) => {
                  setFormValues((prev) => {
                    const updated = { ...prev, whatsapp: val };
                    if (hasSubmitted) {
                      setErrors(validateForm(updated));
                    }
                    return updated;
                  });
                }}
                maxLength={FIELD_LIMITS.whatsapp}
                placeholder="WhatsApp number"
                error={errors.whatsapp}
              />
              {errors.whatsapp && <p className="mt-2 text-sm text-red-600">{errors.whatsapp}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">
                Email<RequiredMark />
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

            <div className="sm:col-span-2">
              <p className="mb-1 text-sm font-semibold text-slate-700">Documents</p>
              <p className="mb-3 text-xs text-slate-500">
                Upload a recent profile picture and a clear scan of your passport front page. JPG, PNG, WEBP, or PDF · max 5 MB each.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="profilePhoto" className="mb-2 block text-sm font-medium text-slate-700">
                    Profile Picture<RequiredMark />
                  </label>
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept={UPLOAD_ACCEPT_ATTR}
                    onChange={handleFileChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
                  />
                  {fileValues.profilePhoto && (
                    <p className="mt-1 text-xs text-slate-600">
                      Selected: {fileValues.profilePhoto.name}
                    </p>
                  )}
                  {errors.profilePhoto && <p className="mt-2 text-sm text-red-600">{errors.profilePhoto}</p>}
                </div>
                <div>
                  <label htmlFor="passportScan" className="mb-2 block text-sm font-medium text-slate-700">
                    Passport Front Page (scan copy)<RequiredMark />
                  </label>
                  <input
                    id="passportScan"
                    name="passportScan"
                    type="file"
                    accept={UPLOAD_ACCEPT_ATTR}
                    onChange={handleFileChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
                  />
                  {fileValues.passportScan && (
                    <p className="mt-1 text-xs text-slate-600">
                      Selected: {fileValues.passportScan.name}
                    </p>
                  )}
                  {errors.passportScan && <p className="mt-2 text-sm text-red-600">{errors.passportScan}</p>}
                </div>
              </div>
            </div>

            <OptionGroup
              legend="T-Shirt Size (European Size)"
              name="tShirtSize"
              options={TSHIRT_OPTIONS}
              value={formValues.tShirtSize}
              onChange={handleChange}
              error={errors.tShirtSize}
              required
            />

            <details className="sm:col-span-2 -mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                View size chart (European sizing)
              </summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-100 text-start text-sm">
                  <caption className="sr-only">
                    T-shirt measurements in centimetres, European unisex sizing
                  </caption>
                  <thead>
                    <tr className="border-b border-slate-300 text-xs uppercase tracking-wide text-slate-500">
                      <th scope="col" className="py-2 pe-4 text-start font-semibold">Size</th>
                      <th scope="col" className="py-2 pe-4 text-start font-semibold">Chest (cm)</th>
                      <th scope="col" className="py-2 pe-4 text-start font-semibold">Body length (cm)</th>
                      <th scope="col" className="py-2 text-start font-semibold">Shoulder (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TSHIRT_SIZE_CHART.map((row) => (
                      <tr key={row.size} className="border-b border-slate-200 last:border-0">
                        <th scope="row" className="py-2 pe-4 text-start font-semibold text-slate-800">
                          {row.size}
                        </th>
                        <td className="py-2 pe-4 text-slate-600">{row.chest}</td>
                        <td className="py-2 pe-4 text-slate-600">{row.length}</td>
                        <td className="py-2 text-slate-600">{row.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-3 text-xs text-slate-500">
                  Measurements are indicative and may vary slightly by garment. Chest is measured
                  as a full circumference.
                </p>
              </div>
            </details>

            <OptionGroup
              legend="Any food requirements?"
              name="foodRequirement"
              options={FOOD_OPTIONS}
              value={formValues.foodRequirement}
              onChange={handleChange}
              error={errors.foodRequirement}
              required
            />

            {formValues.foodRequirement === "Other" && (
              <div className="sm:col-span-2">
                <label htmlFor="otherFood" className="mb-2 block text-sm font-semibold text-slate-700">
                  Other Food Requirement<RequiredMark />
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

            <OptionGroup
              legend="Are you a local participant?"
              name="isLocalParticipant"
              options={YES_NO_OPTIONS}
              value={formValues.isLocalParticipant}
              onChange={handleChange}
              error={errors.isLocalParticipant}
              required
            />

            <OptionGroup
              legend="Are you or your university a member of IAUP, AUAP, or EURAS, or a partner institution of DIU?"
              name="isMemberUniversity"
              options={YES_NO_OPTIONS}
              value={formValues.isMemberUniversity}
              onChange={handleChange}
              error={errors.isMemberUniversity}
              required
            />

            {formValues.isMemberUniversity === "Yes" && (
              <OptionGroup
                legend="Please specify your affiliation:"
                name="memberAffiliation"
                options={AFFILIATION_OPTIONS}
                value={formValues.memberAffiliation}
                onChange={handleChange}
                error={errors.memberAffiliation}
                required
              />
            )}

            <OptionGroup
              legend="Will any of your family members join the event?"
              name="hasFamilyMembers"
              options={YES_NO_OPTIONS}
              value={formValues.hasFamilyMembers}
              onChange={handleChange}
              error={errors.hasFamilyMembers}
              required
            />

            {formValues.hasFamilyMembers === "Yes" && (
              <fieldset className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <legend className="px-1 text-sm font-semibold text-slate-700">
                  Please select the number of accompanying family members (USD 400 per person)
                  <RequiredMark />
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
                      Specify Number<RequiredMark />
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

                {familyMembers.length > 0 && (
                  <div className="mt-6 space-y-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Details for each family member
                    </p>
                    {familyMembers.map((fm, index) => {
                      const profileErrKey = `familyMembers[${index}][profilePhoto]`;
                      const passportErrKey = `familyMembers[${index}][passportScan]`;
                      const nameErrKey = `familyMembers[${index}][fullName]`;
                      const passportErr = `familyMembers[${index}][passportNo]`;
                      const emailErr = `familyMembers[${index}][email]`;
                      const phoneErr = `familyMembers[${index}][phone]`;
                      const tshirtErr = `familyMembers[${index}][tShirtSize]`;
                      return (
                        <div key={`fm-${index}`} className="rounded-xl border border-slate-200 bg-white p-4">
                          <p className="mb-4 text-sm font-semibold text-slate-700">Family Member #{index + 1}</p>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label
                                htmlFor={`fm-${index}-fullName`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Full Name<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-fullName`}
                                type="text"
                                value={fm.fullName}
                                onChange={handleFamilyTextChange(index, "fullName")}
                                maxLength={FIELD_LIMITS.familyFullName}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="Full name"
                              />
                              {errors[nameErrKey] && (
                                <p className="mt-2 text-sm text-red-600">{errors[nameErrKey]}</p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-passportNo`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Passport No<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-passportNo`}
                                type="text"
                                value={fm.passportNo}
                                onChange={handleFamilyTextChange(index, "passportNo")}
                                maxLength={FIELD_LIMITS.familyPassportNo}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="Passport number"
                              />
                              {errors[passportErr] && (
                                <p className="mt-2 text-sm text-red-600">{errors[passportErr]}</p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-email`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Email<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-email`}
                                type="email"
                                value={fm.email}
                                onChange={handleFamilyTextChange(index, "email")}
                                maxLength={FIELD_LIMITS.familyEmail}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="family@example.com"
                              />
                              {errors[emailErr] && <p className="mt-2 text-sm text-red-600">{errors[emailErr]}</p>}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-phone`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Phone No<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-phone`}
                                type="tel"
                                value={fm.phone}
                                onChange={handleFamilyTextChange(index, "phone")}
                                maxLength={FIELD_LIMITS.familyPhone}
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                                placeholder="Phone number"
                              />
                              {errors[phoneErr] && <p className="mt-2 text-sm text-red-600">{errors[phoneErr]}</p>}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-tShirtSize`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                T-shirt Size<RequiredMark />
                              </label>
                              <select
                                id={`fm-${index}-tShirtSize`}
                                value={fm.tShirtSize}
                                onChange={handleFamilySelectChange(index, "tShirtSize")}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-primary"
                              >
                                <option value="">Select size</option>
                                {TSHIRT_OPTIONS.map((size) => (
                                  <option key={`fm-${index}-size-${size}`} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                              {errors[tshirtErr] && <p className="mt-2 text-sm text-red-600">{errors[tshirtErr]}</p>}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-profilePhoto`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Profile Picture<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-profilePhoto`}
                                type="file"
                                accept={UPLOAD_ACCEPT_ATTR}
                                onChange={handleFamilyFileChange(index, "profilePhoto")}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
                              />
                              {fm.profilePhoto && (
                                <p className="mt-1 text-xs text-slate-600">Selected: {fm.profilePhoto.name}</p>
                              )}
                              {errors[profileErrKey] && (
                                <p className="mt-2 text-sm text-red-600">{errors[profileErrKey]}</p>
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor={`fm-${index}-passportScan`}
                                className="mb-2 block text-sm font-medium text-slate-700"
                              >
                                Passport Front Page (scan copy)<RequiredMark />
                              </label>
                              <input
                                id={`fm-${index}-passportScan`}
                                type="file"
                                accept={UPLOAD_ACCEPT_ATTR}
                                onChange={handleFamilyFileChange(index, "passportScan")}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-dark"
                              />
                              {fm.passportScan && (
                                <p className="mt-1 text-xs text-slate-600">Selected: {fm.passportScan.name}</p>
                              )}
                              {errors[passportErrKey] && (
                                <p className="mt-2 text-sm text-red-600">{errors[passportErrKey]}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </fieldset>
            )}

            <OptionGroup
              legend="Interested in joining the Optional Post-Event Tour?"
              name="postEventTour"
              options={YES_NO_OPTIONS}
              value={formValues.postEventTour}
              onChange={handleChange}
              error={errors.postEventTour}
              required
            />

            <OptionGroup
              legend="Do you need an Invitation Letter in order to apply for a Visa to Bangladesh?"
              name="needsInvitationLetter"
              options={YES_NO_OPTIONS}
              value={formValues.needsInvitationLetter}
              onChange={handleChange}
              error={errors.needsInvitationLetter}
              required
            />

            <fieldset className="sm:col-span-2">
              <legend className="mb-2 block text-sm font-semibold text-slate-700">Have a coupon code?</legend>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  name="couponCode"
                  value={formValues.couponCode}
                  onChange={(e) =>
                    setFormValues((prev) => ({ ...prev, couponCode: e.target.value.toUpperCase() }))
                  }
                  placeholder="e.g. IAUP-VIP"
                  className="w-full max-w-xs rounded-xl border border-slate-300 px-3 py-2 text-sm uppercase tracking-wide focus:border-primary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => checkCoupon(formValues.couponCode)}
                  disabled={couponStatus === "checking" || !formValues.couponCode.trim()}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  {couponStatus === "checking" ? "Checking…" : "Apply"}
                </button>
              </div>
              {couponMessage && (
                <p className={`mt-2 text-sm ${couponStatus === "valid" ? "text-emerald-700" : "text-red-600"}`}>
                  {couponMessage}
                </p>
              )}
            </fieldset>

            {couponStatus === "valid" ? (
              <div className="sm:col-span-2 rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-sm text-emerald-900">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Registration fee</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Total payable — Coupon Applied</span>
                  <span className="font-display text-xl font-bold text-emerald-700">$0.00</span>
                </div>
                <p className="mt-1 text-xs text-emerald-700">
                  Registration fee waived via coupon {formValues.couponCode}. No payment is required.
                </p>
              </div>
            ) : (
              <>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 block text-sm font-semibold text-slate-700">
                    Which payment method do you want to choose for registration payment?
                    <RequiredMark />
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

                <div className="sm:col-span-2 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm text-slate-700">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">Registration fee</p>
                  <dl className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-slate-500">Period</dt>
                      <dd className="font-semibold text-slate-900">
                        {pricing.period.label} <span className="font-normal text-slate-500">({pricing.period.range})</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Category</dt>
                      <dd className="font-semibold text-slate-900">
                        {formValues.isLocalParticipant === "Yes"
                          ? "Local Participant"
                          : formValues.isMemberUniversity === "Yes"
                            ? `Member / Partner Institution${formValues.memberAffiliation ? ` (${formValues.memberAffiliation})` : ""}`
                            : formValues.isMemberUniversity === "No"
                              ? "Non-partner"
                              : "Select options above to see category"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Base fee</dt>
                      <dd className="font-semibold text-slate-900">{formatCurrency(pricing.baseFee, pricing.currency)}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Family members</dt>
                      <dd className="font-semibold text-slate-900">
                        {pricing.isLocal
                          ? "N/A"
                          : pricing.familyCount === 0
                            ? "None"
                            : `${pricing.familyCount} × ${formatUsd(FAMILY_MEMBER_FEE_USD)} = ${formatUsd(pricing.familyFeeUsd)}`}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-3 flex items-center justify-between border-t border-primary/20 pt-3">
                    <span className="text-sm font-semibold text-slate-900">Total payable</span>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatCurrency(pricing.totalFee, pricing.currency)}
                    </span>
                  </div>
                  {!pricing.isLocal && pricing.period.isClosed && (
                    <p className="mt-2 text-xs text-amber-700">
                      Registration window has closed. Please contact the organizer.
                    </p>
                  )}
                </div>
              </>
            )}

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
                <span>
                  I Agree
                  <RequiredMark />
                </span>
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
            <p className="text-sm text-slate-500">Participant: {participantName || "Please complete your name fields"}</p>
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

          {/* Wire Transfer Confirmation Pop-up Modal */}
          {wireModalData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200 text-center">
                {/* Success Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-5 shadow-inner">
                  <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Registration Submitted Successfully!
                </h3>

                {wireModalData.regId && (
                  <div className="mt-2 inline-block rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700 tracking-wide">
                    Ref: <span className="font-mono text-primary font-bold">{wireModalData.regId}</span>
                  </div>
                )}

                <div className="mt-5 rounded-xl bg-emerald-50/70 border border-emerald-100 p-4 text-start text-sm text-slate-700 space-y-3 leading-relaxed">
                  <p className="font-medium text-emerald-950">
                    Dear {wireModalData.name || "Participant"},
                  </p>
                  <p className="font-semibold text-slate-900">
                    Thank you for registering for the IAUP Semi-Annual Meeting 2026.
                  </p>
                  {wireModalData.mode === "free" ? (
                    <p>
                      Your registration has been confirmed with a coupon — no payment is required. The invoice
                      (showing the fee waived) has been sent to your email and is ready for download below.
                    </p>
                  ) : (
                    <>
                      <p>
                        Your registration has been successfully received. The invoice with full bank transfer details has been sent to your email and is ready for download below.
                      </p>

                      <div className="rounded-lg bg-white p-3 border border-emerald-200/80 text-xs space-y-1.5 shadow-xs">
                        <p className="font-bold text-primary">Account Information for Bank Transfer:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-slate-700">
                          <div><span className="text-slate-500 font-medium">Account Name:</span> Daffodil International University (International Affairs)</div>
                          <div><span className="text-slate-500 font-medium">Account Number:</span> <span className="font-mono font-bold text-slate-900">110.110.25618</span></div>
                          <div><span className="text-slate-500 font-medium">Swift Code:</span> <span className="font-mono font-bold text-slate-900">DBBLBDDHCTS</span></div>
                          <div><span className="text-slate-500 font-medium">Bank Name:</span> Dutch Bangla Bank Ltd</div>
                          <div><span className="text-slate-500 font-medium">Branch:</span> Dhanmondi Branch</div>
                          <div><span className="text-slate-500 font-medium">Zip Code:</span> 1205</div>
                        </div>
                        <p className="text-[11px] text-amber-800 font-semibold pt-1 border-t border-slate-100">** Note: Transaction/Bank transfer charges are to be borne by the sender.</p>
                      </div>

                      <p className="text-xs">
                        After completing the transfer, please reply or send your payment receipt to{" "}
                        <a href="mailto:iaup-bd2026@daffodilvarsity.edu.bd" className="font-semibold text-primary hover:underline">
                          iaup-bd2026@daffodilvarsity.edu.bd
                        </a>{" "}
                        for payment verification.
                      </p>
                    </>
                  )}
                  <div className="pt-2 border-t border-emerald-200/60 text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">Queries? </span>
                    Contact us at{" "}
                    <a
                      href="mailto:iaup-bd2026@daffodilvarsity.edu.bd"
                      className="font-medium text-primary hover:underline"
                    >
                      iaup-bd2026@daffodilvarsity.edu.bd
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href={`/api/invoice/${encodeURIComponent(wireModalData.regId)}`}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition shadow-md hover:shadow-lg"
                  >
                    Download Invoice
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setWireModalData(null);
                      router.push("/");
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition shadow-md hover:shadow-lg cursor-pointer"
                  >
                    Back to Home
                  </button>
                  <button
                    type="button"
                    onClick={() => setWireModalData(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
