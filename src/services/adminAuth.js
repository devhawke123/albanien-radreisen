const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SESSION_STORAGE_KEY = "albanien-radreisen-admin-session";

export function getStoredSessionToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_STORAGE_KEY);
}

function storeSessionToken(token) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(SESSION_STORAGE_KEY, token);
  else window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

async function callAdminFunction(name, options = {}) {
  const token = getStoredSessionToken();
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      ...(token ? { "x-admin-session": token } : {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  return { ok: response.ok, data };
}

export async function adminLogin(username, password) {
  const { ok, data } = await callAdminFunction("admin-login", {
    body: JSON.stringify({ username, password }),
  });
  if (!ok) throw new Error(data.error ?? "Login failed");
  storeSessionToken(data.session_token);
  return data;
}

export async function adminVerify() {
  if (!getStoredSessionToken()) return { authenticated: false };
  const { ok, data } = await callAdminFunction("admin-verify");
  if (!ok) storeSessionToken(null);
  return ok ? data : { authenticated: false };
}

export async function adminLogout() {
  await callAdminFunction("admin-logout");
  storeSessionToken(null);
}
