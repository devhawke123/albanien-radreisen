import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ light = false }) {
  const { i18n } = useTranslation();
  const nextLang = i18n.resolvedLanguage === "en" ? "de" : "en";

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(nextLang)}
      className={`flex h-11 shrink-0 cursor-pointer items-center rounded-lg p-1 backdrop-blur-sm ${
        light ? "border border-gray-200" : "border border-white"
      }`}
      aria-label={`Switch to ${nextLang === "en" ? "English" : "German"}`}
    >
      <span
        className={`rounded-lg px-4 py-1.5 text-nav uppercase ${
          light ? "bg-gray-100 text-gray-800" : "bg-white/16 text-white"
        }`}
      >
        {i18n.resolvedLanguage}
      </span>
    </button>
  );
}
