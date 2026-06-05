/**
 * Pure helpers for the Schedule Planner: time math, conflict detection,
 * lane packing for overlapping blocks, validation, and localStorage I/O.
 */

import {
  type DayKey,
  type PlacedItem,
  type ScheduleConflict,
  type ScheduleItem,
  type Semester,
  type ViewMode,
  DAY_KEYS,
} from "./types";

/* --------------------------------------------------------------- time math */

/** "08:30" → 510 (minutes since midnight). Returns NaN on bad input. */
export function toMinutes(time: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!m) return NaN;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return NaN;
  return h * 60 + min;
}

/** 510 → "08:30". */
export function toTime(minutes: number): string {
  const safe = Math.max(0, Math.round(minutes));
  const h = Math.floor(safe / 60);
  const m = safe % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Display a range as "08:00 - 11:00". */
export function formatRange(start: string, end: string): string {
  return `${start} - ${end}`;
}

export function durationMinutes(item: { startTime: string; endTime: string }): number {
  return toMinutes(item.endTime) - toMinutes(item.startTime);
}

/** Round a minute value to the nearest slot boundary. */
export function snapToSlot(minutes: number, slot: number): number {
  return Math.round(minutes / slot) * slot;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Build the list of slot boundaries (in minutes) for the time axis. */
export function buildSlots(startMin: number, endMin: number, slot: number): number[] {
  const out: number[] = [];
  for (let m = startMin; m <= endMin; m += slot) out.push(m);
  return out;
}

/** Hour marks (whole hours) within the range — used for the header & gridlines. */
export function buildHourMarks(startMin: number, endMin: number): number[] {
  const out: number[] = [];
  const first = Math.ceil(startMin / 60) * 60;
  for (let m = first; m <= endMin; m += 60) out.push(m);
  return out;
}

/* ------------------------------------------------------------- conflicts */

/** True if two placed blocks share a day and their time ranges overlap. */
export function hasTimeConflict(a: ScheduleItem, b: ScheduleItem): boolean {
  if (a.id === b.id) return false;
  if (a.day !== b.day) return false;
  const aStart = toMinutes(a.startTime);
  const aEnd = toMinutes(a.endTime);
  const bStart = toMinutes(b.startTime);
  const bEnd = toMinutes(b.endTime);
  if ([aStart, aEnd, bStart, bEnd].some((n) => Number.isNaN(n))) return false;
  return aStart < bEnd && bStart < aEnd;
}

/** Find every overlapping pair in the schedule. */
export function findScheduleConflicts(items: ScheduleItem[]): ScheduleConflict[] {
  const conflicts: ScheduleConflict[] = [];
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (hasTimeConflict(items[i], items[j])) {
        conflicts.push({ day: items[i].day, a: items[i], b: items[j] });
      }
    }
  }
  return conflicts;
}

/** Set of item ids that participate in at least one conflict. */
export function conflictingIds(items: ScheduleItem[]): Set<string> {
  const ids = new Set<string>();
  for (const c of findScheduleConflicts(items)) {
    ids.add(c.a.id);
    ids.add(c.b.id);
  }
  return ids;
}

/* ------------------------------------------------------------ lane packing */

/**
 * Assign overlapping items in a single day to stacked lanes so they don't
 * cover each other. Classic interval-graph greedy colouring per overlap
 * cluster. Returns items with lane index + total lanes in their cluster.
 */
export function placeDayItems(dayItems: ScheduleItem[]): PlacedItem[] {
  const sorted = [...dayItems].sort(
    (a, b) =>
      toMinutes(a.startTime) - toMinutes(b.startTime) ||
      toMinutes(a.endTime) - toMinutes(b.endTime),
  );
  const conflictSet = conflictingIds(dayItems);

  const placed: PlacedItem[] = [];
  let cluster: PlacedItem[] = [];
  let clusterEnd = -1;
  const laneEnds: number[] = []; // end-minute currently occupying each lane

  const flush = () => {
    const lanes = laneEnds.length || 1;
    for (const p of cluster) p.lanes = lanes;
    cluster = [];
    laneEnds.length = 0;
    clusterEnd = -1;
  };

  for (const item of sorted) {
    const start = toMinutes(item.startTime);
    const end = toMinutes(item.endTime);

    // New cluster if this item starts after everything placed so far ends.
    if (start >= clusterEnd && cluster.length > 0) flush();

    // Find a free lane (one whose last item ends at/before this start).
    let lane = laneEnds.findIndex((e) => e <= start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(end);
    } else {
      laneEnds[lane] = end;
    }

    const p: PlacedItem = {
      item,
      lane,
      lanes: 1,
      conflict: conflictSet.has(item.id),
    };
    cluster.push(p);
    placed.push(p);
    clusterEnd = Math.max(clusterEnd, end);
  }
  flush();

  return placed;
}

