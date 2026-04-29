import {
  characters,
  galleryImages,
  heroActions,
  marqueeText,
  quotes,
  synopsis,
  universeItems
} from "@/features/landing/data";

export const contentService = {
  getHeroActions: () => heroActions,
  getSynopsis: () => synopsis,
  getCharacters: () => characters,
  getUniverseItems: () => universeItems,
  getGalleryImages: () => galleryImages,
  getQuotes: () => quotes,
  getMarqueeText: () => marqueeText
};
