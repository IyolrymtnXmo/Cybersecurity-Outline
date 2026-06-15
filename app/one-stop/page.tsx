"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Network,
  Search,
  Compass,
  CalendarRange,
  GitFork,
  Calculator,
  FolderOpen,
  Trophy,
  Users,
  ClipboardList,
  MonitorSmartphone,
  HelpCircle,
  Mail,
  ArrowRight,
  GraduationCap,
  FileText,
  ShieldCheck,
  Megaphone,
  Sparkles,
  CircleCheck,
  CircleDashed,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinks } from "@/lib/site";

export default function OneStopPage() {
  const { locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-grid-fade text-white">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              <LayoutGrid className="h-3.5 w-3.5" /> {L("ศูนย์รวมบริการ", "One Stop Service")}
            </p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
              Cybersecurity One Stop Service
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300">
              {L(
                "รวมทุกอย่างที่นักศึกษา Cybersecurity ต้องใช้ไว้ในเว็บเดียว — หลักสูตร เครื่องมือวางแผน เอกสาร โอกาส คณาจารย์ และลิงก์ทางการของวิทยาลัย",
                "Everything a Cybersecurity student needs in one place — the curriculum, planning tools, documents, opportunities, faculty, and the college's official links.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="container-page">
        <SectionHeading
          icon={<LayoutGrid className="h-4 w-4" />}
          kicker={L("เข้าถึงเร็ว", "Quick access")}
          title={L("ทุกเครื่องมือและหน้าในที่เดียว", "Every tool and page in one grid")}
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {QUICK_ACCESS.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="card group flex items-start gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-cyan-500 group-hover:text-white dark:bg-navy-800 dark:text-cyan-400">
                {q.icon}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-navy-900 dark:text-white">{L(q.th, q.en)}</p>
                <p className="text-xs text-slate-500">{L(q.descTh, q.descEn)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Scenario guide */}
      <section className="container-page">
        <SectionHeading
          icon={<Compass className="h-4 w-4" />}
          kicker={L("เริ่มจากสถานการณ์ของคุณ", "Start from your situation")}
          title={L("ฉันควรไปที่ไหนต่อ?", "Where should I go next?")}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {SCENARIOS.map((s) => (
            <ScenarioCard key={s.qEn} scenario={s} L={L} />
          ))}
        </div>
      </section>

      {/* Official links */}
      <section className="container-page">
        <SectionHeading
          icon={<ShieldCheck className="h-4 w-4" />}
          kicker={L("ลิงก์ทางการ", "Official links")}
          title={L("ข้อมูลทางการจากวิทยาลัยการคอมพิวเตอร์", "Official information from the College of Computing")}
          desc={L(
            "เว็บนี้ทำหน้าที่เป็นทางลัด ข้อมูลล่าสุดให้ตรวจสอบจากเว็บไซต์วิทยาลัยเสมอ",
            "This site acts as a gateway — always check the college website for the latest information.",
          )}
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officialLinks.map((l) => (
            <OfficialLinkCard key={l.id} link={l} />
          ))}
        </div>
      </section>


    </div>
  );
}

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
      <h2 className="mt-1 text-2xl font-bold text-navy-900 dark:text-white md:text-3xl">
        {title}
      </h2>
      {desc && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{desc}</p>}
    </div>
  );
}

