"use client";

import { useMemo } from "react";
import { CalendarRange } from "lucide-react";
import type { DayKey, ScheduleItem, ViewMode } from "@/lib/schedule/types";
import { DAY_LABELS } from "@/lib/schedule/types";
import {
  buildHourMarks,
  buildSlots,
  dailyHours,
  placeDayItems,
  toTime,
} from "@/lib/schedule/utils";
import {
  type DragPreview,
  type GridGeometry,
  DAY_LABEL_WIDTH,
  LANE_GAP,
  trackWidth,
} from "./geometry";
import { ScheduleBlock } from "./ScheduleBlock";
import type { Locale } from "@/lib/i18n";

type Props = {
  items: ScheduleItem[];
  geometry: GridGeometry;
  viewMode: ViewMode;
  locale: Locale;
  days: DayKey[];
  draggingItemId: string | null;
  dragPreview: DragPreview | null;
  registerTrack: (day: DayKey, el: HTMLDivElement | null) => void;
  onBlockMoveStart: (item: ScheduleItem, e: React.PointerEvent) => void;
  onBlockResizeStart: (
    item: ScheduleItem,
    edge: "start" | "end",
    e: React.PointerEvent,
  ) => void;
  onBlockEdit: (item: ScheduleItem) => void;
  onBlockDelete: (item: ScheduleItem) => void;
  onBlockKeyDown: (item: ScheduleItem, e: React.KeyboardEvent) => void;
  onLoadMockup?: () => void;
  t: (k: string) => string;
};

