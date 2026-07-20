import { ProductCard } from "@/components/ui/ProductCard";
import type { Plant } from "@/lib/types";

export type BestsellerCardProps = {
  plant: Plant;
};

export function BestsellerCard({ plant }: BestsellerCardProps) {
  return (
    <ProductCard
      name={plant.name}
      imageAlt={`${plant.name} photo`}
      chips={[plant.careLight, plant.careWater]}
      priceLabel={`₹${plant.priceRange.min.toLocaleString("en-IN")} – ₹${plant.priceRange.max.toLocaleString("en-IN")}`}
      ctaHref={`/plants/${plant.categorySlug}`}
      ctaLabel="View"
    />
  );
}
