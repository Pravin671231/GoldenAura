import { SITE } from "@/lib/site-config";

export function buildWhatsAppLink(message: string = SITE.whatsappDefaultMessage): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
