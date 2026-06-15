import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Digital Services | B.Sc. Cybersecurity, KKU",
  "Student digital services — accounts, network, software, and information systems. บริการดิจิทัลสำหรับนักศึกษา วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
