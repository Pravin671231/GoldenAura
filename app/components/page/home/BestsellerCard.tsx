import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { Plant } from "@/lib/types";

export type BestsellerCardProps = {
  plant: Plant;
};

export function BestsellerCard({ plant }: BestsellerCardProps) {
  return (
    <Card className="flex h-full flex-col gap-3 p-4">
      <PlaceholderImage alt={`${plant.name} photo`} className="aspect-square rounded-xl" />
      <h3 className="font-semibold">{plant.name}</h3>
      <div className="flex flex-wrap gap-2">
        <Chip>{plant.careLight}</Chip>
        <Chip>{plant.careWater}</Chip>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-semibold">
          ₹{plant.priceRange.min.toLocaleString("en-IN")} – ₹
          {plant.priceRange.max.toLocaleString("en-IN")}
        </span>
        <Button href={`/plants/${plant.categorySlug}`} variant="outline" size="sm">
          View
        </Button>
      </div>
    </Card>
  );
}
