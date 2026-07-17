import type { ReactNode } from "react";

export type AccordionItemProps = {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function AccordionItem({ question, children, defaultOpen }: AccordionItemProps) {
  return (
    <details
      className="rounded-xl border border-black/10 p-4 open:bg-black/[.02]"
      open={defaultOpen}
    >
      <summary className="cursor-pointer font-medium">{question}</summary>
      <div className="pt-2 text-sm text-black/70">{children}</div>
    </details>
  );
}

export type AccordionProps = {
  children: ReactNode;
};

export function Accordion({ children }: AccordionProps) {
  return <div className="flex flex-col gap-3">{children}</div>;
}
