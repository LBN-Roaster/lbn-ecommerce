import Image from "next/image";

const posts = [
  {
    date: "Tháng 4, 2026",
    tag: "Sự kiện",
    title: "LBN tại Triển lãm Café Show Việt Nam 2026",
    excerpt:
      "LBN tham gia triển lãm quốc tế với dòng máy rang mới nhất, gặp gỡ các đối tác và khách hàng trong ngành cà phê.",
    image: "https://lbn.com.vn/wp-content/uploads/2025/09/1-12-scaled.jpg",
  },
  {
    date: "Tháng 3, 2026",
    tag: "Tin tức",
    title: "Ra mắt máy rang LBN 6kg thế hệ mới",
    excerpt:
      "Phiên bản nâng cấp với hệ thống điều khiển nhiệt độ chính xác cao, thiết kế hiện đại và tiết kiệm năng lượng hơn.",
    image:
      "https://lbn.com.vn/wp-content/uploads/2025/06/i25_07_27_1641-scaled.png",
  },
  {
    date: "Tháng 2, 2026",
    tag: "Hợp tác",
    title: "Hợp tác cùng chuỗi cà phê Highlands",
    excerpt:
      "LBN cung cấp giải pháp rang cà phê chuyên nghiệp cho hơn 20 chi nhánh tại khu vực miền Trung.",
    image: "/images/airlock1.png",
  },
];

export function NewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
          Tin tức & Sự kiện
        </p>
        <h2 className="text-3xl font-bold text-black md:text-4xl dark:text-white">
          Cập nhật mới nhất
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950">
                  {post.tag}
                </span>
                <span className="text-xs text-neutral-400">{post.date}</span>
              </div>
              <h3 className="mb-2 font-semibold text-black dark:text-white">
                {post.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
