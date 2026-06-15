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
    <article className="card relative flex flex-col md:flex-row p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-black/40 overflow-hidden group bg-white dark:bg-navy-900">
      {/* Left Image Section */}
      <div className="relative w-full md:w-[42%] shrink-0 bg-[#e2e2e2] dark:bg-navy-800 h-[300px] md:h-auto overflow-hidden">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.imageUrl as string}
            alt={name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-navy-700 to-cyan-600 text-3xl font-bold text-white">
            {facultyInitials(member)}
          </div>
        )}
      </div>

      {/* Right Content Section */}
      <div className="flex flex-col flex-1 p-5 md:p-6 relative min-w-0">
        {/* Header Info (Role) */}
        {member.role && (
          <p className="text-[11px] md:text-xs text-slate-400 dark:text-slate-500 mb-1.5 pr-20">
            {member.role[locale] || member.role.th}
          </p>
        )}

        {/* Name */}
        <h3 className="text-base md:text-lg font-bold leading-snug text-navy-900 dark:text-white pr-16 truncate">
          {locale === "en" ? member.nameEnglish : member.nameThai}
        </h3>
        <p className="mt-0.5 text-sm md:text-base font-bold text-slate-700 dark:text-slate-300 truncate">
          {locale === "en" ? member.nameThai : member.nameEnglish}
        </p>

        <div className="mt-4 mb-2 border-t border-slate-100 dark:border-navy-800/50 w-8" />

        {/* Details */}
        <div className="space-y-0.5 text-[11px] md:text-xs text-slate-500 dark:text-slate-400">
          <p>
            {locale === "en" 
              ? "B.Sc. Program in Cybersecurity" 
              : "หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาความมั่นคงปลอดภัยไซเบอร์"}
          </p>
          {member.academicPosition && (
            <>
              <p>{member.academicPosition.th}</p>
              <p>{member.academicPosition.en}</p>
            </>
          )}
          
          {member.email && (
            <div className="pt-1.5">
              <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 font-medium transition-colors">
                <Mail className="h-3.5 w-3.5" /> {member.email}
              </a>
            </div>
          )}
        </div>

        {/* Expertise Tags */}
        {member.expertise.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800/50">
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {t("common.expertise") || "ความเชี่ยวชาญ"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {member.expertise.map((e) => (
                <span
                  key={e}
                  className="px-2 py-0.5 text-[10px] font-medium rounded bg-slate-50 text-slate-600 dark:bg-navy-800 dark:text-slate-300 border border-slate-200/60 dark:border-navy-700"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 min-h-[1rem]" />

        {/* Profile Button at bottom right */}
        {member.profileUrl && (
          <div className="flex justify-end mt-2">
            <a
              href={member.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white dark:bg-navy-900 text-cyan-700 dark:text-cyan-400 border-slate-200 dark:border-navy-700 hover:bg-slate-50 dark:hover:bg-navy-800 transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> {t("common.viewProfile") || "โปรไฟล์"}
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
