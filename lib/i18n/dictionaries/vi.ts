export type FeatureItem = { title: string; description: string };

export type AreaContent<T> = {
  "may-rang": T;
  "bep-cong-nghiep": T;
  "noi-that": T;
};

export interface Dictionary {
  nav: {
    home: string;
    products: string;
    coffeeRoasters: string;
    furniture: string;
    furnitureFull: string;
    industrialKitchen: string;
    news: string;
    contact: string;
  };
  footer: {
    links: string;
    contact: string;
    address: string;
    companyDescription: string;
  };
  hero: {
    badge: string;
    heading1: string;
    heading2: string;
    subheading: string;
    cta: string;
  };
  businessAreas: {
    label: string;
    heading: string;
    areas: AreaContent<{ title: string; description: string }>;
  };
  journey: AreaContent<{
    label: string;
    title: string;
    body1: string;
    body2: string;
    videoTitle: string;
  }>;
  machineDetails: AreaContent<{
    label: string;
    title: string;
    features: FeatureItem[];
  }>;
  featuredProducts: {
    label: string;
    heading: string;
    viewDetails: string;
    viewAll: string;
    contactPrice: string;
  };
  newsSection: {
    label: string;
    heading: string;
    viewAll: string;
  };
  gallery: {
    label: string;
    heading: string;
    imageAlt: string;
    close: string;
  };
  product: {
    contactQuote: string;
    contactPrice: string;
    contactBadge: string;
    relatedProducts: string;
  };
  search: {
    sortBy: string;
    collections: string;
    noProducts: string;
    showing: string;
    results: string;
    result: string;
    for: string;
    noCollection: string;
  };
  sorting: {
    relevance: string;
    trending: string;
    latest: string;
    priceAsc: string;
    priceDesc: string;
  };
  newsPage: {
    title: string;
    description: string;
    label: string;
    heading: string;
    backToNews: string;
  };
  welcome: {
    title: string;
    description: string;
    learnMore: string;
  };
  metadata: {
    homeTitle: string;
    homeDescription: string;
  };
}

