/**
 * Seed data for the Schedule Planner.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * NOTE: The "guideline" courses and the sample term-1 / term-2 blocks below are
 * reconstructed from the *traditional timetable images the user uploaded* and
 * are provided FOR DEMO PURPOSES ONLY. Course names, groups, rooms, instructors
 * and meeting times are illustrative. Replace them with real data from the
 * course-registration system before relying on this in production.
 * ตัวอย่างนี้สร้างจากภาพตารางเรียนที่ผู้ใช้อัปโหลดเพื่อใช้เป็น guideline เท่านั้น
 * ควรแทนที่ด้วยข้อมูลจริงจากระบบรายวิชา
 * ───────────────────────────────────────────────────────────────────────────
 */

import { courses } from "@/lib/data";
import {
  type BlockColorKey,
  type CourseOption,
  type ScheduleItem,
  type Semester,
  categoryToColor,
} from "./types";
import { newId } from "./utils";

/* --------------------------- guideline courses (from uploaded images) ----- */

/** Demo courses that appear in the example timetables, with concrete sections. */
export const guidelineCourses: CourseOption[] = [
  // ── Term 1 ──────────────────────────────────────────────────────────────
  {
    id: "CP423531",
    code: "CP423531",
    thaiName: "การตรวจสอบความมั่นคงปลอดภัยไซเบอร์",
    englishName: "Cybersecurity Audit",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423531-1",
        courseCode: "CP423531",
        section: "1",
        day: "mon",
        startTime: "09:00",
        endTime: "12:00",
        room: "SC6201",
        building: "SC6",
        instructor: "อ. กิตติพงษ์",
      },
    ],
  },
  {
    id: "CP423322",
    code: "CP423322",
    thaiName: "ความมั่นคงปลอดภัยของเครือข่าย",
    englishName: "Network Security",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423322-1",
        courseCode: "CP423322",
        section: "1",
        day: "tue",
        startTime: "13:00",
        endTime: "16:00",
        room: "SC6202",
        building: "SC6",
        instructor: "อ. ปวีณา",
      },
    ],
  },
  {
    id: "CP423324",
    code: "CP423324",
    thaiName: "นิติวิทยาศาสตร์ดิจิทัล",
    englishName: "Digital Forensics",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423324-1",
        courseCode: "CP423324",
        section: "1",
        day: "wed",
        startTime: "09:00",
        endTime: "12:00",
        room: "SC6203",
        building: "SC6",
        instructor: "อ. ธนกร",
      },
    ],
  },
  {
    id: "CP423211",
    code: "CP423211",
    thaiName: "ความมั่นคงปลอดภัยระบบปฏิบัติการ",
    englishName: "Operating System Security",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423211-1",
        courseCode: "CP423211",
        section: "1",
        day: "thu",
        startTime: "13:00",
        endTime: "15:00",
        room: "SC6101",
        building: "SC6",
        instructor: "อ. ศุภชัย",
      },
    ],
  },
  {
    id: "CP423434",
    code: "CP423434",
    thaiName: "ปัญญาประดิษฐ์ในความมั่นคงปลอดภัยไซเบอร์",
    englishName: "AI in Cybersecurity",
    credits: 3,
    category: "elective",
    sections: [
      {
        id: "CP423434-1",
        courseCode: "CP423434",
        section: "1",
        day: "fri",
        startTime: "09:00",
        endTime: "12:00",
        room: "SC6301",
        building: "SC6",
        instructor: "อ. ณัฐวุฒิ",
      },
    ],
  },
  // ── Term 2 ──────────────────────────────────────────────────────────────
  {
    id: "CP423432",
    code: "CP423432",
    thaiName: "การทดสอบเจาะระบบ",
    englishName: "Penetration Testing",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423432-1",
        courseCode: "CP423432",
        section: "1",
        day: "mon",
        startTime: "13:00",
        endTime: "16:00",
        room: "SC6201",
        building: "SC6",
        instructor: "อ. กิตติพงษ์",
      },
    ],
  },
  {
    id: "CP423436",
    code: "CP423436",
    thaiName: "ความมั่นคงปลอดภัยระบบคลาวด์",
    englishName: "Cloud Security",
    credits: 3,
    category: "elective",
    sections: [
      {
        id: "CP423436-1",
        courseCode: "CP423436",
        section: "1",
        day: "tue",
        startTime: "09:00",
        endTime: "12:00",
        room: "SC6202",
        building: "SC6",
        instructor: "อ. ปวีณา",
      },
    ],
  },
  {
    id: "CP423433",
    code: "CP423433",
    thaiName: "การตอบสนองต่อเหตุการณ์ภัยคุกคาม",
    englishName: "Incident Response",
    credits: 3,
    category: "core",
    sections: [
      {
        id: "CP423433-1",
        courseCode: "CP423433",
        section: "1",
        day: "wed",
        startTime: "13:00",
        endTime: "16:00",
        room: "SC6203",
        building: "SC6",
        instructor: "อ. ธนกร",
      },
    ],
  },
  {
    id: "CP002001",
    code: "CP002001",
    thaiName: "เตรียมสหกิจศึกษา / สัมมนา",
    englishName: "Pre-Cooperative Education / Seminar",
    credits: 1,
    category: "free",
    sections: [
      {
        id: "CP002001-1",
        courseCode: "CP002001",
        section: "1",
        day: "thu",
        startTime: "09:00",
        endTime: "11:00",
        room: "SC6101",
        building: "SC6",
        instructor: "คณาจารย์",
      },
    ],
  },
];

/* ------------------------- catalog courses (real data, searchable) -------- */

/** Map the real course catalog to searchable options (no fixed times). */
export const catalogCourseOptions: CourseOption[] = courses.map((c) => ({
  id: c.id,
  code: c.code,
  thaiName: c.thaiName,
  englishName: c.englishName,
  credits: c.credits,
  category: c.category,
}));

/** Everything the search panel can find: demo courses first, then the catalog. */
export const courseOptions: CourseOption[] = [
  ...guidelineCourses,
  ...catalogCourseOptions,
];

/* ------------------------------- seed schedule items ---------------------- */

function sectionToItem(courseId: string, color?: BlockColorKey): ScheduleItem {
  const course = guidelineCourses.find((c) => c.id === courseId)!;
  const sec = course.sections![0];
  return {
    id: newId("seed"),
    courseCode: course.code,
    title: course.englishName ?? course.thaiName ?? course.code,
    section: sec.section,
    day: sec.day,
    startTime: sec.startTime,
    endTime: sec.endTime,
    credits: course.credits,
    room: sec.room,
    building: sec.building,
    instructor: sec.instructor,
    category: course.category,
    color: color ?? categoryToColor(course.category),
  };
}

/**
 * Build the seed schedule. `newId()` runs at import time, which is fine — these
 * are only the starting blocks before the user (or localStorage) takes over.
 */
export function buildSampleSchedule(): Record<Semester, ScheduleItem[]> {
  return {
    "1": [
      sectionToItem("CP423531"),
      sectionToItem("CP423322"),
      sectionToItem("CP423324"),
      sectionToItem("CP423211"),
      sectionToItem("CP423434"),
    ],
    "2": [
      sectionToItem("CP423432"),
      sectionToItem("CP423436"),
      sectionToItem("CP423433"),
      sectionToItem("CP002001"),
    ],
  };
}

export const DEFAULT_ACADEMIC_YEAR = "2568";
export const DEFAULT_DATE_RANGE: Record<Semester, string> = {
  "1": "มิ.ย. – ต.ค. 2568",
  "2": "พ.ย. 2568 – มี.ค. 2569",
};
