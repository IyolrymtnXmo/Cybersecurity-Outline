import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Opportunities | B.Sc. Cybersecurity, KKU",
  "Curated CTFs, hackathons, scholarships, internships, and certifications by year. ศูนย์รวมงานแข่งและโอกาสสำหรับนักศึกษาความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
