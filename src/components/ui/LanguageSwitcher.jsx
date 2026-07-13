import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const nextLang = i18n.resolvedLanguage === "en" ? "de" : "en";

  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(nextLang)}
      className="flex h-11 shrink-0 cursor-pointer items-center rounded-lg border border-white p-1 backdrop-blur-sm"
      aria-label={`Switch to ${nextLang === "en" ? "English" : "German"}`}
    >
      <span className="rounded-lg bg-white/16 px-4 py-1.5 text-nav uppercase text-white">
        {i18n.resolvedLanguage}
      </span>
    </button>
  );
}
