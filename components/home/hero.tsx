import type { Dictionary } from "lib/i18n/dictionaries/vi";
import type { Locale } from "lib/i18n";
import Image from "next/image";
import Link from "next/link";

export function HeroSection({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative -mt-6 flex min-h-screen items-end overflow-hidden bg-neutral-900">
      <Image
        src="/images/3KG.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover md:hidden"
      />

      <video
        src="https://ik.imagekit.io/kdm4xasw6/hero-compressed.mp4?tr=w-1280,q-60,f-mp4"
        poster="/images/3KG.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-10">
        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
          {dict.hero.badge}
        </span>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
          {dict.hero.heading1} <br className="hidden md:block" />
          <span className="text-blue-400">{dict.hero.heading2}</span>
        </h1>

        <p className="mb-8 max-w-lg text-base text-white/100 md:text-lg">
          {dict.hero.subheading}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/${locale}/search`}
            className="group relative overflow-hidden rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white"
          >
            <span className="absolute -inset-x-2 -bottom-2 -top-12 translate-y-full rounded-t-[50%] bg-blue-800 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">{dict.hero.cta}</span>
          </Link>
          <a
            href="tel:+84865112161"
            className="group relative overflow-hidden rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm"
          >
            <span className="absolute -inset-x-2 -bottom-2 -top-12 translate-y-full rounded-t-[50%] bg-white/20 transition-transform duration-500 ease-out group-hover:translate-y-0" />
            <span className="relative">(+84) 903596900</span>
          </a>
        </div>
      </div>
    </section>
  );
}
