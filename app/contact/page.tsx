"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Users,
  ExternalLink,
  ShieldQuestion,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { contact, type ContactKind } from "@/lib/site";

const KIND_ICON: Record<ContactKind, React.ComponentType<{ className?: string }>> = {
  office: MapPin,
  phone: Phone,
  email: Mail,
  website: Globe,
  person: User,
};

export default function ContactPage() {
  const { t, locale } = useLang();
  const L = (th: string, en: string) => (locale === "en" ? en : th);
  const p = contact.program;

  return (
    <div className="container-page space-y-6 py-8">
      <header className="max-w-3xl">
        <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          <Mail className="h-3.5 w-3.5" /> {L("ติดต่อหลักสูตร", "Contact")}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-navy-900 dark:text-white">
          {L(p.nameThai, p.nameEnglish)}
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {L(p.facultyThai, p.facultyEnglish)}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {contact.cards.map((c) => {
          const Icon = KIND_ICON[c.kind] ?? Mail;
          const inner = (
            <>
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 dark:bg-navy-800 dark:text-cyan-400">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {c.label[locale]}
                    </p>
                    {!c.verified && (
                      <span className="badge border-amber-300 bg-amber-50 text-amber-700 dark:text-amber-300">
                        {t("common.toBeConfirmed")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 break-words font-medium text-navy-900 dark:text-white">
                    {c.value[locale]}
                  </p>
                </div>
                {c.href && (
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
                )}
              </div>
            </>
          );
          return c.href ? (
            <a
              key={c.id}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer" : undefined}
              className="card p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
            >
              {inner}
            </a>
          ) : (
            <div key={c.id} className="card p-5">
              {inner}
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/faculty" className="card flex items-center gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-navy-800 dark:text-cyan-400">
            <Users className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-navy-900 dark:text-white">
              {L("คณาจารย์ประจำหลักสูตร", "Program Faculty")}
            </p>
            <p className="text-sm text-slate-500">
              {L("ดูรายชื่อและความเชี่ยวชาญของอาจารย์", "See faculty and their expertise")}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-400" />
        </Link>
        <a
          href="https://computing.kku.ac.th"
          target="_blank"
          rel="noreferrer"
          className="card flex items-center gap-3 p-5 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/5 dark:hover:shadow-black/40"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-navy-800 dark:text-cyan-400">
            <Globe className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-navy-900 dark:text-white">
              {L("เว็บไซต์วิทยาลัยการคอมพิวเตอร์", "College of Computing website")}
            </p>
            <p className="text-sm text-slate-500">{t("common.checkLatest")}</p>
          </div>
          <ExternalLink className="h-4 w-4 text-slate-400" />
        </a>
      </div>
    </div>
  );
}
