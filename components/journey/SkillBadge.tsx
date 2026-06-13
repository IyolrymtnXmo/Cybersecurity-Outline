"use client";

import { useLang } from "@/components/LanguageProvider";
import { loc, type SkillItem, type SkillLevel } from "@/lib/journey";

const LEVEL_STYLE: Record<SkillLevel, { dot: string; chip: string }> = {
  foundation: { dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:text-emerald-300" },
  developing: { dot: "bg-sky-500", chip: "bg-sky-50 text-sky-700 border-sky-200 dark:text-sky-300" },
  applied: { dot: "bg-violet-500", chip: "bg-violet-50 text-violet-700 border-violet-200 dark:text-violet-300" },
  advanced: { dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700 border-amber-200 dark:text-amber-300" },
};

/** Compact pill — used on cards / dense lists. */
export function SkillChip({ skill }: { skill: SkillItem }) {
  const { locale } = useLang();
  const s = LEVEL_STYLE[skill.level];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full surface-2 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {loc(skill.name, locale)}
    </span>
  );
}

/** Full skill card with level + description — used in term detail. */
export function SkillBadge({ skill }: { skill: SkillItem }) {
  const { t, locale } = useLang();
  const s = LEVEL_STYLE[skill.level];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-navy-700 dark:bg-navy-900">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium text-navy-900 dark:text-white">{loc(skill.name, locale)}</p>
        <span className={`badge ${s.chip}`}>{t(`skill.level.${skill.level}`)}</span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        {loc(skill.description, locale)}
      </p>
    </div>
  );
}
