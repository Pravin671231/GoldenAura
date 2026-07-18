import { SITE } from "@/lib/site-config";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ITEMS = [
  { icon: "📍", label: "Address", content: SITE.addressDisplay },
  { icon: "📞", label: "Phone", href: `tel:${SITE.phone}`, content: SITE.phoneDisplay },
  {
    icon: "💬",
    label: "WhatsApp",
    href: buildWhatsAppLink(),
    content: "Chat with us",
    external: true,
  },
] as const;

export function InfoList() {
  return (
    <ul className="flex flex-col gap-4">
      {ITEMS.map((item) => (
        <li key={item.label} className="flex items-start gap-3">
          <span aria-hidden="true" className="text-xl">
            {item.icon}
          </span>
          <div>
            <p className="font-semibold">{item.label}</p>
            <p className="text-black/70">
              {"href" in item ? (
                <a
                  href={item.href}
                  className="hover:underline"
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.content}
                </a>
              ) : (
                item.content
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
