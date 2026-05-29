"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, Filter, BookOpen, Layers, CheckSquare, AlertTriangle } from "lucide-react";
import { courses } from "@/lib/data";
import type { Course, CourseCategory } from "@/lib/types";
import { CourseCard } from "@/components/CourseCard";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import { useLang } from "@/components/LanguageProvider";

const CATS: { id: CourseCategory | "all"; label: string }[] = [
  { id: "all", label: "ทั้งหมด" },
  { id: "core", label: "Core" },
  { id: "gened", label: "Gen-Ed" },
  { id: "math", label: "Math & Sci" },
  { id: "elective", label: "Elective" },
  { id: "free", label: "Free Elective" },
];

export default function CoursesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CourseCategory | "all">("all");
  const [year, setYear] = useState<number | "all">("all");
  const [riskOnly, setRiskOnly] = useState(false);
  const [hasPrereq, setHasPrereq] = useState(false);
  const [selected, setSelected] = useState<Course | null>(null);
  const { t } = useLang();

  const fuse = useMemo(
    () =>
      new Fuse(courses, {
        keys: ["code", "thaiName", "englishName", "id"],
        threshold: 0.4,
      }),
    [],
  );

  const filtered = useMemo(() => {
    let list = q.trim()
      ? fuse.search(q).map((r) => r.item)
      : courses;
    if (cat !== "all") list = list.filter((c) => c.category === cat);
    if (year !== "all") list = list.filter((c) => c.year === year);
    if (riskOnly) list = list.filter((c) => c.riskLevel && c.riskLevel !== "low");
    if (hasPrereq)
      list = list.filter((c) => c.prerequisites.some((p) => p.type !== "none"));
    return list;
  }, [q, cat, year, riskOnly, hasPrereq, fuse]);

  const grouped = useMemo(() => {
    const groups: Record<string, Course[]> = {};
    CATS.filter((c) => c.id !== "all").forEach((c) => {
      groups[c.id] = [];
    });
    filtered.forEach((c) => {
      if (groups[c.category]) {
        groups[c.category].push(c);
      } else {
        groups[c.category] = [c];
      }
    });
    return groups;
  }, [filtered]);

  return (
    <div className="container-page py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          {t("catalog.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-slate-100">
          {t("catalog.title")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {t("catalog.subtitle")} — {t("catalog.showing")} {filtered.length} / {courses.length}{" "}
          {t("catalog.total")}
        </p>
      </header>

      <div className="card p-5 mb-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("catalog.placeholder")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-sm focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/10 dark:border-navy-600 dark:bg-navy-900 dark:focus:bg-navy-800 dark:text-white transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-navy-600 dark:bg-navy-900">
              <BookOpen className="h-4 w-4 ml-2 text-slate-500 dark:text-slate-400" />
              <select
                value={year}
                onChange={(e) =>
                  setYear(e.target.value === "all" ? "all" : Number(e.target.value))
                }
                className="bg-transparent pl-1 pr-6 py-1.5 focus:outline-none dark:text-white cursor-pointer"
              >
                <option value="all">{t("common.allYears")}</option>
                <option value={1}>{t("common.year")} 1</option>
                <option value={2}>{t("common.year")} 2</option>
                <option value={3}>{t("common.year")} 3</option>
                <option value={4}>{t("common.year")} 4</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 hover:bg-slate-100 dark:border-navy-600 dark:bg-navy-900 dark:hover:bg-navy-800 transition-colors select-none">
              <input
                type="checkbox"
                checked={hasPrereq}
                onChange={(e) => setHasPrereq(e.target.checked)}
                className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              <span className="flex items-center gap-1.5 dark:text-slate-200">
                <CheckSquare className="h-4 w-4 text-slate-400" />
                {t("common.hasPrereq")}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 hover:bg-amber-100 dark:border-amber-900/50 dark:bg-amber-900/20 dark:hover:bg-amber-900/40 transition-colors select-none text-amber-900 dark:text-amber-200">
              <input
                type="checkbox"
                checked={riskOnly}
                onChange={(e) => setRiskOnly(e.target.checked)}
                className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                {t("common.onlyRisky")}
              </span>
            </label>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mt-5 border-t border-slate-100 pt-5 dark:border-navy-700">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">หมวดหมู่วิชา</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => {
              const isSelected = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id as CourseCategory | "all")}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-navy-800 dark:text-slate-300 dark:hover:bg-navy-700"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {CATS.filter((c) => c.id !== "all").map((c) => {
          const items = grouped[c.id];
          if (!items || items.length === 0) return null;

          return (
            <section key={c.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-2 dark:border-navy-700">
                <Layers className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <h2 className="text-xl font-semibold text-navy-900 dark:text-slate-100">
                  {c.label}
                </h2>
                <span className="flex h-6 items-center justify-center rounded-full bg-slate-100 px-2.5 text-xs font-medium text-slate-600 dark:bg-navy-800 dark:text-slate-300">
                  {items.length}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((course) => (
                  <CourseCard key={course.id} course={course} onClick={(co) => setSelected(co)} />
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="card py-16 text-center text-slate-500 dark:text-slate-400">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-navy-800">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-lg font-medium">{t("common.noResults")}</p>
            <p className="mt-1 text-sm">ลองค้นหาด้วยคำอื่น หรือยกเลิกตัวกรองบางตัว</p>
          </div>
        )}
      </div>

      <CourseDetailDrawer
        course={selected}
        onClose={() => setSelected(null)}
        onSelect={(id) => {
          const c = courses.find((x) => x.id === id);
          if (c) setSelected(c);
        }}
      />
    </div>
  );
}
