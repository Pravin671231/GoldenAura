import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
