import { useState } from "react";
import { Navigate } from "react-router-dom";
import { logo } from "../../assets/hero";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { LockIcon, SpinnerIcon } from "../../components/admin/icons";
import loginBackground from "@assets/images/hilltopGroupPic.png";

export default function AdminLoginPage() {
  const { status, login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (status === "authenticated") {
    return <Navigate to="/admin/bookings" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
    } catch {
      setError("Invalid username or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={loginBackground} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <img src={logo} alt="Albanien Radreisen" className="w-40 brightness-0 invert" />
          <div className="max-w-md text-white">
            <p className="font-serif text-4xl font-semibold leading-tight">
              Admin Panel
            </p>
            <p className="mt-3 font-sans text-lg text-white/80">
              Manage tour bookings, departures, and content for Albanien Radreisen.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-16 sm:px-10">
        <div className="w-full max-w-sm">
          <img src={logo} alt="Albanien Radreisen" className="w-32 lg:hidden" />

          <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-[14px] bg-brand-pale text-brand">
            <LockIcon className="h-6 w-6" />
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-black">Admin sign in</h1>
          <p className="mt-2 font-sans text-sm text-text-muted">
            Restricted area — authorized staff only.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Username</span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-12 rounded-[11px] border border-gray-200 px-4 font-sans text-sm text-black outline-none focus:border-brand"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-[11px] border border-gray-200 px-4 font-sans text-sm text-black outline-none focus:border-brand"
              />
            </label>

            {error && <p className="font-sans text-sm text-brand">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex h-btn-lg cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-brand text-btn font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && <SpinnerIcon className="h-5 w-5" />}
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
