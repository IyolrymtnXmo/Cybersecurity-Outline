"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { SearchX } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  opportunities,
  OPPORTUNITY_TYPE_ORDER,
  type OpportunityItem,
} from "@/lib/journey";
import { OpportunityCard } from "./OpportunityCard";
import { OpportunityFilter, type OpportunityFilters } from "./OpportunityFilter";

const DEFAULT_FILTERS: OpportunityFilters = {
  q: "",
  type: "all",
  year: "all",
  difficulty: "all",
  status: "all",
};

export function OpportunityHub() {
  const { t } = useLang();
  const [filters, setFilters] = useState<OpportunityFilters>(DEFAULT_FILTERS);

  const fuse = useMemo(
    () =>
      new Fuse(opportunities, {
        keys: ["title", "description", "tags", "relatedSkills", "type"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    const base: OpportunityItem[] = filters.q.trim()
      ? fuse.search(filters.q.trim()).map((r) => r.item)
      : opportunities;

    const filtered = base.filter((o) => {
      if (filters.type !== "all" && o.type !== filters.type) return false;
      if (filters.year !== "all" && !o.suitableYears.includes(filters.year)) return false;
      if (filters.difficulty !== "all" && o.difficulty !== filters.difficulty) return false;
      if (filters.status !== "all" && o.status !== filters.status) return false;
      return true;
    });

    // stable sort by canonical type order, then title
    const order = (ty: OpportunityItem["type"]) => OPPORTUNITY_TYPE_ORDER.indexOf(ty);
    return [...filtered].sort((a, b) => order(a.type) - order(b.type) || a.title.localeCompare(b.title));
  }, [filters, fuse]);

  return (
    <div className="space-y-6">
      <OpportunityFilter filters={filters} onChange={setFilters} resultCount={results.length} />

      {results.length === 0 ? (
        <div className="card grid place-items-center gap-3 py-16 text-center">
          <SearchX className="h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">{t("opps.empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}
    </div>
  );
}
