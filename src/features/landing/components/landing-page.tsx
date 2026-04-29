"use client";

import { MarqueeDivider } from "@/components/common/marquee-divider";
import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { AboutSection } from "@/features/landing/components/about-section";
import { CharactersSection } from "@/features/landing/components/characters-section";
import { FinalCtaSection } from "@/features/landing/components/final-cta-section";
import { GallerySection } from "@/features/landing/components/gallery-section";
import { HeroSection } from "@/features/landing/components/hero-section";
import { ParallaxInterlude } from "@/features/landing/components/parallax-interlude";
import { QuotesSection } from "@/features/landing/components/quotes-section";
import { TrailerSection } from "@/features/landing/components/trailer-section";
import { UniverseSection } from "@/features/landing/components/universe-section";
import { useLenis } from "@/hooks/use-lenis";
import { contentService } from "@/services/content.service";

export function LandingPage(): React.JSX.Element {
  useLenis();

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Hero com video scroll-driven */}
        <HeroSection
          actions={contentService.getHeroActions()}
          quotes={contentService.getQuotes()}
        />

        {/* Marquee após o hero */}
        <MarqueeDivider text={contentService.getMarqueeText()} duration={26} />

        <AboutSection synopsis={contentService.getSynopsis()} />

        {/* Marquee invertido antes dos personagens */}
        <MarqueeDivider
          text={contentService.getMarqueeText()}
          duration={22}
          direction="right"
        />

        <CharactersSection characters={contentService.getCharacters()} />

        {/* Interlúdio parallax entre Personagens e Universo */}
        <ParallaxInterlude />

        <UniverseSection items={contentService.getUniverseItems()} />
        <QuotesSection quotes={contentService.getQuotes()} />
        <TrailerSection />
        <GallerySection images={contentService.getGalleryImages()} />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  );
}
