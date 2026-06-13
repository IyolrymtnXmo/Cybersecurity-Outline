"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  GitCommitVertical,
  LayoutGrid,
  ListChecks,
  Map as MapIcon,
  Target,
  CheckCircle2,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { ACCENT_STYLES, journeyTerms, loc, termHeadline, type Year } from "@/lib/journey";
import { JourneyTermCard } from "./JourneyTermCard";

type ViewMode = "timeline" | "card" | "checklist" | "roadmap";

const YEARS: Year[] = [1, 2, 3, 4];
const byYear = (y: Year) => journeyTerms.filter((tm) => tm.year === y);

export function JourneyTimeline() {
  const { t } = useLang();
  const [view, setView] = useState<ViewMode>("timeline");

  const views: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: "timeline", icon: <GitCommitVertical className="h-4 w-4" />, label: t("journey.view.timeline") },
    { id: "card", icon: <LayoutGrid className="h-4 w-4" />, label: t("journey.view.card") },
    { id: "checklist", icon: <ListChecks className="h-4 w-4" />, label: t("journey.view.checklist") },
    { id: "roadmap", icon: <MapIcon className="h-4 w-4" />, label: t("journey.view.roadmap") },
  ];

  return (
    <div className="space-y-6">
      {/* view switcher */}
      <div className="inline-flex flex-wrap gap-1 rounded-xl surface-2 p-1">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              view === v.id
                ? "bg-white text-navy-900 shadow-sm dark:bg-navy-700 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {v.icon} {v.label}
          </button>
        ))}
      </div>

      {view === "timeline" && <TimelineView />}
      {view === "card" && <CardView />}
      {view === "checklist" && <ChecklistView />}
      {view === "roadmap" && <RoadmapView />}
    </div>
  );
}

function YearHeading({ year }: { year: Year }) {
  const { t } = useLang();
  return (
    <h2 className="text-lg font-bold text-navy-900 dark:text-white">
      {t("journey.year")} {year}
    </h2>
  );
}

// --------------------------------------------------------------- timeline
function TimelineView() {
  const { t, locale } = useLang();
  return (
    <div className="relative ml-2 border-l-2 border-slate-200 pl-6 dark:border-navy-700 sm:ml-3 sm:pl-8">
      {journeyTerms.map((term) => {
        const a = ACCENT_STYLES[term.accent];
        return (
          <div key={term.id} className="relative pb-8 last:pb-0">
            <span
              className={`absolute -left-[33px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br ${a.gradient} text-[10px] font-bold text-white ring-4 ring-[var(--color-bg)] sm:-left-[41px]`}
            >
              {term.year}.{term.semester}
            </span>
            <Link
              href={`/journey/${term.id}`}
              className="card group block p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/40"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ${a.bgSoft} ${a.border} ${a.text}`}>
                  {t("journey.year")} {term.year} · {t("journey.term")} {term.semester}
                </span>
              </div>
              <h3 className="mt-2 font-semibold text-navy-900 dark:text-white">
                {termHeadline(term, locale)}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {loc(term.shortDescription, locale)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {term.skills.slice(0, 4).map((s) => (
                  <span key={s.id} className="chip surface-2 text-slate-600 dark:text-slate-300">
                    {loc(s.name, locale)}
                  </span>
                ))}
              </div>
              <span className={`mt-3 inline-flex items-center gap-1 text-sm font-semibold ${a.text}`}>
                {t("journey.openTerm")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------- cards
function CardView() {
  return (
    <div className="space-y-8">
      {YEARS.map((y) => (
        <section key={y}>
          <YearHeading year={y} />
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {byYear(y).map((term) => (
              <JourneyTermCard key={term.id} term={term} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

// --------------------------------------------------------------- checklist
function ChecklistView() {
  const { t, locale } = useLang();
  return (
    <div className="space-y-4">
      {journeyTerms.map((term) => {
        const a = ACCENT_STYLES[term.accent];
        return (
          <div key={term.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                <h3 className="font-semibold text-navy-900 dark:text-white">
                  {t("journey.year")} {term.year} · {t("journey.term")} {term.semester} — {termHeadline(term, locale)}
                </h3>
              </div>
              <Link href={`/journey/${term.id}`} className={`text-sm font-semibold ${a.text}`}>
                {t("journey.openTerm")} →
              </Link>
            </div>
            <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
              {term.checklist.map((c) => (
                <li key={c.id} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 dark:text-navy-600" />
                  <span>
                    {loc(c.text, locale)}
                    {c.required && (
                      <span className="ml-1.5 badge border-amber-300 bg-amber-50 text-amber-700 dark:text-amber-300">
                        {t("journey.required")}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

// ----------------------------------------------------------------- roadmap
function RoadmapView() {
  const { t, locale } = useLang();
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {YEARS.map((y) => (
        <div key={y} className="space-y-3">
          <div className="rounded-xl bg-navy-900 px-4 py-3 text-center text-white dark:bg-navy-800">
            <p className="text-xs uppercase tracking-widest text-cyan-300">{t("journey.year")}</p>
            <p className="text-2xl font-bold">{y}</p>
          </div>
          {byYear(y).map((term) => {
            const a = ACCENT_STYLES[term.accent];
            return (
              <Link
                key={term.id}
                href={`/journey/${term.id}`}
                className={`block rounded-xl border ${a.border} ${a.bgSoft} p-4 transition hover:-translate-y-0.5 hover:shadow-md`}
              >
                <p className={`text-xs font-semibold ${a.text}`}>
                  {t("journey.term")} {term.semester}
                </p>
                <p className="mt-1 text-sm font-semibold text-navy-900 dark:text-white">
                  {termHeadline(term, locale)}
                </p>
                <ul className="mt-2 space-y-1">
                  {term.portfolioGoals.slice(0, 2).map((g, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <Target className="mt-0.5 h-3 w-3 shrink-0 text-cyan-500" />
                      <span className="line-clamp-2">{loc(g, locale)}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
