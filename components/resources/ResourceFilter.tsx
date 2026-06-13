"use client";

import { Search, X } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  RESOURCE_CATEGORY_ORDER,
  type ResourceCategory,
  type ResourceStatus,
  type Year,
} from "@/lib/journey";

export type ResourceFilters = {
  q: string;
  category: ResourceCategory | "all";
  year: Year | "all";
  status: ResourceStatus | "all";
};

const STATUSES: ResourceStatus[] = ["official", "recommended", "draft", "needs-update"];
const YEARS: Year[] = [1, 2, 3, 4];

export function ResourceFilter({
  filters,
  onChange,
  resultCount,
}: {
  filters: ResourceFilters;
  onChange: (next: ResourceFilters) => void;
  resultCount: number;
}) {
  const { t } = useLang();
  const isDefault =
    !filters.q &&
    filters.category === "all" &&
    filters.year === "all" &&
    filters.status === "all";

  return (
    <div className="card p-4 sm:p-5 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder={t("resources.searchPlaceholder")}
          aria-label={t("common.search")}
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-navy-700 dark:bg-navy-900"
        />
      </div>

      {/* Year pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-500 mr-1">{t("common.year")}:</span>
        <FilterPill
          active={filters.year === "all"}
          onClick={() => onChange({ ...filters, year: "all" })}
        >
          {t("common.allYears")}
        </FilterPill>
        {YEARS.map((y) => (
          <FilterPill
            key={y}
            active={filters.year === y}
            onClick={() => onChange({ ...filters, year: y })}
          >
            {t(`common.year${y}`)}
          </FilterPill>
        ))}
      </div>

      {/* Selects + clear */}
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex-1 min-w-[150px] text-xs font-medium text-slate-500">
          {t("resources.filter.category")}
          <select
            value={filters.category}
            onChange={(e) =>
              onChange({ ...filters, category: e.target.value as ResourceFilters["category"] })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200"
          >
            <option value="all">{t("resources.allCategories")}</option>
            {RESOURCE_CATEGORY_ORDER.map((c) => (
              <option key={c} value={c}>
                {t(`resources.cat.${c}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex-1 min-w-[150px] text-xs font-medium text-slate-500">
          {t("resources.filter.status")}
          <select
            value={filters.status}
            onChange={(e) =>
              onChange({ ...filters, status: e.target.value as ResourceFilters["status"] })
            }
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-cyan-500 dark:border-navy-700 dark:bg-navy-900 dark:text-slate-200"
          >
            <option value="all">{t("resources.allStatus")}</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {t(`resources.status.${s}`)}
              </option>
            ))}
          </select>
        </label>

        {!isDefault && (
          <button
            onClick={() =>
              onChange({ q: "", category: "all", year: "all", status: "all" })
            }
            className="btn-ghost text-sm"
          >
            <X className="h-4 w-4" /> {t("common.clearFilters")}
          </button>
        )}
      </div>

      <p className="text-xs text-slate-500">
        {t("resources.count").replace("{n}", String(resultCount))}
      </p>
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
