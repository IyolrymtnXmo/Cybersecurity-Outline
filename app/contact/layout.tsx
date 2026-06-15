import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Contact | B.Sc. Cybersecurity, KKU",
  "Contact the College of Computing and the Cybersecurity program. ช่องทางติดต่อหลักสูตรความมั่นคงปลอดภัยไซเบอร์ และวิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
