export async function verifyPayment(reffId) {
  if (!reffId || typeof reffId !== "string") {
    return { state: "error", message: "Reference ID is missing.", details: null };
  }

  const token = process.env.ONECARD_TOKEN;
  const verifyUrl = process.env.ONECARD_VERIFY_URL;

  if (!token || !verifyUrl) {
    console.error("[verifyPayment] gateway env not configured");
    return { state: "error", message: "Payment verification is not configured.", details: null };
  }

  let upstream;
  try {
    upstream = await fetch(verifyUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reff_id: reffId, token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    console.error("[verifyPayment] network", reffId, err?.message || err);
    return {
      state: "error",
      message: "Could not reach the payment gateway. Please refresh in a moment.",
      details: null,
    };
  }

  const text = await upstream.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    console.error("[verifyPayment] non-JSON", reffId, upstream.status, text?.slice(0, 300));
    return {
      state: "error",
      message: "Unexpected response from the payment gateway.",
      details: null,
    };
  }

  console.log("[verifyPayment]", reffId, "msg:", data?.message, "status:", data?.data?.status);

  const status = String(data?.data?.status || "").toUpperCase();

  if (data?.message === "success" && (status === "VALIDATED" || status === "VALID")) {
    return { state: "success", message: "Payment received.", details: data.data || null };
  }

  if (data?.message === "duplicate") {
    return { state: "success", message: "Payment was already recorded for this reference.", details: data?.data || null };
  }

  if (["PENDING", "UNATTEMPTED", "INITIATED", "PROCESSING"].includes(status)) {
    return {
      state: "pending",
      message: "Payment is still being processed. Please refresh this page in a moment.",
      details: data?.data || null,
    };
  }

  const reason =
    (typeof data?.data?.error === "string" && data.data.error) ||
    (status === "FAILED" && "The payment failed at the bank.") ||
    (status === "CANCELLED" && "The payment was cancelled.") ||
    (status === "EXPIRED" && "The payment session expired.") ||
    (status === "INVALID_TRANSACTION" && "The transaction was invalid.") ||
    (status && `Payment status: ${status}.`) ||
    (typeof data?.message === "string" && data.message) ||
    "Payment was not completed.";

  return { state: "failed", message: reason, details: data?.data || data };
}
