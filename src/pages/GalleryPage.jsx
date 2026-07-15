import GalleryHero from "../components/sections/gallery/GalleryHero";
import GalleryLibrary from "../components/sections/gallery/GalleryLibrary";
import PageFooter from "../components/layout/PageFooter";

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryLibrary />
      <PageFooter />
    </>
  );
}
