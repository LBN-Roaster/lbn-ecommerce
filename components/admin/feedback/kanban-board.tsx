"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { COLUMNS, FeedbackItem, FeedbackStatus } from "lib/feedback/types";
import { loadFeedback, saveFeedback } from "lib/feedback/store";
import { KanbanColumn } from "./kanban-column";
import { FeedbackCard } from "./feedback-card";
import { FeedbackDialog } from "./feedback-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function KanbanBoard() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [activeItem, setActiveItem] = useState<FeedbackItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FeedbackItem | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<FeedbackStatus>("backlog");

  useEffect(() => {
    setItems(loadFeedback());
  }, []);

  const persist = useCallback((next: FeedbackItem[]) => {
    setItems(next);
    saveFeedback(next);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 200, tolerance: 5 },
    }),
  );

  function getColumnItems(status: FeedbackStatus) {
    return items.filter((i) => i.status === status);
  }

  function findContainer(id: string): FeedbackStatus | undefined {
    if (COLUMNS.some((c) => c.id === id)) return id as FeedbackStatus;
    return items.find((i) => i.id === id)?.status;
  }

  function handleDragStart(event: DragStartEvent) {
    const item = items.find((i) => i.id === event.active.id);
    setActiveItem(item ?? null);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === active.id
          ? {
              ...i,
              status: overContainer,
              doneAt:
                overContainer === "done" && !i.doneAt
                  ? new Date().toISOString()
                  : overContainer !== "done"
                    ? ""
                    : i.doneAt,
            }
          : i,
      ),
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer) return;

    if (active.id === over.id) {
      persist(items);
      return;
    }

    const columnItems = items.filter((i) => i.status === overContainer);
    const oldIndex = columnItems.findIndex((i) => i.id === active.id);
    const newIndex = columnItems.findIndex((i) => i.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      persist(items);
      return;
    }

    const reordered = arrayMove(columnItems, oldIndex, newIndex);
    const otherItems = items.filter((i) => i.status !== overContainer);
    persist([...otherItems, ...reordered]);
  }

  function handleAdd(status: FeedbackStatus) {
    setEditingItem(null);
    setDefaultStatus(status);
    setDialogOpen(true);
  }

  function handleEdit(item: FeedbackItem) {
    setEditingItem(item);
    setDefaultStatus(item.status);
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    persist(items.filter((i) => i.id !== id));
  }

  function handleSave(saved: FeedbackItem) {
    const exists = items.some((i) => i.id === saved.id);
    if (exists) {
      persist(items.map((i) => (i.id === saved.id ? saved : i)));
    } else {
      persist([saved, ...items]);
    }
  }

  return (
    <>
      <div className="mb-5 flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Feedback</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track and prioritize user feedback
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => handleAdd("backlog")}
          className="gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add feedback
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid auto-cols-fr grid-flow-col gap-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              label={col.label}
              items={getColumnItems(col.id)}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            <div className="w-[280px]">
              <FeedbackCard
                item={activeItem}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <FeedbackDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editingItem}
        defaultStatus={defaultStatus}
        onSave={handleSave}
      />
    </>
  );
}
