import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "One Stop Service | B.Sc. Cybersecurity, KKU",
  "Everything a Cybersecurity student needs in one place — curriculum, planning tools, documents, opportunities, faculty, and official links. ศูนย์รวมบริการสำหรับนักศึกษาความมั่นคงปลอดภัยไซเบอร์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
