import { NavLink } from "react-router-dom";
import { logo } from "../../assets/hero";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { BookingsIcon, DashboardIcon, LogoutIcon } from "./icons";

const NAV_ITEMS = [
  { to: "/admin/dashboard", label: "Dashboard", icon: DashboardIcon, end: true },
  { to: "/admin/dashboard/bookings", label: "Bookings", icon: BookingsIcon, end: false },
];

function navLinkClass({ isActive }) {
  return `flex items-center gap-3 rounded-[11px] px-4 py-2.5 font-sans text-sm no-underline transition-colors ${
    isActive ? "bg-brand text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;
}

export default function AdminLayout({ title, children }) {
  const { username, logout } = useAdminAuth();

  return (
    <div className="flex min-h-screen bg-[#f7f7f8]">
      <aside className="hidden w-64 shrink-0 flex-col bg-[#1a1a1a] px-5 py-6 md:flex">
        <img src={logo} alt="Albanien Radreisen" className="w-32 brightness-0 invert" />

        <nav className="mt-10 flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={logout}
          className="flex cursor-pointer items-center gap-3 rounded-[11px] px-4 py-2.5 text-left font-sans text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogoutIcon className="h-5 w-5" />
          Log out
        </button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 sm:px-8">
          <h1 className="font-serif text-2xl font-semibold text-black">{title}</h1>
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm text-text-muted">{username}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-pale font-sans text-sm font-semibold text-brand">
              {username?.[0]?.toUpperCase()}
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="Log out"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[9px] text-text-muted hover:bg-gray-100 md:hidden"
            >
              <LogoutIcon className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
