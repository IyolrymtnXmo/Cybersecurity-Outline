import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Curriculum Outline | B.Sc. Cybersecurity, KKU",
  "An interactive 4-year curriculum map with prerequisite network and risk views. โครงสร้างหลักสูตรความมั่นคงปลอดภัยไซเบอร์แบบ interactive วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
