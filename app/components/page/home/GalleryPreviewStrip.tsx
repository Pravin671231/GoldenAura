import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { GalleryPhoto } from "@/lib/types";

export type GalleryPreviewStripProps = {
  photos: GalleryPhoto[];
};

export function GalleryPreviewStrip({ photos }: GalleryPreviewStripProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {photos.map((photo) => (
        <PlaceholderImage
          key={photo.id}
          alt={photo.alt}
          variant={photo.goldVariant ? "gold" : "default"}
          className="aspect-square rounded-xl"
        />
      ))}
    </div>
  );
}
