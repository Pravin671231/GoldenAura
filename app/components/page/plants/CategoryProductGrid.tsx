"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import type { Plant } from "@/lib/types";

export type CategoryProductGridProps = {
  plants: Plant[];
};

export function CategoryProductGrid({ plants }: CategoryProductGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const slides = plants.map((plant) => ({
    src: "/placeholders/plant.svg",
    alt: `${plant.name} photo`,
  }));

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plants.map((plant, index) => (
          <ProductCard
            key={plant.id}
            name={plant.name}
            description={plant.description}
            imageAlt={`${plant.name} photo`}
            chips={[plant.careLight, plant.careWater]}
            priceLabel={`₹${plant.priceRange.min.toLocaleString("en-IN")} – ₹${plant.priceRange.max.toLocaleString("en-IN")}`}
            ctaHref="/contact"
            ctaLabel="Inquire"
            onImageClick={() => setLightboxIndex(index)}
          />
        ))}
      </div>
      <PhotoLightbox
        slides={slides}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
