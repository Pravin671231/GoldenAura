import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { OfferStrip } from "@/components/ui/OfferStrip";
import { CategoryProductGrid } from "@/components/page/plants/CategoryProductGrid";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getPlantsByCategory } from "@/data/plants";

// Under output: 'export', dynamicParams defaults to true, which is an
// explicitly unsupported feature for static export — must be false so an
// unlisted slug 404s at request time instead of failing the build.
export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};

  return {
    title: `${category.name} — Golden Aura`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const plants = getPlantsByCategory(categorySlug);

  return (
    <Section>
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Plants", href: "/plants" },
            { label: category.name },
          ]}
        />
        <SectionHead
          as="h1"
          align="left"
          className="mt-4 max-w-none"
          eyebrow="Category"
          heading={category.name}
          intro={category.description}
        />

        <div className="mt-10">
          <CategoryProductGrid plants={plants} />
        </div>

        <div className="mt-10">
          <OfferStrip
            heading="Looking for something specific?"
            body="Call or WhatsApp us — we'll check live nursery stock for you."
            ctaLabel="Call Nursery"
            ctaHref="tel:+919876543210"
          />
        </div>
      </Container>
    </Section>
  );
}
