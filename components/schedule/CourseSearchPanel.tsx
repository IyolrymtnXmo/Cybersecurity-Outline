"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { ChevronDown, GripVertical, Plus, Search, X } from "lucide-react";
import {
  type CourseOption,
  type CourseSection,
  BLOCK_PALETTES,
  DAY_LABELS,
  categoryToColor,
} from "@/lib/schedule/types";
import { durationMinutes, formatRange } from "@/lib/schedule/utils";
import type { NewDragPayload } from "./geometry";
import type { Locale } from "@/lib/i18n";

type Props = {
  courses: CourseOption[];
  locale: Locale;
  t: (k: string) => string;
  onAdd: (payload: NewDragPayload) => void;
  onStartDragNew: (payload: NewDragPayload, e: React.PointerEvent) => void;
};

const DEFAULT_DURATION = 60;

export function CourseSearchPanel({
  courses,
  locale,
  t,
  onAdd,
  onStartDragNew,
}: Props) {
  const [query, setQuery] = useState("");
  const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});

  const toggleCategory = (cat: string) => {
    setCollapsedCats((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const fuse = useMemo(
    () =>
      new Fuse(courses, {
        keys: [
          { name: "code", weight: 2 },
          { name: "englishName", weight: 1.5 },
          { name: "thaiName", weight: 1.5 },
          "category",
          "sections.instructor",
          "sections.room",
          "sections.section",
        ],
        threshold: 0.35,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [courses],
  );

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) {
      const groups: Record<string, CourseOption[]> = {};
      for (const c of courses) {
        const cat = c.category || "other";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(c);
      }
      return Object.values(groups).flat();
    }
    return fuse.search(q).slice(0, 100).map((r) => r.item);
  }, [query, fuse, courses]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, CourseOption[]> = {};
    for (const c of results) {
      const cat = c.category || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(c);
    }
    const order = ["core", "elective", "math", "gened", "free", "lab", "other"];
    return Object.entries(groups).sort((a, b) => {
      let idxA = order.indexOf(a[0]);
      let idxB = order.indexOf(b[0]);
      if (idxA === -1) idxA = 99;
      if (idxB === -1) idxB = 99;
      return idxA - idxB;
    });
  }, [results]);

  const payloadFromSection = (
    course: CourseOption,
    sec: CourseSection,
  ): NewDragPayload => ({
    courseCode: course.code,
    title: nameOf(course, locale),
    section: sec.section,
    credits: course.credits,
    room: sec.room,
    building: sec.building,
    instructor: sec.instructor,
    category: course.category,
    color: categoryToColor(course.category),
    durationMin: Math.max(durationMinutes(sec) || DEFAULT_DURATION, 30),
    preferredDay: sec.day,
  });

  const payloadFromCourse = (course: CourseOption): NewDragPayload => ({
    courseCode: course.code,
    title: nameOf(course, locale),
    credits: course.credits,
    category: course.category,
    color: categoryToColor(course.category),
    durationMin: DEFAULT_DURATION,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t("schedule.search.label")}
          placeholder={t("schedule.search.placeholder")}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-navy-900 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 dark:border-navy-700 dark:bg-navy-950 dark:text-slate-100"
        />
        {query && (
          <button
            type="button"
            aria-label={t("schedule.search.clear")}
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mb-2 px-0.5 text-[11px] text-slate-500 dark:text-slate-400">
        {t("schedule.search.count").replace("{n}", String(results.length))}
        <span className="ml-1 hidden sm:inline">· {t("schedule.search.hint")}</span>
      </p>

      <div className="scroll-fade -mx-1 flex-1 space-y-2 overflow-y-auto px-1 pb-2">
        {groupedResults.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-xs text-slate-500 dark:border-navy-700 dark:text-slate-400">
            {t("schedule.search.empty")}
          </p>
        )}

        {groupedResults.map(([cat, catsCourses]) => {
          const isCollapsed = collapsedCats[cat] !== false;
          return (
            <div key={cat} className="mb-4 last:mb-0">
              <button
                type="button"
                onClick={() => toggleCategory(cat)}
                className="sticky top-0 z-10 flex w-full items-center justify-between rounded-md bg-[var(--color-card)]/95 px-1 py-1.5 backdrop-blur transition-colors hover:bg-slate-50 dark:hover:bg-navy-800/50"
              >
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {formatCategoryName(cat, locale)}
                </h3>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`}
                />
              </button>
              
              {!isCollapsed && (
                <div className="mt-2 space-y-2">
                  {catsCourses.map((course) => {
                    const palette = BLOCK_PALETTES[categoryToColor(course.category)];
                    const hasSections = course.sections && course.sections.length > 0;
                    return (
                      <div
                        key={course.id}
                        className="card overflow-hidden border-slate-200 p-0 dark:border-navy-700"
                      >
                        <div className="flex items-start gap-2 px-3 py-2">
                          <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${palette.bar}`} aria-hidden />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-navy-900 dark:text-slate-100">
                                {course.code}
                              </span>
                              {course.credits != null && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-navy-800 dark:text-slate-300">
                                  {course.credits} {locale === "th" ? "นก." : "cr"}
                                </span>
                              )}
                            </div>
                            <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                              {nameOf(course, locale)}
                            </p>
                          </div>
                        </div>
                        <ul className="border-t border-slate-100 dark:border-navy-800">
                          {hasSections ? (
                            course.sections!.map((sec) => (
                              <li
                                key={sec.id}
                                onPointerDown={(e) => onStartDragNew(payloadFromSection(course, sec), e)}
                                className="flex cursor-grab touch-none items-center gap-2 px-3 py-2 text-[11px] transition hover:bg-cyan-50/60 active:cursor-grabbing dark:hover:bg-cyan-500/10"
                              >
                                <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-navy-600" aria-hidden />
                                <div className="flex min-w-0 flex-1 flex-col">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                                      {DAY_LABELS[sec.day][locale].slice(0, locale === "th" ? 2 : 3)}
                                    </span>
                                    <span className="font-mono text-slate-500 dark:text-slate-400">
                                      {formatRange(sec.startTime, sec.endTime)}
                                    </span>
                                  </div>
                                  {sec.room && (
                                    <span className="text-[10px] text-slate-400">{sec.room}</span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  aria-label={`${t("schedule.add")} ${course.code} ${t("schedule.field.section")} ${sec.section}`}
                                  onPointerDown={(e) => e.stopPropagation()}
                                  onClick={() => onAdd(payloadFromSection(course, sec))}
                                  className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-navy-700 px-2 py-1.5 text-[10px] font-medium text-white transition hover:bg-navy-800 dark:bg-cyan-500 dark:text-navy-950 dark:hover:bg-cyan-400"
                                >
                                  <Plus className="h-3 w-3" /> {t("schedule.add")}
                                </button>
                              </li>
                            ))
                          ) : (
                            <li
                              onPointerDown={(e) => onStartDragNew(payloadFromCourse(course), e)}
                              className="flex cursor-grab touch-none items-center gap-2 px-3 py-2 text-[11px] transition hover:bg-cyan-50/60 active:cursor-grabbing dark:hover:bg-cyan-500/10"
                            >
                              <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-navy-600" aria-hidden />
                              <div className="flex min-w-0 flex-1 flex-col">
                                <span className="font-semibold text-slate-500 dark:text-slate-400">
                                  {locale === "th" ? "กำหนดเวลาเอง / ลากลงตาราง" : "Arrange time / Drag to grid"}
                                </span>
                              </div>
                              <button
                                type="button"
                                aria-label={`${t("schedule.add")} ${course.code}`}
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => onAdd(payloadFromCourse(course))}
                                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-navy-700 px-2 py-1.5 text-[10px] font-medium text-white transition hover:bg-navy-800 dark:bg-cyan-500 dark:text-navy-950 dark:hover:bg-cyan-400"
                              >
                                <Plus className="h-3 w-3" /> {t("schedule.add")}
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function nameOf(course: CourseOption, locale: Locale): string {
  if (locale === "en") return course.englishName ?? course.thaiName ?? course.code;
  return course.thaiName ?? course.englishName ?? course.code;
}

function formatCategoryName(cat: string, locale: Locale): string {
  switch (cat) {
    case "core": return locale === "th" ? "วิชาแกน (Core)" : "Core Courses";
    case "elective": return locale === "th" ? "วิชาเลือก (Elective)" : "Elective Courses";
    case "math": return locale === "th" ? "วิทยาศาสตร์และคณิตศาสตร์" : "Math & Science";
    case "gened": return locale === "th" ? "หมวดวิชาศึกษาทั่วไป (Gen-Ed)" : "General Education";
    case "free": return locale === "th" ? "หมวดวิชาเลือกเสรี (Free Elective)" : "Free Electives";
    case "lab": return locale === "th" ? "กลุ่มวิชาปฏิบัติการ (Lab)" : "Laboratory";
    default: return locale === "th" ? "วิชาอื่นๆ (Other)" : "Other Courses";
  }
}
