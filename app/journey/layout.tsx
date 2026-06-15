import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Undergraduate Journey | B.Sc. Cybersecurity, KKU",
  "A term-by-term 4-year guide — what to learn, prepare, compete in, and build, from day one to graduation. เส้นทาง 4 ปีของนักศึกษาความมั่นคงปลอดภัยไซเบอร์",
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
