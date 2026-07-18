import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "accent" | "outline";
type Size = "md" | "sm";

const variantClasses: Record<Variant, string> = {
  primary: "bg-emerald-700 text-white hover:bg-emerald-800",
  accent: "bg-amber-700 text-white hover:bg-amber-800",
  outline: "border border-current bg-transparent hover:bg-black/5",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-1.5 text-xs",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
    variantClasses[variant],
    sizeClasses[size],
    block && "w-full",
    className,
  );

  if (props.href !== undefined) {
    return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)} />;
  }

  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)} />;
}
