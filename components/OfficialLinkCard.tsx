"use client";

import {
  ExternalLink,
  GraduationCap,
  ClipboardList,
  FileText,
  MonitorSmartphone,
  Globe,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import type { OfficialLink, OfficialLinkCategory } from "@/lib/site";

const CATEGORY_ICON: Record<
  OfficialLinkCategory,
  React.ComponentType<{ className?: string }>
> = {
  program: GraduationCap,
  admissions: ClipboardList,
  documents: FileText,
  digital: MonitorSmartphone,
};

export function OfficialLinkCard({ link }: { link: OfficialLink }) {
  const { t, locale } = useLang();
  const Icon = CATEGORY_ICON[link.category] ?? Globe;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="card group flex flex-col gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-cyan-400">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="badge border-emerald-300 bg-emerald-50 text-emerald-700 dark:text-emerald-300">
            {t("common.official")}
          </span>
          <h3 className="mt-1.5 font-semibold leading-snug text-navy-900 dark:text-white">
            {link.title[locale]}
          </h3>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-cyan-600 dark:group-hover:text-cyan-400" />
      </div>
      <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {link.description[locale]}
      </p>
      <p className="truncate font-mono text-[11px] text-slate-400">{link.url}</p>
    </a>
  );
}
