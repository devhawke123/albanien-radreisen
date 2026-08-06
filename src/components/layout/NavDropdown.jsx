import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function NavDropdown({ label, parentTo, items, isActive, light, navPillClass }) {
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
      <div className={`inline-flex items-center gap-1 ${navPillClass(isActive, light)}`}>
        <Link to={parentTo} className="no-underline">
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Toggle ${label} menu`}
          className="inline-flex cursor-pointer items-center"
        >
          <span
            aria-hidden
            className={`text-[1em] leading-none transition-transform ${open ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
      </div>
      {open && (
        <div className="absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3">
          <div
            className={`flex max-h-[min(70vh,420px)] min-w-[200px] max-w-[min(90vw,320px)] flex-col gap-1 overflow-y-auto rounded-[12px] p-2 text-left shadow-lg backdrop-blur-md ${
              light ? "border border-gray-200 bg-white" : "border border-white/30 bg-black/60"
            }`}
          >
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-1.5 text-nav leading-snug no-underline ${
                  light ? "text-gray-700 hover:bg-gray-100" : "text-white/85 hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
