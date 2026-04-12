"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  {
    src: "https://drive.google.com/uc?export=view&id=1iGvspqa6cTe9hdoLdglRoPe75jr1tUrk",
    alt: "Máy rang cà phê LBN",
  },
  { src: "/images/1.5KG.png", alt: "Máy rang cà phê LBN" },
  { src: "/images/6KG.png", alt: "Máy rang cà phê LBN" },
  { src: "/images/3KG.jpg", alt: "Máy rang cà phê LBN" },
  { src: "/images/1.5KG.jpg", alt: "Máy rang cà phê LBN" },
];

export function GallerySection() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(
    null,
  );

  return (
    <section className="bg-neutral-50 py-20 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Thư viện ảnh
          </p>
          <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
            Hình ảnh sản phẩm
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {images.map((img) => (
            <button
              key={img.src}
              onClick={() => setActive(img)}
              className="relative aspect-square overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1200}
              height={900}
              className="max-h-[90vh] w-auto rounded-xl object-contain shadow-2xl"
            />
            <button
              onClick={() => setActive(null)}
              className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:bg-neutral-200"
              aria-label="Đóng"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
