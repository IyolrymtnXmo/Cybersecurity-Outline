"use client";

import { useState } from "react";
import { Mail, ExternalLink, ShieldQuestion, BadgeCheck } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  type FacultyMember,
  facultyName,
  facultySubName,
  facultyInitials,
  positionLabel,
} from "@/lib/faculty";

export function FacultyCard({ member }: { member: FacultyMember }) {
  const { t, locale } = useLang();
  const [imgFailed, setImgFailed] = useState(false);

  const name = facultyName(member, locale);
  const subName = facultySubName(member, locale);
  const position = positionLabel(member, locale);
  const showImage = member.imageUrl && !imgFailed;

  return (
    <article className="card flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40">
      <div className="flex items-start gap-4">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.imageUrl as string}
            alt={name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-navy-700"
          />
        ) : (
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-navy-700 to-cyan-600 text-xl font-semibold text-white">
            {facultyInitials(member)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          {member.status === "needs-verification" ? (
            <span className="badge border-amber-300 bg-amber-50 text-amber-700 dark:text-amber-300">
              <ShieldQuestion className="h-3 w-3" /> {t("common.needsVerification")}
            </span>
          ) : member.status === "verified" ? (
            <span className="badge border-emerald-300 bg-emerald-50 text-emerald-700 dark:text-emerald-300">
              <BadgeCheck className="h-3 w-3" /> {t("common.official")}
            </span>
          ) : null}

          <h3 className="mt-1.5 font-semibold leading-snug text-navy-900 dark:text-white">
            {name}
          </h3>
          {subName && (
            <p className="text-sm text-slate-500 dark:text-slate-400">{subName}</p>
          )}
          {position && (
            <p className="mt-1 text-xs font-medium text-cyan-700 dark:text-cyan-400">
              {position}
            </p>
          )}
        </div>
      </div>

      {member.role && (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {member.role[locale] || member.role.th}
        </p>
      )}

      {member.expertise.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {member.expertise.map((e) => (
            <span key={e} className="chip surface-2 text-muted">
              {e}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        {member.email && (
          <a href={`mailto:${member.email}`} className="btn-outline flex-1 text-sm">
            <Mail className="h-4 w-4" /> {t("common.email")}
          </a>
        )}
        {member.profileUrl && (
          <a
            href={member.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline flex-1 text-sm"
          >
            <ExternalLink className="h-4 w-4" /> {t("common.viewProfile")}
          </a>
        )}
      </div>
    </article>
  );
}
