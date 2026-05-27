"use client";

import { useRef, useState } from "react";

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
    <div className="img-manager">
      <input type="hidden" name={name} value={images.join("\n")} />

      {images.length > 0 ? (
        <div className="img-grid">
          {images.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className={"img-grid-item" + (i === 0 ? " featured" : "")}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
            >
              <img src={url} alt={`Product image ${i + 1}`} />
              <div className="img-grid-overlay">
                <button
                  type="button"
                  className="img-remove-btn"
                  onClick={() => remove(i)}
                  title="Remove image"
                >
                  <svg
                    viewBox="0 0 16 16"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                  </svg>
                </button>
                {i === 0 && (
                  <span className="img-featured-badge">Featured</span>
                )}
              </div>
              <div className="img-drag-handle">
                <svg
                  viewBox="0 0 16 16"
                  width="12"
                  height="12"
                  fill="currentColor"
                >
                  <circle cx="5" cy="4" r="1" />
                  <circle cx="11" cy="4" r="1" />
                  <circle cx="5" cy="8" r="1" />
                  <circle cx="11" cy="8" r="1" />
                  <circle cx="5" cy="12" r="1" />
                  <circle cx="11" cy="12" r="1" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="img-add-area">
        <div className="img-add-zone">
          <svg
            className="img-add-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="9" cy="9" r="2" />
            <path d="M3 16l5-5 4 4 3-3 6 6v2a3 3 0 01-3 3H6a3 3 0 01-3-3v-4z" />
          </svg>
          <div className="img-add-text">
            <span className="img-add-title">Add image URL</span>
            <span className="img-add-hint">
              Paste a URL and press Enter or click Add
            </span>
          </div>
        </div>
        <div className="img-url-row">
          <input
            type="text"
            className="form-input"
            placeholder="https://example.com/image.jpg"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
          />
          <button
            type="button"
            className="btn"
            onClick={addUrl}
            disabled={!inputUrl.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
