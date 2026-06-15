import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Course Catalog | B.Sc. Cybersecurity, KKU",
  "Search all courses in the program by code, Thai/English name, or keyword. ค้นหารายวิชาในหลักสูตรความมั่นคงปลอดภัยไซเบอร์ วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
