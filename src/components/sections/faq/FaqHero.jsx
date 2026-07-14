import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { faqHeroImage } from "../../../assets/faqPage";

export default function FaqHero() {
  const { t } = useTranslation();

  return <PageHero image={faqHeroImage} title={t("faqPage.title")} body={t("faqPage.body")} />;
}
