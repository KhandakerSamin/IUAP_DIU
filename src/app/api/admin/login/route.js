import { cookies } from "next/headers";
import { ADMIN_COOKIE, buildSessionCookieValue, credentialsMatch, sessionCookieOptions } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const username = body?.username || "";
  const password = body?.password || "";

  if (!credentialsMatch(username, password)) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return Response.json({ error: "Invalid credentials." }, { status: 401 });
  }

  try {
    const store = await cookies();
    store.set(ADMIN_COOKIE, buildSessionCookieValue(), sessionCookieOptions());
  } catch (err) {
    console.error("[admin/login]", err);
    return Response.json({ error: "Login misconfigured. Contact the server administrator." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
