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

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (payload?.name || "").trim();
  const email = (payload?.email || "").trim().toLowerCase();
  if (!name || !email) {
    return Response.json({ error: "name and email are required." }, { status: 400 });
  }

  const amount = String(payload?.amount || process.env.IAUP_REGISTRATION_AMOUNT || "500");
  const currency = String(payload?.currency || process.env.IAUP_CURRENCY || "BDT").toUpperCase();
  const reffId = buildReffId();

  const body = {
    user_id: userId,
    token,
    amount,
    currency,
    cus_name: name,
    cus_email: email,
    cus_address: (payload?.address || "Dhaka").toString().slice(0, 240),
    cus_city: (payload?.city || "Dhaka").toString().slice(0, 80),
    cus_state: (payload?.state || "Dhaka").toString().slice(0, 80),
    cus_postcode: (payload?.postcode || "1205").toString().slice(0, 20),
    cus_country: (payload?.country || "Bangladesh").toString().slice(0, 80),
    cus_phone: (payload?.phone || "").toString().slice(0, 24),
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
        // If 1Card requires the token as a header instead of in the body,
        // uncomment the next line and remove `token` from `body` above:
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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

  return Response.json({ url: data.url, reff_id: reffId });
}
