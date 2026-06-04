export type FeedbackStatus = "backlog" | "in-progress" | "done";
export type FeedbackPriority = "low" | "medium" | "high";
export type FeedbackCategory = "bug" | "feature" | "improvement";

export interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  author: string;
  assignee: string;
  solution: string;
  createdAt: string;
  doneAt: string;
}

export const COLUMNS: { id: FeedbackStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

export const PRIORITY_CONFIG: Record<
  FeedbackPriority,
  { label: string; color: string }
> = {
  low: { label: "Low", color: "bg-slate-100 text-slate-700" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700" },
  high: { label: "High", color: "bg-red-100 text-red-700" },
};

export const CATEGORY_CONFIG: Record<
  FeedbackCategory,
  { label: string; color: string }
> = {
  bug: { label: "Bug", color: "bg-red-50 text-red-600" },
  feature: { label: "Feature", color: "bg-blue-50 text-blue-600" },
  improvement: { label: "Improvement", color: "bg-emerald-50 text-emerald-600" },
};
