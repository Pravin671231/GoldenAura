import type { ElementType } from "react";
import clsx from "clsx";

export type SectionHeadProps = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHead({
  eyebrow,
  heading,
  intro,
  as = "h2",
  align = "center",
  className,
}: SectionHeadProps) {
  const Heading = as as ElementType;

  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          {eyebrow}
        </span>
      )}
      <Heading className="mt-2 text-3xl font-semibold sm:text-4xl">{heading}</Heading>
      {intro && <p className="mt-3 text-black/70">{intro}</p>}
    </div>
  );
}
