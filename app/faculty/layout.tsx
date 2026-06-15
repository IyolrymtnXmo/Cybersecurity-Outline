import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Program Faculty | B.Sc. Cybersecurity, KKU",
  "Faculty of the B.Sc. Cybersecurity program at the College of Computing, Khon Kaen University. คณาจารย์ประจำหลักสูตรความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
