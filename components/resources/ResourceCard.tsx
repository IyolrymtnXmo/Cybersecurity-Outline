"use client";

import Link from "next/link";
import {
  FileText,
  GraduationCap,
  ClipboardList,
  Briefcase,
  Building2,
  Wallet,
  FileSignature,
  FolderGit2,
  BadgeCheck,
  CalendarDays,
  HelpCircle,
  File,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { asset } from "@/lib/asset";
import type {
  ResourceItem,
  ResourceCategory,
  ResourceStatus,
} from "@/lib/journey";

const CATEGORY_ICON: Record<ResourceCategory, React.ComponentType<{ className?: string }>> = {
  curriculum: GraduationCap,
  registration: ClipboardList,
  project: FolderGit2,
  coop: Briefcase,
  wil: Building2,
  internship: Briefcase,
  scholarship: Wallet,
  form: FileSignature,
  portfolio: FolderGit2,
  certification: BadgeCheck,
  activity: CalendarDays,
  faq: HelpCircle,
  other: File,
};

const STATUS_STYLE: Record<ResourceStatus, string> = {
  official: "bg-emerald-50 text-emerald-700 border-emerald-300 dark:text-emerald-300",
  recommended: "bg-cyan-50 text-cyan-700 border-cyan-300 dark:text-cyan-300",
  draft: "bg-slate-100 text-slate-600 border-slate-300 dark:text-slate-300",
  "needs-update": "bg-amber-50 text-amber-700 border-amber-300 dark:text-amber-300",
};

export function ResourceCard({ resource }: { resource: ResourceItem }) {
  const { t } = useLang();
  const Icon = CATEGORY_ICON[resource.category] ?? FileText;

  const href = resource.externalUrl ?? (resource.fileUrl ? asset(resource.fileUrl) : undefined);
  const isInternal = !!href && href.startsWith("/") && !resource.fileUrl;
  const isExternal = !!href && /^https?:\/\//.test(href);
  const isDownload = !!resource.fileUrl;

  return (
    <article className="card p-5 flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-cyan-400">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`badge ${STATUS_STYLE[resource.status]}`}>
              {t(`resources.status.${resource.status}`)}
            </span>
            <span className="chip surface-2 text-muted">
              {t(`resources.cat.${resource.category}`)}
            </span>
            {resource.placeholder && (
              <span className="badge border-dashed border-slate-300 text-slate-500">
                {t("common.placeholder")}
              </span>
            )}
          </div>
          <h3 className="mt-1.5 font-semibold text-navy-900 dark:text-white leading-snug">
            {resource.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
        {resource.description}
      </p>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
        {resource.year && resource.year !== "all" && (
          <span className="chip surface-2">{t("common.year")} {resource.year}</span>
        )}
        {resource.semester && resource.semester !== "all" && (
          <span className="chip surface-2">{t("common.semester")} {resource.semester}</span>
        )}
        {resource.fileType && (
          <span className="chip surface-2 font-mono uppercase">{resource.fileType}</span>
        )}
        {resource.updatedAt && (
          <span className="ml-auto">{t("resources.updated")} {resource.updatedAt}</span>
        )}
      </div>

      <div className="pt-1">
        {href ? (
          isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="btn-outline w-full text-sm"
            >
              {isDownload ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
              {isDownload ? t("common.download") : t("common.openLink")}
            </a>
          ) : isInternal ? (
            <Link href={href} className="btn-outline w-full text-sm">
              {t("common.open")} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <a href={href} target="_blank" rel="noreferrer" className="btn-outline w-full text-sm">
              <Download className="h-4 w-4" /> {t("common.download")}
            </a>
          )
        ) : (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-center text-xs text-slate-400 dark:border-navy-700">
            {t("common.placeholder")}
          </p>
        )}
      </div>
    </article>
  );
}
