"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  BookOpen,
  Sparkles,
  FileText,
  Trophy,
  Target,
  AlertTriangle,
  GraduationCap,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { getCourse } from "@/lib/data";
import {
  ACCENT_STYLES,
  journeyTerms,
  getResourcesForTerm,
  getOpportunitiesForTerm,
  type JourneyTerm,
} from "@/lib/journey";
import { Disclaimer } from "@/components/Disclaimer";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { SkillBadge } from "./SkillBadge";
import { PortfolioGoalCard } from "./PortfolioGoalCard";
import { SemesterChecklist } from "./SemesterChecklist";

export function JourneyDetail({ term }: { term: JourneyTerm }) {
  const { t, courseName } = useLang();
  const a = ACCENT_STYLES[term.accent];

  const idx = journeyTerms.findIndex((tm) => tm.id === term.id);
  const prev = idx > 0 ? journeyTerms[idx - 1] : null;
  const next = idx < journeyTerms.length - 1 ? journeyTerms[idx + 1] : null;

  const documents = getResourcesForTerm(term.year, term.semester);
  const opportunities = getOpportunitiesForTerm(term.year, term.semester);
  const courses = term.courseIds.map((id) => getCourse(id)).filter(Boolean);

  return (
    <div className="container-page py-8">
      <Link
        href="/journey"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
      >
        <ArrowLeft className="h-4 w-4" /> {t("journey.backToJourney")}
      </Link>

      {/* hero band */}
      <header className={`mt-4 overflow-hidden rounded-2xl bg-gradient-to-br ${a.gradient} text-white`}>
        <div className="p-6 md:p-8">
          <p className="text-sm font-medium opacity-90">
            {t("journey.year")} {term.year} · {t("journey.term")} {term.semester} · {term.theme}
          </p>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold">{term.themeThai}</h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base opacity-95 leading-relaxed">
            {term.shortDescription}
          </p>
        </div>
      </header>

      {/* pager */}
      <nav className="mt-4 flex items-center justify-between gap-3">
        {prev ? (
          <Link href={`/journey/${prev.id}`} className="btn-outline text-sm">
            <ChevronLeft className="h-4 w-4" /> {t("journey.prevTerm")}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/journey/${next.id}`} className="btn-outline text-sm">
            {t("journey.nextTerm")} <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* ---- main column ---- */}
        <div className="space-y-8 lg:col-span-2">
          <Section icon={<Compass className="h-5 w-5" />} title={t("journey.section.focus")} accent={a.text}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {term.academicFocus.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          {courses.length > 0 && (
            <Section icon={<BookOpen className="h-5 w-5" />} title={t("journey.section.courses")} accent={a.text}>
              <div className="grid gap-2 sm:grid-cols-2">
                {courses.map((c) => (
                  <Link
                    key={c!.id}
                    href={`/courses/${c!.id}`}
                    className="group rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 transition hover:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
                  >
                    <p className="font-mono text-[11px] text-slate-400">{c!.code}</p>
                    <p className="text-sm text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                      {courseName(c!)}
                    </p>
                  </Link>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-400">{t("journey.noCourses")}</p>
            </Section>
          )}

          <Section icon={<Sparkles className="h-5 w-5" />} title={t("journey.section.skills")} accent={a.text}>
            <div className="grid gap-3 sm:grid-cols-2">
              {term.skills.map((s) => (
                <SkillBadge key={s.id} skill={s} />
              ))}
            </div>
          </Section>

          {documents.length > 0 && (
            <Section icon={<FileText className="h-5 w-5" />} title={t("journey.section.documents")} accent={a.text}>
              <div className="grid gap-4 sm:grid-cols-2">
                {documents.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            </Section>
          )}

          {opportunities.length > 0 && (
            <Section icon={<Trophy className="h-5 w-5" />} title={t("journey.section.competitions")} accent={a.text}>
              <div className="grid gap-4 sm:grid-cols-2">
                {opportunities.map((o) => (
                  <OpportunityCard key={o.id} opportunity={o} />
                ))}
              </div>
            </Section>
          )}

          <Section icon={<Target className="h-5 w-5" />} title={t("journey.section.portfolio")} accent={a.text}>
            <div className="grid gap-3 sm:grid-cols-2">
              {term.portfolioGoals.map((g, i) => (
                <PortfolioGoalCard key={i} goal={g} index={i} />
              ))}
            </div>
          </Section>
        </div>

        {/* ---- sidebar ---- */}
        <aside className="space-y-6">
          <div className="card p-5">
            <h2 className="mb-3 flex items-center gap-2 font-semibold text-navy-900 dark:text-white">
              <ListChecks className="h-5 w-5 text-cyan-500" /> {t("journey.section.checklist")}
            </h2>
            <SemesterChecklist termId={term.id} items={term.checklist} />
          </div>

          {term.warnings.length > 0 && (
            <InfoCard
              icon={<AlertTriangle className="h-5 w-5" />}
              title={t("journey.section.warnings")}
              tone="amber"
              items={term.warnings}
            />
          )}
          {term.advisorNotes.length > 0 && (
            <InfoCard
              icon={<GraduationCap className="h-5 w-5" />}
              title={t("journey.section.advisor")}
              tone="sky"
              items={term.advisorNotes}
            />
          )}
          {term.studentTips.length > 0 && (
            <InfoCard
              icon={<Lightbulb className="h-5 w-5" />}
              title={t("journey.section.tips")}
              tone="emerald"
              items={term.studentTips}
            />
          )}
        </aside>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/resources" className="btn-outline text-sm">
          <FileText className="h-4 w-4" /> {t("resources.title")}
        </Link>
        <Link href="/opportunities" className="btn-outline text-sm">
          <Trophy className="h-4 w-4" /> {t("opps.title")}
        </Link>
        {next && (
          <Link href={`/journey/${next.id}`} className="btn-primary text-sm">
            {t("journey.nextTerm")} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className={`mb-3 flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white`}>
        <span className={accent}>{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

const TONE: Record<string, string> = {
  amber: "border-amber-200/70 bg-amber-50/60 dark:border-amber-900/30 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300",
  sky: "border-sky-200/70 bg-sky-50/60 dark:border-sky-900/30 dark:bg-sky-900/10 text-sky-800 dark:text-sky-300",
  emerald: "border-emerald-200/70 bg-emerald-50/60 dark:border-emerald-900/30 dark:bg-emerald-900/10 text-emerald-800 dark:text-emerald-300",
};

function InfoCard({
  icon,
  title,
  tone,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  tone: keyof typeof TONE;
  items: string[];
}) {
  return (
    <div className={`rounded-2xl border p-5 ${TONE[tone]}`}>
      <h3 className="flex items-center gap-2 font-semibold">
        {icon} {title}
      </h3>
      <ul className="mt-2.5 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-sm leading-relaxed opacity-90">
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
