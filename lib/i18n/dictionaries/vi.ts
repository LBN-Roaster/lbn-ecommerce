export type FeatureItem = { title: string; description: string };

export type AreaContent<T> = {
  "may-rang": T;
  "bep-cong-nghiep": T;
  "noi-that": T;
};

export interface AdminDictionary {
  sidebar: {
    title: string;
    subtitle: string;
    dashboard: string;
    overview: string;
    installationsMap: string;
    data: string;
    products: string;
    machines: string;
    sales: string;
    feedback: string;
    settings: string;
  };
  topbar: {
    admin: string;
    overview: string;
    installationsMap: string;
    sales: string;
    syncedFrom: string;
    export: string;
  };
  overview: {
    title: string;
    subtitle: string;
    allTimeRevenue: string;
    machinesSold: string;
    allTimeUnits: string;
    acrossAllLocations: string;
    thisMonthRevenue: string;
    thisMonthUnits: string;
    vsPreviousMonth: string;
    monthlyRevenue: string;
    rollingWindow: string;
    closed: string;
    currentMonth: string;
    recentSales: string;
    latestTransactions: string;
    viewAll: string;
  };
  productsPage: {
    title: string;
    subtitle: string;
    addProduct: string;
  };
  productTable: {
    searchPlaceholder: string;
    all: string;
    active: string;
    draft: string;
    contactUs: string;
    loadingProducts: string;
    noMatch: string;
    noProducts: string;
    tryDifferent: string;
    addFirst: string;
    selected: string;
    generateQuotation: string;
    deselectAll: string;
    product: string;
    status: string;
    cost: string;
    sellingRev: string;
    listedDist: string;
    edit: string;
    delete: string;
    deleteConfirm: string;
  };
  productForm: {
    form: string;
    json: string;
    jsonPayload: string;
    pasteJson: string;
    productInfo: string;
    titleLabel: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    media: string;
    pricing: string;
    costPrice: string;
    revenuePercent: string;
    distributorPercent: string;
    sellingPrice: string;
    listedPrice: string;
    statusLabel: string;
    activeLabel: string;
    activeDesc: string;
    draftLabel: string;
    draftDesc: string;
    contactUsLabel: string;
    contactUsDesc: string;
    saving: string;
    save: string;
    saveProduct: string;
    somethingWrong: string;
    invalidJson: string;
  };
  salesPage: {
    title: string;
    subtitle: string;
  };
  salesTable: {
    noSales: string;
    noSalesHint: string;
    date: string;
    product: string;
    buyer: string;
    location: string;
    price: string;
  };
  quotation: {
    title: string;
    settings: string;
    name: string;
    customerName: string;
    company: string;
    companyName: string;
    address: string;
    deliveryAddress: string;
    senderName: string;
    yourName: string;
    senderPhone: string;
    phoneNumber: string;
    language: string;
    vietnamese: string;
    english: string;
    items: string;
    variant: string;
    noVariants: string;
    priceType: string;
    costType: string;
    sellingType: string;
    listedType: string;
    qty: string;
    discountPercent: string;
    priceOverride: string;
    optional: string;
    totalCost: string;
    totalPrice: string;
    profit: string;
    cancel: string;
    generating: string;
    generatePdf: string;
    addAtLeastOne: string;
    failedGenerate: string;
  };
  chart: {
    unit: string;
    units: string;
  };
  map: {
    title: string;
    subtitle: string;
    resetView: string;
    locations: string;
    machines: string;
    revenue: string;
    clickToDrill: string;
    pinsNote: string;
    allLocations: string;
    salesAtLocation: string;
  };
  imageManager: {
    featured: string;
    addImageUrl: string;
    pasteUrl: string;
    add: string;
    removeImage: string;
  };
  variantBuilder: {
    options: string;
    hasOptions: string;
    optionName: string;
    optionValues: string;
    addValue: string;
    addOption: string;
    done: string;
    variants: string;
    select: string;
    none: string;
    allLabel: string;
    variant: string;
    priceLabel: string;
    quantity: string;
    edit: string;
    cancel: string;
    priceCurrency: string;
  };
  feedbackPage: {
    title: string;
    subtitle: string;
    addFeedback: string;
  };
  feedbackColumn: {
    dropHere: string;
  };
  feedbackCard: {
    solutionAdded: string;
    noSolution: string;
  };
  feedbackDialog: {
    editTitle: string;
    newTitle: string;
    title: string;
    titlePlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    category: string;
    bug: string;
    feature: string;
    improvement: string;
    priority: string;
    low: string;
    medium: string;
    high: string;
    statusLabel: string;
    backlog: string;
    inProgress: string;
    doneStatus: string;
    doneDate: string;
    submittedBy: string;
    submittedByPlaceholder: string;
    inCharge: string;
    inChargePlaceholder: string;
    solution: string;
    solutionPlaceholder: string;
    cancel: string;
    saveChanges: string;
    addFeedback: string;
  };
  editProduct: {
    notFound: string;
    loading: string;
  };
  machinesPage: {
    title: string;
    subtitle: string;
    addMachine: string;
  };
  serialGuide: {
    title: string;
    subtitle: string;
    example: string;
    position: string;
    codes: string;
    meaning: string;
  };
  machineTable: {
    searchPlaceholder: string;
    all: string;
    inProduction: string;
    readyForShipping: string;
    sold: string;
    consignment: string;
    loadingMachines: string;
    noMatch: string;
    noMachines: string;
    tryDifferent: string;
    addFirst: string;
    serialNumber: string;
    productVariant: string;
    status: string;
    warranty: string;
    warrantyUnit: string;
    createdDate: string;
    edit: string;
    delete: string;
    deleteConfirm: string;
  };
  machineForm: {
    registerTitle: string;
    editTitle: string;
    serialNumber: string;
    serialNumberPlaceholder: string;
    productVariant: string;
    selectVariant: string;
    noVariantsAvailable: string;
    status: string;
    warrantyMonths: string;
    warrantyMonthsPlaceholder: string;
    saving: string;
    register: string;
    saveChanges: string;
    cancel: string;
    somethingWrong: string;
  };
}

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
  }> & { viewProducts: string };
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

