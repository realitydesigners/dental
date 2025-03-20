// Schema imports
import { cta } from "./CtaBlock/schema";
import { faqAccordion } from "./FaqAccordianBlock/schema";
import { hero } from "./HeroBlock/schema";
import { imageLinkCards } from "./ImageCardBlock/schema";
import { productCatalog } from "./ProductCatalog/schema";

// Component imports
import { ProductCatalog } from "./ProductCatalog";
import { CTABlock } from "./CtaBlock";
import { FaqAccordion } from "./FaqAccordianBlock";
import { HeroBlock } from "./HeroBlock";
import { ImageLinkCards } from "./ImageCardBlock";

export const BLOCK_COMPONENTS = {
  cta: CTABlock,
  faqAccordion: FaqAccordion,
  hero: HeroBlock,
  imageLinkCards: ImageLinkCards,
  productCatalog: ProductCatalog,
} as const;

// Export for Sanity Studio schema
export const pageBuilderBlocks = [
  hero,
  cta,
  faqAccordion,
  imageLinkCards,
  productCatalog,
];

export * from "./types";
