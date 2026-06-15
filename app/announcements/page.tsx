"use client";

import { useMemo, useState } from "react";
import { Megaphone, Search, Info, AlertCircle } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  announcements,
  type Announcement,
  type AnnouncementCategory,
  type AnnouncementPriority,
} from "@/lib/site";

const CATEGORY_LABEL: Record<AnnouncementCategory, { th: string; en: string }> = {
  registration: { th: "ลงทะเบียน", en: "Registration" },
  activity: { th: "กิจกรรม", en: "Activity" },
  document: { th: "เอกสาร", en: "Document" },
  scholarship: { th: "ทุน/ฝึกงาน", en: "Scholarship" },
  general: { th: "ทั่วไป", en: "General" },
};

const PRIORITY_STYLE: Record<AnnouncementPriority, string> = {
  high: "border-red-300 bg-red-50 text-red-700 dark:text-red-300",
  normal: "border-cyan-300 bg-cyan-50 text-cyan-700 dark:text-cyan-300",
  low: "border-slate-300 bg-slate-100 text-slate-600 dark:text-slate-300",
};

const PRIORITY_LABEL: Record<AnnouncementPriority, { th: string; en: string }> = {
  high: { th: "สำคัญ", en: "High" },
  normal: { th: "ปกติ", en: "Normal" },
  low: { th: "ทั่วไป", en: "Low" },
};

export default function AnnouncementsPage() {
  const { t, locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<AnnouncementCategory | "all">("all");

  const categories = useMemo(
    () =>
      (Object.keys(CATEGORY_LABEL) as AnnouncementCategory[]).filter((c) =>
        announcements.some((a) => a.category === c),
      ),
    [],
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return announcements.filter((a: Announcement) => {
      if (category !== "all" && a.category !== category) return false;
      if (!term) return true;
      return (
        a.title.th.toLowerCase().includes(term) ||
        a.title.en.toLowerCase().includes(term) ||
        a.body.th.toLowerCase().includes(term) ||
        a.body.en.toLowerCase().includes(term)
      );
    });
  }, [q, category]);

  return (
    <div className="container-page space-y-6 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <Megaphone className="h-3.5 w-3.5" /> {L("ประกาศ", "Announcements")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L("ประกาศและข่าวสาร", "Announcements & News")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "รวมประกาศที่เกี่ยวข้องกับนักศึกษาในหลักสูตร",
            "Announcements relevant to students in the program.",
          )}
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300/90">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-relaxed">
          {L(
            "ประกาศทั้งหมดในหน้านี้เป็น “ตัวอย่าง” สำหรับสาธิตระบบ ก่อนเปิดใช้งานจริงต่อสาธารณะ ควรแทนที่ด้วยประกาศจริงจากหลักสูตร วิทยาลัย และมหาวิทยาลัย",
            "All announcements here are SAMPLES for demonstration. Replace them with real announcements from the program, college, and university before public launch.",
          )}
        </p>
      </div>

      <div className="card flex flex-col gap-3 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={L("ค้นหาประกาศ (ไทย/อังกฤษ)", "Search announcements (TH/EN)")}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            {L("ทั้งหมด", "All")}
          </Chip>
          {categories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
              {CATEGORY_LABEL[c][locale]}
            </Chip>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="card grid place-items-center gap-3 py-16 text-center">
          <Info className="h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">
            {L("ไม่พบประกาศที่ตรงกับเงื่อนไข", "No announcements match your search")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((a) => (
            <article key={a.id} className="card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`badge ${PRIORITY_STYLE[a.priority]}`}>
                  {PRIORITY_LABEL[a.priority][locale]}
                </span>
                <span className="chip surface-2 text-muted">
                  {CATEGORY_LABEL[a.category][locale]}
                </span>
                <span className="badge border-dashed border-slate-300 text-slate-500">
                  {t("common.sample")}
                </span>
                <span className="ml-auto text-xs text-slate-400">{a.date}</span>
              </div>
              <h2 className="mt-2 font-semibold text-navy-900 dark:text-white">
                {a.title[locale]}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {a.body[locale]}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm transition ${
        active
          ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
          : "surface-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-navy-800"
      }`}
    >
      {children}
    </button>
  );
}
