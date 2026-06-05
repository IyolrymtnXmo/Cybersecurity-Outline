/**
 * Type definitions for the Course Schedule Planner (หน้าจัดตารางเรียน).
 *
 * The data model is intentionally generic so it can later be fed from the real
 * course-registration system. The seed data in `sample-data.ts` is built from
 * the traditional timetable images the user provided and is for demo only.
 */

/** Day keys, Monday → Saturday. `sun` is included so the data model can carry
 *  an optional Sunday in the future without a breaking change, but the planner
 *  renders Mon–Sat by default. */
export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type DayKey = (typeof DAY_KEYS)[number] | "sun";

/** All days the data model understands (Mon–Sun). */
export const ALL_DAY_KEYS: DayKey[] = [...DAY_KEYS, "sun"];

export type Semester = "1" | "2";

/** A single meeting of a course (one day/time block). */
export type CourseSection = {
  id: string;
  courseCode: string;
  section: string;
  day: DayKey;
  startTime: string; // "HH:MM" 24h
  endTime: string; // "HH:MM" 24h
  room?: string;
  building?: string;
  instructor?: string;
};

/** A searchable course in the catalog. */
export type CourseOption = {
  id: string;
  code: string;
  thaiName?: string;
  englishName?: string;
  credits?: number;
  category?: string;
  /** Concrete meeting times, if known. */
  sections?: CourseSection[];
};

/** A block that has been placed on the schedule grid. */
export type ScheduleItem = {
  id: string;
  courseCode: string;
  title: string;
  section?: string;
  day: DayKey;
  startTime: string; // "HH:MM"
  endTime: string; // "HH:MM"
  credits?: number;
  room?: string;
  building?: string;
  instructor?: string;
  /** Palette key (see BLOCK_PALETTES) or "category". */
  color?: BlockColorKey;
  category?: string;
  note?: string;
};

export type ScheduleState = {
  academicYear: string;
  semester: Semester;
  dateRange?: string;
  startHour: string; // "08:00"
  endHour: string; // "19:30" | "20:00"
  slotMinutes: 30 | 60;
  items: ScheduleItem[];
};

export type ScheduleConflict = {
  day: DayKey;
  a: ScheduleItem;
  b: ScheduleItem;
};

export type ViewMode = "traditional" | "modern" | "compact";

/** Block placement geometry for a single day row (lane-packed). */
export type PlacedItem = {
  item: ScheduleItem;
  lane: number; // 0-based vertical lane within the day row
  lanes: number; // total lanes used by the overlap cluster
  conflict: boolean;
};

/* ------------------------------------------------------------------ colors */

export type BlockColorKey =
  | "sky"
  | "violet"
  | "amber"
  | "emerald"
  | "rose"
  | "cyan"
  | "indigo"
  | "teal"
  | "slate";

export type BlockPalette = {
  key: BlockColorKey;
  label: string;
  /** Left accent bar + dot. */
  bar: string;
  /** Full container classes (light + dark) for a soft, readable block. */
  block: string;
  /** Small swatch classes for the color picker. */
  swatch: string;
};

/**
 * Soft, readable palettes for course blocks. Class strings are written out in
 * full so Tailwind's JIT scanner picks them up.
 */
export const BLOCK_PALETTES: Record<BlockColorKey, BlockPalette> = {
  sky: {
    key: "sky",
    label: "Core / สีฟ้า",
    bar: "bg-sky-500",
    block:
      "bg-sky-50 border-sky-300 text-sky-950 dark:bg-sky-500/15 dark:border-sky-500/40 dark:text-sky-100",
    swatch: "bg-sky-500",
  },
  violet: {
    key: "violet",
    label: "Elective / ม่วง",
    bar: "bg-violet-500",
    block:
      "bg-violet-50 border-violet-300 text-violet-950 dark:bg-violet-500/15 dark:border-violet-500/40 dark:text-violet-100",
    swatch: "bg-violet-500",
  },
  amber: {
    key: "amber",
    label: "Math / เหลือง",
    bar: "bg-amber-500",
    block:
      "bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-500/15 dark:border-amber-500/40 dark:text-amber-100",
    swatch: "bg-amber-500",
  },
  emerald: {
    key: "emerald",
    label: "Gen-Ed / เขียว",
    bar: "bg-emerald-500",
    block:
      "bg-emerald-50 border-emerald-300 text-emerald-950 dark:bg-emerald-500/15 dark:border-emerald-500/40 dark:text-emerald-100",
    swatch: "bg-emerald-500",
  },
  rose: {
    key: "rose",
    label: "Rose / ชมพู",
    bar: "bg-rose-500",
    block:
      "bg-rose-50 border-rose-300 text-rose-950 dark:bg-rose-500/15 dark:border-rose-500/40 dark:text-rose-100",
    swatch: "bg-rose-500",
  },
  cyan: {
    key: "cyan",
    label: "Cyan / ฟ้าใส",
    bar: "bg-cyan-500",
    block:
      "bg-cyan-50 border-cyan-300 text-cyan-950 dark:bg-cyan-500/15 dark:border-cyan-500/40 dark:text-cyan-100",
    swatch: "bg-cyan-500",
  },
  indigo: {
    key: "indigo",
    label: "Indigo / คราม",
    bar: "bg-indigo-500",
    block:
      "bg-indigo-50 border-indigo-300 text-indigo-950 dark:bg-indigo-500/15 dark:border-indigo-500/40 dark:text-indigo-100",
    swatch: "bg-indigo-500",
  },
  teal: {
    key: "teal",
    label: "Teal / เขียวน้ำทะเล",
    bar: "bg-teal-500",
    block:
      "bg-teal-50 border-teal-300 text-teal-950 dark:bg-teal-500/15 dark:border-teal-500/40 dark:text-teal-100",
    swatch: "bg-teal-500",
  },
  slate: {
    key: "slate",
    label: "Lab / เทา",
    bar: "bg-slate-500",
    block:
      "bg-slate-100 border-slate-300 text-slate-900 dark:bg-slate-500/20 dark:border-slate-500/40 dark:text-slate-100",
    swatch: "bg-slate-500",
  },
};

export const BLOCK_COLOR_KEYS = Object.keys(BLOCK_PALETTES) as BlockColorKey[];

/** Map a catalog category to a default block color. */
export function categoryToColor(category?: string): BlockColorKey {
  switch (category) {
    case "core":
      return "sky";
    case "elective":
      return "violet";
    case "math":
      return "amber";
    case "gened":
      return "emerald";
    case "free":
      return "teal";
    case "lab":
      return "slate";
    default:
      return "cyan";
  }
}

/** Resolve the palette for an item (explicit color → category → default). */
export function paletteFor(item: ScheduleItem): BlockPalette {
  const key = item.color ?? categoryToColor(item.category);
  return BLOCK_PALETTES[key] ?? BLOCK_PALETTES.cyan;
}

/* ---------------------------------------------------------------- day meta */

export const DAY_LABELS: Record<DayKey, { th: string; en: string; short: string }> = {
  mon: { th: "จันทร์", en: "Monday", short: "MON" },
  tue: { th: "อังคาร", en: "Tuesday", short: "TUE" },
  wed: { th: "พุธ", en: "Wednesday", short: "WED" },
  thu: { th: "พฤหัสบดี", en: "Thursday", short: "THU" },
  fri: { th: "ศุกร์", en: "Friday", short: "FRI" },
  sat: { th: "เสาร์", en: "Saturday", short: "SAT" },
  sun: { th: "อาทิตย์", en: "Sunday", short: "SUN" },
};
