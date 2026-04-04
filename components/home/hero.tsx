import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-neutral-900">
      {/* Background image */}
      <Image
        src="https://lbn.com.vn/wp-content/uploads/2025/09/1-12-scaled.jpg"
        alt="LBN máy rang cà phê"
        fill
        className="object-cover"
        priority
      />

      {/* Gradient: transparent top → dark bottom so text pops */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content anchored to bottom-left */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-10">
        {/* Badge */}
        <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
          Công ty CP SX – TM – DV LBN · Khánh Hòa
        </span>

        <h1 className="mb-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
          Sản Xuất & Thương Mại <br className="hidden md:block" />
          <span className="text-blue-400">Chất Lượng Cao</span>
        </h1>

        <p className="mb-8 max-w-lg text-base text-white/70 md:text-lg">
          Máy rang cà phê, nội thất gỗ – thép & bếp công nghiệp —
          sản xuất tại Khánh Hòa, đạt tiêu chuẩn quốc tế.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/search"
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Xem sản phẩm
          </Link>
          <a
            href="tel:+84865112161"
            className="rounded-lg border border-white/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            (+84) 0865.112.161
          </a>
        </div>
      </div>
    </section>
  );
}
