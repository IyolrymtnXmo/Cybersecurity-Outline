"use client";

import Link from "next/link";
import {
  ClipboardList,
  Info,
  ArrowRight,
  GraduationCap,
  Compass,
  HelpCircle,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinks } from "@/lib/site";

export default function AdmissionsPage() {
  const { locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);

  const admissionLinks = officialLinks.filter(
    (l) => l.category === "admissions" || l.id === "program-info",
  );

  const steps = [
    {
      th: "ทำความเข้าใจหลักสูตร",
      en: "Understand the program",
      descTh: "ดูโครงสร้างหลักสูตร 4 ปี รายวิชา และเส้นทางอาชีพ เพื่อประกอบการตัดสินใจ",
      descEn: "Review the 4-year structure, courses, and career paths to inform your decision.",
      href: "/curriculum",
      hrefLabelTh: "ดู Curriculum Outline",
      hrefLabelEn: "View Curriculum Outline",
    },
    {
      th: "ตรวจสอบรอบรับสมัครและคุณสมบัติ",
      en: "Check rounds & qualifications",
      descTh: "การรับเข้าเป็นไปตามระบบ TCAS และประกาศของวิทยาลัย ตรวจสอบรอบ คุณสมบัติ และกำหนดการล่าสุดจากเว็บไซต์วิทยาลัย",
      descEn: "Admission follows the TCAS system and the college's announcements. Check the rounds, qualifications, and dates on the college website.",
      href: null,
      hrefLabelTh: "",
      hrefLabelEn: "",
    },
    {
      th: "เตรียมตัวและสมัคร",
      en: "Prepare & apply",
      descTh: "สมัครผ่านช่องทางที่วิทยาลัย/มหาวิทยาลัยกำหนด และติดตามประกาศผลตามปฏิทิน TCAS",
      descEn: "Apply through the channels specified by the college/university and follow the TCAS calendar for results.",
      href: null,
      hrefLabelTh: "",
      hrefLabelEn: "",
    },
  ];

  return (
    <div className="container-page space-y-8 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <ClipboardList className="h-3.5 w-3.5" /> {L("การรับเข้าศึกษา", "Admissions")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L(
            "สมัครเรียนหลักสูตร Cybersecurity",
            "Apply to the Cybersecurity Program",
          )}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "หน้านี้เป็นทางลัด (gateway) สำหรับผู้ที่สนใจสมัครเรียนหลักสูตรความมั่นคงปลอดภัยไซเบอร์ ช่วยให้เข้าถึงข้อมูลการรับเข้าอย่างเป็นทางการของวิทยาลัยได้รวดเร็ว",
            "This page is a gateway for prospective Cybersecurity students, helping you quickly reach the college's official admissions information.",
          )}
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300/90">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-relaxed">
          {L(
            "หน้านี้ไม่ใช่ประกาศรับสมัครอย่างเป็นทางการ ข้อมูลรอบรับสมัคร คุณสมบัติ และกำหนดการที่เป็นทางการให้ตรวจสอบจากเว็บไซต์วิทยาลัยการคอมพิวเตอร์เสมอ",
            "This page is not an official admissions announcement. Always verify application rounds, qualifications, and dates on the College of Computing website.",
          )}
        </p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy-900 dark:text-white">
          {L("ขั้นตอนเบื้องต้น", "Getting started")}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.en} className="card flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-700 text-sm font-bold text-white dark:bg-cyan-500 dark:text-navy-950">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-navy-900 dark:text-white">
                  {L(s.th, s.en)}
                </h3>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {L(s.descTh, s.descEn)}
              </p>
              {s.href && (
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:underline dark:text-cyan-400"
                >
                  {L(s.hrefLabelTh, s.hrefLabelEn)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy-900 dark:text-white">
          {L("ลิงก์ทางการ", "Official links")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {admissionLinks.map((l) => (
            <OfficialLinkCard key={l.id} link={l} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/journey"
          className="card flex items-center gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-navy-800 dark:text-cyan-400">
            <Compass className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-navy-900 dark:text-white">
              {L("เส้นทาง 4 ปีของเด็กไซเบอร์", "The 4-year journey")}
            </p>
            <p className="text-sm text-slate-500">
              {L("ดูว่าจะได้เรียนและทำอะไรบ้างในแต่ละปี", "See what you'll learn each year")}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400" />
        </Link>
        <Link
          href="/faq"
          className="card flex items-center gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-navy-800 dark:text-cyan-400">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-navy-900 dark:text-white">
              {L("คำถามที่พบบ่อย", "FAQ")}
            </p>
            <p className="text-sm text-slate-500">
              {L("คำถามเรื่องการรับเข้าและหลักสูตร", "Questions about admissions & the program")}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400" />
        </Link>
      </section>
    </div>
  );
}
