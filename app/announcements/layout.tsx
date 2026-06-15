import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Announcements | B.Sc. Cybersecurity, KKU",
  "News and notices for the Cybersecurity program. Always confirm official matters with the college and university. ข่าวสารและประกาศของหลักสูตรความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
