import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { OfferStrip } from "@/components/ui/OfferStrip";
import { CATEGORIES } from "@/data/categories";

export const metadata: Metadata = {
  title: "Plant Catalog — Golden Aura",
  description:
    "Eight core plant collections, each hand-curated for a specific space and care level.",
};

export default function PlantsPage() {
  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Plants" }]} />
        <SectionHead
          as="h1"
          align="left"
          className="mt-4 max-w-none"
          eyebrow="Plant Catalog"
          heading="Explore Our Collections"
          intro="Eight core collections, each hand-curated for a specific space and care level. Tap a category to see plants, care needs and indicative pricing."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-10">
          <OfferStrip
            heading="Not sure what suits your space?"
            body="Send us a photo of your room or balcony on WhatsApp — we'll suggest the right plants."
            ctaLabel="WhatsApp Us"
            ctaHref="https://wa.me/919876543210"
            external
          />
        </div>
      </Container>
    </Section>
  );
}
