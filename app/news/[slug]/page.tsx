import Footer from "components/layout/footer";
import { getAllNewsSlugs, getNewsPost } from "lib/data/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = getNewsPost(slug);
    return { title: `${post.title} – LBN`, description: post.excerpt };
  } catch {
    return {};
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getNewsPost(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Back */}
        <Link
          href="/news"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black dark:hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Quay lại tin tức
        </Link>

        {/* Meta */}
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950">
            {post.tag}
          </span>
          <span className="text-xs text-neutral-400">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-3xl font-bold text-black md:text-4xl dark:text-white">
          {post.title}
        </h1>

        {/* Hero image */}
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Body */}
        <div
          className="prose prose-neutral max-w-none dark:prose-invert prose-img:rounded-xl prose-img:border prose-img:border-neutral-200 prose-headings:font-bold prose-a:text-blue-600"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <Footer />
    </>
  );
}
