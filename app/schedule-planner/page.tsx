import type { Metadata } from "next";
import { SchedulePlanner } from "@/components/schedule/SchedulePlanner";

export const metadata: Metadata = {
  title: "จัดตารางเรียน / Schedule Planner",
  description:
    "วางแผนตารางเรียนแบบยืดหยุ่น — ค้นหารายวิชา ลากวาง ปรับเวลา ตรวจสอบเวลาชนกัน และส่งออกเป็น PDF",
};

export default function SchedulePlannerPage() {
  return <SchedulePlanner />;
}
