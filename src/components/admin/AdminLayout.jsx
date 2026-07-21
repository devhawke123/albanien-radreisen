import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets/hero";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { LogoutIcon } from "./icons";

const NAV_LINKS = [
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/requests", label: "Requests" },
];

export default function AdminLayout({ children }) {
  const { username, logout } = useAdminAuth();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-hero items-center justify-between px-hero-x py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Albanien Radreisen" className="h-auto w-28" />
            <span className="hidden h-6 w-px bg-gray-200 sm:block" />
            <span className="hidden font-sans text-[13px] font-semibold uppercase tracking-wide text-gray-500 sm:inline">
              Admin
            </span>
            <nav className="hidden items-center gap-1 sm:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-lg px-3.5 py-2 font-sans text-[15px] font-medium no-underline ${
                    pathname === link.to
                      ? "bg-brand-pale text-brand"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2.5 rounded-full border border-gray-200 py-1.5 pl-1.5 pr-4 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-pale font-sans text-[13px] font-semibold text-brand">
                {username?.[0]?.toUpperCase()}
              </div>
              <span className="font-sans text-[15px] font-medium text-gray-900">{username}</span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-colors hover:border-brand hover:text-brand sm:w-auto sm:gap-2 sm:px-4"
              aria-label="Log out"
            >
              <LogoutIcon className="h-4.5 w-4.5" />
              <span className="hidden font-sans text-[15px] font-medium sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-hero px-hero-x py-8 sm:py-10">{children}</main>
    </div>
  );
}
