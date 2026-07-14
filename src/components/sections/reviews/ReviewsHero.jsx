import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { reviewsHeroImage } from "../../../assets/reviewsPage";

export default function ReviewsHero() {
  const { t } = useTranslation();

  return <PageHero image={reviewsHeroImage} title={t("reviewsPage.title")} body={t("reviewsPage.body")} />;
}
