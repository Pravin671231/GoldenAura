import Link from "next/link";
import { SITE } from "@/lib/site-config";

const EXPLORE_LINKS = [
  { label: "Plant Catalog", href: "/plants" },
  { label: "Pots & Accessories", href: "/pots-accessories" },
  { label: "Services", href: "/services" },
  { label: "Care Guide", href: "/care-guide" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-lg font-semibold">{SITE.name}</h2>
          <p className="mt-2 text-sm text-black/60">{SITE.tagline}</p>
        </div>
        <nav aria-label="Explore">
          <h3 className="text-sm font-semibold">Explore</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-black/60">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-black/60">
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold">Visit Us</h3>
          <address className="mt-3 flex flex-col gap-1 text-sm text-black/60 not-italic">
            <span>{SITE.addressShort}</span>
            <span>{SITE.hoursShort}</span>
            <a href={`tel:${SITE.phone}`} className="hover:underline">
              {SITE.phoneDisplay}
            </a>
          </address>
        </div>
      </div>
      <div className="border-t border-black/10 px-4 py-4 text-center text-xs text-black/70 sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} Golden Aura. All rights reserved.
      </div>
    </footer>
  );
}
