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
    <div className="relative pt-6 pb-4">
      {/* Horizontal connector line for desktop (connects years) */}
      <div className="absolute top-[5.5rem] left-[12.5%] right-[12.5%] hidden h-0.5 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-400 opacity-30 lg:block dark:opacity-20" />
      
      <div className="grid gap-8 lg:gap-6 lg:grid-cols-4 relative z-10">
        {YEARS.map((y) => (
          <div key={y} className="relative flex flex-col gap-8">
            {/* Year Header Card */}
            <div className="relative group mx-auto w-full max-w-[220px] lg:max-w-none">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-20 blur-md transition-opacity duration-500 group-hover:opacity-60 dark:from-cyan-500 dark:to-blue-600" />
              <div className="relative flex flex-col items-center justify-center rounded-2xl bg-white px-4 py-6 shadow-xl dark:bg-navy-900 border border-slate-100 dark:border-navy-700 overflow-hidden">
                <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-cyan-400/10 blur-2xl" />
                <div className="absolute -left-6 -bottom-6 w-20 h-20 rounded-full bg-blue-500/10 blur-2xl" />
                
                <p className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold z-10">
                  {t("journey.year")}
                </p>
                <p className="text-5xl font-black mt-1 bg-gradient-to-br from-navy-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-400 z-10">
                  {y}
                </p>
              </div>
            </div>

            {/* Terms Timeline */}
            <div className="space-y-6 relative pl-1 sm:pl-2">
              {/* Vertical connector line for each year's terms */}
              <div className="absolute left-[11px] sm:left-[15px] top-6 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400/50 to-transparent dark:from-cyan-500/30 z-0" />
              
              {byYear(y).map((term) => {
                const a = ACCENT_STYLES[term.accent];
                return (
                  <Link
                    key={term.id}
                    href={`/journey/${term.id}`}
                    className="group relative flex gap-3 sm:gap-4 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Node on the vertical line */}
                    <div className="relative z-10 mt-1.5 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-white dark:bg-navy-900 border-[2px] border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:scale-125 group-hover:border-cyan-500 transition-all duration-300">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-500" />
                    </div>

                    {/* Term Card Content */}
                    <div className={`flex-1 overflow-hidden rounded-xl border ${a.border} bg-white dark:bg-navy-900/40 p-4 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-cyan-400/60 dark:group-hover:border-cyan-400/50 relative`}>
                      <div className={`absolute top-0 left-0 w-1 h-full ${a.bgSoft} opacity-60 group-hover:opacity-100 transition-opacity`} />
                      <div className="pl-1">
                        <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${a.text}`}>
                          {t("journey.term")} {term.semester}
                        </p>
                        <p className="mt-1.5 text-sm sm:text-base font-bold leading-snug text-navy-900 dark:text-white transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                          {termHeadline(term, locale)}
                        </p>
                        <ul className="mt-4 space-y-2.5">
                          {term.portfolioGoals.slice(0, 2).map((g, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-500/70" />
                              <span className="line-clamp-2">{loc(g, locale)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
