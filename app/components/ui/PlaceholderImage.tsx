import Image from "next/image";
import clsx from "clsx";

export type PlaceholderImageProps = {
  alt: string;
  variant?: "default" | "gold";
  className?: string;
};

export function PlaceholderImage({ alt, variant = "default", className }: PlaceholderImageProps) {
  return (
    <div className={clsx("relative overflow-hidden bg-black/5", className)}>
      <Image
        src="/placeholders/plant.svg"
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, 50vw"
        className="object-cover"
        loading="lazy"
      />
      {variant === "gold" && <div aria-hidden="true" className="absolute inset-0 bg-accent/15" />}
    </div>
  );
}
