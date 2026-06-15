"use client";

import { Info } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

/**
 * Polite planning disclaimer shown on Journey / Resources / Opportunities.
 * Uses `common.disclaimerJourney` by default; pass a key to override.
 */
export function Disclaimer({ tkey = "common.disclaimerJourney" }: { tkey?: string }) {
  const { t } = useLang();
  return (
    <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300/90">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-relaxed">{t(tkey)}</p>
    </div>
  );
}
