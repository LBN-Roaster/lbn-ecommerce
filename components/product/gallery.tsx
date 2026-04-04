"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const imageIndex = searchParams.has("image")
    ? parseInt(searchParams.get("image")!)
    : 0;

  const updateImage = (index: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  return (
    <form>
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        {images[imageIndex] && (
          <Image
            className="h-full w-full object-contain p-6 transition duration-300"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={images[imageIndex]?.altText as string}
            src={images[imageIndex]?.src as string}
            priority={true}
          />
        )}

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="flex h-10 items-center gap-1 rounded-full border border-neutral-200 bg-white/90 px-2 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/90">
              <button
                formAction={() => updateImage(previousImageIndex.toString())}
                aria-label="Previous product image"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <span className="text-xs text-neutral-400">
                {imageIndex + 1} / {images.length}
              </span>
              <button
                formAction={() => updateImage(nextImageIndex.toString())}
                aria-label="Next product image"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {images.map((image, index) => {
            const isActive = index === imageIndex;
            return (
              <li key={image.src}>
                <button
                  formAction={() => updateImage(index.toString())}
                  aria-label="Select product image"
                  className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 bg-neutral-50 transition dark:bg-neutral-900 ${
                    isActive
                      ? "border-blue-600"
                      : "border-neutral-200 hover:border-neutral-400 dark:border-neutral-700"
                  }`}
                >
                  <Image
                    alt={image.altText}
                    src={image.src}
                    fill
                    className="object-contain p-1.5"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
}
