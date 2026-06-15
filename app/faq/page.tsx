"use client";

import { HelpCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { FaqList } from "@/components/faq/FaqList";

export default function FaqPage() {
  const { locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);

  return (
    <div className="container-page space-y-6 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <HelpCircle className="h-3.5 w-3.5" /> FAQ
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L("คำถามที่พบบ่อย", "Frequently Asked Questions")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "รวมคำถามที่พบบ่อยเกี่ยวกับหลักสูตร การรับเข้า การลงทะเบียน เอกสาร บริการดิจิทัล และการติดต่อ พร้อมลิงก์ไปยังหน้าที่เกี่ยวข้อง",
            "Common questions about the program, admissions, registration, documents, digital services, and contact — with links to the relevant pages.",
          )}
        </p>
      </header>

      <Disclaimer />
      <FaqList />
    </div>
  );
}
