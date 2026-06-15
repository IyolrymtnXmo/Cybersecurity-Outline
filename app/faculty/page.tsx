"use client";

import { Users, Info } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { FacultyDirectory } from "@/components/faculty/FacultyDirectory";

export default function FacultyPage() {
  const { locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);

  return (
    <div className="container-page space-y-6 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <Users className="h-3.5 w-3.5" /> {L("คณาจารย์ประจำหลักสูตร", "Program Faculty")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L("คณาจารย์ประจำหลักสูตร", "Program Faculty")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "คณาจารย์เป็นผู้ดูแลการเรียนการสอน การให้คำปรึกษา และการพัฒนาหลักสูตรความมั่นคงปลอดภัยไซเบอร์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
            "Our faculty lead teaching, advising, and the ongoing development of the Cybersecurity program at the College of Computing, Khon Kaen University.",
          )}
        </p>
      </header>

      <FacultyDirectory />
    </div>
  );
}
