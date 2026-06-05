"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { GripVertical, Plus, Search, X } from "lucide-react";
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
    if (!q) return courses.slice(0, 40);
    return fuse.search(q).slice(0, 40).map((r) => r.item);
  }, [query, fuse, courses]);

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
    <div className="flex h-full flex-col">
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
        {results.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 px-3 py-6 text-center text-xs text-slate-500 dark:border-navy-700 dark:text-slate-400">
            {t("schedule.search.empty")}
          </p>
        )}

        {results.map((course) => {
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
                {!hasSections && (
                  <button
                    type="button"
                    aria-label={`${t("schedule.add")} ${course.code}`}
                    onPointerDown={(e) => onStartDragNew(payloadFromCourse(course), e)}
                    onClick={() => onAdd(payloadFromCourse(course))}
                    className="inline-flex shrink-0 cursor-grab items-center gap-1 rounded-lg bg-navy-700 px-2 py-1.5 text-xs font-medium text-white transition hover:bg-navy-800 active:cursor-grabbing dark:bg-cyan-500 dark:text-navy-950 dark:hover:bg-cyan-400"
                  >
                    <Plus className="h-3.5 w-3.5" /> {t("schedule.add")}
                  </button>
                )}
              </div>

              {hasSections && (
                <ul className="border-t border-slate-100 dark:border-navy-800">
                  {course.sections!.map((sec) => (
                    <li
                      key={sec.id}
                      onPointerDown={(e) => onStartDragNew(payloadFromSection(course, sec), e)}
                      className="flex cursor-grab touch-none items-center gap-2 px-3 py-1.5 text-[11px] transition hover:bg-cyan-50/60 active:cursor-grabbing dark:hover:bg-cyan-500/10"
                    >
                      <GripVertical className="h-3.5 w-3.5 shrink-0 text-slate-300 dark:text-navy-600" aria-hidden />
                      <span className="w-10 shrink-0 font-medium text-slate-500 dark:text-slate-400">
                        {DAY_LABELS[sec.day][locale].slice(0, locale === "th" ? 2 : 3)}
                      </span>
                      <span className="font-mono text-slate-600 dark:text-slate-300">
                        {formatRange(sec.startTime, sec.endTime)}
                      </span>
                      <span className="ml-auto flex items-center gap-1.5">
                        {sec.room && (
                          <span className="text-slate-500 dark:text-slate-400">{sec.room}</span>
                        )}
                        <button
                          type="button"
                          aria-label={`${t("schedule.add")} ${course.code} ${t("schedule.field.section")} ${sec.section}`}
                          onPointerDown={(e) => e.stopPropagation()}
                          onClick={() => onAdd(payloadFromSection(course, sec))}
                          className="rounded-md bg-navy-700 p-1 text-white transition hover:bg-navy-800 dark:bg-cyan-500 dark:text-navy-950 dark:hover:bg-cyan-400"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
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