/* ------------------------------------------------------------- validation */

export type ValidationResult = { ok: boolean; errors: string[] };

export function validateItem(
  item: Pick<ScheduleItem, "courseCode" | "day" | "startTime" | "endTime">,
  bounds: { startMin: number; endMin: number },
): ValidationResult {
  const errors: string[] = [];
  const start = toMinutes(item.startTime);
  const end = toMinutes(item.endTime);

  if (!item.courseCode || !item.courseCode.trim()) {
    errors.push("ต้องระบุรหัสวิชา / Course code is required");
  }
  if (Number.isNaN(start) || Number.isNaN(end)) {
    errors.push("รูปแบบเวลาไม่ถูกต้อง / Invalid time format");
  } else {
    if (start >= end) {
      errors.push("เวลาเริ่มต้องน้อยกว่าเวลาสิ้นสุด / Start must be before end");
    }
    if (start < bounds.startMin || end > bounds.endMin) {
      errors.push(
        `เวลาต้องอยู่ในช่วง ${toTime(bounds.startMin)}–${toTime(bounds.endMin)} / Out of range`,
      );
    }
  }
  if (!DAY_KEYS.includes(item.day as (typeof DAY_KEYS)[number])) {
    errors.push("วันต้องอยู่ระหว่างจันทร์–เสาร์ / Day must be Mon–Sat");
  }
  return { ok: errors.length === 0, errors };
}

/* ----------------------------------------------------------------- summary */

export function totalCredits(items: ScheduleItem[]): number {
  // Count each unique course code once (a course may meet multiple times).
  const seen = new Map<string, number>();
  for (const it of items) {
    if (it.credits != null && !seen.has(it.courseCode)) {
      seen.set(it.courseCode, it.credits);
    }
  }
  let sum = 0;
  for (const c of seen.values()) sum += c;
  return sum;
}

/** Total contact hours per day (minutes → hours). */
export function dailyHours(items: ScheduleItem[]): Record<DayKey, number> {
  const out = {} as Record<DayKey, number>;
  for (const d of DAY_KEYS) out[d] = 0;
  for (const it of items) {
    const mins = durationMinutes(it);
    if (!Number.isNaN(mins) && mins > 0) {
      out[it.day] = (out[it.day] ?? 0) + mins;
    }
  }
  for (const d of DAY_KEYS) out[d] = Math.round((out[d] / 60) * 10) / 10;
  return out;
}

/** Find the first open slot on the given day for a new block of `duration`. */
export function findFreeSlot(
  items: ScheduleItem[],
  day: DayKey,
  duration: number,
  bounds: { startMin: number; endMin: number },
  slot: number,
): { startTime: string; endTime: string } {
  const dayItems = items
    .filter((i) => i.day === day)
    .map((i) => [toMinutes(i.startTime), toMinutes(i.endTime)] as const)
    .sort((a, b) => a[0] - b[0]);

  let cursor = bounds.startMin;
  for (const [s, e] of dayItems) {
    if (cursor + duration <= s) break; // gap found before this block
    cursor = Math.max(cursor, e);
  }
  cursor = snapToSlot(cursor, slot);
  if (cursor + duration > bounds.endMin) cursor = bounds.startMin; // fall back
  return { startTime: toTime(cursor), endTime: toTime(cursor + duration) };
}

/* --------------------------------------------------------------- persistence */

export const STORAGE_KEY = "cy-schedule-planner-v1";

export type PersistedSchedule = {
  academicYear: string;
  endHour: string;
  slotMinutes: 30 | 60;
  viewMode: ViewMode;
  semester: Semester;
  bySemester: Record<Semester, ScheduleItem[]>;
  savedAt: string;
};

export function saveSchedule(data: PersistedSchedule): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function loadSchedule(): PersistedSchedule | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedSchedule;
    if (!parsed || !parsed.bySemester) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearSavedSchedule(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------- misc */

let idCounter = 0;
/** Stable-ish unique id that doesn't rely on crypto (works in export build). */
export function newId(prefix = "item"): string {
  idCounter += 1;
  return `${prefix}-${Date.now().toString(36)}-${idCounter.toString(36)}`;
}

export function exportJson(items: Record<Semester, ScheduleItem[]>): string {
  return JSON.stringify(items, null, 2);
}
