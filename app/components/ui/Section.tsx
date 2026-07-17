import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, ...props }: SectionProps) {
  return <section className={clsx("py-12 sm:py-16", className)} {...props} />;
}
