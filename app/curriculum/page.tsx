"use client";

import { useState } from "react";
import { CurriculumFlowDiagram } from "@/components/CurriculumFlowDiagram";
import { CourseDetailDrawer } from "@/components/CourseDetailDrawer";
import { CourseCard } from "@/components/CourseCard";
import type { Course } from "@/lib/types";
import { commonTerms, getTrackPlan, getCourse } from "@/lib/data";
import { Printer, Download, AlertTriangle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export default function CurriculumPage() {
  const [selected, setSelected] = useState<Course | null>(null);
  const { t, courseName } = useLang();

  const projectPlan = getTrackPlan("project");
  const fallbackTerms = [...commonTerms, ...projectPlan.terms];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-widest text-cyan-700">
          {t("curriculum.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900">
          {t("curriculum.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600">{t("curriculum.desc")}</p>
      </header>

      <div className="block w-full">
        <CurriculumFlowDiagram onSelect={(c) => setSelected(c)} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 no-print">
        <button onClick={() => window.print()} className="btn-outline">
          <Printer className="h-4 w-4" /> {t("common.print")}
        </button>
        <button
          onClick={() => {
            const text = fallbackTerms
              .map(
                (t) =>
                  `${t.label} (${t.totalCredits} credits)\n` +
                  t.courses
                    .map((cid) => {
                      const c = getCourse(cid);
                      return c ? `  - ${c.code} ${courseName(c)}` : `  - ${cid}`;
                    })
                    .join("\n"),
              )
              .join("\n\n");
            navigator.clipboard?.writeText(text);
          }}
          className="btn-outline"
        >
          <Download className="h-4 w-4" /> {t("common.copy")}
        </button>
      </div>

      <CourseDetailDrawer
        course={selected}
        onClose={() => setSelected(null)}
        onSelect={(id) => {
          const c = getCourse(id);
          if (c) setSelected(c);
        }}
      />
    </div>
  );
}
