"use client";

import Link from "next/link";
import {
  Info,
  ShieldCheck,
  CheckCircle2,
  CircleDashed,
  Rocket,
  Database,
  Compass,
  ClipboardCheck,
  Wrench,
  ScrollText,
  ExternalLink,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { credits } from "@/lib/site";

type L = (th: string, en: string) => string;

export default function AboutPage() {
  const { locale } = useLang();
  const L: L = (th, en) => (locale === "en" ? en : th);

  return (
    <div className="space-y-14 pb-16">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-grid-fade text-white">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              <Info className="h-3.5 w-3.5" /> {L("เกี่ยวกับเว็บไซต์", "About this website")}
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              {L("เกี่ยวกับเว็บไซต์และนโยบายข้อมูล", "About this Website & Data Policy")}
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300">
              {L(
                "หน้านี้อธิบายวัตถุประสงค์ของเว็บไซต์ แหล่งที่มาของข้อมูล นโยบายข้อมูลทางการ สถานะความพร้อมในการเผยแพร่ และแนวทางการดูแลรักษา เพื่อให้หลักสูตรและอาจารย์ใช้ตรวจสอบก่อนเผยแพร่จริง",
                "This page explains the website's purpose, data sources, official-data policy, publication readiness, and maintenance approach — so the program and faculty can review it before public launch.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Readiness status */}
      <section className="container-page">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card border-emerald-200/70 bg-emerald-50/50 p-6 dark:border-emerald-900/30 dark:bg-emerald-900/10">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {L("ความพร้อมด้านการพัฒนา", "Development readiness")}
            </p>
            <p className="mt-2 text-4xl font-bold text-emerald-700 dark:text-emerald-300">100%</p>
            <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-300/80">
              {L(
                "โครงสร้างเว็บ ฟีเจอร์ การออกแบบ สองภาษา และระบบ build พร้อมใช้งานครบถ้วน",
                "Structure, features, design, bilingual support, and the build pipeline are all complete.",
              )}
            </p>
          </div>
          <div className="card border-amber-200/70 bg-amber-50/50 p-6 dark:border-amber-900/30 dark:bg-amber-900/10">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              {L("ความพร้อมเผยแพร่ทางการ", "Official publication readiness")}
            </p>
            <p className="mt-2 text-2xl font-bold text-amber-700 dark:text-amber-300">
              {L("รอการตรวจสอบจากหลักสูตร", "Pending program verification")}
            </p>
            <p className="mt-2 text-sm text-amber-800/80 dark:text-amber-300/80">
              {L(
                "ข้อมูลที่มีผลทางการ เช่น คณาจารย์ การรับเข้า ประกาศ และการติดต่อ ต้องได้รับการยืนยันจากหลักสูตรก่อนเผยแพร่",
                "Official content — faculty, admissions, announcements, and contact — must be verified by the program before launch.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="container-page">
        <SectionHeading
          icon={<Compass className="h-4 w-4" />}
          kicker={L("วัตถุประสงค์", "Purpose")}
          title={L("เว็บไซต์นี้มีไว้เพื่ออะไร", "What this website is for")}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PURPOSES.map((p) => (
            <div key={p.en} className="card p-5">
              <p className="font-semibold text-navy-900 dark:text-white">{L(p.th, p.en)}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{L(p.dTh, p.dEn)}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-navy-700 dark:bg-navy-900/50 dark:text-slate-300">
          {L(
            "ข้อมูลที่มีผลทางการ เช่น การรับเข้า การลงทะเบียน ประกาศ ปฏิทินการศึกษา และเอกสารคำร้อง ต้องตรวจสอบจากประกาศทางการของวิทยาลัยการคอมพิวเตอร์/มหาวิทยาลัยขอนแก่นเสมอ",
            "Official matters — admissions, registration, announcements, the academic calendar, and request forms — must always be verified against official College of Computing / Khon Kaen University announcements.",
          )}
        </p>
      </section>

      {/* Official Readiness dashboard */}
      <section className="container-page">
        <SectionHeading
          icon={<ShieldCheck className="h-4 w-4" />}
          kicker={L("สถานะความพร้อม", "Official readiness")}
          title={L("จาก internal review สู่การเผยแพร่ทางการ", "From internal review to official launch")}
          desc={L(
            "แบ่งสถานะออกเป็น 3 กลุ่ม เพื่อให้เห็นชัดว่าอะไรพร้อมแล้ว อะไรรอการยืนยัน และอะไรต้องทำก่อนเปิดสาธารณะ",
            "Three buckets make it clear what is ready, what awaits verification, and what must happen before going public.",
          )}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <ReadinessColumn
            tone="ready"
            title={L("พร้อมแล้ว", "Ready")}
            items={READY.map((i) => L(i.th, i.en))}
          />
          <ReadinessColumn
            tone="verify"
            title={L("รอการยืนยันจากหลักสูตร", "Needs program verification")}
            items={VERIFY.map((i) => L(i.th, i.en))}
          />
          <ReadinessColumn
            tone="launch"
            title={L("ก่อนเปิดสาธารณะ", "Before public launch")}
            items={LAUNCH.map((i) => L(i.th, i.en))}
          />
        </div>
      </section>

      {/* Content verification matrix */}
      <section className="container-page">
        <SectionHeading
          icon={<Database className="h-4 w-4" />}
          kicker={L("ที่มาของข้อมูล", "Data sources")}
          title={L("ตารางตรวจสอบที่มาและสถานะของข้อมูล", "Content Verification Matrix")}
          desc={L(
            "แต่ละกลุ่มข้อมูลมาจากไหน และอยู่ในสถานะใด ข้อมูลที่เป็นทางการจะเชื่อมไปยังแหล่งต้นทางของวิทยาลัย",
            "Where each data area comes from and its status. Official areas link out to the college's own source.",
          )}
        />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500 dark:border-navy-700">
                <th className="py-3 pr-4 font-semibold">{L("กลุ่มข้อมูล", "Data area")}</th>
                <th className="py-3 pr-4 font-semibold">{L("แหล่งที่มา", "Source")}</th>
                <th className="py-3 font-semibold">{L("สถานะ", "Status")}</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr
                  key={row.areaEn}
                  className="border-b border-slate-100 align-top dark:border-navy-800"
                >
                  <td className="py-3 pr-4 font-medium text-navy-900 dark:text-white">
                    {L(row.areaTh, row.areaEn)}
                  </td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">
                    {L(row.srcTh, row.srcEn)}
                  </td>
                  <td className="py-3">
                    <StatusBadge status={row.status} L={L} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Official data policy */}
      <section className="container-page">
        <SectionHeading
          icon={<ScrollText className="h-4 w-4" />}
          kicker={L("นโยบายข้อมูลทางการ", "Official data policy")}
          title={L("ข้อมูลใดถือเป็นทางการ และตรวจสอบที่ไหน", "Which data is official, and where to verify it")}
        />
        <div className="mt-6">
          <Disclaimer tkey="common.disclaimerJourney" />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {L(
            "เว็บไซต์นี้ทำหน้าที่เป็นทางลัด (gateway) ไปยังหน้าทางการของวิทยาลัย ไม่ได้คัดลอกเนื้อหาจำนวนมากมาเก็บไว้เอง เพื่อลดความเสี่ยงที่ข้อมูลจะล้าสมัย เมื่อต้องการข้อมูลล่าสุดให้ตรวจสอบจากเว็บไซต์วิทยาลัยการคอมพิวเตอร์เสมอ",
            "This site acts as a gateway to the college's official pages rather than copying large amounts of content, to avoid going stale. For the latest information, always check the College of Computing website.",
          )}
        </p>
      </section>

      {/* Official launch checklist */}
      <section className="container-page">
        <SectionHeading
          icon={<ClipboardCheck className="h-4 w-4" />}
          kicker={L("เช็กลิสต์ก่อนเผยแพร่", "Launch checklist")}
          title={L("รายการตรวจสอบสำหรับหลักสูตร/อาจารย์", "Official Launch Checklist for the program")}
          desc={L(
            "ใช้รายการนี้เป็นแนวทางในการตรวจ final ก่อนเปิดเว็บเป็นทางการบนโดเมน cy.computing.kku.ac.th",
            "Use this as the final review guide before publishing officially at cy.computing.kku.ac.th.",
          )}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CHECKLIST.map((group) => (
            <div key={group.en} className="card p-5">
              <p className="font-semibold text-navy-900 dark:text-white">{L(group.th, group.en)}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((it) => (
                  <li key={it.en} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-1 h-4 w-4 shrink-0 rounded border border-slate-300 dark:border-navy-600" />
                    {L(it.th, it.en)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Maintenance + credits */}
      <section className="container-page grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
            <Wrench className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-widest">{L("การดูแลรักษา", "Maintenance")}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {L(
              "ข้อมูลเกือบทั้งหมดเก็บเป็นไฟล์ JSON ในโฟลเดอร์ data/ ที่แก้ไขได้ง่าย คู่มือการแก้ไขข้อมูลคณาจารย์ FAQ ประกาศ เอกสาร ลิงก์ทางการ และการ build/deploy อยู่ในไฟล์ MAINTENANCE.md ของโปรเจกต์ ส่วนคู่มือส่งมอบสำหรับอาจารย์อยู่ใน OFFICIAL_HANDOFF.md",
              "Almost all content lives in editable JSON files under data/. A guide for editing faculty, FAQ, announcements, documents, official links, and for build/deploy is in the project's MAINTENANCE.md, with a handoff guide for faculty in OFFICIAL_HANDOFF.md.",
            )}
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
            {L(
              "ผู้ดูแลข้อมูล (data owner) ควรกำหนดร่วมกับหลักสูตรก่อนเผยแพร่จริง",
              "A data owner should be designated together with the program before public launch.",
            )}
          </p>
        </div>
        <div className="card p-6">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
            <Info className="h-4 w-4" />
            <p className="text-xs font-bold uppercase tracking-widest">{L("ผู้จัดทำ", "Credits")}</p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {L(
              "ผู้มีส่วนร่วมพัฒนาเว็บไซต์ (นักศึกษา):",
              "Student contributor:",
            )}
          </p>
          <p className="mt-1 text-sm font-medium text-navy-900 dark:text-slate-200">
            {L(credits.maintainer.nameThai, credits.maintainer.nameEnglish)} ({credits.maintainer.tag})
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {L(credits.program.nameThai, credits.program.nameEnglish)}
            <br />
            {L(credits.program.facultyThai, credits.program.facultyEnglish)}
          </p>
          <Link
            href="/one-stop"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-700 dark:text-cyan-400"
          >
            {L("ไปศูนย์รวมบริการ", "Go to One Stop Service")}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------------- helpers */

function SectionHeading({
  icon,
  kicker,
  title,
  desc,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
        {icon} {kicker}
      </p>
      <h2 className="mt-1 text-2xl font-bold text-navy-900 dark:text-white md:text-3xl">{title}</h2>
      {desc && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{desc}</p>}
    </div>
  );
}

function ReadinessColumn({
  tone,
  title,
  items,
}: {
  tone: "ready" | "verify" | "launch";
  title: string;
  items: string[];
}) {
  const styles = {
    ready: {
      head: "text-emerald-700 dark:text-emerald-400",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
    },
    verify: {
      head: "text-amber-700 dark:text-amber-400",
      icon: <CircleDashed className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
    },
    launch: {
      head: "text-cyan-700 dark:text-cyan-400",
      icon: <Rocket className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />,
    },
  }[tone];

  return (
    <div className="card p-5">
      <p className={`text-sm font-bold ${styles.head}`}>{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
            <span className="mt-0.5 shrink-0">{styles.icon}</span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({
  status,
  L,
}: {
  status: "gateway" | "verify" | "sample";
  L: L;
}) {
  const map = {
    gateway: {
      cls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      label: L("ลิงก์ทางการของวิทยาลัย", "Official external gateway"),
    },
    verify: {
      cls: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      label: L("รอตรวจสอบกับหลักสูตร", "Needs program verification"),
    },
    sample: {
      cls: "bg-slate-200 text-slate-700 dark:bg-navy-800 dark:text-slate-300",
      label: L("ข้อมูลตัวอย่าง", "Sample data"),
    },
  }[status];
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${map.cls}`}>
      {map.label}
    </span>
  );
}

/* ------------------------------------------------------------------- data */

const PURPOSES = [
  {
    th: "สื่อสารข้อมูลหลักสูตร",
    en: "Communicate the program",
    dTh: "อธิบายโครงสร้างหลักสูตร รายวิชา และผลลัพธ์การเรียนรู้",
    dEn: "Explain the curriculum structure, courses, and learning outcomes.",
  },
  {
    th: "ช่วยวางแผนการเรียน",
    en: "Help academic planning",
    dTh: "เครื่องมือตรวจวิชาต่อ จัดตารางเรียน และคำนวณเกรด",
    dEn: "Prerequisite checker, schedule planner, and grade calculator.",
  },
  {
    th: "รวมแหล่งเอกสาร",
    en: "Centralize documents",
    dTh: "ทางลัดไปยังเอกสาร แบบฟอร์ม และคู่มือของวิทยาลัย",
    dEn: "Shortcuts to the college's documents, forms, and guides.",
  },
  {
    th: "รวมโอกาสและกิจกรรม",
    en: "Surface opportunities",
    dTh: "งานแข่ง CTF ทุน ฝึกงาน และ certification ตามชั้นปี",
    dEn: "CTFs, scholarships, internships, and certifications by year.",
  },
  {
    th: "ประชาสัมพันธ์หลักสูตร",
    en: "Promote the program",
    dTh: "นำเสนอจุดเด่นและเส้นทางอาชีพสำหรับผู้สนใจสมัคร",
    dEn: "Highlight strengths and career paths for prospective students.",
  },
  {
    th: "เป็นทางลัดสู่ข้อมูลทางการ",
    en: "Gateway to official info",
    dTh: "เชื่อมไปยังหน้าทางการของวิทยาลัยสำหรับข้อมูลล่าสุด",
    dEn: "Links to the college's official pages for the latest information.",
  },
];

const READY = [
  { th: "หน้าโครงสร้างหลักสูตรและแผนการเรียน", en: "Core curriculum & study-plan pages" },
  { th: "ระบบค้นหารายวิชา (Course Catalog)", en: "Course catalog" },
  { th: "เส้นทาง 4 ปี (Undergraduate Journey)", en: "Undergraduate journey" },
  { th: "ศูนย์รวมบริการ (One Stop Service)", en: "One Stop Service" },
  { th: "ทางลัดเอกสาร (Resource Hub)", en: "Resource gateway" },
  { th: "ศูนย์รวมโอกาส (Opportunity Hub)", en: "Opportunity hub" },
  { th: "โครงสร้างหน้าคณาจารย์", en: "Faculty directory structure" },
  { th: "โครงสร้างหน้า FAQ และติดต่อ", en: "FAQ & contact structure" },
  { th: "รองรับสองภาษา (ไทย/อังกฤษ)", en: "TH/EN bilingual support" },
  { th: "ระบบ build แบบ static export", en: "Static export build" },
  { th: "เอกสารสำหรับ deploy", en: "Deployment notes" },
];

const VERIFY = [
  { th: "ข้อมูลคณาจารย์", en: "Faculty information" },
  { th: "ช่องทางติดต่อเฉพาะของหลักสูตร", en: "Program office contact" },
  { th: "รายละเอียดการรับเข้าเฉพาะหลักสูตร", en: "Admissions details" },
  { th: "ประกาศจริง (ตอนนี้เป็นตัวอย่าง)", en: "Announcements (currently sample)" },
  { th: "เอกสารและแบบฟอร์มทางการ", en: "Official documents & forms" },
  { th: "คำอธิบายบริการดิจิทัล", en: "Digital-services descriptions" },
  { th: "การตั้งค่าโดเมน/เซิร์ฟเวอร์", en: "Domain / server configuration" },
];

const LAUNCH = [
  { th: "ตรวจเนื้อหากับคณะกรรมการหลักสูตร", en: "Verify content with the program committee" },
  { th: "ตรวจสอบลิงก์ทางการทั้งหมด", en: "Verify all official links" },
  { th: "ยืนยันช่องทางติดต่อ", en: "Confirm contact channels" },
  { th: "กำหนดผู้ดูแลข้อมูล (data owner)", en: "Confirm a data owner" },
  { th: "Deploy ขึ้น staging", en: "Deploy to staging" },
  { th: "ทดสอบบนโดเมนจริง + เปิด HTTPS", en: "Test on the real domain + enable HTTPS" },
  { th: "ตรวจมือถือและภาษารอบสุดท้าย", en: "Final mobile & language QA" },
];

const MATRIX: {
  areaTh: string;
  areaEn: string;
  srcTh: string;
  srcEn: string;
  status: "gateway" | "verify" | "sample";
}[] = [
  {
    areaTh: "โครงสร้างหลักสูตร / รายวิชา",
    areaEn: "Curriculum structure / courses",
    srcTh: "เอกสารหลักสูตร (PDF) + ข้อมูลรายวิชาเดิม",
    srcEn: "Curriculum PDF + existing course data",
    status: "verify",
  },
  {
    areaTh: "คณาจารย์",
    areaEn: "Faculty",
    srcTh: "ข้อมูลคณาจารย์จากเว็บไซต์วิทยาลัย (CSV)",
    srcEn: "Lecturer data from the college site (CSV)",
    status: "verify",
  },
  {
    areaTh: "การรับเข้าศึกษา",
    areaEn: "Admissions",
    srcTh: "computing.kku.ac.th/bsc-entrance",
    srcEn: "computing.kku.ac.th/bsc-entrance",
    status: "gateway",
  },
  {
    areaTh: "เอกสารนักศึกษา",
    areaEn: "Student documents",
    srcTh: "computing.kku.ac.th/students",
    srcEn: "computing.kku.ac.th/students",
    status: "gateway",
  },
  {
    areaTh: "บริการดิจิทัล",
    areaEn: "Digital services",
    srcTh: "computing.kku.ac.th/digital-services",
    srcEn: "computing.kku.ac.th/digital-services",
    status: "gateway",
  },
  {
    areaTh: "ประกาศ",
    areaEn: "Announcements",
    srcTh: "ข้อมูลตัวอย่างในระบบ",
    srcEn: "Sample data in the site",
    status: "sample",
  },
  {
    areaTh: "การติดต่อ",
    areaEn: "Contact",
    srcTh: "ข้อมูลติดต่อสาธารณะของวิทยาลัย + ช่องทางหลักสูตร (รอยืนยัน)",
    srcEn: "College public contact + program channel (to confirm)",
    status: "verify",
  },
];

const CHECKLIST: {
  th: string;
  en: string;
  items: { th: string; en: string }[];
}[] = [
  {
    th: "ข้อมูลหลักสูตรและรายวิชา",
    en: "Program & course data",
    items: [
      { th: "โครงสร้างหลักสูตรตรงกับ มคอ.2 ฉบับล่าสุด", en: "Curriculum matches the latest TQF2" },
      { th: "หน่วยกิตและเงื่อนไขวิชาต่อถูกต้อง", en: "Credits and prerequisites are correct" },
    ],
  },
  {
    th: "คณาจารย์",
    en: "Faculty",
    items: [
      { th: "ชื่อ ตำแหน่ง อีเมล และโปรไฟล์ถูกต้อง", en: "Names, positions, emails, profiles correct" },
      { th: "ปรับสถานะเป็น verified เมื่อยืนยันแล้ว", en: "Flip status to verified once approved" },
    ],
  },
  {
    th: "การรับเข้าและเอกสาร",
    en: "Admissions & documents",
    items: [
      { th: "ลิงก์การรับเข้าและเอกสารยังใช้งานได้", en: "Admissions & document links still valid" },
      { th: "เอกสาร/แบบฟอร์มชี้ไปแหล่งทางการ", en: "Forms point to official sources" },
    ],
  },
  {
    th: "ติดต่อและประกาศ",
    en: "Contact & announcements",
    items: [
      { th: "ช่องทางติดต่อหลักสูตรได้รับการยืนยัน", en: "Program contact channels confirmed" },
      { th: "แทนที่ประกาศตัวอย่างด้วยประกาศจริง", en: "Replace sample announcements with real ones" },
    ],
  },
  {
    th: "ข้อกฎหมายและคำชี้แจง",
    en: "Legal & disclaimer",
    items: [
      { th: "คำชี้แจงข้อมูลทางการแสดงครบถ้วน", en: "Official-data disclaimer is present" },
      { th: "ไม่มีการอ้างว่า official เกินจริง", en: "No over-claiming of official status" },
    ],
  },
  {
    th: "การ deploy และโดเมน",
    en: "Deployment & domain",
    items: [
      { th: "Build/staging ผ่าน และเปิด HTTPS", en: "Build/staging passes and HTTPS enabled" },
      { th: "กำหนดผู้ดูแลข้อมูลและการบำรุงรักษา", en: "Data owner and maintenance assigned" },
    ],
  },
];
