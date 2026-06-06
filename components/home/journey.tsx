import { FadeUp } from "components/fade-up";
import type { Dictionary } from "lib/i18n/dictionaries/vi";
import type { AreaContent } from "lib/i18n/dictionaries/vi";
import type { Locale } from "lib/i18n";
import Link from "next/link";

type AreaKey = keyof AreaContent<unknown>;

const videoIds: Record<AreaKey, string> = {
  "may-rang": "FJwvpB-6aug",
  "bep-cong-nghiep": "ixybIRxMPIY",
  "noi-that": "rsGaTHOp-Mw",
};

export function JourneySection({
  area,
  dict,
  locale,
}: {
  area?: string;
  dict: Dictionary;
  locale: Locale;
}) {
  const key: AreaKey =
    area && area in videoIds ? (area as AreaKey) : "may-rang";
  const c = dict.journey[key];
  const videoId = videoIds[key] ?? videoIds["may-rang"]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-top gap-12 md:grid-cols-2">
        <FadeUp>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {c.label}
          </p>
          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl dark:text-white">
            {c.title}
          </h2>
          <p className="mb-8 text-neutral-600 dark:text-neutral-400">
            {c.body1}
          </p>
          <Link
            href={`/${locale}/search?area=${key}`}
            className="group relative inline-block overflow-hidden rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white"
          >
            <span className="absolute -inset-x-2 -bottom-2 -top-12 translate-y-full rounded-t-[50%] bg-blue-800 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">{dict.journey.viewProducts}</span>
          </Link>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={c.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
