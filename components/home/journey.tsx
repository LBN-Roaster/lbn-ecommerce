import { FadeUp } from "components/fade-up";
import type { Dictionary } from "lib/i18n/dictionaries/vi";

const videoIds: Record<string, string> = {
  "may-rang": "FJwvpB-6aug",
  "bep-cong-nghiep": "ixybIRxMPIY",
  "noi-that": "rsGaTHOp-Mw",
};

export function JourneySection({ area, dict }: { area?: string; dict: Dictionary }) {
  const key = area && dict.journey[area as keyof typeof dict.journey] ? area : "may-rang";
  const c = dict.journey[key as keyof typeof dict.journey] ?? dict.journey["may-rang"];
  const videoId = videoIds[key] ?? videoIds["may-rang"]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <FadeUp>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {c.label}
          </p>
          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl dark:text-white">
            {c.title}
          </h2>
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            {c.body1}
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">{c.body2}</p>
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
