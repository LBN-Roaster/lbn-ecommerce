"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FeedbackItem,
  FeedbackCategory,
  FeedbackPriority,
  FeedbackStatus,
} from "lib/feedback/types";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: FeedbackItem | null;
  defaultStatus: FeedbackStatus;
  onSave: (item: FeedbackItem) => void;
}

export function FeedbackDialog({
  open,
  onOpenChange,
  item,
  defaultStatus,
  onSave,
}: FeedbackDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<FeedbackCategory>("feature");
  const [priority, setPriority] = useState<FeedbackPriority>("medium");
  const [status, setStatus] = useState<FeedbackStatus>(defaultStatus);
  const [author, setAuthor] = useState("");
  const [assignee, setAssignee] = useState("");
  const [solution, setSolution] = useState("");
  const [doneAt, setDoneAt] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setCategory(item.category);
      setPriority(item.priority);
      setStatus(item.status);
      setAuthor(item.author);
      setAssignee(item.assignee);
      setSolution(item.solution);
      setDoneAt(item.doneAt ? item.doneAt.slice(0, 10) : "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("feature");
      setPriority("medium");
      setStatus(defaultStatus);
      setAuthor("");
      setAssignee("");
      setSolution("");
      setDoneAt("");
    }
  }, [item, defaultStatus, open]);

  function handleStatusChange(v: FeedbackStatus) {
    setStatus(v);
    if (v === "done" && !doneAt) {
      setDoneAt(new Date().toISOString().slice(0, 10));
    }
    if (v !== "done") {
      setDoneAt("");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      id: item?.id ?? `fb-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      status,
      author: author.trim() || "Anonymous",
      assignee: assignee.trim(),
      solution: solution.trim(),
      createdAt: item?.createdAt ?? new Date().toISOString(),
      doneAt: doneAt ? new Date(doneAt).toISOString() : "",
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-[15px]">
            {item ? "Edit feedback" : "New feedback"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="title" className="text-[12.5px]">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief summary of the feedback"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-[12.5px]">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Details about this feedback…"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[12.5px]">Category</Label>
              <Select
                value={category}
                onValueChange={(v) => setCategory(v as FeedbackCategory)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">Bug</SelectItem>
                  <SelectItem value="feature">Feature</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[12.5px]">Priority</Label>
              <Select
                value={priority}
                onValueChange={(v) => setPriority(v as FeedbackPriority)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[12.5px]">Status</Label>
              <Select
                value={status}
                onValueChange={(v) => handleStatusChange(v as FeedbackStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {status === "done" && (
            <div className="space-y-1.5">
              <Label htmlFor="doneAt" className="text-[12.5px]">
                Done date
              </Label>
              <Input
                id="doneAt"
                type="date"
                value={doneAt}
                onChange={(e) => setDoneAt(e.target.value)}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="author" className="text-[12.5px]">
                Submitted by
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Name or team"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="assignee" className="text-[12.5px]">
                In charge
              </Label>
              <Input
                id="assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Person responsible"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="solution" className="text-[12.5px]">
              Solution
            </Label>
            <Textarea
              id="solution"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Describe the solution or resolution…"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {item ? "Save changes" : "Add feedback"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
