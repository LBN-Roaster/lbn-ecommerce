"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-grid h-7 w-7 place-items-center rounded text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        active && "bg-foreground text-background",
      )}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Write a description...",
}: RichTextEditorProps) {
  const [html, setHtml] = useState(defaultValue);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "rte-content px-3 py-2.5 min-h-[120px] text-[13.5px] leading-relaxed outline-none text-foreground",
      },
    },
    onUpdate: ({ editor: e }) => {
      setHtml(e.getHTML());
    },
  });

  function addLink() {
    if (!editor) return;
    const url = window.prompt("URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-md border border-input shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring">
      <div className="flex items-center gap-0.5 border-b border-border bg-muted px-1.5 py-1">
        <ToolbarButton
          active={editor?.isActive("bold")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("italic")}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <em>I</em>
        </ToolbarButton>
        <div className="mx-1 h-[18px] w-px bg-border" />
        <ToolbarButton
          active={editor?.isActive("bulletList")}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          title="Bullet list"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <circle cx="2" cy="4" r="1.5" />
            <circle cx="2" cy="8" r="1.5" />
            <circle cx="2" cy="12" r="1.5" />
            <rect x="5" y="3" width="10" height="2" rx="0.5" />
            <rect x="5" y="7" width="10" height="2" rx="0.5" />
            <rect x="5" y="11" width="10" height="2" rx="0.5" />
          </svg>
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("orderedList")}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          title="Numbered list"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <text x="0" y="5.5" fontSize="5" fontWeight="600">
              1
            </text>
            <text x="0" y="9.5" fontSize="5" fontWeight="600">
              2
            </text>
            <text x="0" y="13.5" fontSize="5" fontWeight="600">
              3
            </text>
            <rect x="5" y="3" width="10" height="2" rx="0.5" />
            <rect x="5" y="7" width="10" height="2" rx="0.5" />
            <rect x="5" y="11" width="10" height="2" rx="0.5" />
          </svg>
        </ToolbarButton>
        <div className="mx-1 h-[18px] w-px bg-border" />
        <ToolbarButton
          active={editor?.isActive("link")}
          onClick={addLink}
          title="Add link"
        >
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M6.5 9.5a3 3 0 004 .5l2-2a3 3 0 00-4.24-4.24L7 5"
              strokeLinecap="round"
            />
            <path
              d="M9.5 6.5a3 3 0 00-4-.5l-2 2a3 3 0 004.24 4.24L9 11"
              strokeLinecap="round"
            />
          </svg>
        </ToolbarButton>
        <div className="mx-1 h-[18px] w-px bg-border" />
        <ToolbarButton
          active={editor?.isActive("heading", { level: 2 })}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading"
        >
          H
        </ToolbarButton>
        <ToolbarButton
          active={editor?.isActive("blockquote")}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          title="Quote"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M3 4h2a2 2 0 012 2v1a2 2 0 01-2 2H4a1 1 0 00-1 1v1h3v1H2v-2a3 3 0 013-3 1 1 0 001-1V6a1 1 0 00-1-1H3V4zm6 0h2a2 2 0 012 2v1a2 2 0 01-2 2h-1a1 1 0 00-1 1v1h3v1H8v-2a3 3 0 013-3 1 1 0 001-1V6a1 1 0 00-1-1H9V4z" />
          </svg>
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
