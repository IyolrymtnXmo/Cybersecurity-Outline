"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search, UserX, X } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  faculty,
  facultyPositions,
  facultyExpertiseTags,
  type FacultyMember,
} from "@/lib/faculty";
import { FacultyCard } from "./FacultyCard";

function L(locale: "th" | "en", th: string, en: string) {
  return locale === "en" ? en : th;
}

export function FacultyDirectory() {
  const { locale } = useLang();
  const [q, setQ] = useState("");
  const [position, setPosition] = useState("all");
  const [expertise, setExpertise] = useState("all");

  const positions = useMemo(() => facultyPositions(), []);
  const expertiseTags = useMemo(() => facultyExpertiseTags(), []);

  const fuse = useMemo(
    () =>
      new Fuse(faculty, {
        keys: [
          { name: "nameEnglish", getFn: (m) => m.nameEnglish ?? "" },
          { name: "nameThai", getFn: (m) => m.nameThai ?? "" },
          { name: "expertise", getFn: (m) => m.expertise.join(" ") },
        ],
        threshold: 0.4,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    const base: FacultyMember[] = q.trim()
      ? fuse.search(q.trim()).map((r) => r.item)
      : faculty;
    return base.filter((m) => {
      if (position !== "all" && m.academicPosition?.en !== position) return false;
      if (expertise !== "all" && !m.expertise.includes(expertise)) return false;
      return true;
    });
  }, [q, position, expertise, fuse]);

  const hasFilters = q.trim() !== "" || position !== "all" || expertise !== "all";

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={L(
              locale,
              "ค้นหาชื่อ (ไทย/อังกฤษ) หรือความเชี่ยวชาญ",
              "Search name (TH/EN) or expertise",
            )}
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
          />
        </div>

        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
        >
          <option value="all">
            {L(locale, "ทุกตำแหน่ง", "All positions")}
          </option>
          {positions.map((p) => (
            <option key={p.en} value={p.en}>
              {p[locale]}
            </option>
          ))}
        </select>

        <select
          value={expertise}
          onChange={(e) => setExpertise(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-900"
        >
          <option value="all">
            {L(locale, "ทุกความเชี่ยวชาญ", "All expertise")}
          </option>
          {expertiseTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => {
              setQ("");
              setPosition("all");
              setExpertise("all");
            }}
            className="btn-ghost text-sm"
          >
            <X className="h-4 w-4" /> {L(locale, "ล้างตัวกรอง", "Clear")}
          </button>
        )}
      </div>

      <p className="text-sm text-slate-500">
        {L(locale, "พบ", "Showing")} {results.length}{" "}
        {L(locale, "ท่าน", results.length === 1 ? "person" : "people")}
      </p>

      {results.length === 0 ? (
        <div className="card grid place-items-center gap-3 py-16 text-center">
          <UserX className="h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">
            {L(
              locale,
              "ไม่พบคณาจารย์ที่ตรงกับเงื่อนไข",
              "No faculty match your filters",
            )}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {results.map((m) => (
            <FacultyCard key={m.id} member={m} />
          ))}
        </div>
      )}
    </div>
  );
}
