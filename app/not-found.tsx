import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="font-mono text-xs text-slate-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-navy-900 dark:text-white">
        ไม่พบหน้าที่ค้นหา
      </h1>
      <p className="mt-1 text-lg font-medium text-slate-600 dark:text-slate-300">
        Page not found
      </p>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        อาจเกิดจากลิงก์ผิด หรือรายวิชาที่ค้นหายังไม่อยู่ในระบบ
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        The link may be incorrect, or the page may have moved.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          กลับหน้าแรก / Home
        </Link>
        <Link href="/one-stop" className="btn-outline">
          ศูนย์รวมบริการ / One Stop Service
        </Link>
      </div>
    </div>
  );
}
