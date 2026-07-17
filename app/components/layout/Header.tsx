import Link from "next/link";
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
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold">
          Golden Aura
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="/contact" size="sm">
          Contact Us
        </Button>
      </div>
    </header>
  );
}
