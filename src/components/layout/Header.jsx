import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../../assets/hero";
import { iconCart } from "../../assets/shared";
import useCart from "../../hooks/useCart";
import LanguageSwitcher from "../ui/LanguageSwitcher";

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

const ABOUT_DROPDOWN_PATHS = ["/about", "/gallery", "/faq", "/testimonials"];

function AboutDropdown({ pathname, t, light = false }) {
  const isActive = ABOUT_DROPDOWN_PATHS.includes(pathname);
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`inline-flex cursor-pointer items-center gap-1 ${navPillClass(isActive, light)}`}
      >
        {t("nav.about")}
        <span
          aria-hidden
          className={`text-[1em] leading-none transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3">
          <div
            className={`flex min-w-[140px] flex-col gap-1 rounded-[12px] p-2 text-center shadow-lg backdrop-blur-md ${
              light ? "border border-gray-200 bg-white" : "border border-white/30 bg-black/60"
            }`}
          >
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-1.5 text-nav leading-snug no-underline ${
                light ? "text-gray-700 hover:bg-gray-100" : "text-white/85 hover:bg-white/15"
              }`}
            >
              {t("nav.about")}
            </Link>
            <Link
              to="/gallery"
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-1.5 text-nav leading-snug no-underline ${
                light ? "text-gray-700 hover:bg-gray-100" : "text-white/85 hover:bg-white/15"
              }`}
            >
              {t("nav.gallery")}
            </Link>
            <Link
              to="/faq"
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-1.5 text-nav leading-snug no-underline ${
                light ? "text-gray-700 hover:bg-gray-100" : "text-white/85 hover:bg-white/15"
              }`}
            >
              {t("nav.faq")}
            </Link>
            <Link
              to="/testimonials"
              onClick={() => setOpen(false)}
              className={`rounded-md px-3 py-1.5 text-nav leading-snug no-underline ${
                light ? "text-gray-700 hover:bg-gray-100" : "text-white/85 hover:bg-white/15"
              }`}
            >
              {t("nav.testimonials")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSidebar({ open, onClose, pathname, t }) {
  const [aboutOpen, setAboutOpen] = useState(false);

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
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,300px)] flex-col bg-[#1a1a1a] shadow-2xl transition-transform duration-300 md:hidden ${
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

          <button
            type="button"
            onClick={() => setAboutOpen((prev) => !prev)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left font-sans text-base ${
              ABOUT_DROPDOWN_PATHS.includes(pathname)
                ? "bg-white/15 font-semibold text-white"
                : "text-white/85 hover:bg-white/10"
            }`}
            aria-expanded={aboutOpen}
          >
            {t("nav.about")}
            <span aria-hidden className={`transition-transform ${aboutOpen ? "rotate-180" : ""}`}>
              ▾
            </span>
          </button>
          {aboutOpen && (
            <div className="ml-3 flex flex-col gap-0.5 border-l border-white/20 pl-3">
              <Link to="/about" onClick={onClose} className={linkClass(pathname === "/about")}>
                {t("nav.about")}
              </Link>
              <Link to="/gallery" onClick={onClose} className={linkClass(pathname === "/gallery")}>
                {t("nav.gallery")}
              </Link>
              <Link to="/faq" onClick={onClose} className={linkClass(pathname === "/faq")}>
                {t("nav.faq")}
              </Link>
              <Link
                to="/testimonials"
                onClick={onClose}
                className={linkClass(pathname === "/testimonials")}
              >
                {t("nav.testimonials")}
              </Link>
            </div>
          )}

          <Link
            to="/tours"
            onClick={onClose}
            className={linkClass(pathname.startsWith("/tours"))}
          >
            {t("nav.cyclingTours")}
          </Link>
          <Link to="/imprint" onClick={onClose} className={linkClass(pathname === "/imprint")}>
            {t("nav.imprint")}
          </Link>
          <Link to="/contact" onClick={onClose} className={linkClass(pathname === "/contact")}>
            {t("nav.contact")}
          </Link>
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

  return (
    <>
      <header className="relative z-50 mx-auto grid w-full max-w-hero shrink-0 grid-cols-[1fr_auto] items-center gap-3 xs:gap-4 md:grid-cols-[auto_1fr_auto] md:gap-6 lg:gap-8">
        <Link to="/" className="justify-self-start">
          <img
            className="h-auto w-24 xs:w-28 sm:w-32 md:w-36 lg:w-[168px]"
            src={logo}
            alt="Albanien Radreisen"
          />
        </Link>

        <nav
          className={`hidden min-h-0 w-full flex-wrap items-center justify-center gap-3 rounded-[21px] px-3 py-1.5 backdrop-blur-sm sm:gap-5 sm:px-5 sm:py-2 md:flex md:w-auto lg:gap-7 lg:px-6 ${
            light ? "border border-gray-200 bg-white" : "border border-white/30 bg-white/15"
          }`}
        >
          <Link to="/" className={navPillClass(pathname === "/", light)}>
            {t("nav.home")}
          </Link>
          <AboutDropdown pathname={pathname} t={t} light={light} />
          <Link to="/tours" className={navPillClass(pathname.startsWith("/tours"), light)}>
            {t("nav.cyclingTours")}
          </Link>
          <Link to="/imprint" className={navPillClass(pathname === "/imprint", light)}>
            {t("nav.imprint")}
          </Link>
          <Link to="/contact" className={navPillClass(pathname === "/contact", light)}>
            {t("nav.contact")}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2 justify-self-end sm:gap-2.5">
          <LanguageSwitcher light={light} />
          <Link
            to="/cart"
            className={`relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg backdrop-blur-sm ${
              light ? "border border-gray-200 bg-white" : "border border-white bg-white/16"
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
            className="hidden h-btn-lg items-center rounded-[11px] bg-white/80 px-6 text-btn leading-none text-black no-underline sm:px-8 md:inline-flex lg:px-[39px]"
          >
            {t("nav.getStarted")}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg backdrop-blur-sm md:hidden ${
              light ? "border border-gray-200 bg-white" : "border border-white bg-white/16"
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
      />
    </>
  );
}
