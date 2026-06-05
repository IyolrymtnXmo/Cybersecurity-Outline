/** Shared layout geometry for the schedule grid (screen rendering). */

import type { BlockColorKey, DayKey, ViewMode } from "@/lib/schedule/types";
import { toMinutes } from "@/lib/schedule/utils";

export type DragKind = "new" | "move" | "resize-start" | "resize-end";

/** Payload carried while dragging a course in from the search panel. */
export type NewDragPayload = {
  courseCode: string;
  title: string;
  section?: string;
  credits?: number;
  room?: string;
  building?: string;
  instructor?: string;
  category?: string;
  color?: BlockColorKey;
  durationMin: number;
  preferredDay?: DayKey;
};

/** Live preview of an in-progress drag, rendered by the grid. */
export type DragPreview = {
  kind: DragKind;
  day: DayKey;
  startMin: number;
  endMin: number;
  valid: boolean;
};

/** Fixed start of the time axis: 08:00. */
export const GRID_START_MIN = toMinutes("08:00"); // 480

/** Horizontal pixels per minute on screen. 1 hour = 96px, 30 min = 48px. */
export const PX_PER_MIN = 1.6;

/** Height of a single stacking lane, per view mode. */
export const LANE_HEIGHT: Record<ViewMode, number> = {
  traditional: 66,
  modern: 82,
  compact: 46,
};

/** Vertical gap between stacked blocks within a row. */
export const LANE_GAP = 4;

/** Width of the sticky day-label column. */
export const DAY_LABEL_WIDTH = 76;

export type GridGeometry = {
  startMin: number;
  endMin: number;
  slotMinutes: 30 | 60;
  pxPerMinute: number;
  laneHeight: number;
};

export function endMinFor(endHour: string): number {
  return toMinutes(endHour);
}

/** Total drawable width of the time track in px. */
export function trackWidth(geo: GridGeometry): number {
  return (geo.endMin - geo.startMin) * geo.pxPerMinute;
}
