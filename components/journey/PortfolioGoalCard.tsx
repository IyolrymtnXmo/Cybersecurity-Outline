"use client";

import { Target } from "lucide-react";

/** A single portfolio goal, rendered as a numbered target card. */
export function PortfolioGoalCard({ goal, index }: { goal: string; index: number }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-cyan-200/60 bg-cyan-50/50 p-3.5 dark:border-cyan-500/20 dark:bg-cyan-500/5">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
        <Target className="h-4 w-4" />
      </span>
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <span className="mr-1 font-semibold text-cyan-700 dark:text-cyan-400">{index + 1}.</span>
        {goal}
      </p>
    </div>
  );
}
