import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type ScrollRowProps = HTMLAttributes<HTMLDivElement>;

export function ScrollRow({ className, ...props }: ScrollRowProps) {
  return (
    <div
      className={clsx(
        "flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}
