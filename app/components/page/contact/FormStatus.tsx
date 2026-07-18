import { SITE } from "@/lib/site-config";

export type FormState = "idle" | "submitting" | "success" | "error";

export type FormStatusProps = {
  state: FormState;
};

export function FormStatus({ state }: FormStatusProps) {
  if (state === "idle") return null;

  if (state === "submitting") {
    return (
      <p role="status" className="rounded-xl bg-black/5 px-4 py-3 text-sm">
        Sending your message…
      </p>
    );
  }

  if (state === "success") {
    return (
      <p role="status" className="rounded-xl bg-primary/10 px-4 py-3 text-sm text-primary">
        ✓ Thanks! We&apos;ve received your message and will reply within a business day.
      </p>
    );
  }

  return (
    <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
      <p>✕ Something went wrong. Please try again, or reach us directly:</p>
      <p className="mt-2 flex flex-wrap gap-x-4">
        <a href={`tel:${SITE.phone}`} className="font-semibold hover:underline">
          Call {SITE.phoneDisplay}
        </a>
        <a
          href={`https://wa.me/${SITE.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          WhatsApp us
        </a>
      </p>
    </div>
  );
}
