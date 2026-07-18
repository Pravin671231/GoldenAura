"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { BestsellerCard } from "@/components/page/home/BestsellerCard";
import type { Plant } from "@/lib/types";

export type BestsellersCarouselProps = {
  plants: Plant[];
};

export function BestsellersCarousel({ plants }: BestsellersCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Embla's scroll-boundary state only exists once the instance mounts, so
    // this one-time sync can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {plants.map((plant) => (
            <div
              key={plant.id}
              className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_23%]"
            >
              <BestsellerCard plant={plant} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous plant"
          disabled={!canScrollPrev}
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded-full border border-black/15 px-3 py-2 disabled:opacity-40"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next plant"
          disabled={!canScrollNext}
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full border border-black/15 px-3 py-2 disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}
