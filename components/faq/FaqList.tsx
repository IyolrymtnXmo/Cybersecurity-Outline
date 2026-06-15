"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, ChevronDown, ArrowRight, HelpCircle, ShieldQuestion } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { faqItems, FAQ_CATEGORY_ORDER, type FaqItem, type FaqCategory } from "@/lib/site";

function L(locale: "th" | "en", th: string, en: string) {
  return locale === "en" ? en : th;
}

const CATEGORY_LABEL: Record<FaqCategory, { th: string; en: string }> = {
  program: { th: "หลักสูตร", en: "Program" },
  admissions: { th: "การรับเข้า", en: "Admissions" },
  registration: { th: "ลงทะเบียน/วิชาต่อ", en: "Registration" },
  documents: { th: "เอกสาร", en: "Documents" },
  services: { th: "บริการดิจิทัล", en: "Digital services" },
  opportunities: { th: "งานแข่ง/โอกาส", en: "Opportunities" },
  contact: { th: "ติดต่อ", en: "Contact" },
};

export function FaqList() {
  const { t, locale } = useLang();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<FaqCategory | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const fuse = useMemo(
    () =>
      new Fuse(faqItems, {
        keys: [
          { name: "q", getFn: (i) => `${i.question.th} ${i.question.en}` },
          { name: "a", getFn: (i) => `${i.answer.th} ${i.answer.en}` },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    const base: FaqItem[] = q.trim()
      ? fuse.search(q.trim()).map((r) => r.item)
      : faqItems;
    return base.filter((i) => category === "all" || i.category === category);
  }, [q, category, fuse]);

  const categories = useMemo(
    () => FAQ_CATEGORY_ORDER.filter((c) => faqItems.some((i) => i.category === c)),
    [],
  );

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-3 p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={L(locale, "ค้นหาคำถาม (ไทย/อังกฤษ)", "Search questions (TH/EN)")}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            {L(locale, "ทั้งหมด", "All")}
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
              {CATEGORY_LABEL[c][locale]}
            </FilterChip>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="card grid place-items-center gap-3 py-16 text-center">
          <HelpCircle className="h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">
            {L(locale, "ไม่พบคำถามที่ตรงกับเงื่อนไข", "No questions match your search")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="card overflow-hidden">
                <button
                  onClick={() => setOpenId(open ? null : item.id)}
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span className="flex-1 font-medium text-navy-900 dark:text-white">
                    {item.question[locale]}
                  </span>
                  {item.status === "needs-verification" && (
                    <span className="badge hidden border-amber-300 bg-amber-50 text-amber-700 sm:inline-flex dark:text-amber-300">
                      <ShieldQuestion className="h-3 w-3" /> {t("common.needsVerification")}
                    </span>
                  )}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div className="border-t border-slate-100 px-5 py-4 dark:border-navy-800">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.answer[locale]}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="chip surface-2 text-muted">
                        {CATEGORY_LABEL[item.category][locale]}
                      </span>
                      <span
                        className={`badge ${
                          item.status === "recommended"
                            ? "border-cyan-300 bg-cyan-50 text-cyan-700 dark:text-cyan-300"
                            : "border-amber-300 bg-amber-50 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {item.status === "recommended"
                          ? t("common.recommended")
                          : t("common.needsVerification")}
                      </span>
                      {item.relatedRoute && (
                        <Link
                          href={item.relatedRoute}
                          className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-400"
                        >
                          {L(locale, "ไปยังหน้าที่เกี่ยวข้อง", "Go to related page")}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({
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
