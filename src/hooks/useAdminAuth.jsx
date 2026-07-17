import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { adminLogin, adminLogout, adminVerify } from "../services/adminAuth";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [status, setStatus] = useState("checking"); // checking | authenticated | anonymous
  const [username, setUsername] = useState(null);

  const applySession = useCallback((result) => {
    if (result.authenticated) {
      setUsername(result.username);
      setStatus("authenticated");
    } else {
      setUsername(null);
      setStatus("anonymous");
    }
  }, []);

  const refresh = useCallback(async () => {
    const result = await adminVerify();
    applySession(result);
    return result.authenticated;
  }, [applySession]);

  useEffect(() => {
    let cancelled = false;
    adminVerify().then((result) => {
      if (!cancelled) applySession(result);
    });
    return () => {
      cancelled = true;
    };
  }, [applySession]);

  const login = useCallback(async (user, password) => {
    await adminLogin(user, password);
    await refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await adminLogout();
    setUsername(null);
    setStatus("anonymous");
  }, []);

  return (
    <AdminAuthContext.Provider value={{ status, username, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
