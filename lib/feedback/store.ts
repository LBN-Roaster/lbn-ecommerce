import { FeedbackItem } from "./types";

const STORAGE_KEY = "lbn-feedback-v4";

const SEED_DATA: FeedbackItem[] = [
  {
    id: "fb-1",
    title: "Add bulk order discount",
    description:
      "Customers buying 10+ machines should get an automatic volume discount applied at checkout.",
    category: "feature",
    priority: "high",
    status: "in-progress",
    author: "Phương Trần",
    assignee: "Minh Đặng",
    solution: "",
    createdAt: "2026-05-28T09:00:00Z",
    doneAt: "",
  },
  {
    id: "fb-2",
    title: "Product images load slowly on mobile",
    description:
      "Gallery images on product pages take 3-4 seconds to load on 4G connections.",
    category: "bug",
    priority: "high",
    status: "in-progress",
    author: "Customer Support",
    assignee: "Phương Trần",
    solution: "Switched to next/image with lazy loading and WebP format.",
    createdAt: "2026-05-30T14:30:00Z",
    doneAt: "",
  },
  {
    id: "fb-3",
    title: "Add Vietnamese Dong formatting to invoices",
    description: "Invoice PDFs should use proper VND formatting with ₫ symbol.",
    category: "improvement",
    priority: "medium",
    status: "backlog",
    author: "Accounting",
    assignee: "",
    solution: "",
    createdAt: "2026-06-01T08:00:00Z",
    doneAt: "",
  },
  {
    id: "fb-4",
    title: "Search by machine serial number",
    description:
      "Sales team needs to look up orders by the serial number printed on the machine.",
    category: "feature",
    priority: "medium",
    status: "backlog",
    author: "Sales Team",
    assignee: "",
    solution: "",
    createdAt: "2026-06-02T11:15:00Z",
    doneAt: "",
  },
  {
    id: "fb-5",
    title: "Export sales data to Excel",
    description: "Monthly reports need to be exported as .xlsx for accounting.",
    category: "feature",
    priority: "low",
    status: "done",
    author: "Phương Trần",
    assignee: "Minh Đặng",
    solution: "Added xlsx export button on the sales page using SheetJS.",
    createdAt: "2026-05-15T10:00:00Z",
    doneAt: "2026-05-20T16:00:00Z",
  },
];

export function loadFeedback(): FeedbackItem[] {
  if (typeof window === "undefined") return SEED_DATA;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(raw) as FeedbackItem[];
}

export function saveFeedback(items: FeedbackItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}
