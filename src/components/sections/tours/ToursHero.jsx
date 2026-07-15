import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { featuredSlideHero } from "../../../assets/tours";

export default function ToursHero() {
  const { t } = useTranslation();

  return <PageHero image={featuredSlideHero} title={t("toursPage.title")} body={t("toursPage.body")} />;
}
