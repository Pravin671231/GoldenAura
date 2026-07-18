import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { OfferStrip } from "@/components/ui/OfferStrip";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { ScrollRow } from "@/components/ui/ScrollRow";
import { Button } from "@/components/ui/Button";
import { HeroFull } from "@/components/page/home/HeroFull";
import { BestsellersCarousel } from "@/components/page/home/BestsellersCarousel";
import { ServicesTeaser } from "@/components/page/home/ServicesTeaser";
import { TestimonialCard } from "@/components/page/home/TestimonialCard";
import { GalleryPreviewStrip } from "@/components/page/home/GalleryPreviewStrip";
import { getFeaturedCategories } from "@/data/categories";
import { getBestsellers } from "@/data/plants";
import { TESTIMONIALS } from "@/data/testimonials";
import { GALLERY_PHOTOS } from "@/data/gallery";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Home() {
  const featuredCategories = getFeaturedCategories();
  const bestsellers = getBestsellers();
  const previewPhotos = GALLERY_PHOTOS.slice(0, 4);

  return (
    <>
      <HeroFull />

      <Section className="py-8">
        <Container>
          <OfferStrip
            heading="🌸 Monsoon Special"
            body="Flat 15% off Flowering & Outdoor Plants — this week only."
            ctaLabel="Shop the Offer"
            ctaHref="/plants"
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead
            eyebrow="Shop by Category"
            heading="Find the Right Plant for Your Space"
            intro="From low-light apartment corners to sunny terrace gardens — explore our core collections."
          />
          <ScrollRow className="mt-8">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ScrollRow>
          <div className="mt-8 text-center">
            <Button href="/plants" variant="outline">
              View All Categories
            </Button>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="Customer Favorites" heading="Bestselling Plants This Month" />
          <div className="mt-8">
            <BestsellersCarousel plants={bestsellers} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="Beyond the Nursery" heading="Landscaping, Maintenance & More" />
          <div className="mt-8">
            <ServicesTeaser />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead
            eyebrow="What Customers Say"
            heading="Loved by Plant Parents Across the City"
          />
          <ScrollRow className="mt-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </ScrollRow>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="A Peek Inside" heading="Our Nursery & Recent Work" />
          <div className="mt-8">
            <GalleryPreviewStrip photos={previewPhotos} />
          </div>
          <div className="mt-8 text-center">
            <Button href="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-primary text-center text-white">
        <Container>
          <h2 className="text-3xl font-semibold sm:text-4xl">Ready to Green Up Your Space?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Visit our nursery or send us a message — we&apos;ll help you pick the right plants.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="accent">
              Contact Us
            </Button>
            <Button
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="border-white text-white"
            >
              WhatsApp Us
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
