import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const REQUIRED_FIELDS = [
  "email", "firstName", "lastName", "phone", "country", "address", "city", "postalCode",
];

function toCents(amount: number) {
  return Math.round(amount * 100);
}

function escapeHtml(value: string) {
  return String(value).replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!,
  );
}

function renderItemsHtml(items: any[]) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">
            <strong>${escapeHtml(item.tourTitle)}</strong><br/>
            ${escapeHtml(item.checkIn)} → ${escapeHtml(item.checkOut)} · ${item.guests} guest(s)
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">€ ${item.total.toFixed(2)}</td>
        </tr>`,
    )
    .join("");
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    console.error("Resend error", await response.text().catch(() => ""));
  }
}

Deno.serve(async (req: Request) => {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method not allowed" }), {
      status: 405,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return new Response(JSON.stringify({ error: "invalid JSON body" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const { form, items, subtotal, locale } = body;

  for (const field of REQUIRED_FIELDS) {
    if (!form?.[field]) {
      return new Response(JSON.stringify({ error: `missing field: ${field}` }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }
  }
  if (!Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "cart is empty" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      company: form.company || null,
      country: form.country,
      address: form.address,
      apartment: form.apartment || null,
      city: form.city,
      state: form.state || null,
      postal_code: form.postalCode,
      note: form.note || null,
      subtotal_cents: toCents(subtotal),
      locale: locale === "de" ? "de" : "en",
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    console.error("order insert failed", orderError);
    return new Response(JSON.stringify({ error: "failed to create order" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    items.map((item: any) => ({
      order_id: order.id,
      tour_slug: item.tourId,
      tour_title: item.tourTitle,
      departure_id: item.departureId,
      check_in: item.checkIn,
      check_out: item.checkOut,
      guests: item.guests,
      addons: item.addons ?? [],
      line_total_cents: toCents(item.total),
    })),
  );

  if (itemsError) {
    console.error("order_items insert failed", itemsError);
    return new Response(JSON.stringify({ error: "failed to save order items" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress = Deno.env.get("RESEND_FROM") || "onboarding@resend.dev";
  const adminEmail = Deno.env.get("ADMIN_ORDER_EMAIL") || "dev@bluehawke.com";

  if (resendKey) {
    const itemsHtml = renderItemsHtml(items);
    const customerHtml = `
      <h2>Thanks for your booking, ${escapeHtml(form.firstName)}!</h2>
      <p>Order <strong>${order.order_number}</strong> — payment: cash on delivery.</p>
      <table style="width:100%;border-collapse:collapse;">${itemsHtml}</table>
      <p style="margin-top:16px;"><strong>Total: € ${subtotal.toFixed(2)}</strong></p>
      <p>We'll be in touch shortly to confirm the details.</p>`;

    const adminHtml = `
      <h2>New order ${order.order_number}</h2>
      <p><strong>${escapeHtml(form.firstName)} ${escapeHtml(form.lastName)}</strong><br/>
      ${escapeHtml(form.email)} · ${escapeHtml(form.phone)}</p>
      <p>${escapeHtml(form.address)}${form.apartment ? ", " + escapeHtml(form.apartment) : ""}<br/>
      ${escapeHtml(form.city)}, ${escapeHtml(form.postalCode)} ${escapeHtml(form.state || "")}<br/>
      ${escapeHtml(form.country)}${form.company ? " · " + escapeHtml(form.company) : ""}</p>
      ${form.note ? `<p><strong>Note:</strong> ${escapeHtml(form.note)}</p>` : ""}
      <table style="width:100%;border-collapse:collapse;">${itemsHtml}</table>
      <p style="margin-top:16px;"><strong>Total: € ${subtotal.toFixed(2)}</strong></p>`;

    await sendEmail(resendKey, {
      from: fromAddress,
      to: form.email,
      subject: `Booking confirmation — ${order.order_number}`,
      html: customerHtml,
    });

    await sendEmail(resendKey, {
      from: fromAddress,
      to: adminEmail,
      reply_to: form.email,
      subject: `New order — ${order.order_number}`,
      html: adminHtml,
    });
  } else {
    console.error("RESEND_API_KEY not set — skipping order emails");
  }

  return new Response(JSON.stringify({ orderId: order.id, orderNumber: order.order_number }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
