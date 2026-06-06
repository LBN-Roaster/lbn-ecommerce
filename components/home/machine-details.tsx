import { FadeUp } from "components/fade-up";
import type { Dictionary } from "lib/i18n/dictionaries/vi";
import Image from "next/image";

const imagesByArea: Record<string, [string, string, string, string]> = {
  "may-rang": [
    "/images/1.5KG.jpg",
    "/images/3KG_2.jpg",
    "/images/3KG_3.jpg",
    "/images/3KG.jpg",
  ],
  "bep-cong-nghiep": [
    "/images/kitchen_4.jpg",
    "/images/kitchen_1.jpg",
    "/images/kitchen_3.jpg",
    "/images/kitchen_2.jpg",
  ],
  "noi-that": [
    "/images/fur3.jpg",
    "/images/fur6.jpg",
    "/images/fur8.jpg",
    "/images/fur7.jpg",
  ],
};

const featureIcons = [
  <svg
    key="0"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
    />
  </svg>,
  <svg
    key="1"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
    />
  </svg>,
  <svg
    key="2"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>,
  <svg
    key="3"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>,
];

export function MachineDetails({
  area,
  dict,
}: {
  area?: string;
  dict: Dictionary;
}) {
  const key =
    area && dict.machineDetails[area as keyof typeof dict.machineDetails]
      ? area
      : "may-rang";
  const c =
    dict.machineDetails[key as keyof typeof dict.machineDetails] ??
    dict.machineDetails["may-rang"];
  const images = imagesByArea[key] ?? imagesByArea["may-rang"]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <FadeUp>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {c.label}
          </p>
          <h2 className="mb-10 text-3xl font-bold text-black md:text-4xl dark:text-white">
            {c.title}
          </h2>
          <ul className="space-y-7">
            {c.features.map((feature, i) => (
              <li key={feature.title} className="flex gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  {featureIcons[i % featureIcons.length]}
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-black dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            className="grid h-[480px] gap-2"
            style={{
              gridTemplateAreas: `"a b c" "d d c"`,
              gridTemplateColumns: "1fr 1.5fr 1.2fr",
              gridTemplateRows: "1.1fr 1fr",
            }}
          >
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ gridArea: "a" }}
            >
              <Image
                src={images[0]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "70% center" }}
              />
            </div>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ gridArea: "b" }}
            >
              <Image
                src={images[1]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "40% center" }}
              />
            </div>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ gridArea: "c" }}
            >
              <Image
                src={images[2]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "70% center" }}
              />
            </div>
            <div
              className="relative overflow-hidden rounded-xl"
              style={{ gridArea: "d" }}
            >
              <Image
                src={images[3]}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
