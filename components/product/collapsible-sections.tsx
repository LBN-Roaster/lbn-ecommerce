"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function parseHtmlSections(html: string): { title: string; content: string }[] {
  const parts = html.split(/<h2[^>]*>/i);
  const sections: { title: string; content: string }[] = [];

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]!;
    const closingIndex = part.indexOf("</h2>");
    if (closingIndex === -1) continue;
    const title = part
      .slice(0, closingIndex)
      .replace(/<[^>]+>/g, "")
      .trim();
    const content = part.slice(closingIndex + 5).trim();
    sections.push({ title, content });
  }

  return sections;
}

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <button
        className="flex w-full items-center justify-between p-6 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-bold uppercase tracking-wider">
          {title}
        </span>
        {open ? (
          <MinusIcon className="h-4 w-4 shrink-0" />
        ) : (
          <PlusIcon className="h-4 w-4 shrink-0" />
        )}
      </button>
      {open && (
        <div
          className="prose prose-sm px-6 pb-6 dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}

export function CollapsibleSections({ html }: { html: string }) {
  const sections = parseHtmlSections(html);

  if (!sections.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {sections.map((section) => (
        <AccordionItem
          key={section.title}
          title={section.title}
          content={section.content}
        />
      ))}
    </div>
  );
}
