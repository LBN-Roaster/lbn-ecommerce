"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, GripVertical, ImagePlus } from "lucide-react";

interface ImageManagerProps {
  name: string;
  defaultValue?: string[];
}

export function ImageManager({ name, defaultValue = [] }: ImageManagerProps) {
  const [images, setImages] = useState<string[]>(defaultValue);
  const [inputUrl, setInputUrl] = useState("");
  const dragIdx = useRef<number | null>(null);

  function addUrl() {
    const url = inputUrl.trim();
    if (!url) return;
    setImages((prev) => [...prev, url]);
    setInputUrl("");
  }

  function remove(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleDragStart(idx: number) {
    dragIdx.current = idx;
  }

  function handleDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    if (dragIdx.current === null || dragIdx.current === idx) return;
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(dragIdx.current!, 1);
      next.splice(idx, 0, item!);
      dragIdx.current = idx;
      return next;
    });
  }

  function handleDragEnd() {
    dragIdx.current = null;
  }

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name={name} value={images.join("\n")} />

      {images.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className={`group relative overflow-hidden rounded-md border border-border bg-muted ${i === 0 ? "col-span-2 row-span-2" : ""} aspect-square cursor-grab active:cursor-grabbing`}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
            >
              <img
                src={url}
                alt={`Product image ${i + 1}`}
                className="block h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-end bg-black/0 p-1.5 transition-colors group-hover:bg-black/15">
                <button
                  type="button"
                  className="grid h-6 w-6 place-items-center rounded-full bg-white/90 text-muted-foreground opacity-0 shadow-sm transition-opacity hover:text-destructive group-hover:opacity-100"
                  onClick={() => remove(i)}
                  title="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-white/90 px-1.5 py-px text-[10px] font-semibold uppercase text-muted-foreground shadow-sm">
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute left-1.5 top-1.5 grid h-5 w-5 place-items-center rounded bg-white/90 text-muted-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                <GripVertical className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-3 rounded-md border-2 border-dashed border-border p-5 transition-colors hover:border-primary/50">
        <div className="flex flex-col items-center gap-2 text-center">
          <ImagePlus className="h-8 w-8 text-muted-foreground" />
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-muted-foreground">
              Add image URL
            </span>
            <span className="text-[11.5px] text-muted-foreground">
              Paste a URL and press Enter or click Add
            </span>
          </div>
        </div>
        <div className="flex w-full max-w-[420px] gap-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
            className="text-[12.5px]"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addUrl}
            disabled={!inputUrl.trim()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
