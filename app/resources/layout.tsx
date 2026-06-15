import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Resource Hub | B.Sc. Cybersecurity, KKU",
  "Curriculum documents, forms, guides, and templates in one place. ศูนย์รวมเอกสารและแหล่งข้อมูลสำหรับนักศึกษาความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
