import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { teamPhoto } from "../../../assets/aboutPage";

export default function TeamHero() {
  const { t } = useTranslation();

  return <PageHero image={teamPhoto} title={t("teamPage.title")} body={t("teamPage.body")} />;
}
