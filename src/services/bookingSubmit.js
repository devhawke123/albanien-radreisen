const BOOKING_EMAIL = "dev@bluehawke.com";

async function postToFormSubmit(body) {
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

export async function submitOrderNotification({
  orderNumber,
  form,
  items,
  subtotal,
  autoresponseMessage,
}) {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.tourTitle} (${item.checkIn} → ${item.checkOut}, ${item.guests} guests, €${item.total})`,
    )
    .join("\n");

  const address = [form.address, form.apartment, form.city, form.state, form.postalCode, form.country]
    .filter(Boolean)
    .join(", ");

  const body = {
    _subject: `New booking order: ${orderNumber}`,
    _template: "table",
    _captcha: "false",
    _replyto: form.email,
    _autoresponse: autoresponseMessage,
    Type: "Order",
    OrderNumber: orderNumber,
    email: form.email,
    Name: `${form.firstName} ${form.lastName}`,
    Email: form.email,
    Phone: form.phone,
    Country: form.country,
    Address: address,
    Company: form.company || "—",
    Note: form.note || "—",
    Items: itemLines,
    Subtotal: `€${subtotal}`,
  };

  return postToFormSubmit(body);
}
