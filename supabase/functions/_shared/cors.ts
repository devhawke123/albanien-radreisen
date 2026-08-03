export function corsHeaders(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": req.headers.get("origin") ?? "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-admin-session",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

export function getBearerToken(req: Request): string | null {
  return req.headers.get("x-admin-session");
}
