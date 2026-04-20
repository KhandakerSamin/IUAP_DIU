import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "iaup_admin";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("ADMIN_SESSION_SECRET is not configured (min 24 chars).");
  }
  return secret;
}

function signPayload(payload) {
  const secret = getSecret();
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${hmac}`;
}

function verifySignedValue(value) {
  if (typeof value !== "string" || !value.includes(".")) return null;
  const sepIdx = value.lastIndexOf(".");
  const payload = value.slice(0, sepIdx);
  const sig = value.slice(sepIdx + 1);
  if (!payload || !sig) return null;

  let expected;
  try {
    expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
  } catch {
    return null;
  }

  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  const expires = parseInt(payload, 10);
  if (!Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return null;
  return { expires };
}

export function buildSessionCookieValue() {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  return signPayload(String(expires));
}

export function credentialsMatch(username, password) {
  const expectedUser = process.env.ADMIN_USERNAME || "";
  const expectedPass = process.env.ADMIN_PASSWORD || "";
  if (!expectedUser || !expectedPass) return false;

  const userA = Buffer.from(String(username || ""));
  const userB = Buffer.from(expectedUser);
  const passA = Buffer.from(String(password || ""));
  const passB = Buffer.from(expectedPass);

  const userOk = userA.length === userB.length && crypto.timingSafeEqual(userA, userB);
  const passOk = passA.length === passB.length && crypto.timingSafeEqual(passA, passB);
  return userOk && passOk;
}

export async function isAdminAuthenticated() {
  try {
    const store = await cookies();
    const cookie = store.get(ADMIN_COOKIE);
    if (!cookie?.value) return false;
    return Boolean(verifySignedValue(cookie.value));
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    redirect("/admin/login");
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
