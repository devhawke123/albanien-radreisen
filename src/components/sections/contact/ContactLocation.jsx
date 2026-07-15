import { useTranslation } from "react-i18next";
import { contactMapImage } from "../../../assets/contactPage";

const ADDRESS = "ADA - Travel Agency Tarko Rr.Qemal Stafa P.17 Ap.1 AL-1005 Tirana, Albania";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export default function ContactLocation() {
  const { t } = useTranslation();

  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("contactPage.mapLabel")}
      className=""
    >
      <img src={contactMapImage} alt={t("contactPage.mapAlt")} className="h-full w-full object-cover py-0 md:py-5 lg:py-14" />
    </a>
  );
}
