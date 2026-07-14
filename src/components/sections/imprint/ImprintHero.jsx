import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { imprintHeroImage } from "../../../assets/imprintPage";

export default function ImprintHero() {
  const { t } = useTranslation();

  return <PageHero image={imprintHeroImage} title={t("imprintPage.title")} body={t("imprintPage.body")} />;
}
