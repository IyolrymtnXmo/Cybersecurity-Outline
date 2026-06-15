"use client";

import {
  Flag,
  Code2,
  Trophy,
  Network,
  Cloud,
  FlaskConical,
  Rocket,
  Wallet,
  Briefcase,
  Dumbbell,
  BadgeCheck,
  Presentation,
  Users,
  Mic,
  CalendarClock,
  ExternalLink,
  Star,
  Sparkles,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { getCourse } from "@/lib/data";
import {
  loc,
  type OpportunityItem,
  type OpportunityType,
  type OpportunityStatus,
  type OpportunityDifficulty,
} from "@/lib/journey";

const TYPE_ICON: Record<OpportunityType, React.ComponentType<{ className?: string }>> = {
  ctf: Flag,
  hackathon: Code2,
  competition: Trophy,
  programming: Code2,
  network: Network,
  cloud: Cloud,
  research: FlaskConical,
  startup: Rocket,
  scholarship: Wallet,
  internship: Briefcase,
  bootcamp: Dumbbell,
  certification: BadgeCheck,
  conference: Presentation,
  seminar: Mic,
  other: Sparkles,
};

const STATUS_STYLE: Record<OpportunityStatus, string> = {
  upcoming: "bg-sky-50 text-sky-700 border-sky-300 dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-300",
  open: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300",
  closed: "bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-400",
  annual: "bg-violet-50 text-violet-700 border-violet-300 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-300",
  archived: "bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800/30 dark:border-slate-700 dark:text-slate-500",
};

const DIFFICULTY_STYLE: Record<OpportunityDifficulty, string> = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300",
  intermediate: "bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-300",
  advanced: "bg-orange-50 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-300",
  mixed: "surface-2 text-slate-600 dark:text-slate-300",
};

export function OpportunityCard({ opportunity: o }: { opportunity: OpportunityItem }) {
  const { t, locale } = useLang();
  const Icon = TYPE_ICON[o.type] ?? Sparkles;

  return (
    <article className="card p-5 flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-cyan-400">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="chip surface-2 text-muted">{t(`opps.type.${o.type}`)}</span>
            <span className={`badge ${STATUS_STYLE[o.status]}`}>{t(`opps.status.${o.status}`)}</span>
            <span className={`badge ${DIFFICULTY_STYLE[o.difficulty]}`}>
              {t(`opps.diff.${o.difficulty}`)}
            </span>
          </div>
          <h3 className="mt-1.5 font-semibold text-navy-900 dark:text-white leading-snug">
            {loc(o.title, locale)}
          </h3>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
        {loc(o.description, locale)}
      </p>

      {/* meta */}
      <div className="space-y-1.5 text-xs text-slate-500">
        <div className="flex flex-wrap items-center gap-1.5">
          {o.suitableYears.map((y) => (
            <span key={y} className="chip surface-2">{t("common.year")} {y}</span>
          ))}
        </div>
        {o.usualPeriod && (
          <p className="flex items-center gap-1.5">
            <CalendarClock className="h-3.5 w-3.5" /> {t("opps.period")}: {loc(o.usualPeriod, locale)}
          </p>
        )}
        {o.deadline && (
          <p className="font-medium text-amber-700 dark:text-amber-400">
            {t("opps.deadline")}: {o.deadline}
          </p>
        )}
      </div>

      {/* feature badges */}
      <div className="flex flex-wrap gap-1.5">
        {o.teamRequired && (
          <span className="badge bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-900/30 dark:border-fuchsia-800 dark:text-fuchsia-300">
            <Users className="h-3 w-3" /> {t("opps.badge.team")}
          </span>
        )}
        {o.portfolioWorthy && (
          <span className="badge bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:border-cyan-800 dark:text-cyan-300">
            <Star className="h-3 w-3" /> {t("opps.badge.portfolio")}
          </span>
        )}
        {o.difficulty === "beginner" && (
          <span className="badge bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300">
            {t("opps.badge.beginner")}
          </span>
        )}
      </div>

      {/* related skills / courses */}
      {(o.relatedSkills?.length || o.relatedCourses?.length) && (
        <div className="space-y-1.5 border-t border-slate-100 pt-3 dark:border-navy-800">
          {o.relatedSkills && o.relatedSkills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-medium text-slate-400">{t("opps.relatedSkills")}:</span>
              {o.relatedSkills.map((s) => (
                <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-navy-800 dark:text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          )}
          {o.relatedCourses && o.relatedCourses.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <span className="text-[11px] font-medium text-slate-400">{t("opps.relatedCourses")}:</span>
              {o.relatedCourses.map((cid) => {
                const c = getCourse(cid);
                return (
                  <span key={cid} className="rounded bg-navy-50 px-1.5 py-0.5 font-mono text-[10px] text-navy-700 dark:bg-navy-800 dark:text-cyan-300">
                    {c?.code ?? cid}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}

      {o.placeholder && (
        <p className="text-[11px] text-slate-400">⚠ {t("common.verifyAnnouncement")}</p>
      )}

      {o.link && (
        <a href={o.link} target="_blank" rel="noreferrer" className="btn-outline w-full text-sm">
          <ExternalLink className="h-4 w-4" /> {t("opps.apply")}
        </a>
      )}
    </article>
  );
}
