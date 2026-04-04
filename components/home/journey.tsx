export function JourneySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Hành trình cà phê
          </p>
          <h2 className="mb-6 text-3xl font-bold text-black md:text-4xl dark:text-white">
            Từ đam mê đến máy rang tinh xảo
          </h2>
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            Từ mong muốn có được những tách cà phê chất lượng, qua những bản
            phác thảo đến những chiếc máy rang chính xác — LBN tạo ra thiết bị
            đáp ứng tiêu chuẩn quốc tế với sự chú ý tỉ mỉ đến từng chi tiết.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400">
            Chúng tôi tự hào là đơn vị tiên phong trong sản xuất máy rang cà phê
            tại Khánh Hòa, kết hợp công nghệ hiện đại với kinh nghiệm thực tiễn
            để mang đến sản phẩm bền bỉ và hiệu quả.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="relative aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/FJwvpB-6aug"
              title="LBN máy rang cà phê"
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