const vi: Dictionary = {
  nav: {
    home: "Trang chủ",
    products: "Sản phẩm",
    coffeeRoasters: "Máy rang cà phê",
    furniture: "Nội thất",
    furnitureFull: "Nội thất gỗ – thép",
    industrialKitchen: "Bếp công nghiệp",
    news: "Tin tức",
    contact: "Liên hệ",
  },
  footer: {
    links: "Liên kết",
    contact: "Liên hệ",
    address: "Lô 24 CCN Diên Phú, xã Diên Điền, Khánh Hòa",
    companyDescription:
      "Công ty Cổ phần Sản xuất – Thương mại – Dịch vụ LBN. Chuyên sản xuất máy rang cà phê và thiết bị công nghiệp tại Khánh Hòa.",
  },
  hero: {
    badge: "Công ty CP SX – TM – DV LBN · Khánh Hòa",
    heading1: "Sản Xuất & Thương Mại",
    heading2: "Chất Lượng Cao",
    subheading:
      "Máy rang cà phê, nội thất gỗ – thép & bếp công nghiệp — sản xuất tại Khánh Hòa, đạt tiêu chuẩn quốc tế.",
    cta: "Xem sản phẩm",
  },
  businessAreas: {
    label: "Lĩnh vực kinh doanh",
    heading: "Chúng tôi cung cấp gì?",
    areas: {
      "may-rang": {
        title: "Máy Rang Cà Phê",
        description:
          "Máy rang chuyên nghiệp 6–60kg với hệ thống điều khiển nhiệt độ chính xác, cho ra mẻ rang đồng đều, ổn định.",
      },
      "noi-that": {
        title: "Nội Thất Gỗ – Thép",
        description:
          "Sản xuất nội thất kết hợp gỗ và thép theo yêu cầu — bền bỉ, thẩm mỹ cao, phù hợp cho văn phòng, nhà ở và thương mại.",
      },
      "bep-cong-nghiep": {
        title: "Bếp Công Nghiệp",
        description:
          "Thiết kế và thi công hệ thống bếp công nghiệp cho nhà hàng, khách sạn, bếp ăn tập thể — đảm bảo an toàn và hiệu suất cao.",
      },
    },
  },
  journey: {
    "may-rang": {
      label: "Hành trình cà phê",
      title: "Từ đam mê đến máy rang tinh xảo",
      body1:
        "Từ mong muốn có được những tách cà phê chất lượng, qua những bản phác thảo đến những chiếc máy rang chính xác — LBN tạo ra thiết bị đáp ứng tiêu chuẩn quốc tế với sự chú ý tỉ mỉ đến từng chi tiết.",
      body2:
        "Chúng tôi tự hào là đơn vị tiên phong trong sản xuất máy rang cà phê tại Khánh Hòa, kết hợp công nghệ hiện đại với kinh nghiệm thực tiễn để mang đến sản phẩm bền bỉ và hiệu quả.",
      videoTitle: "LBN máy rang cà phê",
    },
    "bep-cong-nghiep": {
      label: "Bếp công nghiệp",
      title: "Giải pháp bếp công nghiệp toàn diện",
      body1:
        "LBN thiết kế và thi công hệ thống bếp công nghiệp cho nhà hàng, khách sạn, trường học và bếp ăn tập thể — đảm bảo an toàn, hiệu suất cao và phù hợp với từng không gian.",
      body2:
        "Với đội ngũ kỹ thuật giàu kinh nghiệm, chúng tôi tư vấn và lắp đặt trọn gói từ thiết bị đến hệ thống hút mùi, đường gas và điện — giúp khách hàng vận hành bếp ngay lập tức.",
      videoTitle: "LBN bếp công nghiệp",
    },
    "noi-that": {
      label: "Nội thất gỗ – thép",
      title: "Nội thất theo yêu cầu, bền bỉ và thẩm mỹ",
      body1:
        "LBN sản xuất nội thất kết hợp gỗ tự nhiên và thép kỹ thuật theo yêu cầu riêng của từng khách hàng — từ bàn ghế văn phòng, kệ tủ đến nội thất thương mại cao cấp.",
      body2:
        "Mỗi sản phẩm được gia công tỉ mỉ tại xưởng Khánh Hòa, kiểm tra chất lượng nghiêm ngặt trước khi bàn giao — đảm bảo độ bền và tính thẩm mỹ lâu dài.",
      videoTitle: "LBN nội thất gỗ thép",
    },
  },
  machineDetails: {
    "may-rang": {
      label: "Đặc điểm nổi bật",
      title: "Công nghệ rang chuyên sâu",
      features: [
        {
          title: "Độ chính xác & Kiểm soát",
          description:
            "Cảm biến nhiệt độ kép theo dõi liên tục trong suốt chu trình rang — kiểm soát chính xác từng giai đoạn phản ứng.",
        },
        {
          title: "Công suất 1.5–120 kg/mẻ",
          description:
            "Dải công suất linh hoạt phù hợp từ quán cà phê nhỏ đến nhà máy chế biến xuất khẩu — mở rộng quy mô mà không cần thay đổi quy trình.",
        },
        {
          title: "Giao diện kỹ thuật trực quan",
          description:
            "Bảng điều khiển cảm ứng thông minh hiển thị biểu đồ nhiệt thời gian thực, cho phép bạn dễ dàng theo dõi, phân tích và can thiệp vào quá trình rang một cách mượt mà nhất",
        },
        {
          title: "Hệ thống Afterburner",
          description:
            "Đốt cháy khói và chaff sau khi rang — giảm thiểu ô nhiễm, đáp ứng tiêu chuẩn môi trường và an toàn khu vực sản xuất.",
        },
      ],
    },
    "bep-cong-nghiep": {
      label: "Đặc điểm nổi bật",
      title: "Giải pháp bếp hoàn chỉnh",
      features: [
        {
          title: "Thiết kế layout theo yêu cầu",
          description:
            "Tư vấn và vẽ mặt bằng bếp tối ưu dựa trên không gian thực tế — giảm thiểu di chuyển, tăng hiệu suất vận hành.",
        },
        {
          title: "Thiết bị inox chuyên dụng",
          description:
            "Toàn bộ thiết bị sử dụng inox 304 chuyên dùng cho thực phẩm — bền bỉ, dễ vệ sinh, đạt tiêu chuẩn an toàn thực phẩm quốc tế.",
        },
        {
          title: "Lắp đặt hệ thống hút mùi & gas",
          description:
            "Thi công trọn gói đường gas, điện và hệ thống hút khói — đảm bảo an toàn, thông thoáng và đạt tiêu chuẩn PCCC.",
        },
        {
          title: "Bảo hành & hỗ trợ kỹ thuật",
          description:
            "Đội ngũ kỹ thuật viên sẵn sàng hỗ trợ tận nơi, phụ tùng chính hãng — đảm bảo bếp hoạt động liên tục không gián đoạn.",
        },
      ],
    },
    "noi-that": {
      label: "Đặc điểm nổi bật",
      title: "Nội thất tinh xảo, bền theo năm tháng",
      features: [
        {
          title: "Vật liệu kép Gỗ – Thép - Inox",
          description:
            "Kết hợp độ bền vượt trội của thép hộp với vẻ đẹp ấm áp của gỗ tự nhiên — sản phẩm chắc chắn, có chiều sâu thẩm mỹ cao.",
        },
        {
          title: "Sản xuất hoàn toàn theo yêu cầu",
          description:
            "Không có sản phẩm đại trà — mỗi đơn hàng được thiết kế riêng theo kích thước, màu sắc và phong cách của khách hàng.",
        },
        {
          title: "Hoàn thiện bề mặt cao cấp",
          description:
            "Sơn tĩnh điện hoặc phủ PU bảo vệ toàn diện — kháng trầy xước, chống ẩm, giữ màu sắc bền đẹp theo thời gian.",
        },
        {
          title: "Xưởng sản xuất tại Khánh Hòa",
          description:
            "Toàn bộ quy trình gia công và kiểm tra chất lượng diễn ra tại xưởng — kiểm soát chặt chẽ từng công đoạn, giao hàng đúng tiến độ.",
        },
      ],
    },
  },
  featuredProducts: {
    label: "Sản phẩm",
    heading: "Dòng sản phẩm nổi bật",
    viewDetails: "Xem chi tiết →",
    viewAll: "Xem tất cả sản phẩm",
    contactPrice: "Liên Hệ",
  },
  newsSection: {
    label: "Tin tức & Sự kiện",
    heading: "Cập nhật mới nhất",
    viewAll: "Xem tất cả tin tức",
  },
  gallery: {
    label: "Thư viện ảnh",
    heading: "Hình ảnh sản phẩm",
    imageAlt: "Máy rang cà phê LBN",
    close: "Đóng",
  },
  product: {
    contactQuote: "Liên hệ / Báo giá",
    contactPrice: "Liên Hệ",
    contactBadge: "Liên hệ",
    relatedProducts: "Sản Phẩm Liên Quan",
  },
  search: {
    sortBy: "Sắp xếp theo",
    collections: "Bộ sưu tập",
    noProducts: "There are no products that match ",
    showing: "Showing",
    results: "results",
    result: "result",
    for: "for",
    noCollection: "No products found in this collection",
  },
  sorting: {
    relevance: "Liên quan",
    trending: "Phổ biến",
    latest: "Mới nhất",
    priceAsc: "Giá tăng dần",
    priceDesc: "Giá giảm dần",
  },
  newsPage: {
    title: "Tin tức & Sự kiện – LBN",
    description: "Cập nhật tin tức và sự kiện mới nhất từ Công ty LBN.",
    label: "Tin tức & Sự kiện",
    heading: "Cập nhật mới nhất",
    backToNews: "Quay lại tin tức",
  },
  welcome: {
    title: "Chào mừng đến với LBN!",
    description:
      "Chuyên sản xuất máy rang cà phê & thiết bị công nghiệp chất lượng cao tại Khánh Hòa.",
    learnMore: "Tìm hiểu thêm",
  },
  metadata: {
    homeTitle: "LBN - Máy rang cà phê, Nội thất & Bếp công nghiệp",
    homeDescription: "Công ty Cổ phần Sản xuất – Thương mại – Dịch vụ LBN",
  },
};

export default vi;
