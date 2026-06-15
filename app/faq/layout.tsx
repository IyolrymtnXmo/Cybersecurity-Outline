import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "FAQ | B.Sc. Cybersecurity, KKU",
  "Common questions about the program, admissions, registration, documents, and services. คำถามที่พบบ่อยเกี่ยวกับหลักสูตรความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
