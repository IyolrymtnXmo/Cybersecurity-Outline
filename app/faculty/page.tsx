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

      <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300/90">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-relaxed">
          {L(
            "ข้อมูลคณาจารย์ในหน้านี้รวบรวมจากเว็บไซต์วิทยาลัย และควรได้รับการตรวจสอบกับหลักสูตรก่อนเผยแพร่จริง ความเชี่ยวชาญแสดงตามต้นฉบับ (ภาษาอังกฤษ)",
            "Faculty information here is compiled from the college website and should be verified by the program before public launch. Areas of expertise are shown as provided (in English).",
          )}
        </p>
      </div>

      <FacultyDirectory />
    </div>
  );
}
