import { attachReffIdToRegistration, getRegistrationByRegId } from "@/lib/db";

export const dynamic = "force-dynamic";

function buildReffId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `iaup-${ts}-${rand}`;
}

function trimBaseUrl(url) {
  return (url || "").replace(/\/+$/, "");
}

export async function POST(request) {
  const userId = process.env.ONECARD_USER_ID;
  const token = process.env.ONECARD_TOKEN;
  const initiateUrl = process.env.ONECARD_INITIATE_URL;
  const baseUrl = trimBaseUrl(process.env.APP_BASE_URL);

  if (!userId || !token || !initiateUrl || !baseUrl) {
    return Response.json(
      { error: "Payment gateway is not configured. Contact the organizer." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const regId = typeof body?.reg_id === "string" ? body.reg_id.trim() : "";
  if (!regId) {
    return Response.json({ error: "Missing registration reference." }, { status: 400 });
  }

  const registration = getRegistrationByRegId(regId);
  if (!registration) {
    return Response.json({ error: "Registration not found. Please complete the form first." }, { status: 404 });
  }

  if (registration.payment_status === "paid") {
    return Response.json({ error: "This registration is already paid." }, { status: 409 });
  }

  const amount = String(process.env.IAUP_REGISTRATION_AMOUNT || "500");
  const currency = String(process.env.IAUP_CURRENCY || "BDT").toUpperCase();
  const reffId = buildReffId();

  const name = `${registration.given_name || ""} ${registration.surname || ""}`.trim() || "Participant";

  const payload = {
    user_id: userId,
    token,
    amount,
    currency,
    cus_name: name,
    cus_email: registration.email,
    cus_address: (registration.address || "Dhaka").slice(0, 240),
    cus_city: (registration.city || "Dhaka").slice(0, 80),
    cus_state: (registration.city || "Dhaka").slice(0, 80),
    cus_postcode: (registration.zip_code || "1205").slice(0, 20),
    cus_country: (registration.country || "Bangladesh").slice(0, 80),
    cus_phone: (registration.phone || "").slice(0, 24),
    response_type: "json",
    success: `${baseUrl}/api/payment/ipn`,
    redirect: `${baseUrl}/registration/payment-result?reff_id=${encodeURIComponent(reffId)}`,
    reff_id: reffId,
  };

  let upstream;
  try {
    upstream = await fetch(initiateUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[payment/initiate] network error", err);
    return Response.json(
      { error: "Could not reach payment gateway. Please try again." },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("[payment/initiate] non-JSON response", upstream.status, text);
    return Response.json(
      { error: "Unexpected response from payment gateway." },
      { status: 502 }
    );
  }

  if (!upstream.ok || data?.message !== "success" || !data?.url) {
    console.error("[payment/initiate] gateway error", upstream.status, data);
    return Response.json(
      { error: data?.message || "Payment gateway rejected the request." },
      { status: 502 }
    );
  }

  try {
    attachReffIdToRegistration(regId, reffId, amount, currency);
  } catch (err) {
    console.error("[payment/initiate] DB update failed", err);
  }

  return Response.json({ url: data.url, reff_id: reffId });
}
