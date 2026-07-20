import { getStoredSessionToken } from "./adminAuth";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
  if (!response.ok) throw new Error(data.error ?? "Request failed");
  return data;
}

export async function fetchRequests() {
  const { requests } = await callAdminFunction("admin-list-requests");
  return requests;
}

export async function updateRequestStatus(requestId, status) {
  return callAdminFunction("admin-update-request-status", {
    body: JSON.stringify({ requestId, status }),
  });
}
