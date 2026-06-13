"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import type { ChecklistItem, ChecklistCategory } from "@/lib/journey";

const CATEGORY_DOT: Record<ChecklistCategory, string> = {
  academic: "bg-sky-500",
  document: "bg-amber-500",
  skill: "bg-emerald-500",
  competition: "bg-fuchsia-500",
  portfolio: "bg-cyan-500",
  career: "bg-violet-500",
  advisor: "bg-orange-500",
  other: "bg-slate-400",
};

export function SemesterChecklist({
  termId,
  items,
}: {
  termId: string;
  items: ChecklistItem[];
}) {
  const { t } = useLang();
  const storageKey = `cy-journey-checklist-${termId}`;
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setChecked(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [storageKey]);

  const persist = (next: Record<string, boolean>) => {
    setChecked(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {}
  };

  const toggle = (id: string) => persist({ ...checked, [id]: !checked[id] });
  const reset = () => persist({});

  const doneCount = items.filter((i) => checked[i.id]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  return (
    <div>
      {/* progress */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-navy-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${ready ? pct : 0}%` }}
          />
        </div>
        <span className="text-sm font-semibold text-navy-900 dark:text-white tabular-nums">
          {doneCount}/{items.length}
        </span>
        {doneCount > 0 && (
          <button
            onClick={reset}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="reset"
            title={t("common.clearFilters")}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => {
          const isDone = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                  isDone
                    ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/20 dark:bg-emerald-500/5"
                    : "border-slate-200 bg-white hover:bg-slate-50 dark:border-navy-700 dark:bg-navy-900 dark:hover:bg-navy-800"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-slate-300 dark:text-navy-600" />
                )}
                <span className="flex-1">
                  <span
                    className={`text-sm leading-snug ${
                      isDone
                        ? "text-slate-400 line-through dark:text-slate-500"
                        : "text-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[item.category]}`} />
                    {item.required && (
                      <span className="badge border-amber-300 bg-amber-50 text-amber-700 dark:text-amber-300">
                        {t("journey.required")}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[11px] text-slate-400">{t("journey.checklist.note")}</p>
    </div>
  );
}
