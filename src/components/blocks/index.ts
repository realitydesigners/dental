// Schema imports
import { cta } from "./CtaBlock/schema";
import { faqAccordion } from "./FaqAccordianBlock/schema";
import { hero } from "./HeroBlock/schema";
import { imageLinkCards } from "./ImageCardBlock/schema";

// Component imports
import { CTABlock } from "./CtaBlock";
import { FaqAccordion } from "./FaqAccordianBlock";
import { HeroBlock } from "./HeroBlock";
import { ImageLinkCards } from "./ImageCardBlock";

export const BLOCK_COMPONENTS = {
  cta: CTABlock,
  faqAccordion: FaqAccordion,
  hero: HeroBlock,
  imageLinkCards: ImageLinkCards,
} as const;

// Export for Sanity Studio schema
export const pageBuilderBlocks = [hero, cta, faqAccordion, imageLinkCards];

export * from "./types";
