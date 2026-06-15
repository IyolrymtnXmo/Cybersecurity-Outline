import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Admissions | B.Sc. Cybersecurity, KKU",
  "How to apply to the Cybersecurity program — application rounds, qualifications, and official admissions links. ข้อมูลการรับเข้าศึกษาหลักสูตรความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
