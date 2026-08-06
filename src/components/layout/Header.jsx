import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets/hero";
import { iconCart } from "../../assets/shared";
import { TOURS } from "../../data/toursCatalog";
import useCart from "../../hooks/useCart";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import NavDropdown from "./NavDropdown";

function navPillClass(isActive, light = false) {
  if (light) {
    return isActive
      ? "rounded-[18px] bg-brand-soft px-4 py-1 font-sans text-nav leading-snug text-brand no-underline sm:px-5 lg:px-[23px]"
      : "text-nav leading-snug text-gray-700 no-underline hover:text-brand";
  }

  return isActive
    ? "rounded-[18px] bg-white px-4 py-1 font-sans text-nav leading-snug text-brand-light no-underline sm:px-5 lg:px-[23px]"
    : "text-nav leading-snug text-white/85 no-underline";
}

function MobileNavGroup({ label, parentTo, isActive, items, linkClass, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-sans text-base ${
          isActive ? "bg-white/15 font-semibold text-white" : "text-white/85 hover:bg-white/10"
        }`}
      >
        <Link to={parentTo} onClick={onClose} className="flex-1 text-left no-underline text-inherit">
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="ml-2 inline-flex cursor-pointer items-center"
          aria-expanded={open}
          aria-label={`Toggle ${label} menu`}
        >
          <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
      </div>
      {open && (
        <div className="ml-3 flex flex-col gap-0.5 border-l border-white/20 pl-3">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={linkClass(item.isActive)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function MobileSidebar({ open, onClose, pathname, t, navGroups }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  function linkClass(isActive) {
    return `block rounded-lg px-3 py-2.5 font-sans text-base no-underline ${
      isActive ? "bg-white/15 font-semibold text-white" : "text-white/85 hover:bg-white/10"
    }`;
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,300px)] flex-col bg-[#1a1a1a] shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <img src={logo} alt="Albanien Radreisen" className="h-auto w-28" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-2xl text-white"
            aria-label={t("nav.closeMenu")}
          >
            ×
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          <Link to="/" onClick={onClose} className={linkClass(pathname === "/")}>
            {t("nav.home")}
          </Link>

          {navGroups.map((group) => (
            <MobileNavGroup
              key={group.id}
              label={group.label}
              parentTo={group.parentTo}
              isActive={group.isActive(pathname)}
              items={group.items.map((item) => ({
                ...item,
                isActive: item.isActive(pathname),
              }))}
              linkClass={linkClass}
              onClose={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}

export default function Header({ light = false }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useCart();

  const navGroups = useMemo(() => {
    const tourItems = TOURS.map((tour) => ({
      to: `/tours/${tour.slug}`,
      label: t(`nav.tourItems.${tour.slug}`),
      isActive: (currentPath) => currentPath === `/tours/${tour.slug}`,
    }));

    return [
      {
        id: "cycling-tours",
        label: t("nav.cyclingTours"),
        parentTo: "/tours",
        isActive: (currentPath) =>
          currentPath === "/tours" || currentPath.startsWith("/tours/"),
        items: tourItems,
      },
      {
        id: "gallery",
        label: t("nav.gallery"),
        parentTo: "/gallery",
        isActive: (currentPath) =>
          currentPath === "/gallery" || currentPath === "/testimonials",
        items: [
          {
            to: "/testimonials",
            label: t("nav.guestbook"),
            isActive: (currentPath) => currentPath === "/testimonials",
          },
        ],
      },
      {
        id: "about",
        label: t("nav.aboutUs"),
        parentTo: "/about",
        isActive: (currentPath) =>
          currentPath === "/about" || currentPath === "/our-team",
        items: [
          {
            to: "/our-team",
            label: t("nav.ourTeam"),
            isActive: (currentPath) => currentPath === "/our-team",
          },
        ],
      },
      {
        id: "contact",
        label: t("nav.contact"),
        parentTo: "/contact",
        isActive: (currentPath) =>
          currentPath === "/contact" ||
          currentPath === "/imprint" ||
          currentPath === "/faq",
        items: [
          {
            to: "/imprint",
            label: t("nav.legalNotice"),
            isActive: (currentPath) => currentPath === "/imprint",
          },
          {
            to: "/faq",
            label: t("nav.faq"),
            isActive: (currentPath) => currentPath === "/faq",
          },
        ],
      },
    ];
  }, [t]);

  return (
    <>
      <header
        className={`relative z-50 mx-auto grid w-full max-w-hero shrink-0 grid-cols-[1fr_auto] items-center gap-3 xs:gap-4 lg:grid-cols-[auto_1fr_auto] lg:gap-8 ${
          light ? " bg-gray-900" : ""
        }`}
      >
        <Link to="/" className="justify-self-start">
          <img
            className="h-auto w-24 xs:w-28 sm:w-32 md:w-36 lg:w-[168px]"
            src={logo}
            alt="Albanien Radreisen"
          />
        </Link>

        <nav
          className={`hidden min-h-0 w-full flex-wrap items-center justify-center gap-3 rounded-[21px] px-3 py-1.5 backdrop-blur-sm sm:gap-5 sm:px-5 sm:py-2 lg:flex lg:w-auto lg:gap-7 lg:px-6 ${
            light ? "border border-gray-200 bg-white" : "border border-white/30 bg-white/15"
          }`}
        >
          <Link to="/" className={navPillClass(pathname === "/", light)}>
            {t("nav.home")}
          </Link>

          {navGroups.map((group) => (
            <NavDropdown
              key={group.id}
              label={group.label}
              parentTo={group.parentTo}
              items={group.items}
              isActive={group.isActive(pathname)}
              light={light}
              navPillClass={navPillClass}
            />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 justify-self-end sm:gap-2.5">
          <LanguageSwitcher light={light} />
          <Link
            to="/cart"
            className={`relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg backdrop-blur-sm ${
              light ? "border border-gray-200 bg-gray-200" : "border border-white bg-gray-500"
            }`}
            aria-label={t("nav.cartLabel")}
          >
            <img src={iconCart} alt="" className="h-6 w-6" aria-hidden />
            {cartItems.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/tours"
            className="hidden h-btn-lg items-center rounded-[11px] bg-white/80 px-6 mr-2 text-btn leading-none text-black no-underline sm:px-8 lg:inline-flex lg:px-[39px]"
          >
            {t("nav.getStarted")}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg backdrop-blur-sm lg:hidden ${
              light ? "border border-gray-200 bg-white-100" : "border border-white bg-white/16"
            }`}
            aria-label={t("nav.openMenu")}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 rounded-full ${light ? "bg-gray-800" : "bg-white"}`} />
            <span className={`block h-0.5 w-5 rounded-full ${light ? "bg-gray-800" : "bg-white"}`} />
            <span className={`block h-0.5 w-5 rounded-full ${light ? "bg-gray-800" : "bg-white"}`} />
          </button>
        </div>
      </header>

      <MobileSidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        t={t}
        navGroups={navGroups}
      />
    </>
  );
}
