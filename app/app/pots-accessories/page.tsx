import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGroupSection } from "@/components/page/pots-accessories/ProductGroupSection";
import { PRODUCT_GROUPS, getProductsByGroup } from "@/data/pots-accessories";

export const metadata: Metadata = {
  title: "Pots & Accessories — Golden Aura",
  description:
    "Pots, planters, soil, fertilizers, gardening tools, and decorative accessories for every plant.",
};

export default function PotsAccessoriesPage() {
  return (
    <Section>
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pots & Accessories" }]} />
        <SectionHead
          as="h1"
          align="left"
          className="mt-4 max-w-none"
          eyebrow="Pots & Accessories"
          heading="Everything to Pot, Feed & Style Your Plants"
          intro="From terracotta classics to self-watering planters, plus the soil, feed and tools to keep everything thriving."
        />

        <div className="mt-10 flex flex-col gap-14">
          {PRODUCT_GROUPS.map((group) => (
            <ProductGroupSection
              key={group.slug}
              title={group.title}
              products={getProductsByGroup(group.slug)}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
