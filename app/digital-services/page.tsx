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
      links: [
        { title: "KKU Account", url: "https://kku.world/zmldie", descTh: "จัดการบัญชีผู้ใช้นักศึกษา", descEn: "Manage student account and profile." },
        { title: "Account Recovery", url: "https://ssonext.kku.ac.th/recovery", descTh: "กู้คืนรหัสผ่านและบัญชี", descEn: "Recover your account password." },
        { title: "Change Password", url: "https://ssonext.kku.ac.th/password", descTh: "เปลี่ยนรหัสผ่านของมหาวิทยาลัย", descEn: "Update your university password." },
      ]
    },
    {
      icon: Wifi,
      th: "เครือข่ายและ Wi-Fi",
      en: "Network & Wi-Fi",
      links: [
        { title: "eduroam", url: "https://digital.kku.ac.th/page/86", descTh: "เครือข่าย Wi-Fi ทั่วโลกสำหรับการศึกษา", descEn: "Global Wi-Fi roaming for academia." },
        { title: "KKU VPN", url: "https://vpn-portal.kku.ac.th/", descTh: "เชื่อมต่อเครือข่ายภายในมหาวิทยาลัยจากภายนอก", descEn: "Access campus network from outside." },
        { title: "Temp account KKU-WiFi", url: "https://digital.kku.ac.th/page/220", descTh: "ขอใช้บริการ Wi-Fi ชั่วคราว", descEn: "Temporary Wi-Fi access account." },
      ]
    },
    {
      icon: AppWindow,
      th: "ซอฟต์แวร์และไลเซนส์",
      en: "Software & licenses",
      links: [
        { title: "Adobe Creative Cloud", url: "https://software.kku.ac.th/data/software.php", descTh: "ชุดโปรแกรมออกแบบและกราฟิกครบวงจร", descEn: "Complete suite of design and graphics software." },
        { title: "Canva Pro", url: "https://kku.world/canvapro", descTh: "เครื่องมือออกแบบและจัดทำสื่อออนไลน์", descEn: "Online design and publishing tool." },
        { title: "Microsoft 365", url: "https://portal.office.com/", descTh: "โปรแกรมออฟฟิศและพื้นที่จัดเก็บคลาวด์", descEn: "Office applications and cloud storage." },
        { title: "Microsoft Azure", url: "https://azureforeducation.microsoft.com/devtools", descTh: "แพลตฟอร์มคลาวด์และเครื่องมือสำหรับนักพัฒนา", descEn: "Cloud platform and developer tools." },
        { title: "Software Licence", url: "https://software.kku.ac.th/", descTh: "บริการซอฟต์แวร์ถูกลิขสิทธิ์อื่นๆ ของมหาวิทยาลัย", descEn: "Other licensed software provided by KKU." },
        { title: "โปรแกรม Antivirus", url: "https://software.kku.ac.th/data/software.php", descTh: "ซอฟต์แวร์ป้องกันไวรัสสำหรับนักศึกษา", descEn: "Antivirus software for students." },
      ]
    },
    {
      icon: ServerCog,
      th: "การเข้าถึงระบบและทรัพยากร",
      en: "System & resource access",
      links: [
        { title: "Google Workspace", url: "https://workspace.google.com/dashboard", descTh: "ชุดเครื่องมือทำงานและการทำงานร่วมกันจาก Google", descEn: "Google's suite of collaboration tools." },
        { title: "OneDrive", url: "https://khonkaenuniversity-my.sharepoint.com/_layouts/15/MySite.aspx?MySiteRedirect=AllDocuments", descTh: "พื้นที่จัดเก็บข้อมูลบนคลาวด์จาก Microsoft", descEn: "Cloud storage from Microsoft." },
        { title: "Google Gemini", url: "https://gemini.google.com/app?utm_source=app_launcher&utm_medium=owned&utm_campaign=base_all", descTh: "ผู้ช่วย AI อัจฉริยะจาก Google", descEn: "AI assistant from Google." },
        { title: "KKU AI Sphere", url: "https://ai.kku.ac.th/", descTh: "แพลตฟอร์มบริการ AI สำหรับบุคลากรและนักศึกษา", descEn: "AI service platform for staff and students." },
        { title: "KKU IntelSphere AI", url: "https://gen.ai.kku.ac.th/", descTh: "เครื่องมือและทรัพยากร AI ขั้นสูง", descEn: "Advanced AI tools and resources." },
        { title: "Google Meet", url: "https://meet.google.com/landing?hs=197&authuser=0", descTh: "ระบบการประชุมออนไลน์ผ่านวิดีโอ", descEn: "Video conferencing system." },
        { title: "KKU Zoom", url: "https://app-reserve.kku.ac.th/", descTh: "บริการบัญชี Zoom พรีเมียมสำหรับการเรียนการสอน", descEn: "Premium Zoom accounts for education." },
        { title: "iKKU", url: "https://i.kku.ac.th/", descTh: "ระบบพอร์ทัลบริการต่างๆ ของมหาวิทยาลัย", descEn: "University digital services portal." },
      ]
    },
    {
      icon: FileInput,
      th: "บริการคำร้องและบริการอื่นๆ",
      en: "Online request & other services",
      links: [
        { title: "ไอทีคลีนิค (IT Clinic)", url: "https://kku.world/7gf5jy", descTh: "บริการให้คำปรึกษาและซ่อมบำรุงด้านไอที", descEn: "IT consultation and maintenance service." },
        { title: "IT Training", url: "https://www2.kku.ac.th/training/", descTh: "โครงการอบรมเชิงปฏิบัติการด้านคอมพิวเตอร์", descEn: "Computer and technology training workshops." },
        { title: "จองหอพักออนไลน์", url: "https://dorm-booking.kku.ac.th/index", descTh: "ระบบจองหอพักนักศึกษาผ่านออนไลน์", descEn: "Online dormitory booking system." },
      ]
    },
  ];

  return (
    <div className="container-page space-y-12 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <MonitorSmartphone className="h-3.5 w-3.5" /> {L("บริการดิจิทัล", "Digital Services")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L("บริการดิจิทัลสำหรับนักศึกษา", "Digital Services for Students")}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(
            "แหล่งรวมบริการดิจิทัลทั้งหมดที่มหาวิทยาลัยขอนแก่นมีให้สำหรับนักศึกษา (ข้อมูลอ้างอิงจากสำนักเทคโนโลยีดิจิทัล มข.)",
            "A collection of all digital services provided by Khon Kaen University for students (Data from Office of Digital Technology, KKU).",
          )}
        </p>
      </header>

      <div className="space-y-12">
        {groups.map((g) => {
          const Icon = g.icon;
          return (
            <section key={g.en} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-navy-900 dark:text-white border-b border-slate-200 pb-2 dark:border-navy-700">
                <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" /> {L(g.th, g.en)}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.links.map(link => {
                  const pseudoLink = {
                    id: link.url,
                    audience: ["student" as const],
                    category: "digital" as const,
                    title: { th: link.title, en: link.title },
                    description: { th: link.descTh, en: link.descEn },
                    url: link.url
                  };
                  return <OfficialLinkCard key={link.title} link={pseudoLink} />;
                })}
              </div>
            </section>
          );
        })}
      </div>

      {officialLink && (
        <section className="pt-8 border-t border-slate-200 dark:border-navy-700">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-navy-900 dark:text-white">
            <ExternalLink className="h-5 w-5 text-cyan-600 dark:text-cyan-400" /> {L("หน้าบริการอย่างเป็นทางการ", "Official Service Portal")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <OfficialLinkCard link={officialLink} />
          </div>
        </section>
      )}
    </div>
  );
}
