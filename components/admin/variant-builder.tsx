"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { GripVertical, Trash2, Plus, X, ImageIcon } from "lucide-react";

export interface VariantOption {
  name: string;
  values: string[];
}

export interface VariantData {
  combination: string[];
  price: string;
  quantity: string;
}

interface VariantBuilderProps {
  name: string;
  defaultOptions?: VariantOption[];
  defaultPrice?: string;
}

const PRESET_OPTIONS = ["Color", "Size", "Material", "Style"];

function DragHandle() {
  return (
    <div className="grid h-5 w-5 flex-none cursor-grab place-items-center text-muted-foreground active:cursor-grabbing">
      <GripVertical className="h-3 w-3" />
    </div>
  );
}

function OptionRowEditing({
  option,
  onChange,
  onRemove,
  onDone,
}: {
  option: VariantOption;
  onChange: (updated: VariantOption) => void;
  onRemove: () => void;
  onDone: () => void;
}) {
  const addRef = useRef<HTMLInputElement>(null);

  function updateValue(idx: number, val: string) {
    const next = [...option.values];
    next[idx] = val;
    onChange({ ...option, values: next });
  }

  function removeValue(idx: number) {
    onChange({
      ...option,
      values: option.values.filter((_, i) => i !== idx),
    });
  }

  function addValue(refocus = true) {
    if (!addRef.current) return;
    const val = addRef.current.value.trim();
    if (!val || option.values.includes(val)) return;
    onChange({ ...option, values: [...option.values, val] });
    addRef.current.value = "";
    if (refocus) addRef.current.focus();
  }

  return (
    <div className="border-b border-border py-4">
      <div className="flex flex-col gap-3.5 rounded-md bg-muted p-4">
        <div className="flex items-end gap-2.5">
          <DragHandle />
          <div className="flex flex-1 flex-col gap-1.5">
            <Label>Option name</Label>
            <Input
              value={option.name}
              onChange={(e) => onChange({ ...option, name: e.target.value })}
              placeholder="e.g. Size"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Option values</Label>
          <div className="flex flex-col gap-1.5">
            {option.values.map((v, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <DragHandle />
                <Input
                  className="flex-1"
                  value={v}
                  onChange={(e) => updateValue(i, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeValue(i)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center gap-2.5">
              <DragHandle />
              <Input
                ref={addRef}
                className="flex-1"
                placeholder="Add another value"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addValue();
                  }
                }}
                onBlur={() => addValue(false)}
              />
            </div>
          </div>
        </div>

        <div>
          <Button type="button" variant="outline" onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

function OptionRowCollapsed({
  option,
  onEdit,
}: {
  option: VariantOption;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border py-3.5">
      <DragHandle />
      <div className="min-w-0 flex-1">
        <span className="block text-[13.5px] font-medium">{option.name}</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {option.values.map((v, i) => (
            <span
              key={i}
              className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {v}
            </span>
          ))}
        </div>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={onEdit}>
        Edit
      </Button>
    </div>
  );
}

function VariantEditModal({
  combo,
  data,
  onSave,
  onClose,
}: {
  combo: string[];
  data: VariantData;
  onSave: (d: VariantData) => void;
  onClose: () => void;
}) {
  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState(data.quantity);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/35"
      onClick={onClose}
    >
      <div
        className="w-[400px] max-w-[90vw] rounded-lg border border-border bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-[15px] font-semibold">{combo.join(" / ")}</h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-col gap-3.5 px-5 py-4">
          <div className="flex flex-col gap-1.5">
            <Label>Price (₫)</Label>
            <Input
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => {
              onSave({ combination: combo, price, quantity });
              onClose();
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export function VariantBuilder({
  name,
  defaultOptions = [],
  defaultPrice = "",
}: VariantBuilderProps) {
  const [options, setOptions] = useState<VariantOption[]>(defaultOptions);
  const [hasVariants, setHasVariants] = useState(defaultOptions.length > 0);
  const [editingSet, setEditingSet] = useState<Set<number>>(
    () => new Set(defaultOptions.length > 0 ? [] : [0]),
  );
  const [variantDataMap, setVariantDataMap] = useState<
    Record<string, VariantData>
  >({});
  const [editingCombo, setEditingCombo] = useState<string[] | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Set<string>>(
    new Set(),
  );

  const combinations = getCombinations(options);

  function getVariantData(combo: string[]): VariantData {
    const key = combo.join(" / ");
    return (
      variantDataMap[key] ?? {
        combination: combo,
        price: defaultPrice,
        quantity: "0",
      }
    );
  }

  function setVariantData(combo: string[], data: VariantData) {
    const key = combo.join(" / ");
    setVariantDataMap((prev) => ({ ...prev, [key]: data }));
  }

  function addOption() {
    const usedNames = new Set(options.map((o) => o.name));
    const nextName = PRESET_OPTIONS.find((n) => !usedNames.has(n)) ?? "";
    const newIdx = options.length;
    setOptions((prev) => [...prev, { name: nextName, values: [] }]);
    setEditingSet((prev) => new Set(prev).add(newIdx));
  }

  function updateOption(idx: number, updated: VariantOption) {
    setOptions((prev) => prev.map((o, i) => (i === idx ? updated : o)));
  }

  function removeOption(idx: number) {
    setOptions((prev) => prev.filter((_, i) => i !== idx));
    setEditingSet((prev) => {
      const next = new Set<number>();
      for (const v of prev) {
        if (v < idx) next.add(v);
        else if (v > idx) next.add(v - 1);
      }
      return next;
    });
  }

  function startEditing(idx: number) {
    setEditingSet((prev) => new Set(prev).add(idx));
  }

  function stopEditing(idx: number) {
    setEditingSet((prev) => {
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
  }

  function toggleVariants() {
    if (hasVariants) {
      setOptions([]);
      setHasVariants(false);
      setEditingSet(new Set());
    } else {
      setHasVariants(true);
      if (options.length === 0) {
        setOptions([{ name: "Color", values: [] }]);
        setEditingSet(new Set([0]));
      }
    }
  }

  function toggleSelectAll() {
    if (
      combinations.length > 0 &&
      combinations.every((c) => selectedVariants.has(c.join(" / ")))
    ) {
      setSelectedVariants(new Set());
    } else {
      setSelectedVariants(new Set(combinations.map((c) => c.join(" / "))));
    }
  }

  function toggleSelectOne(key: string) {
    const next = new Set(selectedVariants);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelectedVariants(next);
  }

  const allSelected =
    combinations.length > 0 &&
    combinations.every((c) => selectedVariants.has(c.join(" / ")));

  const allVariantData = combinations.map((combo) => getVariantData(combo));

  const optionsCard = (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Options</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="hidden" name={name} value={JSON.stringify(options)} />
        <input
          type="hidden"
          name="variantData"
          value={JSON.stringify(allVariantData)}
        />

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={hasVariants}
            onCheckedChange={toggleVariants}
          />
          <span>This product has options, like size or color</span>
        </label>

        {hasVariants && (
          <div className="mt-3.5 border-t border-border">
            {options.map((opt, i) =>
              editingSet.has(i) ? (
                <OptionRowEditing
                  key={i}
                  option={opt}
                  onChange={(updated) => updateOption(i, updated)}
                  onRemove={() => removeOption(i)}
                  onDone={() => stopEditing(i)}
                />
              ) : (
                <OptionRowCollapsed
                  key={i}
                  option={opt}
                  onEdit={() => startEditing(i)}
                />
              ),
            )}

            {options.length < 3 && (
              <div className="border-b border-border py-3.5">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  onClick={addOption}
                >
                  <Plus className="h-4 w-4" />
                  Add another option
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const variantsTable =
    combinations.length > 0 ? (
      <>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-3">
            <span className="text-sm font-semibold">Variants</span>
            <div className="flex items-center gap-2 text-[12.5px]">
              <span className="text-muted-foreground">Select</span>
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => {
                  if (allSelected) {
                    setSelectedVariants(new Set());
                  } else {
                    toggleSelectAll();
                  }
                }}
              >
                {allSelected ? "None" : "All"}
              </button>
              {options
                .filter((o) => o.values.length > 0)
                .map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    className="font-medium text-primary hover:underline"
                    onClick={() => {
                      const keys = new Set(
                        combinations
                          .filter((c) => {
                            const optIdx = options.findIndex(
                              (o) => o.name === opt.name,
                            );
                            return optIdx >= 0 && c[optIdx] === opt.values[0];
                          })
                          .map((c) => c.join(" / ")),
                      );
                      setSelectedVariants(keys);
                    }}
                  >
                    {opt.name} ▾
                  </button>
                ))}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-9">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-14" />
                <TableHead>Variant</TableHead>
                <TableHead className="w-[140px]">Price</TableHead>
                <TableHead className="w-20">Quantity</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {combinations.map((combo) => {
                const key = combo.join(" / ");
                const data = getVariantData(combo);
                return (
                  <TableRow
                    key={key}
                    data-state={
                      selectedVariants.has(key) ? "selected" : undefined
                    }
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedVariants.has(key)}
                        onCheckedChange={() => toggleSelectOne(key)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="grid h-11 w-11 place-items-center rounded-md border-2 border-dashed border-border bg-background text-muted-foreground">
                        <ImageIcon className="h-5 w-5" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{key}</span>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center">
                        <span className="pointer-events-none absolute left-2 text-xs text-muted-foreground">
                          ₫
                        </span>
                        <Input
                          type="text"
                          inputMode="numeric"
                          className="h-8 pl-5 text-[12.5px]"
                          value={data.price}
                          onChange={(e) =>
                            setVariantData(combo, {
                              ...data,
                              price: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        className="h-8 text-[12.5px]"
                        value={data.quantity}
                        onChange={(e) =>
                          setVariantData(combo, {
                            ...data,
                            quantity: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setEditingCombo(combo)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>

        {editingCombo && (
          <VariantEditModal
            combo={editingCombo}
            data={getVariantData(editingCombo)}
            onSave={(d) => setVariantData(editingCombo, d)}
            onClose={() => setEditingCombo(null)}
          />
        )}
      </>
    ) : null;

  return (
    <>
      {optionsCard}
      {variantsTable}
    </>
  );
}

function getCombinations(options: VariantOption[]): string[][] {
  const withValues = options.filter((o) => o.values.length > 0);
  if (withValues.length === 0) return [];

  let combos: string[][] = withValues[0]!.values.map((v) => [v]);
  for (let i = 1; i < withValues.length; i++) {
    const next: string[][] = [];
    for (const combo of combos) {
      for (const val of withValues[i]!.values) {
        next.push([...combo, val]);
      }
    }
    combos = next;
  }
  return combos;
}
