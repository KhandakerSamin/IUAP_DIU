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
    range: "on or before 30 Sep 2026",
    endsISO: "2026-09-30T23:59:59+06:00",
  },
  {
    key: "general",
    label: "General Registration",
    range: "1 – 30 Oct 2026",
    endsISO: "2026-10-30T23:59:59+06:00",
  },
  {
    key: "late",
    label: "Late Registration",
    range: "31 Oct – 10 Nov 2026",
    endsISO: "2026-11-10T23:59:59+06:00",
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

function coerceFamilyCount(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
}

export function calculatePricing({ isMember, familyMembersCount = 0, now } = {}) {
  const period = getRegistrationPeriod(now);
  const member = coerceIsMember(isMember);
  const familyCount = coerceFamilyCount(familyMembersCount);

  const feeTable = member ? MEMBER_FEES_USD : NON_MEMBER_FEES_USD;
  const baseFeeUsd = feeTable[period.key];
  const familyFeeUsd = familyCount * FAMILY_MEMBER_FEE_USD;
  const totalFeeUsd = baseFeeUsd + familyFeeUsd;

  return {
    period,
    isMember: member,
    familyCount,
    baseFeeUsd,
    familyFeeUsd,
    totalFeeUsd,
    currency: "USD",
  };
}

export function formatUsd(value) {
  const n = Number(value) || 0;
  return `USD ${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}
