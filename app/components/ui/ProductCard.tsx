import { Card } from "@/components/ui/Card";
import { ChipRow } from "@/components/ui/ChipRow";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export type ProductCardProps = {
  name: string;
  description?: string;
  imageAlt: string;
  chips?: string[];
  priceLabel: string;
  ctaHref: string;
  ctaLabel: string;
  onImageClick?: () => void;
};

export function ProductCard({
  name,
  description,
  imageAlt,
  chips,
  priceLabel,
  ctaHref,
  ctaLabel,
  onImageClick,
}: ProductCardProps) {
  const image = <PlaceholderImage alt={imageAlt} className="aspect-square rounded-xl" />;

  return (
    <Card className="flex h-full flex-col gap-3 p-4">
      {onImageClick ? (
        <button
          type="button"
          onClick={onImageClick}
          aria-label={`View ${imageAlt} full-size`}
          className="text-left"
        >
          {image}
        </button>
      ) : (
        image
      )}
      <h3 className="font-semibold">{name}</h3>
      {description && <p className="text-sm text-black/70">{description}</p>}
      {chips && <ChipRow chips={chips} />}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span className="font-semibold">{priceLabel}</span>
        <Button href={ctaHref} variant="outline" size="sm">
          {ctaLabel}
        </Button>
      </div>
    </Card>
  );
}
