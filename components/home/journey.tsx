const content: Record<
  string,
  {
    label: string;
    title: string;
    body1: string;
    body2: string;
    videoId: string;
    videoTitle: string;
  }
> = {
  "may-rang": {
    label: "Hành trình cà phê",
    title: "Từ đam mê đến máy rang tinh xảo",
    body1:
      "Từ mong muốn có được những tách cà phê chất lượng, qua những bản phác thảo đến những chiếc máy rang chính xác — LBN tạo ra thiết bị đáp ứng tiêu chuẩn quốc tế với sự chú ý tỉ mỉ đến từng chi tiết.",
    body2:
      "Chúng tôi tự hào là đơn vị tiên phong trong sản xuất máy rang cà phê tại Khánh Hòa, kết hợp công nghệ hiện đại với kinh nghiệm thực tiễn để mang đến sản phẩm bền bỉ và hiệu quả.",
    videoId: "FJwvpB-6aug",
    videoTitle: "LBN máy rang cà phê",
  },
  "bep-cong-nghiep": {
    label: "Bếp công nghiệp",
    title: "Giải pháp bếp công nghiệp toàn diện",
    body1:
      "LBN thiết kế và thi công hệ thống bếp công nghiệp cho nhà hàng, khách sạn, trường học và bếp ăn tập thể — đảm bảo an toàn, hiệu suất cao và phù hợp với từng không gian.",
    body2:
      "Với đội ngũ kỹ thuật giàu kinh nghiệm, chúng tôi tư vấn và lắp đặt trọn gói từ thiết bị đến hệ thống hút mùi, đường gas và điện — giúp khách hàng vận hành bếp ngay lập tức.",
    videoId: "ixybIRxMPIY",
    videoTitle: "LBN bếp công nghiệp",
  },
  "noi-that": {
    label: "Nội thất gỗ – thép",
    title: "Nội thất theo yêu cầu, bền bỉ và thẩm mỹ",
    body1:
      "LBN sản xuất nội thất kết hợp gỗ tự nhiên và thép kỹ thuật theo yêu cầu riêng của từng khách hàng — từ bàn ghế văn phòng, kệ tủ đến nội thất thương mại cao cấp.",
    body2:
      "Mỗi sản phẩm được gia công tỉ mỉ tại xưởng Khánh Hòa, kiểm tra chất lượng nghiêm ngặt trước khi bàn giao — đảm bảo độ bền và tính thẩm mỹ lâu dài.",
    videoId: "rsGaTHOp-Mw",
    videoTitle: "LBN nội thất gỗ thép",
  },
};

export function JourneySection({ area }: { area?: string }) {
  const key = area && content[area] ? area : "may-rang";
  const c = content[key] ?? content["may-rang"]!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
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
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${c.videoId}`}
              title={c.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
