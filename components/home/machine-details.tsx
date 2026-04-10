import Image from "next/image";

const content: Record<
  string,
  {
    label: string;
    title: string;
    images: [string, string, string, string];
    features: { title: string; description: string; icon: React.ReactNode }[];
  }
> = {
  "may-rang": {
    label: "Đặc điểm nổi bật",
    title: "Công nghệ rang chuyên sâu",
    images: [
      "/images/1.5KG.jpg",
      "/images/3KG_2.jpg",
      "/images/3KG_3.jpg",
      "/images/3KG.jpg",
    ],
    features: [
      {
        title: "Độ chính xác & Kiểm soát",
        description:
          "Cảm biến nhiệt độ kép theo dõi liên tục trong suốt chu trình rang — kiểm soát chính xác từng giai đoạn phản ứng.",
        icon: (
          <svg
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
          </svg>
        ),
      },

      {
        title: "Công suất 1.5–120 kg/mẻ",
        description:
          "Dải công suất linh hoạt phù hợp từ quán cà phê nhỏ đến nhà máy chế biến xuất khẩu — mở rộng quy mô mà không cần thay đổi quy trình.",
        icon: (
          <svg
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
          </svg>
        ),
      },
      {
        title: "Giao diện kỹ thuật trực quan",
        description:
          "Bảng điều khiển cảm ứng thông minh hiển thị biểu đồ nhiệt thời gian thực, cho phép bạn dễ dàng theo dõi, phân tích và can thiệp vào quá trình rang một cách mượt mà nhất",
        icon: (
          <svg
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
          </svg>
        ),
      },
      {
        title: "Hệ thống Afterburner",
        description:
          "Đốt cháy khói và chaff sau khi rang — giảm thiểu ô nhiễm, đáp ứng tiêu chuẩn môi trường và an toàn khu vực sản xuất.",
        icon: (
          <svg
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
          </svg>
        ),
      },
    ],
  },
  "bep-cong-nghiep": {
    label: "Đặc điểm nổi bật",
    title: "Giải pháp bếp hoàn chỉnh",
    images: [
      "/images/airlock1.png",
      "/images/airlock2.png",
      "/images/airlock3.png",
      "/images/airlock4.png",
    ],
    features: [
      {
        title: "Thiết kế layout theo yêu cầu",
        description:
          "Tư vấn và vẽ mặt bằng bếp tối ưu dựa trên không gian thực tế — giảm thiểu di chuyển, tăng hiệu suất vận hành.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
            />
          </svg>
        ),
      },
      {
        title: "Thiết bị inox chuyên dụng",
        description:
          "Toàn bộ thiết bị sử dụng inox 304 chuyên dùng cho thực phẩm — bền bỉ, dễ vệ sinh, đạt tiêu chuẩn an toàn thực phẩm quốc tế.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        ),
      },
      {
        title: "Lắp đặt hệ thống hút mùi & gas",
        description:
          "Thi công trọn gói đường gas, điện và hệ thống hút khói — đảm bảo an toàn, thông thoáng và đạt tiêu chuẩn PCCC.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>
        ),
      },
      {
        title: "Bảo hành & hỗ trợ kỹ thuật",
        description:
          "Đội ngũ kỹ thuật viên sẵn sàng hỗ trợ tận nơi, phụ tùng chính hãng — đảm bảo bếp hoạt động liên tục không gián đoạn.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.364 5.636a9 9 0 0 1 0 12.728m0 0-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 0 1 0 7.072m0 0-2.829-2.829-2.828 2.829m-4.243-4.243a9.001 9.001 0 0 0 0 12.728M12 12a3 3 0 1 1-3-3"
            />
          </svg>
        ),
      },
    ],
  },
  "noi-that": {
    label: "Đặc điểm nổi bật",
    title: "Nội thất tinh xảo, bền theo năm tháng",
    images: [
      "/images/airlock1.png",
      "/images/airlock2.png",
      "/images/airlock3.png",
      "/images/airlock4.png",
    ],
    features: [
      {
        title: "Vật liệu kép Gỗ – Thép",
        description:
          "Kết hợp độ bền vượt trội của thép hộp với vẻ đẹp ấm áp của gỗ tự nhiên — sản phẩm chắc chắn, có chiều sâu thẩm mỹ cao.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
            />
          </svg>
        ),
      },
      {
        title: "Sản xuất hoàn toàn theo yêu cầu",
        description:
          "Không có sản phẩm đại trà — mỗi đơn hàng được thiết kế riêng theo kích thước, màu sắc và phong cách của khách hàng.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        ),
      },
      {
        title: "Hoàn thiện bề mặt cao cấp",
        description:
          "Sơn tĩnh điện hoặc phủ PU bảo vệ toàn diện — kháng trầy xước, chống ẩm, giữ màu sắc bền đẹp theo thời gian.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
            />
          </svg>
        ),
      },
      {
        title: "Xưởng sản xuất tại Khánh Hòa",
        description:
          "Toàn bộ quy trình gia công và kiểm tra chất lượng diễn ra tại xưởng — kiểm soát chặt chẽ từng công đoạn, giao hàng đúng tiến độ.",
        icon: (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
            />
          </svg>
        ),
      },
    ],
  },
};

export function MachineDetails({ area }: { area?: string }) {
  const key = area && content[area] ? area : "may-rang";
  const c = content[key] ?? content["may-rang"]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Features list */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            {c.label}
          </p>
          <h2 className="mb-10 text-3xl font-bold text-black md:text-4xl dark:text-white">
            {c.title}
          </h2>
          <ul className="space-y-7">
            {c.features.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  {feature.icon}
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
        </div>

        {/* Mosaic image grid */}
        <div
          className="grid h-[480px] gap-2"
          style={{
            gridTemplateAreas: `"a b c" "d d c"`,
            gridTemplateColumns: "1fr 1.5fr 1.2fr",
            gridTemplateRows: "1.1fr 1fr",
          }}
        >
          {/* top-left: small */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ gridArea: "a" }}
          >
            <Image
              src={c.images[0]!}
              alt=""
              fill
              sizes="15vw"
              className="object-cover"
              style={{ objectPosition: "70% center" }}
            />
          </div>
          {/* top-center: medium */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ gridArea: "b" }}
          >
            <Image
              src={c.images[1]!}
              alt=""
              fill
              sizes="22vw"
              className="object-cover"
              style={{ objectPosition: "40% center" }}
            />
          </div>
          {/* right: tall portrait spanning both rows */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ gridArea: "c" }}
          >
            <Image
              src={c.images[2]!}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: "70% center" }}
            />
          </div>
          {/* bottom: wide spanning cols 1–2 */}
          <div
            className="relative overflow-hidden rounded-xl"
            style={{ gridArea: "d" }}
          >
            <Image
              src={c.images[3]!}
              alt=""
              fill
              sizes="37vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
