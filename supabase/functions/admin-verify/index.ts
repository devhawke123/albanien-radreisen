import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders, getBearerToken } from "../_shared/cors.ts";

// Checks the session token (sent as X-Admin-Session) against public.admin_sessions.
// Used by the frontend route guard to decide whether to show the dashboard or the login page.
Deno.serve(async (req: Request) => {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  const token = getBearerToken(req);
  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase.rpc("admin_verify_session", { p_token: token });

  if (error || !data || data.length === 0) {
    return new Response(JSON.stringify({ authenticated: false }), {
      status: 401,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ authenticated: true, username: data[0].username }), {
    status: 200,
    headers: { ...cors, "Content-Type": "application/json" },
  });
});
