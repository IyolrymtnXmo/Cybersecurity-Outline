"use client";

import {
  MonitorSmartphone,
  Info,
  KeyRound,
  Wifi,
  AppWindow,
  ServerCog,
  FileInput,
  ExternalLink,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { OfficialLinkCard } from "@/components/OfficialLinkCard";
import { officialLinkById } from "@/lib/site";

export default function DigitalServicesPage() {
  const { locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);
  const officialLink = officialLinkById("digital-services");

  const groups = [
    {
      icon: KeyRound,
      th: "บัญชีผู้ใช้และการยืนยันตัวตน",
      en: "Accounts & identity",
      descTh: "บัญชีผู้ใช้สำหรับนักศึกษา อีเมล และการเข้าสู่ระบบสารสนเทศของวิทยาลัย/มหาวิทยาลัย",
      descEn: "Student accounts, email, and sign-in to college/university information systems.",
    },
    {
      icon: Wifi,
      th: "เครือข่ายและ Wi-Fi",
      en: "Network & Wi-Fi",
      descTh: "การเชื่อมต่อเครือข่ายภายในและ Wi-Fi สำหรับนักศึกษา",
      descEn: "Campus network and Wi-Fi access for students.",
    },
    {
      icon: AppWindow,
      th: "ซอฟต์แวร์และไลเซนส์",
      en: "Software & licenses",
      descTh: "ซอฟต์แวร์และไลเซนส์ที่วิทยาลัย/มหาวิทยาลัยจัดให้สำหรับการเรียน",
      descEn: "Software and licenses provided by the college/university for study.",
    },
    {
      icon: ServerCog,
      th: "การเข้าถึงระบบและทรัพยากร",
      en: "System & resource access",
      descTh: "การเข้าถึงระบบสารสนเทศ ห้องแล็บ และทรัพยากรการเรียนรู้",
      descEn: "Access to information systems, labs, and learning resources.",
    },
    {
      icon: FileInput,
      th: "บริการคำร้องออนไลน์",
      en: "Online request services",
      descTh: "การยื่นคำร้องและบริการออนไลน์ต่าง ๆ สำหรับนักศึกษา",
      descEn: "Online requests and self-service for students.",
    },
  ];

  return (
    <div className="container-page space-y-8 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <MonitorSmartphone className="h-3.5 w-3.5" /> {L("บริการดิจิทัล", "Digital Services")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L("บริการดิจิทัลสำหรับนักศึกษา", "Digital Services for Students")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "ภาพรวมบริการดิจิทัลที่นักศึกษาควรรู้ พร้อมทางลัดไปยังหน้าบริการดิจิทัลอย่างเป็นทางการของวิทยาลัย",
            "An overview of digital services students should know, with a shortcut to the college's official digital-services page.",
          )}
        </p>
      </header>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-900/10 dark:text-amber-300/90">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p className="leading-relaxed">
          {L(
            "หมวดหมู่ด้านล่างเป็นภาพรวมทั่วไป รายการบริการและเงื่อนไขการขอใช้ที่เป็นทางการให้ตรวจสอบจากหน้าบริการดิจิทัลของวิทยาลัย",
            "The categories below are a general overview. For the official service list and request conditions, check the college's digital-services page.",
          )}
        </p>
      </div>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => {
            const Icon = g.icon;
            return (
              <div key={g.en} className="card flex flex-col gap-3 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-cyan-400">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-semibold text-navy-900 dark:text-white">
                  {L(g.th, g.en)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {L(g.descTh, g.descEn)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {officialLink && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white">
            <ExternalLink className="h-4 w-4" /> {L("ลิงก์ทางการ", "Official link")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <OfficialLinkCard link={officialLink} />
          </div>
        </section>
      )}
    </div>
  );
}
