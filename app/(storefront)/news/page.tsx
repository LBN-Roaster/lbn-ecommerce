import { getAllNewsPosts } from "lib/data/news";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Tin tức & Sự kiện – LBN",
  description: "Cập nhật tin tức và sự kiện mới nhất từ Công ty LBN.",
};

export default function NewsPage() {
  const posts = getAllNewsPosts();

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Tin tức & Sự kiện
          </p>
          <h1 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
            Cập nhật mới nhất
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/news/${post.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:border-blue-600 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950">
                    {post.tag}
                  </span>
                  <span className="text-xs text-neutral-400">{post.date}</span>
                </div>
                <h2 className="mb-2 font-semibold text-black group-hover:text-blue-600 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
