export const LOCAL_PARTICIPANT_FEE_BDT = 20000;

export const MEMBER_FEES_USD = {
  early: 400,
  general: 500,
  late: 600,
};

export const NON_MEMBER_FEES_USD = {
  early: 500,
  general: 600,
  late: 700,
};

export const FAMILY_MEMBER_FEE_USD = 400;

export const REGISTRATION_PERIODS = [
  {
    key: "early",
    label: "Early Bird",
    range: "on or before 20 Sep 2026",
    endsISO: "2026-09-20T23:59:59+06:00",
  },
  {
    key: "general",
    label: "General Registration",
    range: "21 Sep – 10 Oct 2026",
    endsISO: "2026-10-10T23:59:59+06:00",
  },
  {
    key: "late",
    label: "Late Registration",
    range: "11 – 30 Oct 2026",
    endsISO: "2026-10-30T23:59:59+06:00",
  },
];

export function getRegistrationPeriod(now = new Date()) {
  const current = now instanceof Date ? now : new Date(now);
  for (const period of REGISTRATION_PERIODS) {
    if (current <= new Date(period.endsISO)) {
      return { ...period, isClosed: false };
    }
  }
  // After the late window, registration is effectively closed but we keep
  // the "late" tier so the server can still quote a price if the organizer
  // opts to keep the form open.
  return { ...REGISTRATION_PERIODS[REGISTRATION_PERIODS.length - 1], isClosed: true };
}

function coerceIsMember(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "yes";
  return false;
}

function coerceIsLocal(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "yes";
  return false;
}

function coerceFamilyCount(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}

// Test-mode flat fee for stakeholder testing in production. Must be prefixed
// with NEXT_PUBLIC_ so client-rendered price displays match the server charge.
function getFlatFeeOverrideUsd() {
  const raw = process.env.NEXT_PUBLIC_IAUP_FLAT_FEE_USD;
  if (raw === undefined || raw === null || raw === "") return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export function isTestMode() {
  return getFlatFeeOverrideUsd() !== null;
}

export function calculatePricing({ isLocal, isMember, familyMembersCount = 0, now } = {}) {
  const period = getRegistrationPeriod(now);
  const local = coerceIsLocal(isLocal);
  const member = coerceIsMember(isMember);
  const familyCount = coerceFamilyCount(familyMembersCount);

  if (local) {
    return {
      period,
      isLocal: true,
      isMember: member,
      familyCount,
      baseFee: LOCAL_PARTICIPANT_FEE_BDT,
      baseFeeUsd: 0,
      familyFeeUsd: 0,
      totalFee: LOCAL_PARTICIPANT_FEE_BDT,
      totalFeeUsd: 0,
      currency: "BDT",
      isTestMode: false,
    };
  }

  const flatFeeUsd = getFlatFeeOverrideUsd();
  if (flatFeeUsd !== null) {
    return {
      period,
      isLocal: false,
      isMember: member,
      familyCount,
      baseFee: flatFeeUsd,
      baseFeeUsd: flatFeeUsd,
      familyFeeUsd: 0,
      totalFee: flatFeeUsd,
      totalFeeUsd: flatFeeUsd,
      currency: "USD",
      isTestMode: true,
    };
  }

  const feeTable = member ? MEMBER_FEES_USD : NON_MEMBER_FEES_USD;
  const baseFeeUsd = feeTable[period.key];
  const familyFeeUsd = familyCount * FAMILY_MEMBER_FEE_USD;
  const totalFeeUsd = baseFeeUsd + familyFeeUsd;

  return {
    period,
    isLocal: false,
    isMember: member,
    familyCount,
    baseFee: baseFeeUsd,
    baseFeeUsd,
    familyFeeUsd,
    totalFee: totalFeeUsd,
    totalFeeUsd,
    currency: "USD",
    isTestMode: false,
  };
}

export function formatUsd(value) {
  const n = Number(value) || 0;
  return `USD ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function formatBdt(value) {
  const n = Number(value) || 0;
  return `BDT ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function formatCurrency(value, currency = "USD") {
  return currency === "BDT" ? formatBdt(value) : formatUsd(value);
}
