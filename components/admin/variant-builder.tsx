"use client";

import { useRef, useState } from "react";

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
    <div className="option-drag-handle">
      <svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor">
        <circle cx="3.5" cy="2" r="1" />
        <circle cx="8.5" cy="2" r="1" />
        <circle cx="3.5" cy="6" r="1" />
        <circle cx="8.5" cy="6" r="1" />
        <circle cx="3.5" cy="10" r="1" />
        <circle cx="8.5" cy="10" r="1" />
      </svg>
    </div>
  );
}

function DeleteIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="option-delete-btn"
      onClick={onClick}
      title="Delete"
    >
      <svg
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <path
          d="M5.5 2.5h5M3 4h10M4.5 4v8.5a1 1 0 001 1h5a1 1 0 001-1V4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 6.5v4M9.5 6.5v4" strokeLinecap="round" />
      </svg>
    </button>
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
    <div className="option-editing">
      <div className="option-editing-inner">
        <div className="option-name-row">
          <DragHandle />
          <label className="form-field" style={{ flex: 1 }}>
            <span className="form-label">Option name</span>
            <input
              className="form-input"
              value={option.name}
              onChange={(e) => onChange({ ...option, name: e.target.value })}
              placeholder="e.g. Size"
            />
          </label>
          <DeleteIcon onClick={onRemove} />
        </div>

        <div className="option-values-section">
          <span className="form-label">Option values</span>
          <div className="option-values-list">
            {option.values.map((v, i) => (
              <div key={i} className="option-value-row">
                <DragHandle />
                <input
                  className="form-input"
                  style={{ flex: 1 }}
                  value={v}
                  onChange={(e) => updateValue(i, e.target.value)}
                />
                <DeleteIcon onClick={() => removeValue(i)} />
              </div>
            ))}
            <div className="option-value-row">
              <DragHandle />
              <input
                ref={addRef}
                className="form-input option-add-value-input"
                style={{ flex: 1 }}
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
          <button type="button" className="btn" onClick={onDone}>
            Done
          </button>
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
    <div className="option-collapsed">
      <DragHandle />
      <div className="option-collapsed-content">
        <span className="option-collapsed-name">{option.name}</span>
        <div className="option-collapsed-values">
          {option.values.map((v, i) => (
            <span key={i} className="option-value-pill">
              {v}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="btn" onClick={onEdit}>
        Edit
      </button>
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
    <div className="variant-modal-backdrop" onClick={onClose}>
      <div className="variant-modal" onClick={(e) => e.stopPropagation()}>
        <div className="variant-modal-header">
          <h3 className="variant-modal-title">{combo.join(" / ")}</h3>
          <button type="button" className="option-delete-btn" onClick={onClose}>
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="variant-modal-body">
          <label className="form-field">
            <span className="form-label">Price (₫)</span>
            <input
              className="form-input"
              type="text"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label className="form-field">
            <span className="form-label">Quantity</span>
            <input
              className="form-input"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
        </div>
        <div className="variant-modal-footer">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onSave({ combination: combo, price, quantity });
              onClose();
            }}
          >
            Done
          </button>
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
    <div className="form-card">
      <div className="form-card-header">
        <h2 className="form-card-title">Options</h2>
      </div>
      <div className="form-card-body">
        <div className="variant-builder">
          <input type="hidden" name={name} value={JSON.stringify(options)} />
          <input
            type="hidden"
            name="variantData"
            value={JSON.stringify(allVariantData)}
          />

          <div className="variant-toggle-row">
            <label className="variant-toggle-label">
              <input
                type="checkbox"
                checked={hasVariants}
                onChange={toggleVariants}
                className="checkbox"
              />
              <span>This product has options, like size or color</span>
            </label>
          </div>

          {hasVariants && (
            <div className="option-list">
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
                <div className="option-add-row">
                  <button
                    type="button"
                    className="option-add-btn"
                    onClick={addOption}
                  >
                    <span className="option-add-plus">+</span>
                    Add another option
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const variantsTable =
    combinations.length > 0 ? (
      <>
        <div className="form-card variant-table-section">
          <div className="variant-table-header">
            <span className="variant-table-title">Variants</span>
            <div className="variant-select-actions">
              <span className="variant-select-label">Select</span>
              <button
                type="button"
                className="variant-select-link"
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
                    className="variant-select-link"
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

          <table className="variant-table">
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th style={{ width: 56 }}></th>
                <th>Variant</th>
                <th style={{ width: 140 }}>Price</th>
                <th style={{ width: 80 }}>Quantity</th>
                <th style={{ width: 60 }}></th>
              </tr>
            </thead>
            <tbody>
              {combinations.map((combo) => {
                const key = combo.join(" / ");
                const data = getVariantData(combo);
                return (
                  <tr
                    key={key}
                    className={selectedVariants.has(key) ? "selected" : ""}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedVariants.has(key)}
                        onChange={() => toggleSelectOne(key)}
                        className="checkbox"
                      />
                    </td>
                    <td>
                      <div className="variant-img-placeholder">
                        <svg
                          viewBox="0 0 20 20"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="16"
                            height="16"
                            rx="2"
                            strokeDasharray="3 2"
                          />
                          <path
                            d="M8 13l2-2 2 2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="8" cy="8" r="1.5" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <span className="variant-combo-name">{key}</span>
                    </td>
                    <td>
                      <div className="variant-cell-input-wrap">
                        <span className="variant-cell-currency">₫</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="variant-cell-input"
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
                    </td>
                    <td>
                      <input
                        type="number"
                        className="variant-cell-input"
                        value={data.quantity}
                        onChange={(e) =>
                          setVariantData(combo, {
                            ...data,
                            quantity: e.target.value,
                          })
                        }
                        placeholder="0"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        style={{ fontSize: 12, padding: "4px 10px" }}
                        onClick={() => setEditingCombo(combo)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

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
