"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "./LanguageProvider";
import { asset } from "@/lib/asset";

// Flagship items shown directly in the bar.
const PRIMARY = [
  { href: "/one-stop", k: "nav.oneStop" },
  { href: "/journey", k: "nav.journey" },
  { href: "/curriculum", k: "nav.curriculum" },
  { href: "/courses", k: "nav.courses" },
  { href: "/resources", k: "nav.resources" },
  { href: "/opportunities", k: "nav.opportunities" },
  { href: "/faculty", k: "nav.faculty" },
];

// Grouped under a "More" dropdown.
const MORE_GROUPS: { labelKey: string; items: { href: string; k: string }[] }[] = [
  {
    labelKey: "nav.group.tools",
    items: [
      { href: "/electives", k: "nav.electives" },
      { href: "/prerequisite", k: "nav.prerequisite" },
      { href: "/study-plan", k: "nav.studyPlan" },
      { href: "/grade-calculator", k: "nav.gradeCalculator" },
      { href: "/schedule-planner", k: "nav.schedule" },
    ],
  },
  {
    labelKey: "nav.group.services",
    items: [
      { href: "/admissions", k: "nav.admissions" },
      { href: "/digital-services", k: "nav.digitalServices" },
      { href: "/announcements", k: "nav.announcements" },
      { href: "/faq", k: "nav.faq" },
      { href: "/contact", k: "nav.contact" },
    ],
  },
  {
    labelKey: "nav.group.program",
    items: [
      { href: "/pathways", k: "nav.pathways" },
      { href: "/outcomes", k: "nav.outcomes" },
      { href: "/careers", k: "nav.careers" },
      { href: "/advisor", k: "nav.advisor" },
      { href: "/about", k: "nav.about" },
    ],
  },
];

const MORE = MORE_GROUPS.flatMap((g) => g.items);

const ALL = [{ href: "/", k: "nav.home" }, ...PRIMARY, ...MORE];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  // close menus on route change
  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // close the "More" dropdown on outside click
  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const moreActive = MORE.some((m) => isActive(pathname, m.href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-navy-700 dark:bg-navy-950/80 no-print">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 p-1.5 shadow-sm ring-1 ring-slate-200 dark:ring-navy-700">
            <Image
              src={asset("/Cyber.png")}
              alt="Cyber Security Khon Kaen University Logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-navy-900 dark:text-slate-100">
              Cybersecurity Curriculum
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {t("nav.brand.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {PRIMARY.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-800"
                }`}
              >
                {t(item.k)}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setMoreOpen((s) => !s)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm transition ${
                moreActive || moreOpen
                  ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-navy-800"
              }`}
            >
              {t("nav.more")}
              <ChevronDown className={`h-4 w-4 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 mt-2 max-h-[70vh] w-60 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl dark:border-navy-700 dark:bg-navy-900">
                {MORE_GROUPS.map((group, gi) => (
                  <div key={group.labelKey}>
                    {gi > 0 && (
                      <div className="my-1 border-t border-slate-100 dark:border-navy-800" />
                    )}
                    <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {t(group.labelKey)}
                    </p>
                    {group.items.map((item) => (
                      <DropdownLink
                        key={item.href}
                        href={item.href}
                        active={isActive(pathname, item.href)}
                      >
                        {t(item.k)}
                      </DropdownLink>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            aria-label={t("common.menu")}
            className="xl:hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-navy-800"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-slate-200 bg-white dark:border-navy-700 dark:bg-navy-900 max-h-[70vh] overflow-y-auto">
          <div className="container-page py-2 flex flex-col">
            {ALL.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block py-3 px-4 text-base border-b border-slate-100 dark:border-navy-800 last:border-0 transition-colors ${
                  isActive(pathname, item.href)
                    ? "text-cyan-700 dark:text-cyan-400 font-medium"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-navy-800"
                }`}
              >
                {t(item.k)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function DropdownLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block px-3 py-2 text-sm transition ${
        active
          ? "bg-slate-100 text-navy-900 dark:bg-navy-800 dark:text-white"
          : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-navy-800"
      }`}
    >
      {children}
    </Link>
  );
}
