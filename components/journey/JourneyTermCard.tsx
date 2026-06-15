"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { ACCENT_STYLES, loc, termHeadline, type JourneyTerm } from "@/lib/journey";

export function JourneyTermCard({ term }: { term: JourneyTerm }) {
  const { t, locale } = useLang();
  const a = ACCENT_STYLES[term.accent];

  return (
    <Link
      href={`/journey/${term.id}`}
      className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
    >
      <div className={`bg-gradient-to-br ${a.gradient} px-5 py-4 text-white`}>
        <p className="text-xs font-medium opacity-90">
          {t("journey.year")} {term.year} · {t("journey.term")} {term.semester}
        </p>
        <p className="mt-0.5 text-sm font-semibold opacity-95">{termHeadline(term, locale)}</p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
          {loc(term.shortDescription, locale)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {term.skills.slice(0, 3).map((s) => (
            <span key={s.id} className="chip surface-2 text-slate-600 dark:text-slate-300">
              {loc(s.name, locale)}
            </span>
          ))}
          {term.skills.length > 3 && (
            <span className="chip surface-2 text-slate-400">+{term.skills.length - 3}</span>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-navy-800">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" /> {term.courseIds.length}
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> {term.skills.length}
            </span>
          </div>
          <span className={`inline-flex items-center gap-1 text-sm font-semibold ${a.text}`}>
            {t("journey.openTerm")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
