import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const VALID_TYPES = ["contact", "tour_request"];

function escapeHtml(value: string) {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (ch) => map[ch]);
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

  const {
    type,
    name,
    email,
    phone,
    address,
    subject,
    message,
    tourSlug,
    tourTitle,
    preferredDeparture,
    guests,
    addonsSummary,
    locale,
  } = body;

  if (!VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: "invalid type" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
  if (!name || !email) {
    return new Response(JSON.stringify({ error: "missing name or email" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data: request, error: insertError } = await supabase
    .from("requests")
    .insert({
      type,
      name,
      email,
      phone: phone || null,
      address: address || null,
      subject: subject || null,
      message: message || null,
      tour_slug: tourSlug || null,
      tour_title: tourTitle || null,
      preferred_departure: preferredDeparture || null,
      guests: Number.isInteger(guests) ? guests : null,
      addons_summary: addonsSummary || null,
      locale: locale === "de" ? "de" : "en",
    })
    .select("id")
    .single();

  if (insertError || !request) {
    console.error("request insert failed", insertError);
    return new Response(JSON.stringify({ error: "failed to save request" }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const fromAddress = Deno.env.get("RESEND_FROM") || "onboarding@resend.dev";
  const adminEmail = Deno.env.get("ADMIN_ORDER_EMAIL") || "dev@bluehawke.com";

  if (resendKey) {
    const detailsHtml =
      type === "tour_request"
        ? `<p><strong>Tour:</strong> ${escapeHtml(tourTitle || "")}<br/>
           <strong>Preferred departure:</strong> ${escapeHtml(preferredDeparture || "")}<br/>
           <strong>Guests:</strong> ${guests ?? ""}<br/>
           <strong>Address:</strong> ${escapeHtml(address || "")}<br/>
           <strong>Add-ons:</strong> ${escapeHtml(addonsSummary || "None")}</p>`
        : `<p><strong>Subject:</strong> ${escapeHtml(subject || "")}<br/>
           <strong>Phone:</strong> ${escapeHtml(phone || "")}</p>`;

    const adminHtml = `
      <h2>New ${type === "tour_request" ? "tour request" : "contact"} submission</h2>
      <p><strong>${escapeHtml(name)}</strong><br/>${escapeHtml(email)}${phone ? " · " + escapeHtml(phone) : ""}</p>
      ${detailsHtml}
      ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}`;

    await sendEmail(resendKey, {
      from: fromAddress,
      to: adminEmail,
      reply_to: email,
      subject: `New ${type === "tour_request" ? "tour request" : "contact"} — ${name}`,
      html: adminHtml,
    });

    const customerHtml = `
      <h2>Thanks for reaching out, ${escapeHtml(name)}!</h2>
      <p>We've received your ${type === "tour_request" ? "tour request" : "message"} and will get back to you shortly.</p>`;

    await sendEmail(resendKey, {
      from: fromAddress,
      to: email,
      subject: "We've received your message — Albanien Radreisen",
      html: customerHtml,
    });
  } else {
    console.error("RESEND_API_KEY not set — skipping request emails");
  }

  return new Response(JSON.stringify({ requestId: request.id }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
