/**
 * Faculty data model + loader.
 *
 * Source of truth: data/faculty.json, normalized from the program's
 * `Lecturer-Cyber_data-utf-8.csv`. Fields that are not present in the CSV are
 * `null` (and shown as "To be confirmed" in the UI) — they are never invented.
 *
 * `expertise` is kept as English technical field names exactly as provided.
 * In Thai mode they are shown as-is (not machine-translated), per program note.
 */
import facultyData from "@/data/faculty.json";
import type { Locale } from "./i18n";

export type LocalizedText = { th: string; en: string };

export type FacultyStatus = "verified" | "needs-verification" | "placeholder";

export type FacultyMember = {
  id: string;
  nameThai: string | null;
  nameEnglish: string | null;
  academicPosition: LocalizedText | null;
  role: LocalizedText | null;
  email: string | null;
  imageUrl: string | null;
  expertise: string[];
  bio: LocalizedText | null;
  office: LocalizedText | null;
  profileUrl: string | null;
  status: FacultyStatus;
};

export const faculty: FacultyMember[] = facultyData as FacultyMember[];

/** Pick the localized academic-position label, falling back to the other locale. */
export function positionLabel(
  m: FacultyMember,
  locale: Locale,
): string | null {
  if (!m.academicPosition) return null;
  return m.academicPosition[locale] || m.academicPosition.th;
}

/** Primary display name for the active locale, with graceful fallback. */
export function facultyName(m: FacultyMember, locale: Locale): string {
  const primary = locale === "en" ? m.nameEnglish : m.nameThai;
  return primary ?? m.nameEnglish ?? m.nameThai ?? "—";
}

/** Secondary (other-language) name, used as a subtitle. */
export function facultySubName(m: FacultyMember, locale: Locale): string | null {
  const sub = locale === "en" ? m.nameThai : m.nameEnglish;
  return sub ?? null;
}

/** Initials for the avatar placeholder when no/failed image. */
export function facultyInitials(m: FacultyMember): string {
  const base = m.nameEnglish ?? m.nameThai ?? "";
  // strip leading title tokens like "Prof.", "Asst.", "Lecturer", "Dr."
  const cleaned = base
    .replace(/Ph\.?D\.?/gi, "")
    .replace(/\b(Prof|Asst|Assoc|Lecturer|Dr|Mr|Ms|Mrs)\.?/gi, "")
    .replace(/[.,]/g, " ")
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** Distinct academic positions present in the data (for the filter UI). */
export function facultyPositions(): LocalizedText[] {
  const seen = new Map<string, LocalizedText>();
  for (const m of faculty) {
    if (m.academicPosition) seen.set(m.academicPosition.en, m.academicPosition);
  }
  return [...seen.values()];
}

/** Distinct expertise tags present in the data (for the filter UI), sorted. */
export function facultyExpertiseTags(): string[] {
  const set = new Set<string>();
  for (const m of faculty) for (const e of m.expertise) set.add(e);
  return [...set].sort((a, b) => a.localeCompare(b));
}
