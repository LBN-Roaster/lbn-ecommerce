"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { FeedbackItem } from "lib/feedback/types";
import { Calendar, CheckCircle2, CircleDashed, Clock, GripVertical, Pencil, Trash2 } from "lucide-react";

interface FeedbackCardProps {
  item: FeedbackItem;
  onEdit: (item: FeedbackItem) => void;
  onDelete: (id: string) => void;
}

export function FeedbackCard({ item, onEdit, onDelete }: FeedbackCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { item } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasSolution = item.solution.trim().length > 0;

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  function getDuration(start: string, end: string) {
    const ms = new Date(end).getTime() - new Date(start).getTime();
    const days = Math.floor(ms / 86_400_000);
    if (days === 0) return "< 1d";
    return `${days}d`;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group rounded-lg border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md",
        isDragging && "z-50 opacity-50 shadow-lg",
      )}
    >
      <div className="mb-2 flex items-start gap-1.5">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 shrink-0 cursor-grab touch-none text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug">
          {item.title}
        </span>
        <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(item)}
            className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {item.description && (
        <p className="mb-2.5 line-clamp-2 pl-5.5 text-[12px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      )}

      <div className="flex items-center gap-1.5 pl-5.5">
        {hasSolution ? (
          <span className="flex items-center gap-1 text-[10.5px] font-medium text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Solution added
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
            <CircleDashed className="h-3.5 w-3.5" />
            No solution
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 pl-5.5 text-[10.5px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(item.createdAt)}
        </span>
        {item.doneAt && (
          <>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {formatDate(item.doneAt)}
            </span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Clock className="h-3 w-3" />
              {getDuration(item.createdAt, item.doneAt)}
            </span>
          </>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between pl-5.5 text-[10.5px] text-muted-foreground">
        <span>{item.author}</span>
        {item.assignee && (
          <span className="flex items-center gap-1">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-secondary text-[8px] font-semibold">
              {item.assignee
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            {item.assignee}
          </span>
        )}
      </div>
    </div>
  );
}