export const viAdmin: AdminDictionary = {
  sidebar: {
    title: "LBN Admin",
    subtitle: "Khánh Hòa · VN",
    dashboard: "Bảng điều khiển",
    overview: "Tổng quan",
    installationsMap: "Bản đồ lắp đặt",
    data: "Dữ liệu",
    products: "Sản phẩm",
    machines: "Máy",
    sales: "Doanh số",
    feedback: "Phản hồi",
    settings: "Cài đặt",
  },
  topbar: {
    admin: "Quản trị",
    overview: "Tổng quan",
    installationsMap: "Bản đồ lắp đặt",
    sales: "Doanh số",
    syncedFrom: "Đồng bộ từ",
    export: "Xuất",
  },
  overview: {
    title: "Tổng quan",
    subtitle: "Tình hình kinh doanh tổng thể",
    allTimeRevenue: "Tổng doanh thu",
    machinesSold: "máy đã bán từ khi ra mắt",
    allTimeUnits: "Tổng số máy",
    acrossAllLocations: "trên tất cả địa điểm",
    thisMonthRevenue: "Tháng này · doanh thu",
    thisMonthUnits: "Tháng này · số máy",
    vsPreviousMonth: "so với tháng trước",
    monthlyRevenue: "Doanh thu theo tháng",
    rollingWindow: "Cửa sổ 12 tháng · kết thúc",
    closed: "Đã đóng",
    currentMonth: "Tháng hiện tại",
    recentSales: "Bán hàng gần đây",
    latestTransactions: "giao dịch gần nhất",
    viewAll: "Xem tất cả →",
  },
  productsPage: {
    title: "Sản phẩm",
    subtitle: "Quản lý danh mục sản phẩm",
    addProduct: "Thêm sản phẩm",
  },
  productTable: {
    searchPlaceholder: "Tìm kiếm sản phẩm...",
    all: "Tất cả",
    active: "Hiển thị",
    draft: "Nháp",
    contactUs: "Liên hệ",
    loadingProducts: "Đang tải sản phẩm...",
    noMatch: "Không có sản phẩm phù hợp",
    noProducts: "Chưa có sản phẩm",
    tryDifferent: "Thử từ khóa khác",
    addFirst: "Thêm sản phẩm đầu tiên để bắt đầu",
    selected: "đã chọn",
    generateQuotation: "Tạo báo giá",
    deselectAll: "Bỏ chọn tất cả",
    product: "Sản phẩm",
    status: "Trạng thái",
    cost: "Giá vốn",
    sellingRev: "Giá bán / %LN",
    listedDist: "Giá niêm yết / %PP",
    edit: "Sửa",
    delete: "Xóa",
    deleteConfirm: "Xóa sản phẩm này?",
  },
  productForm: {
    form: "Biểu mẫu",
    json: "JSON",
    jsonPayload: "Dữ liệu JSON",
    pasteJson: "Dán JSON do AI tạo tại đây",
    productInfo: "Thông tin sản phẩm",
    titleLabel: "Tên sản phẩm",
    titlePlaceholder: "Áo thun tay ngắn",
    description: "Mô tả",
    descriptionPlaceholder: "Viết mô tả cho sản phẩm...",
    media: "Hình ảnh",
    pricing: "Giá cả",
    costPrice: "Giá vốn",
    revenuePercent: "% Lợi nhuận",
    distributorPercent: "% Phân phối",
    sellingPrice: "Giá bán",
    listedPrice: "Giá niêm yết",
    statusLabel: "Trạng thái",
    activeLabel: "Hiển thị",
    activeDesc: "Sản phẩm hiển thị cho khách hàng",
    draftLabel: "Nháp",
    draftDesc: "Sản phẩm ẩn khỏi cửa hàng",
    contactUsLabel: "Liên hệ",
    contactUsDesc: "Giá hiển thị là 'Liên hệ'",
    saving: "Đang lưu...",
    save: "Lưu",
    saveProduct: "Lưu sản phẩm",
    somethingWrong: "Đã xảy ra lỗi",
    invalidJson: "JSON không hợp lệ",
  },
  salesPage: {
    title: "Doanh số",
    subtitle: "giao dịch · sắp xếp theo mới nhất",
  },
  salesTable: {
    noSales: "Chưa có doanh số",
    noSalesHint: "Doanh số sẽ xuất hiện khi data/sales.json có dữ liệu.",
    date: "Ngày",
    product: "Sản phẩm",
    buyer: "Người mua",
    location: "Địa điểm",
    price: "Giá",
  },
  quotation: {
    title: "Tạo báo giá",
    settings: "Cài đặt báo giá",
    name: "Tên",
    customerName: "Tên khách hàng",
    company: "Công ty",
    companyName: "Tên công ty",
    address: "Địa chỉ",
    deliveryAddress: "Địa chỉ giao hàng",
    senderName: "Người gửi",
    yourName: "Tên của bạn",
    senderPhone: "SĐT người gửi",
    phoneNumber: "Số điện thoại",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    items: "Sản phẩm",
    variant: "Phiên bản",
    noVariants: "Không có phiên bản",
    priceType: "Loại giá",
    costType: "Giá vốn",
    sellingType: "Giá bán",
    listedType: "Niêm yết",
    qty: "SL",
    discountPercent: "Giảm giá %",
    priceOverride: "Giá tùy chỉnh",
    optional: "Tùy chọn",
    totalCost: "Tổng giá vốn",
    totalPrice: "Tổng giá",
    profit: "Lợi nhuận",
    cancel: "Hủy",
    generating: "Đang tạo...",
    generatePdf: "Tạo PDF",
    addAtLeastOne: "Thêm ít nhất một sản phẩm có phiên bản",
    failedGenerate: "Không thể tạo báo giá",
  },
  chart: {
    unit: "máy",
    units: "máy",
  },
  map: {
    title: "Bản đồ lắp đặt",
    subtitle: "Nơi máy LBN đang hoạt động",
    resetView: "Đặt lại",
    locations: "Địa điểm",
    machines: "Máy",
    revenue: "Doanh thu",
    clickToDrill: "Nhấn vào ghim hoặc hàng để xem chi tiết",
    pinsNote: "Ghim gộp doanh số theo tọa độ · Số hiển thị số máy đã lắp",
    allLocations: "← Tất cả địa điểm",
    salesAtLocation: "Doanh số tại địa điểm",
  },
  imageManager: {
    featured: "Nổi bật",
    addImageUrl: "Thêm URL hình ảnh",
    pasteUrl: "Dán URL rồi nhấn Enter hoặc nhấn Thêm",
    add: "Thêm",
    removeImage: "Xóa hình ảnh",
  },
  variantBuilder: {
    options: "Tùy chọn",
    hasOptions: "Sản phẩm có tùy chọn, như kích thước hoặc màu sắc",
    optionName: "Tên tùy chọn",
    optionValues: "Giá trị tùy chọn",
    addValue: "Thêm giá trị khác",
    addOption: "Thêm tùy chọn khác",
    done: "Xong",
    variants: "Phiên bản",
    select: "Chọn",
    none: "Bỏ chọn",
    allLabel: "Tất cả",
    variant: "Phiên bản",
    priceLabel: "Giá",
    quantity: "Số lượng",
    edit: "Sửa",
    cancel: "Hủy",
    priceCurrency: "Giá (₫)",
  },
  feedbackPage: {
    title: "Phản hồi",
    subtitle: "Theo dõi và ưu tiên phản hồi",
    addFeedback: "Thêm phản hồi",
  },
  feedbackColumn: {
    dropHere: "Kéo thả vào đây",
  },
  feedbackCard: {
    solutionAdded: "Đã có giải pháp",
    noSolution: "Chưa có giải pháp",
  },
  feedbackDialog: {
    editTitle: "Sửa phản hồi",
    newTitle: "Phản hồi mới",
    title: "Tiêu đề",
    titlePlaceholder: "Tóm tắt ngắn gọn phản hồi",
    description: "Mô tả",
    descriptionPlaceholder: "Chi tiết về phản hồi này…",
    category: "Danh mục",
    bug: "Lỗi",
    feature: "Tính năng",
    improvement: "Cải thiện",
    priority: "Ưu tiên",
    low: "Thấp",
    medium: "Trung bình",
    high: "Cao",
    statusLabel: "Trạng thái",
    backlog: "Chờ xử lý",
    inProgress: "Đang xử lý",
    doneStatus: "Hoàn thành",
    doneDate: "Ngày hoàn thành",
    submittedBy: "Người gửi",
    submittedByPlaceholder: "Tên hoặc nhóm",
    inCharge: "Phụ trách",
    inChargePlaceholder: "Người chịu trách nhiệm",
    solution: "Giải pháp",
    solutionPlaceholder: "Mô tả giải pháp hoặc cách giải quyết…",
    cancel: "Hủy",
    saveChanges: "Lưu thay đổi",
    addFeedback: "Thêm phản hồi",
  },
  editProduct: {
    notFound: "Không tìm thấy sản phẩm",
    loading: "Đang tải...",
  },
  machinesPage: {
    title: "Máy",
    subtitle: "Đăng ký và theo dõi máy vật lý",
    addMachine: "Thêm máy",
  },
  machineTable: {
    searchPlaceholder: "Tìm theo số serial...",
    all: "Tất cả",
    inProduction: "Đang sản xuất",
    readyForShipping: "Sẵn sàng xuất",
    sold: "Đã bán",
    consignment: "Ký gửi",
    loadingMachines: "Đang tải máy...",
    noMatch: "Không có máy phù hợp",
    noMachines: "Chưa có máy",
    tryDifferent: "Thử từ khóa khác",
    addFirst: "Đăng ký máy đầu tiên để bắt đầu",
    serialNumber: "Số serial",
    productVariant: "Biến thể sản phẩm",
    status: "Trạng thái",
    warranty: "Bảo hành",
    warrantyUnit: "tháng",
    createdDate: "Ngày tạo",
    edit: "Sửa",
    delete: "Xóa",
    deleteConfirm: "Xóa máy này?",
  },
  machineForm: {
    registerTitle: "Đăng ký máy mới",
    editTitle: "Chỉnh sửa máy",
    serialNumber: "Số serial",
    serialNumberPlaceholder: "VD: LBN-2024-001",
    productVariant: "Biến thể sản phẩm",
    selectVariant: "Chọn biến thể...",
    noVariantsAvailable: "Không có biến thể",
    status: "Trạng thái",
    warrantyMonths: "Bảo hành (tháng)",
    warrantyMonthsPlaceholder: "12",
    saving: "Đang lưu...",
    register: "Đăng ký",
    saveChanges: "Lưu thay đổi",
    cancel: "Hủy",
    somethingWrong: "Đã xảy ra lỗi",
  },
  serialGuide: {
    title: "Cấu trúc số serial",
    subtitle: "Hướng dẫn đọc mã số máy",
    example: "Ví dụ",
    position: "Vị trí",
    codes: "Mã",
    meaning: "Ý nghĩa",
  },
};

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
    viewProducts: "Xem sản phẩm",
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
