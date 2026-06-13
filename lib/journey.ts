/**
 * Data model + loaders for the Undergraduate Journey, Resource Hub, and
 * Opportunity (competition) Hub.
 *
 * Content lives in editable JSON:
 *   - data/journey.json        — the 8 semesters (y1s1 … y4s2)
 *   - data/resources.json      — documents / templates / forms
 *   - data/opportunities.json  — competitions / scholarships / internships
 *
 * Design note: a JourneyTerm does NOT embed its own copies of resources /
 * competitions. Instead each ResourceItem/OpportunityItem is tagged with the
 * year/semester it applies to, and the term pages DERIVE the matching items via
 * getResourcesForTerm() / getOpportunitiesForTerm(). That way a document or
 * contest is added once and automatically appears on the right term — no
 * duplicated data to keep in sync. See data/README.md.
 */
import journeyData from "@/data/journey.json";
import resourcesData from "@/data/resources.json";
import opportunitiesData from "@/data/opportunities.json";

export type Year = 1 | 2 | 3 | 4;
export type Semester = 1 | 2;
export type AccentKey = "emerald" | "sky" | "violet" | "amber";

export type SkillCategory =
  | "programming"
  | "network"
  | "security"
  | "system"
  | "web"
  | "cloud"
  | "forensics"
  | "governance"
  | "soft-skill"
  | "research"
  | "career";

export type SkillLevel = "foundation" | "developing" | "applied" | "advanced";

export type SkillItem = {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description: string;
};

export type ChecklistCategory =
  | "academic"
  | "document"
  | "skill"
  | "competition"
  | "portfolio"
  | "career"
  | "advisor"
  | "other";

export type ChecklistItem = {
  id: string;
  text: string;
  category: ChecklistCategory;
  required?: boolean;
};

export type JourneyTerm = {
  id: string; // "y1s1" … "y4s2"
  year: Year;
  semester: Semester;
  titleThai: string;
  titleEnglish: string;
  theme: string; // English theme line
  themeThai: string;
  accent: AccentKey;
  shortDescription: string;
  academicFocus: string[];
  courseIds: string[];
  skills: SkillItem[];
  portfolioGoals: string[];
  checklist: ChecklistItem[];
  warnings: string[];
  advisorNotes: string[];
  studentTips: string[];
};

export type ResourceCategory =
  | "curriculum"
  | "registration"
  | "project"
  | "coop"
  | "wil"
  | "internship"
  | "scholarship"
  | "form"
  | "portfolio"
  | "certification"
  | "activity"
  | "faq"
  | "other";

export type ResourceStatus = "official" | "recommended" | "draft" | "needs-update";

export type ResourceFileType =
  | "pdf"
  | "docx"
  | "xlsx"
  | "link"
  | "notion"
  | "google-drive"
  | "other";

export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  year?: Year | "all";
  semester?: Semester | "all";
  fileUrl?: string;
  externalUrl?: string;
  fileType?: ResourceFileType;
  status: ResourceStatus;
  /** true = no real file yet; UI shows a clearly-marked placeholder. */
  placeholder?: boolean;
  updatedAt?: string;
  owner?: string;
  tags: string[];
};

export type OpportunityType =
  | "ctf"
  | "hackathon"
  | "competition"
  | "programming"
  | "network"
  | "cloud"
  | "research"
  | "startup"
  | "scholarship"
  | "internship"
  | "bootcamp"
  | "certification"
  | "conference"
  | "seminar"
  | "other";

export type OpportunityStatus =
  | "upcoming"
  | "open"
  | "closed"
  | "annual"
  | "archived";

export type OpportunityDifficulty =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "mixed";

export type OpportunityItem = {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  suitableYears: Year[];
  recommendedSemester?: Semester | "both";
  difficulty: OpportunityDifficulty;
  status: OpportunityStatus;
  usualPeriod?: string;
  deadline?: string;
  link?: string;
  relatedCourses?: string[];
  relatedSkills?: string[];
  teamRequired?: boolean;
  portfolioWorthy?: boolean;
  /** true = curated suggestion, not an official program announcement. */
  placeholder?: boolean;
  tags: string[];
};

// ---------------------------------------------------------------- journey
export const journeyTerms: JourneyTerm[] = journeyData as JourneyTerm[];

export const journeyById = new Map<string, JourneyTerm>(
  journeyTerms.map((tm) => [tm.id, tm]),
);

export function getJourneyTerm(id: string): JourneyTerm | undefined {
  return journeyById.get(id);
}

export function termId(year: Year, semester: Semester): string {
  return `y${year}s${semester}`;
}

// -------------------------------------------------------------- resources
export const resources: ResourceItem[] = resourcesData as ResourceItem[];

export function getResourcesForTerm(
  year: Year,
  semester: Semester,
): ResourceItem[] {
  return resources.filter(
    (r) =>
      (r.year === undefined || r.year === "all" || r.year === year) &&
      (r.semester === undefined || r.semester === "all" || r.semester === semester),
  );
}

// ----------------------------------------------------------- opportunities
export const opportunities: OpportunityItem[] =
  opportunitiesData as OpportunityItem[];

export function getOpportunitiesForTerm(
  year: Year,
  semester: Semester,
): OpportunityItem[] {
  return opportunities.filter(
    (o) =>
      o.suitableYears.includes(year) &&
      (o.recommendedSemester === undefined ||
        o.recommendedSemester === "both" ||
        o.recommendedSemester === semester),
  );
}

// ------------------------------------------------------------- shared meta
export const RESOURCE_CATEGORY_ORDER: ResourceCategory[] = [
  "curriculum",
  "registration",
  "form",
  "project",
  "coop",
  "wil",
  "internship",
  "scholarship",
  "certification",
  "portfolio",
  "activity",
  "faq",
  "other",
];

export const OPPORTUNITY_TYPE_ORDER: OpportunityType[] = [
  "ctf",
  "hackathon",
  "competition",
  "programming",
  "network",
  "cloud",
  "research",
  "startup",
  "scholarship",
  "internship",
  "bootcamp",
  "certification",
  "conference",
  "seminar",
  "other",
];

/** Tailwind class fragments for a term accent (used by journey UI). */
export const ACCENT_STYLES: Record<
  AccentKey,
  {
    gradient: string;
    text: string;
    bgSoft: string;
    border: string;
    ring: string;
    dot: string;
  }
> = {
  emerald: {
    gradient: "from-emerald-500 to-teal-600",
    text: "text-emerald-600 dark:text-emerald-400",
    bgSoft: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/30",
    ring: "ring-emerald-400/40",
    dot: "bg-emerald-500",
  },
  sky: {
    gradient: "from-sky-500 to-cyan-600",
    text: "text-sky-600 dark:text-sky-400",
    bgSoft: "bg-sky-50 dark:bg-sky-500/10",
    border: "border-sky-200 dark:border-sky-500/30",
    ring: "ring-sky-400/40",
    dot: "bg-sky-500",
  },
  violet: {
    gradient: "from-violet-500 to-fuchsia-600",
    text: "text-violet-600 dark:text-violet-400",
    bgSoft: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-500/30",
    ring: "ring-violet-400/40",
    dot: "bg-violet-500",
  },
  amber: {
    gradient: "from-amber-500 to-orange-600",
    text: "text-amber-600 dark:text-amber-400",
    bgSoft: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/30",
    ring: "ring-amber-400/40",
    dot: "bg-amber-500",
  },
};