function ScenarioCard({
  scenario,
  L,
}: {
  scenario: Scenario;
  L: (th: string, en: string) => string;
}) {
  const isExternal = scenario.href.startsWith("http");
  const inner = (
    <>
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-navy-800 dark:text-cyan-400">
          {scenario.icon}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-navy-900 dark:text-white">
            {L(scenario.qTh, scenario.qEn)}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {L(scenario.aTh, scenario.aEn)}
          </p>
        </div>
      </div>
      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-700 dark:text-cyan-400">
        {L(scenario.ctaTh, scenario.ctaEn)}
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );

  const className =
    "card flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40";

  return isExternal ? (
    <a href={scenario.href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={scenario.href} className={className}>
      {inner}
    </Link>
  );
}

const QUICK_ACCESS = [
  { href: "/curriculum", icon: <Network className="h-5 w-5" />, th: "โครงสร้างหลักสูตร", en: "Curriculum Outline", descTh: "แผนที่หลักสูตร 4 ปี", descEn: "The 4-year map" },
  { href: "/courses", icon: <Search className="h-5 w-5" />, th: "รายวิชา", en: "Course Catalog", descTh: "ค้นหารายวิชาทั้งหมด", descEn: "Search all courses" },
  { href: "/journey", icon: <Compass className="h-5 w-5" />, th: "เส้นทาง 4 ปี", en: "Undergraduate Journey", descTh: "สิ่งที่ทำในแต่ละเทอม", descEn: "What to do each term" },
  { href: "/study-plan", icon: <GraduationCap className="h-5 w-5" />, th: "แผนการเรียน", en: "Study Plan", descTh: "ลำดับวิชาที่แนะนำ", descEn: "Recommended sequence" },
  { href: "/prerequisite", icon: <GitFork className="h-5 w-5" />, th: "ตรวจวิชาต่อ", en: "Prerequisite Checker", descTh: "จำลองผลกระทบวิชาต่อ", descEn: "Simulate prereq impact" },
  { href: "/schedule-planner", icon: <CalendarRange className="h-5 w-5" />, th: "จัดตารางเรียน", en: "Schedule Planner", descTh: "จัดคาบไม่ให้ชนกัน", descEn: "Avoid time clashes" },
  { href: "/grade-calculator", icon: <Calculator className="h-5 w-5" />, th: "คำนวณเกรด", en: "Grade Calculator", descTh: "ประมาณ GPA/GPAX", descEn: "Estimate GPA/GPAX" },
  { href: "/resources", icon: <FolderOpen className="h-5 w-5" />, th: "เอกสาร", en: "Resources", descTh: "เอกสารและแหล่งข้อมูล", descEn: "Docs & resources" },
  { href: "/opportunities", icon: <Trophy className="h-5 w-5" />, th: "งานแข่ง/โอกาส", en: "Opportunities", descTh: "CTF ทุน ฝึกงาน", descEn: "CTFs, scholarships" },
  { href: "/faculty", icon: <Users className="h-5 w-5" />, th: "คณาจารย์", en: "Faculty", descTh: "คณาจารย์ประจำหลักสูตร", descEn: "Program faculty" },
  { href: "/admissions", icon: <ClipboardList className="h-5 w-5" />, th: "การรับเข้าศึกษา", en: "Admissions", descTh: "สำหรับผู้สนใจสมัคร", descEn: "For prospective students" },
  { href: "/digital-services", icon: <MonitorSmartphone className="h-5 w-5" />, th: "บริการดิจิทัล", en: "Digital Services", descTh: "บัญชี เครือข่าย ระบบ", descEn: "Accounts, network, systems" },
  { href: "/announcements", icon: <Megaphone className="h-5 w-5" />, th: "ประกาศ", en: "Announcements", descTh: "ข่าวสารและประกาศ", descEn: "News & notices" },
  { href: "/faq", icon: <HelpCircle className="h-5 w-5" />, th: "คำถามที่พบบ่อย", en: "FAQ", descTh: "คำตอบที่พบบ่อย", descEn: "Common answers" },
  { href: "/contact", icon: <Mail className="h-5 w-5" />, th: "ติดต่อ", en: "Contact", descTh: "ช่องทางติดต่อหลักสูตร", descEn: "Reach the program" },
  { href: "/pathways", icon: <FileText className="h-5 w-5" />, th: "Project / Co-op / WIL", en: "Project / Co-op / WIL", descTh: "เส้นทางปลายหลักสูตร", descEn: "Late-program tracks" },
];

type Scenario = {
  icon: React.ReactNode;
  qTh: string;
  qEn: string;
  aTh: string;
  aEn: string;
  href: string;
  ctaTh: string;
  ctaEn: string;
};

const SCENARIOS: Scenario[] = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    qTh: "ฉันเป็นนักศึกษาใหม่",
    qEn: "I'm a new student",
    aTh: "เริ่มจากเส้นทาง 4 ปี เพื่อเข้าใจภาพรวมและสิ่งที่ต้องเตรียมในแต่ละเทอม",
    aEn: "Start with the 4-year journey to understand the big picture and what to prepare each term.",
    href: "/journey",
    ctaTh: "ดูเส้นทาง 4 ปี",
    ctaEn: "Open the journey",
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    qTh: "ฉันอยากสมัครเรียน Cybersecurity",
    qEn: "I want to apply to Cybersecurity",
    aTh: "ดูข้อมูลการรับเข้าและลิงก์ทางการของวิทยาลัยที่หน้าการรับเข้าศึกษา",
    aEn: "See admissions info and the college's official links on the Admissions page.",
    href: "/admissions",
    ctaTh: "ไปหน้าการรับเข้า",
    ctaEn: "Go to Admissions",
  },
  {
    icon: <CalendarRange className="h-5 w-5" />,
    qTh: "ฉันกำลังจะลงทะเบียน",
    qEn: "I'm about to register",
    aTh: "ใช้แผนการเรียนและตัวจัดตารางเรียนเพื่อวางวิชาและคาบเรียนของเทอมหน้า",
    aEn: "Use the Study Plan and Schedule Planner to lay out next semester's courses and time slots.",
    href: "/schedule-planner",
    ctaTh: "เปิดตัวจัดตาราง",
    ctaEn: "Open the planner",
  },
  {
    icon: <GitFork className="h-5 w-5" />,
    qTh: "ฉันกังวลเรื่องวิชาต่อ / prerequisite",
    qEn: "I'm worried about prerequisites",
    aTh: "ใช้ตัวตรวจวิชาต่อเพื่อจำลองผลกระทบเมื่อยังไม่ผ่านวิชาใดวิชาหนึ่ง",
    aEn: "Use the Prerequisite Checker to simulate the impact of not passing a course.",
    href: "/prerequisite",
    ctaTh: "ตรวจวิชาต่อ",
    ctaEn: "Check prerequisites",
  },
  {
    icon: <FolderOpen className="h-5 w-5" />,
    qTh: "ฉันกำลังหาเอกสาร",
    qEn: "I'm looking for documents",
    aTh: "ดูศูนย์รวมเอกสารและทางลัดไปยังหน้านักศึกษาทางการของวิทยาลัย",
    aEn: "Browse the Resource Hub and the shortcut to the college's official student page.",
    href: "/resources",
    ctaTh: "เปิดศูนย์รวมเอกสาร",
    ctaEn: "Open Resources",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    qTh: "ฉันอยากเข้าร่วมงานแข่ง",
    qEn: "I want to join competitions",
    aTh: "ดูงานแข่ง CTF แฮกกาธอน ทุน และ certification ที่คัดสรรตามชั้นปี",
    aEn: "Browse curated CTFs, hackathons, scholarships, and certifications by year.",
    href: "/opportunities",
    ctaTh: "ดูโอกาสทั้งหมด",
    ctaEn: "See opportunities",
  },
  {
    icon: <MonitorSmartphone className="h-5 w-5" />,
    qTh: "ฉันต้องการบริการดิจิทัล",
    qEn: "I need digital services",
    aTh: "ดูภาพรวมบริการดิจิทัลและลิงก์ไปหน้าบริการทางการของวิทยาลัย",
    aEn: "See the digital-services overview and link to the college's official services page.",
    href: "/digital-services",
    ctaTh: "ไปบริการดิจิทัล",
    ctaEn: "Go to Digital Services",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    qTh: "ฉันอยากติดต่อหลักสูตร",
    qEn: "I want to contact the program",
    aTh: "ดูช่องทางติดต่อของวิทยาลัยและรายชื่อคณาจารย์ประจำหลักสูตร",
    aEn: "Find the college's contact channels and the program's faculty list.",
    href: "/contact",
    ctaTh: "ไปหน้าติดต่อ",
    ctaEn: "Go to Contact",
  },
];


