"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { FileQuestion } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { resources, RESOURCE_CATEGORY_ORDER, type ResourceItem } from "@/lib/journey";
import { ResourceCard } from "./ResourceCard";
import { ResourceFilter, type ResourceFilters } from "./ResourceFilter";

const DEFAULT_FILTERS: ResourceFilters = {
  q: "",
  category: "all",
  year: "all",
  status: "all",
};

export function ResourceHub() {
  const { t } = useLang();
  const [filters, setFilters] = useState<ResourceFilters>(DEFAULT_FILTERS);

  const fuse = useMemo(
    () =>
      new Fuse(resources, {
        keys: ["title", "description", "tags", "category"],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    const base: ResourceItem[] = filters.q.trim()
      ? fuse.search(filters.q.trim()).map((r) => r.item)
      : resources;

    return base.filter((r) => {
      if (filters.category !== "all" && r.category !== filters.category) return false;
      if (
        filters.year !== "all" &&
        !(r.year === undefined || r.year === "all" || r.year === filters.year)
      )
        return false;
      if (filters.status !== "all" && r.status !== filters.status) return false;
      return true;
    });
  }, [filters, fuse]);

  // group by category for a tidy layout (preserve canonical order)
  const grouped = useMemo(() => {
    return RESOURCE_CATEGORY_ORDER.map((cat) => ({
      cat,
      items: results.filter((r) => r.category === cat),
    })).filter((g) => g.items.length > 0);
  }, [results]);

  return (
    <div className="space-y-6">
      <ResourceFilter filters={filters} onChange={setFilters} resultCount={results.length} />

      {results.length === 0 ? (
        <div className="card grid place-items-center gap-3 py-16 text-center">
          <FileQuestion className="h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">{t("resources.empty")}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((g) => (
            <section key={g.cat}>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                {t(`resources.cat.${g.cat}`)}
                <span className="rounded-full surface-2 px-2 py-0.5 text-xs">{g.items.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
