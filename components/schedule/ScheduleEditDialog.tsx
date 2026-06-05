"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import {
  type BlockColorKey,
  type DayKey,
  type ScheduleItem,
  BLOCK_COLOR_KEYS,
  BLOCK_PALETTES,
  DAY_KEYS,
  DAY_LABELS,
} from "@/lib/schedule/types";
import { buildSlots, toTime, validateItem } from "@/lib/schedule/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  open: boolean;
  item: ScheduleItem | null;
  bounds: { startMin: number; endMin: number };
  slotMinutes: 30 | 60;
  locale: Locale;
  t: (k: string) => string;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
  onDelete: (id: string) => void;
};

export function ScheduleEditDialog({
  open,
  item,
  bounds,
  slotMinutes,
  locale,
  t,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [draft, setDraft] = useState<ScheduleItem | null>(item);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDraft(item);
  }, [item]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const timeOptions = useMemo(
    () => buildSlots(bounds.startMin, bounds.endMin, slotMinutes).map(toTime),
    [bounds.startMin, bounds.endMin, slotMinutes],
  );

  const validation = useMemo(
    () => (draft ? validateItem(draft, bounds) : { ok: false, errors: [] }),
    [draft, bounds],
  );

  if (!open || !draft) return null;

  const update = <K extends keyof ScheduleItem>(key: K, value: ScheduleItem[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  const handleSave = () => {
    if (!draft || !validation.ok) return;
    onSave(draft);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schedule-edit-title"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="card flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-navy-700">
          <h2
            id="schedule-edit-title"
            className="text-base font-semibold text-navy-900 dark:text-slate-100"
          >
            {t("schedule.edit.title")}
          </h2>
          <button
            type="button"
            aria-label={t("schedule.close")}
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("schedule.field.code")}>
              <input
                ref={firstFieldRef}
                value={draft.courseCode}
                onChange={(e) => update("courseCode", e.target.value)}
                className={inputCls}
                placeholder="CP423531"
              />
            </Field>
            <Field label={t("schedule.field.section")}>
              <input
                value={draft.section ?? ""}
                onChange={(e) => update("section", e.target.value)}
                className={inputCls}
                placeholder="1"
              />
            </Field>
          </div>

          <Field label={t("schedule.field.title")}>
            <input
              value={draft.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputCls}
              placeholder={locale === "th" ? "ชื่อวิชา" : "Course title"}
            />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label={t("schedule.field.day")}>
              <select
                value={draft.day}
                onChange={(e) => update("day", e.target.value as DayKey)}
                className={inputCls}
              >
                {DAY_KEYS.map((d) => (
                  <option key={d} value={d}>
                    {DAY_LABELS[d][locale]}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("schedule.field.start")}>
              <select
                value={draft.startTime}
                onChange={(e) => update("startTime", e.target.value)}
                className={inputCls}
              >
                {timeOptions.map((tm) => (
                  <option key={tm} value={tm}>
                    {tm}
                  </option>
                ))}
              </select>
            </Field>
            <Field label={t("schedule.field.end")}>
              <select
                value={draft.endTime}
                onChange={(e) => update("endTime", e.target.value)}
                className={inputCls}
              >
                {timeOptions.map((tm) => (
                  <option key={tm} value={tm}>
                    {tm}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label={t("schedule.field.room")}>
              <input
                value={draft.room ?? ""}
                onChange={(e) => update("room", e.target.value)}
                className={inputCls}
                placeholder="SC6201"
              />
            </Field>
            <Field label={t("schedule.field.building")}>
              <input
                value={draft.building ?? ""}
                onChange={(e) => update("building", e.target.value)}
                className={inputCls}
                placeholder="SC6"
              />
            </Field>
            <Field label={t("schedule.field.credits")}>
              <input
                type="number"
                min={0}
                max={12}
                value={draft.credits ?? ""}
                onChange={(e) =>
                  update(
                    "credits",
                    e.target.value === "" ? undefined : Number(e.target.value),
                  )
                }
                className={inputCls}
              />
            </Field>
          </div>

          <Field label={t("schedule.field.instructor")}>
            <input
              value={draft.instructor ?? ""}
              onChange={(e) => update("instructor", e.target.value)}
              className={inputCls}
              placeholder={locale === "th" ? "อาจารย์ผู้สอน" : "Instructor"}
            />
          </Field>

          <Field label={t("schedule.field.color")}>
            <div className="flex flex-wrap gap-2">
              {BLOCK_COLOR_KEYS.map((key) => {
                const active = (draft.color ?? "cyan") === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={BLOCK_PALETTES[key].label}
                    aria-pressed={active}
                    onClick={() => update("color", key as BlockColorKey)}
                    className={`h-7 w-7 rounded-full ${BLOCK_PALETTES[key].swatch} ring-offset-2 transition ${
                      active
                        ? "ring-2 ring-navy-900 dark:ring-cyan-400"
                        : "ring-0 hover:scale-110"
                    }`}
                  />
                );
              })}
            </div>
          </Field>

          <Field label={t("schedule.field.note")}>
            <textarea
              value={draft.note ?? ""}
              onChange={(e) => update("note", e.target.value)}
              rows={2}
              className={`${inputCls} resize-none`}
              placeholder={locale === "th" ? "หมายเหตุ (ถ้ามี)" : "Notes (optional)"}
            />
          </Field>

          {!validation.ok && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <ul className="space-y-0.5">
                {validation.errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-200 px-5 py-3 dark:border-navy-700">
          <button
            type="button"
            onClick={() => onDelete(draft.id)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
          >
            <Trash2 className="h-4 w-4" /> {t("schedule.delete")}
          </button>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-outline">
              {t("schedule.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!validation.ok}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("schedule.save")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-navy-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-navy-700 dark:bg-navy-950 dark:text-slate-100";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
