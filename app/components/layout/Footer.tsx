import Link from "next/link";

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
          <h2 className="text-lg font-semibold">Golden Aura</h2>
          <p className="mt-2 text-sm text-black/60">
            Ornamental plants, pots, and gardening services for your home and garden.
          </p>
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
            <span>123 Nursery Road, Bengaluru, India</span>
            <span>Mon&ndash;Sun, 9:00 AM&ndash;7:00 PM</span>
            <a href="tel:+919876543210" className="hover:underline">
              +91 98765 43210
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