export function ScheduleGrid({
  items,
  geometry,
  viewMode,
  locale,
  days,
  draggingItemId,
  dragPreview,
  registerTrack,
  onBlockMoveStart,
  onBlockResizeStart,
  onBlockEdit,
  onBlockDelete,
  onBlockKeyDown,
  onLoadMockup,
  t,
}: Props) {
  const width = trackWidth(geometry);
  const slots = useMemo(
    () => buildSlots(geometry.startMin, geometry.endMin, geometry.slotMinutes),
    [geometry.startMin, geometry.endMin, geometry.slotMinutes],
  );
  const hours = useMemo(
    () => buildHourMarks(geometry.startMin, geometry.endMin),
    [geometry.startMin, geometry.endMin],
  );

  const perDay = useMemo(() => {
    const map = new Map<
      DayKey,
      { placed: ReturnType<typeof placeDayItems>; rowHeight: number }
    >();
    for (const day of days) {
      const placed = placeDayItems(items.filter((i) => i.day === day));
      const maxLanes = placed.reduce((m, p) => Math.max(m, p.lanes), 1);
      map.set(day, { placed, rowHeight: maxLanes * geometry.laneHeight });
    }
    return map;
  }, [items, days, geometry.laneHeight]);

  const hoursByDay = useMemo(() => dailyHours(items), [items]);
  const px = geometry.pxPerMinute;

  return (
    <div className="card flex h-full flex-col overflow-hidden">
      <div className="scroll-fade flex-1 overflow-x-auto">
        <div className="flex h-full min-w-max flex-col" style={{ minWidth: DAY_LABEL_WIDTH + width }}>
          {/* time header */}
          <div className="flex flex-none border-b border-slate-200 bg-slate-50/80 dark:border-navy-700 dark:bg-navy-900/60">
            <div
              className="sticky left-0 z-20 shrink-0 border-r border-slate-200 bg-slate-50/95 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 backdrop-blur dark:border-navy-700 dark:bg-navy-900/95 dark:text-slate-400"
              style={{ width: DAY_LABEL_WIDTH }}
            >
              {locale === "th" ? "วัน \\ เวลา" : "Day \\ Time"}
            </div>
            <div className="relative h-9 flex-1" style={{ width }}>
              {hours.map((m) => {
                if (geometry.endMin - m < 40 && m !== geometry.startMin) return null;
                return (
                  <div
                    key={m}
                    className="absolute top-0 flex h-full items-center"
                    style={{ left: (m - geometry.startMin) * px }}
                  >
                    <span className={`${m === geometry.startMin ? "translate-x-2" : "-translate-x-1/2"} font-mono text-[11px] font-medium text-slate-500 dark:text-slate-400`}>
                      {toTime(m)}
                    </span>
                  </div>
                );
              })}
              {/* end label */}
              <div
                className="absolute top-0 flex h-full items-center"
                style={{ left: width }}
              >
                <span className="-translate-x-full font-mono text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  {toTime(geometry.endMin)}
                </span>
              </div>
            </div>
          </div>

          {/* day rows */}
          {days.map((day, rowIdx) => {
            const entry = perDay.get(day)!;
            const isPreviewDay = dragPreview?.day === day;
            return (
              <div
                key={day}
                className={`flex flex-1 border-b border-slate-200 last:border-b-0 dark:border-navy-700 ${
                  rowIdx % 2 === 1 ? "bg-slate-50/40 dark:bg-navy-900/20" : ""
                }`}
              >
                {/* day label */}
                <div
                  className="sticky left-0 z-20 flex shrink-0 flex-col justify-center border-r border-slate-200 bg-white/95 px-2 py-1 backdrop-blur dark:border-navy-700 dark:bg-navy-950/95"
                  style={{ width: DAY_LABEL_WIDTH }}
                >
                  <span className="text-sm font-semibold text-navy-900 dark:text-slate-100">
                    {DAY_LABELS[day][locale]}
                  </span>
                  <span className="font-mono text-[9px] uppercase text-slate-400">
                    {DAY_LABELS[day].short}
                  </span>
                  {hoursByDay[day] > 0 && (
                    <span className="mt-0.5 text-[9px] text-cyan-700 dark:text-cyan-400">
                      {hoursByDay[day]} {locale === "th" ? "ชม." : "h"}
                    </span>
                  )}
                </div>

                {/* time track */}
                <div
                  ref={(el) => registerTrack(day, el)}
                  data-day={day}
                  className="relative flex-1"
                  style={{ width, minHeight: Math.max(geometry.laneHeight, entry.rowHeight + LANE_GAP) }}
                >
                  {/* slot gridlines */}
                  {slots.map((m) => {
                    const isHour = m % 60 === 0;
                    return (
                      <span
                        key={m}
                        aria-hidden
                        className={`absolute inset-y-0 border-l ${
                          isHour
                            ? "border-slate-200 dark:border-navy-700"
                            : "border-slate-100 dark:border-navy-800/70"
                        }`}
                        style={{ left: (m - geometry.startMin) * px }}
                      />
                    );
                  })}

                  {/* drag preview */}
                  {isPreviewDay && dragPreview && (
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute inset-y-0.5 z-30 rounded-lg border-2 border-dashed ${
                        dragPreview.valid
                          ? "border-cyan-500 bg-cyan-400/10"
                          : "border-rose-500 bg-rose-400/10"
                      }`}
                      style={{
                        left: (dragPreview.startMin - geometry.startMin) * px,
                        width:
                          (dragPreview.endMin - dragPreview.startMin) * px,
                      }}
                    >
                      <span className="absolute left-1 top-1 rounded bg-cyan-600 px-1 font-mono text-[9px] text-white">
                        {toTime(dragPreview.startMin)}–{toTime(dragPreview.endMin)}
                      </span>
                    </div>
                  )}

                  {/* blocks */}
                  {entry.placed.map((p) => (
                    <ScheduleBlock
                      key={p.item.id}
                      placed={p}
                      rowHeight={entry.rowHeight}
                      viewMode={viewMode}
                      locale={locale}
                      isDragging={draggingItemId === p.item.id}
                      onPointerDownMove={(e) => onBlockMoveStart(p.item, e)}
                      onPointerDownResize={(e, edge) =>
                        onBlockResizeStart(p.item, edge, e)
                      }
                      onEdit={() => onBlockEdit(p.item)}
                      onDelete={() => onBlockDelete(p.item)}
                      onKeyDown={(e) => onBlockKeyDown(p.item, e)}
                      t={t}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* empty state */}
      {items.length === 0 && (
        <div className="flex flex-col items-center gap-2 border-t border-dashed border-slate-200 px-4 py-10 text-center dark:border-navy-700">
          <CalendarRange className="h-8 w-8 text-slate-300 dark:text-navy-600" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t("schedule.empty.title")}
          </p>
          <p className="max-w-md text-xs text-slate-500 dark:text-slate-400">
            {t("schedule.empty.desc")}
          </p>
          {onLoadMockup && (
            <button
              type="button"
              onClick={onLoadMockup}
              className="mt-3 btn-outline px-4 py-2 text-xs font-semibold"
            >
              {locale === "th" ? "โหลดตารางตัวอย่าง (Mock-up)" : "Load Mock-up"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
