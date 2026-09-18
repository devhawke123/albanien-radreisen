import image2 from "./image (2).webp";
import image3 from "./image (3).webp";
import image4 from "./image (4).webp";
import image5 from "./image (5).webp";
import image6 from "./image (6).webp";
import image7 from "./image (7).webp";
import image8 from "./image (8).webp";
import heroSectionPic2 from "./HeroSectionPic2.webp";
import heroSectionPic3 from "./HeroSectionPic3.webp";
import vjosaBridgeGroup from "./vjosaValley/Picture2.webp";
import vjosaOhridOverlook from "./vjosaValley/Picture3.webp";
import vjosaRoadsideChat from "./vjosaValley/Picture4.webp";
import vjosaHikingBreak from "./vjosaValley/Picture5.webp";
import vjosaAlbanianFlag from "./vjosaValley/Picture6.webp";
import vjosaSkadarLake from "./vjosaValley/Picture7.webp";
import vjosaWaterfallOne from "./vjosaValley/Picture8.webp";
import vjosaWaterfallTwo from "./vjosaValley/Picture9.webp";
import ebikeLakesideStop from "./eBike/Picture10.webp";
import ebikeGroupBanner from "./eBike/Picture11.webp";
import ebikeLakesideRide from "./eBike/Picture12.webp";
import ebikeRivieraBikes from "./eBike/Picture14.webp";
import ebikeRivieraBriefing from "./eBike/Picture15.webp";
import ebikeMainImage from "./eBike/mainImage.webp";
import montenegroBannerGroup from "./montenegro/MainImage.webp";
import montenegroFerryDock from "./montenegro/Picture16.webp";
import montenegroFerryCrossing from "./montenegro/Picture17.webp";
import montenegroMountainBreak from "./montenegro/Picture18.webp";
import montenegroFlagOverlook from "./montenegro/Picture19.webp";
import montenegroWinterHike from "./montenegro/Picture20.webp";
import montenegroFerryDeck from "./montenegro/Picture21.webp";
import westBalkansMainImage from "./westBalkans/MainImage.webp";
import regularBikeMainImage from "./regularBike/Picture3.webp";

export {
  vjosaBridgeGroup,
  vjosaOhridOverlook,
  vjosaHikingBreak,
  ebikeMainImage,
  montenegroBannerGroup,
  montenegroFerryCrossing,
  montenegroWinterHike,
  westBalkansMainImage,
  regularBikeMainImage,
};

export const vjosaValleyPhotos = [
  vjosaRoadsideChat,
  vjosaOhridOverlook,
  vjosaSkadarLake,
  vjosaBridgeGroup,
  vjosaAlbanianFlag,
  vjosaWaterfallTwo,
  vjosaHikingBreak,
  vjosaWaterfallOne,
];

export const ebikeTourPhotos = [
  ebikeMainImage,
  ebikeRivieraBikes,
  ebikeRivieraBriefing,
  ebikeLakesideRide,
  ebikeLakesideStop,
  ebikeGroupBanner,
];

export const montenegroTourPhotos = [
  montenegroBannerGroup,
  montenegroFerryCrossing,
  montenegroWinterHike,
  montenegroFlagOverlook,
  montenegroMountainBreak,
  montenegroFerryDock,
  montenegroFerryDeck,
];

export const galleryImages = [
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  heroSectionPic2,
  heroSectionPic3,
  ...vjosaValleyPhotos,
  ...ebikeTourPhotos,
  ...montenegroTourPhotos,
  westBalkansMainImage,
  regularBikeMainImage,
];

export const tourDetailPhotos = [image2, image3, image4, image5, image6, image7];
