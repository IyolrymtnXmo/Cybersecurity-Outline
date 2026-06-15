"use client";

import { FolderOpen, ShieldCheck } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { ResourceHub } from "@/components/resources/ResourceHub";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinks } from "@/lib/site";

export default function ResourcesPage() {
  const { t, locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);

  return (
    <div className="container-page py-8 space-y-6">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <FolderOpen className="h-3.5 w-3.5" /> {t("resources.kicker")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {t("resources.title")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{t("resources.desc")}</p>
      </header>

      <Disclaimer />

      {/* Official College Resources gateway */}
      <section>
        <h2 className="mb-1 flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white">
          <ShieldCheck className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          {L("แหล่งข้อมูลทางการของวิทยาลัย", "Official College Resources")}
        </h2>
        <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
          {L(
            "ทางลัดไปยังหน้าทางการของวิทยาลัยการคอมพิวเตอร์ — ข้อมูลและเอกสารฉบับล่าสุดให้ตรวจสอบจากเว็บไซต์วิทยาลัยเสมอ",
            "Shortcuts to the College of Computing's official pages — always check the college website for the latest information and documents.",
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officialLinks.map((l) => (
            <OfficialLinkCard key={l.id} link={l} />
          ))}
        </div>
      </section>

      {/* Internal resource hub */}
      <section className="pt-2">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white">
          <FolderOpen className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          {L("เอกสารและแหล่งข้อมูลในเว็บ", "In-site documents & resources")}
        </h2>
        <ResourceHub />
      </section>
    </div>
  );
}
