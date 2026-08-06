import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { teamHeroImage } from "../../../assets/teamPage";

export default function TeamHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image={teamHeroImage}
      title={t("teamPage.title")}
      body={t("teamPage.body")}
      overlayClassName="bg-black/24"
    />
  );
}
