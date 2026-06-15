"use client";

import Link from "next/link";
import { Compass, FileText, Trophy, GraduationCap } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Disclaimer } from "@/components/Disclaimer";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";

export default function JourneyPage() {
  const { t } = useLang();
  return (
    <>
      {/* hero */}
      <section className="relative isolate overflow-hidden bg-grid-fade text-white">
        <div className="hero-grid absolute inset-0 opacity-50" />
        <div className="container-page relative py-16 md:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
            <Compass className="h-3.5 w-3.5" /> {t("journey.kicker")}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl font-semibold leading-tight">
            {t("journey.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">{t("journey.subtitle")}</p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">{t("home.fact.durationVal")}</span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">8 {t("common.semester")}</span>
            <Link href="/resources" className="rounded-full border border-white/15 bg-white/10 px-3 py-1 hover:bg-white/15">
              <FileText className="mr-1 inline h-3.5 w-3.5" /> {t("nav.resources")}
            </Link>
            <Link href="/opportunities" className="rounded-full border border-white/15 bg-white/10 px-3 py-1 hover:bg-white/15">
              <Trophy className="mr-1 inline h-3.5 w-3.5" /> {t("nav.opportunities")}
            </Link>
            <Link href="/pathways" className="rounded-full border border-white/15 bg-white/10 px-3 py-1 hover:bg-white/15">
              <GraduationCap className="mr-1 inline h-3.5 w-3.5" /> {t("nav.pathways")}
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-8 space-y-6">
        <Disclaimer />
        <JourneyTimeline />
      </div>
    </>
  );
}
