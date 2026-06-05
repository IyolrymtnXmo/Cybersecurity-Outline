"use client";

import { useState } from "react";
import { AlertTriangle, BookOpen, CheckCircle2, ChevronDown, Clock } from "lucide-react";
import { DAY_LABELS, type ScheduleConflict, type ScheduleItem } from "@/lib/schedule/types";
import { durationMinutes, formatRange, totalCredits } from "@/lib/schedule/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  conflicts: ScheduleConflict[];
  items: ScheduleItem[];
  locale: Locale;
  t: (k: string) => string;
};

export function ConflictSummary({ conflicts, items, locale, t }: Props) {
  const [open, setOpen] = useState(false);

  const courseCount = new Set(items.map((i) => i.courseCode)).size;
  const credits = totalCredits(items);
  const weeklyMinutes = items.reduce((sum, i) => {
    const d = durationMinutes(i);
    return sum + (Number.isNaN(d) ? 0 : Math.max(0, d));
  }, 0);
  const weeklyHours = Math.round((weeklyMinutes / 60) * 10) / 10;

  return (
    <div className="space-y-3">
      {/* stats strip */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat icon={<BookOpen className="h-4 w-4" />} label={t("schedule.stat.courses")} value={String(courseCount)} />
        <Stat icon={<CheckCircle2 className="h-4 w-4" />} label={t("schedule.stat.credits")} value={String(credits)} />
        <Stat icon={<Clock className="h-4 w-4" />} label={t("schedule.stat.hours")} value={`${weeklyHours}`} />
        <Stat
          icon={<AlertTriangle className="h-4 w-4" />}
          label={t("schedule.stat.conflicts")}
          value={String(conflicts.length)}
          tone={conflicts.length > 0 ? "warn" : "ok"}
        />
      </div>

      {conflicts.length > 0 ? (
        <div className="rounded-xl border border-rose-300 bg-rose-50 dark:border-rose-500/40 dark:bg-rose-500/10">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-300">
              <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />
              {t("schedule.conflict.found").replace("{n}", String(conflicts.length))}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-rose-500 transition ${open ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {open && (
            <ul className="space-y-1.5 border-t border-rose-200 px-3 py-2.5 text-xs dark:border-rose-500/30">
              {conflicts.map((c, i) => (
                <li
                  key={`${c.a.id}-${c.b.id}-${i}`}
                  className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-rose-700 dark:text-rose-200"
                >
                  <span className="font-semibold">{DAY_LABELS[c.day][locale]}:</span>
                  <span className="font-mono">{c.a.courseCode}</span>
                  <span className="opacity-70">({formatRange(c.a.startTime, c.a.endTime)})</span>
                  <span aria-hidden>⟷</span>
                  <span className="font-mono">{c.b.courseCode}</span>
                  <span className="opacity-70">({formatRange(c.b.startTime, c.b.endTime)})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        items.length > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
            {t("schedule.conflict.none")}
          </div>
        )
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "warn" | "ok";
}) {
  const toneCls =
    tone === "warn"
      ? "text-rose-600 dark:text-rose-400"
      : tone === "ok"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-cyan-700 dark:text-cyan-400";
  return (
    <div className="card flex items-center gap-2.5 px-3 py-2">
      <span className={`shrink-0 ${toneCls}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className={`text-lg font-bold leading-none ${toneCls}`}>{value}</p>
      </div>
    </div>
  );
}
