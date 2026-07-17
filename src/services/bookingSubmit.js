const BOOKING_EMAIL = "alba.reisen@yahoo.de";

export async function submitBooking(payload) {
  const body = {
    _subject: payload.subject,
    _template: "table",
    _captcha: "false",
    ...payload.fields,
  };

  if (payload.replyTo) {
    body._replyto = payload.replyTo;
  }

  const response = await fetch(`https://formsubmit.co/ajax/${BOOKING_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Booking submission failed");
  }

  const data = await response.json();
  if (data.success !== "true" && data.success !== true) {
    throw new Error("Booking submission failed");
  }

  return data;
}
