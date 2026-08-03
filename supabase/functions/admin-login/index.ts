import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

// Admin-only login. Verifies against public.admin_users via the admin_login()
// Postgres function (bcrypt check + session creation happen atomically in the DB).
// Returns the session token in the body — the frontend runs on a different origin
// than this function, so a cross-site cookie would be dropped by the browser.
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
  const username = body?.username;
  const password = body?.password;
  if (!username || !password) {
    return new Response(JSON.stringify({ error: "username and password required" }), {
      status: 400,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase.rpc("admin_login", {
    p_username: username,
    p_password: password,
  });

  if (error || !data || data.length === 0) {
    return new Response(JSON.stringify({ error: "invalid credentials" }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const { session_token, expires_at } = data[0];

  return new Response(JSON.stringify({ ok: true, session_token, expires_at }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
