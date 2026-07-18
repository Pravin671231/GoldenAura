"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Plants", href: "/plants" },
  { label: "Pots & Accessories", href: "/pots-accessories" },
  { label: "Services", href: "/services" },
  { label: "Care Guide", href: "/care-guide" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="relative border-b border-black/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold">
          Golden Aura
        </Link>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          data-state={isOpen ? "open" : "closed"}
          className={clsx(
            "absolute inset-x-0 top-full flex-col gap-1 border-t border-black/10 bg-background p-4",
            "xl:static xl:flex xl:flex-row xl:items-center xl:gap-1 xl:rounded-full xl:border-0 xl:bg-black/5 xl:p-1",
            isOpen ? "flex" : "hidden",
          )}
        >
          <ul className="flex flex-col gap-1 text-sm xl:flex-row xl:items-center xl:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-full px-4 py-2 hover:bg-black/5 hover:underline xl:hover:bg-transparent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" size="sm" className="hidden xl:inline-flex">
            Contact Us
          </Button>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-black/5 xl:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={clsx(
                  "absolute inset-x-0 top-0 h-0.5 bg-current transition-transform",
                  isOpen && "translate-y-1.75 rotate-45",
                )}
              />
              <span
                className={clsx(
                  "absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity",
                  isOpen && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform",
                  isOpen && "-translate-y-1.75 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
