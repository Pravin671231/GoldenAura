"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { FormStatus, type FormState } from "./FormStatus";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// TODO: replace with a real Web3Forms access key (NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) before launch.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "REPLACE_WITH_REAL_WEB3FORMS_ACCESS_KEY";

const SERVICE_OPTIONS = ["General Inquiry", "Plant Purchase", ...SERVICES.map((s) => s.name)];

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = getServiceBySlug(searchParams.get("service") ?? "");
  const [status, setStatus] = useState<FormState>("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: preselectedService?.name ?? "General Inquiry",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...values }),
      });
      const data = await response.json().catch(() => null);
      setStatus(response.ok && data?.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold">Send a Quote Request</h3>
        <p className="mt-1 text-sm text-black/70">
          We reply within one business day. Fields marked * are required.
        </p>
      </div>

      <FormStatus state={status} />

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          {...register("phone")}
        />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          {...register("email")}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium">
          I&apos;m interested in
        </label>
        <select
          id="service"
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          {...register("service")}
        >
          {SERVICE_OPTIONS.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message *
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us what you're looking for..."
          className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2"
          {...register("message")}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} block>
        Send Message
      </Button>
      <p className="text-xs text-black/60">
        Submits via a static form backend (Web3Forms) — no server involved. On error,
        you&apos;ll see fallback phone/WhatsApp options.
      </p>
    </form>
  );
}
