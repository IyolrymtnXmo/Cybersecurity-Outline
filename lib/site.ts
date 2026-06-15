/**
 * Loaders + types for the One Stop Service support content:
 *   - data/official-links.json  — gateway to the College of Computing's pages
 *   - data/faq.json             — bilingual FAQ
 *   - data/contact.json         — program identity + contact cards
 *   - data/announcements.json   — SAMPLE announcements (clearly marked)
 *   - data/credits.json         — maintainer credit
 *
 * All user-facing strings are bilingual ({ th, en }). Resolve with `loc()`
 * from "@/lib/journey" or pick the locale directly.
 */
import officialLinksData from "@/data/official-links.json";
import faqData from "@/data/faq.json";
import contactData from "@/data/contact.json";
import announcementsData from "@/data/announcements.json";
import creditsData from "@/data/credits.json";

export type Bilingual = { th: string; en: string };

// ----------------------------------------------------------- official links
export type OfficialLinkCategory =
  | "program"
  | "admissions"
  | "documents"
  | "digital";

export type OfficialAudience =
  | "prospective"
  | "student"
  | "parent"
  | "external";

export type OfficialLink = {
  id: string;
  title: Bilingual;
  description: Bilingual;
  url: string;
  category: OfficialLinkCategory;
  audience: OfficialAudience[];
};

export const officialLinks: OfficialLink[] = officialLinksData as OfficialLink[];

export function officialLinkById(id: string): OfficialLink | undefined {
  return officialLinks.find((l) => l.id === id);
}

// --------------------------------------------------------------------- faq
export type FaqCategory =
  | "program"
  | "admissions"
  | "registration"
  | "documents"
  | "services"
  | "opportunities"
  | "contact";

export type FaqStatus = "recommended" | "needs-verification";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  status: FaqStatus;
  question: Bilingual;
  answer: Bilingual;
  relatedRoute?: string;
};

export const faqItems: FaqItem[] = faqData as FaqItem[];

export const FAQ_CATEGORY_ORDER: FaqCategory[] = [
  "program",
  "admissions",
  "registration",
  "documents",
  "services",
  "opportunities",
  "contact",
];

// ------------------------------------------------------------------ contact
export type ContactKind =
  | "office"
  | "phone"
  | "email"
  | "website"
  | "person";

export type ContactCard = {
  id: string;
  kind: ContactKind;
  verified: boolean;
  label: Bilingual;
  value: Bilingual;
  href: string | null;
};

export type ContactData = {
  program: {
    nameThai: string;
    nameEnglish: string;
    facultyThai: string;
    facultyEnglish: string;
  };
  cards: ContactCard[];
};

export const contact: ContactData = contactData as ContactData;

// ------------------------------------------------------------ announcements
export type AnnouncementPriority = "high" | "normal" | "low";
export type AnnouncementStatus = "sample" | "official";
export type AnnouncementCategory =
  | "registration"
  | "activity"
  | "document"
  | "scholarship"
  | "general";

export type Announcement = {
  id: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  status: AnnouncementStatus;
  date: string;
  title: Bilingual;
  body: Bilingual;
};

export const announcements: Announcement[] = (
  announcementsData as Announcement[]
)
  .slice()
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// ----------------------------------------------------------------- credits
export type Credits = {
  maintainer: { nameThai: string; nameEnglish: string; tag: string };
  program: {
    nameThai: string;
    nameEnglish: string;
    facultyThai: string;
    facultyEnglish: string;
  };
};

export const credits: Credits = creditsData as Credits;
