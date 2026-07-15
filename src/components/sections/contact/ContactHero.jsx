import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { contactHeroImage } from "../../../assets/contactPage";

export default function ContactHero() {
  const { t } = useTranslation();

  return <PageHero image={contactHeroImage} title={t("contactPage.title")} body={t("contactPage.body")} />;
}
