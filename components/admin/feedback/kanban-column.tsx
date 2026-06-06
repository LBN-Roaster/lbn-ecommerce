"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { cn } from "@/lib/utils";
import { FeedbackItem, FeedbackStatus } from "lib/feedback/types";
import { FeedbackCard } from "./feedback-card";
import { Plus } from "lucide-react";

interface KanbanColumnProps {
  id: FeedbackStatus;
  label: string;
  items: FeedbackItem[];
  onAdd: (status: FeedbackStatus) => void;
  onEdit: (item: FeedbackItem) => void;
  onDelete: (id: string) => void;
  dropLabel?: string;
}

export function KanbanColumn({
  id,
  label,
  items,
  onAdd,
  onEdit,
  onDelete,
  dropLabel = "Drop items here",
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex min-w-[280px] flex-1 flex-col">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-foreground">
            {label}
          </span>
          <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-muted px-1.5 text-[11px] font-medium text-muted-foreground">
            {items.length}
          </span>
        </div>
        <button
          onClick={() => onAdd(id)}
          className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-1 flex-col gap-2 rounded-lg border border-dashed border-transparent p-1 transition-colors",
          isOver && "border-primary/30 bg-primary/5",
        )}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <FeedbackCard
              key={item.id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>

        {items.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border/60 py-8 text-[12px] text-muted-foreground">
            {dropLabel}
          </div>
        )}
      </div>
    </div>
  );
}
