"use client";

import { Search, X } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  OPPORTUNITY_TYPE_ORDER,
  type OpportunityType,
  type OpportunityStatus,
  type OpportunityDifficulty,
  type Year,
} from "@/lib/journey";

export type OpportunityFilters = {
  q: string;
  type: OpportunityType | "all";
  year: Year | "all";
  difficulty: OpportunityDifficulty | "all";
  status: OpportunityStatus | "all";
};

const DIFFICULTIES: OpportunityDifficulty[] = ["beginner", "intermediate", "advanced", "mixed"];
const STATUSES: OpportunityStatus[] = ["open", "upcoming", "annual", "closed", "archived"];
const YEARS: Year[] = [1, 2, 3, 4];

export function OpportunityFilter({
  filters,
  onChange,
  resultCount,
}: {
  filters: OpportunityFilters;
  onChange: (next: OpportunityFilters) => void;
  resultCount: number;
}) {
  const { t } = useLang();
  const isDefault =
    !filters.q &&
    filters.type === "all" &&
    filters.year === "all" &&
    filters.difficulty === "all" &&
    filters.status === "all";

  return (
    <div className="card p-4 sm:p-5 space-y-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder={t("opps.searchPlaceholder")}
          aria-label={t("common.search")}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-navy-700 dark:bg-navy-900"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-500 mr-1">{t("common.year")}:</span>
        <FilterPill active={filters.year === "all"} onClick={() => onChange({ ...filters, year: "all" })}>
          {t("common.allYears")}
        </FilterPill>
        {YEARS.map((y) => (
          <FilterPill key={y} active={filters.year === y} onClick={() => onChange({ ...filters, year: y })}>
            {t(`common.year${y}`)}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="text-xs font-medium text-slate-500">
          {t("opps.filter.type")}
          <select
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value as OpportunityFilters["type"] })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200"
          >
            <option value="all">{t("opps.allTypes")}</option>
            {OPPORTUNITY_TYPE_ORDER.map((ty) => (
              <option key={ty} value={ty}>
                {t(`opps.type.${ty}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-medium text-slate-500">
          {t("opps.filter.difficulty")}
          <select
            value={filters.difficulty}
            onChange={(e) =>
              onChange({ ...filters, difficulty: e.target.value as OpportunityFilters["difficulty"] })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200"
          >
            <option value="all">{t("opps.allDifficulty")}</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {t(`opps.diff.${d}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-medium text-slate-500">
          {t("opps.filter.status")}
          <select
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as OpportunityFilters["status"] })}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200"
          >
            <option value="all">{t("opps.allStatus")}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`opps.status.${s}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {t("opps.count").replace("{n}", String(resultCount))}
        </p>
        {!isDefault && (
          <button
            onClick={() =>
              onChange({ q: "", type: "all", year: "all", difficulty: "all", status: "all" })
            }
            className="btn-ghost text-sm"
          >
            <X className="h-4 w-4" /> {t("common.clearFilters")}
          </button>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        active
          ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
          : "surface-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800"
      }`}
    >
      {children}
    </button>
  );
}
