"use client";

import { Trophy } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { OpportunityHub } from "@/components/opportunities/OpportunityHub";

export default function OpportunitiesPage() {
  const { t } = useLang();
  return (
    <div className="container-page py-8 space-y-6">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <Trophy className="h-3.5 w-3.5" /> {t("opps.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {t("opps.title")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t("opps.desc")}</p>
      </header>

      <Disclaimer />
      <OpportunityHub />
    </div>
  );
}
