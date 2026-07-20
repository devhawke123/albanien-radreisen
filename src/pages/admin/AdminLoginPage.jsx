import { useState } from "react";
import { Navigate } from "react-router-dom";
import { logo } from "../../assets/hero";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { LockIcon, SpinnerIcon } from "../../components/admin/icons";
import loginBackground from "@assets/images/HeroSectionPic3.png";

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
    <div className="grid h-dvh max-h-dvh grid-cols-1 overflow-hidden lg:grid-cols-2">
      <div className="relative hidden min-h-0 lg:block">
        <img src={loginBackground} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
        <div className="relative flex h-full min-h-0 flex-col justify-between p-8 xl:p-12">
          <img src={logo} alt="Albanien Radreisen" className="w-32 brightness-0 invert xl:w-40" />
          <div className="max-w-md text-white">
            <p className="font-serif text-3xl font-semibold leading-tight xl:text-4xl">Admin Panel</p>
            <p className="mt-2 font-sans text-base text-white/80 xl:mt-3 xl:text-lg">
              Manage tour bookings, departures, and content for Albanien Radreisen.
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-full min-h-0 items-center justify-center overflow-hidden bg-white px-4 py-6 sm:px-8 lg:px-10">
        <div className="w-full max-w-sm">
          <img
            src={logo}
            alt="Albanien Radreisen"
            className="mx-auto w-24 sm:w-28 lg:hidden"
          />

          <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-pale text-brand sm:mt-6 sm:h-12 sm:w-12 lg:mt-0">
            <LockIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>

          <h1 className="mt-3 font-serif text-2xl font-semibold text-black sm:mt-5 sm:text-3xl">
            Admin sign in
          </h1>
          <p className="mt-1 font-sans text-sm text-text-muted sm:mt-2">
            Restricted area — authorized staff only.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:mt-8 sm:gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-medium text-black">Username</span>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="h-11 rounded-[11px] border border-gray-200 px-4 font-sans text-sm text-black outline-none focus:border-brand sm:h-12"
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
                className="h-11 rounded-[11px] border border-gray-200 px-4 font-sans text-sm text-black outline-none focus:border-brand sm:h-12"
              />
            </label>

            {error && <p className="font-sans text-sm text-brand">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-70 sm:mt-2 sm:h-btn-lg sm:text-btn"
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
