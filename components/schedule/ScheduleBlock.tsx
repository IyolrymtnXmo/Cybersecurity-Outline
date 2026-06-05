"use client";

import { AlertTriangle, GripVertical, Pencil, Trash2 } from "lucide-react";
import type { PlacedItem, ViewMode } from "@/lib/schedule/types";
import { DAY_LABELS, paletteFor } from "@/lib/schedule/types";
import { formatRange } from "@/lib/schedule/utils";
import { LANE_GAP, PX_PER_MIN, GRID_START_MIN } from "./geometry";
import type { Locale } from "@/lib/i18n";

type Props = {
  placed: PlacedItem;
  rowHeight: number;
  viewMode: ViewMode;
  locale: Locale;
  isDragging: boolean;
  onPointerDownMove: (e: React.PointerEvent) => void;
  onPointerDownResize: (e: React.PointerEvent, edge: "start" | "end") => void;
  onEdit: () => void;
  onDelete: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  t: (k: string) => string;
};

export function ScheduleBlock({
  placed,
  rowHeight,
  viewMode,
  locale,
  isDragging,
  onPointerDownMove,
  onPointerDownResize,
  onEdit,
  onDelete,
  onKeyDown,
  t,
}: Props) {
  const { item, lane, lanes, conflict } = placed;
  const palette = paletteFor(item);

  const startMin = toMin(item.startTime);
  const endMin = toMin(item.endTime);
  const left = (startMin - GRID_START_MIN) * PX_PER_MIN;
  const width = Math.max((endMin - startMin) * PX_PER_MIN, 28);

  const slotHeight = rowHeight / lanes;
  const top = lane * slotHeight;
  const height = slotHeight - LANE_GAP;

  const compact = viewMode === "compact";
  const showMeta = !compact && width >= 92;
  const showTime = width >= 110 && (viewMode === "modern" || !compact);

  const dayLabel = DAY_LABELS[item.day]?.[locale] ?? item.day;
  const ariaLabel =
    `${item.courseCode} ${item.title}, ${dayLabel} ${formatRange(item.startTime, item.endTime)}` +
    (item.room ? `, ${locale === "th" ? "ห้อง" : "room"} ${item.room}` : "") +
    (conflict ? `, ${locale === "th" ? "เวลาชนกัน" : "time conflict"}` : "");

  const title =
    `${item.courseCode} — ${item.title}\n` +
    `${dayLabel} ${formatRange(item.startTime, item.endTime)}` +
    (item.section ? ` · ${locale === "th" ? "กลุ่ม" : "Group"} ${item.section}` : "") +
    (item.room ? `\n${locale === "th" ? "ห้อง" : "Room"}: ${item.room}` : "") +
    (item.building ? ` (${item.building})` : "") +
    (item.instructor ? `\n${locale === "th" ? "ผู้สอน" : "Instructor"}: ${item.instructor}` : "") +
    (conflict ? `\n⚠ ${locale === "th" ? "เวลาชนกับวิชาอื่น" : "Time conflict"}` : "");

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      title={title}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDownMove}
      style={{ left, width, top, height }}
      className={[
        "group/block absolute flex select-none flex-col overflow-hidden rounded-lg border text-left shadow-sm transition",
        "cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1",
        palette.block,
        conflict ? "ring-2 ring-rose-500/80 ring-offset-1" : "",
        isDragging ? "opacity-40" : "opacity-100 hover:shadow-md hover:-translate-y-[1px]",
        compact ? "px-1.5 py-0.5" : "px-2 py-1",
      ].join(" ")}
    >
      {/* left accent bar */}
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 w-1 ${palette.bar}`}
        aria-hidden
      />

      {/* resize handle — start */}
      <span
        role="separator"
        aria-label={locale === "th" ? "ปรับเวลาเริ่ม" : "Adjust start time"}
        onPointerDown={(e) => onPointerDownResize(e, "start")}
        className="absolute inset-y-0 left-0 z-10 w-2 cursor-ew-resize opacity-0 group-hover/block:opacity-100"
      />
      {/* resize handle — end */}
      <span
        role="separator"
        aria-label={locale === "th" ? "ปรับเวลาสิ้นสุด" : "Adjust end time"}
        onPointerDown={(e) => onPointerDownResize(e, "end")}
        className="absolute inset-y-0 right-0 z-10 w-2 cursor-ew-resize opacity-0 group-hover/block:opacity-100"
      />

      {/* actions */}
      <div className="absolute right-1 top-1 z-20 flex gap-0.5 opacity-0 transition group-hover/block:opacity-100 group-focus-within/block:opacity-100">
        <button
          type="button"
          aria-label={`${t("schedule.edit")} ${item.courseCode}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="rounded bg-white/70 p-0.5 text-slate-600 hover:bg-white hover:text-navy-800 dark:bg-navy-900/70 dark:text-slate-300 dark:hover:bg-navy-900"
        >
          <Pencil className="h-3 w-3" />
        </button>
        <button
          type="button"
          aria-label={`${t("schedule.delete")} ${item.courseCode}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="rounded bg-white/70 p-0.5 text-slate-600 hover:bg-rose-50 hover:text-rose-600 dark:bg-navy-900/70 dark:text-slate-300 dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      <div className="relative z-0 ml-1 min-w-0 flex-1">
        <div className="flex items-center gap-1">
          {!compact && (
            <GripVertical className="h-3 w-3 shrink-0 opacity-40" aria-hidden />
          )}
          <span className="truncate font-mono text-[11px] font-bold leading-tight">
            {item.courseCode}
          </span>
          {conflict && (
            <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 rounded bg-rose-500/15 px-1 text-[9px] font-semibold text-rose-700 dark:text-rose-300">
              <AlertTriangle className="h-2.5 w-2.5" aria-hidden />
              {t("schedule.conflictBadge")}
            </span>
          )}
        </div>
        {!compact && (
          <p className="truncate text-[11px] font-medium leading-tight">{item.title}</p>
        )}
        {showMeta && (item.section || item.room) && (
          <p className="truncate text-[10px] opacity-80">
            {item.section ? `${locale === "th" ? "กลุ่ม" : "Gr."} ${item.section}` : ""}
            {item.section && item.room ? " · " : ""}
            {item.room ?? ""}
          </p>
        )}
        {showTime && (
          <p className="truncate font-mono text-[10px] opacity-70">
            {formatRange(item.startTime, item.endTime)}
          </p>
        )}
      </div>
    </div>
  );
}

function toMin(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
