import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type ChipProps = HTMLAttributes<HTMLSpanElement>;

export function Chip({ className, ...props }: ChipProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}
