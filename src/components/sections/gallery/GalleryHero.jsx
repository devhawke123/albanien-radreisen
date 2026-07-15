import { useTranslation } from "react-i18next";
import PageHero from "../../layout/PageHero";
import { galleryPageHero } from "../../../assets/galleryPage";

export default function GalleryHero() {
  const { t } = useTranslation();

  return (
    <PageHero
      image={galleryPageHero}
      title={t("galleryPage.title")}
      body={t("galleryPage.body")}
      overlayClassName="bg-black/20"
    />
  );
}
