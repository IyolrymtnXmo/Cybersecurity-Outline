import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "About this Website | B.Sc. Cybersecurity, KKU",
  "Purpose, data sources, official-data policy, readiness status, launch checklist, and maintenance of the Cybersecurity program website. เกี่ยวกับเว็บไซต์ นโยบายข้อมูลทางการ สถานะความพร้อม และการดูแลรักษา",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
