"use client";

import { useEffect, useState } from "react";
import {
  type BlockColorKey,
  type DayKey,
  type ScheduleItem,
  type Semester,
  DAY_LABELS,
  categoryToColor,
} from "@/lib/schedule/types";
import { buildHourMarks, placeDayItems, toMinutes, toTime } from "@/lib/schedule/utils";
import type { Locale } from "@/lib/i18n";

const PRINT_COLORS: Record<BlockColorKey, { bg: string; border: string; text: string }> = {
  sky: { bg: "#ffffff", border: "#0ea5e9", text: "#0c4a6e" },
  violet: { bg: "#ffffff", border: "#8b5cf6", text: "#4c1d95" },
  amber: { bg: "#ffffff", border: "#f59e0b", text: "#78350f" },
  emerald: { bg: "#ffffff", border: "#10b981", text: "#064e3b" },
  rose: { bg: "#ffffff", border: "#f43f5e", text: "#881337" },
  cyan: { bg: "#ffffff", border: "#06b6d4", text: "#164e63" },
  indigo: { bg: "#ffffff", border: "#6366f1", text: "#312e81" },
  teal: { bg: "#ffffff", border: "#14b8a6", text: "#134e4a" },
  slate: { bg: "#ffffff", border: "#64748b", text: "#1e293b" },
};

const PRINT_PX = 1.28; // px per minute, tuned for A4 landscape
const PRINT_LANE = 50;
const PRINT_LABEL_W = 72;

type Props = {
  items: ScheduleItem[];
  days: DayKey[];
  academicYear: string;
  semester: Semester;
  dateRange?: string;
  endHour: string;
  locale: Locale;
};

export function PrintScheduleView({
  items,
  days,
  academicYear,
  semester,
  dateRange,
  endHour,
  locale,
}: Props) {
  const [exportedAt, setExportedAt] = useState("");
  useEffect(() => {
    setExportedAt(new Date().toLocaleDateString(locale === "th" ? "th-TH" : "en-GB"));
  }, [locale]);

  const startMin = toMinutes("08:00");
  const endMin = toMinutes(endHour);
  const width = (endMin - startMin) * PRINT_PX;
  const hours = buildHourMarks(startMin, endMin);

  // Colors actually used → legend.
  const usedColors = Array.from(
    new Set(items.map((i) => i.color ?? categoryToColor(i.category))),
  ) as BlockColorKey[];

  return (
    <div className="print-only print-area" aria-hidden style={{ background: "#ffffff", margin: 0, padding: 0 }}>
      <div style={{ fontFamily: "Prompt, sans-serif", color: "#0f172a", background: "#ffffff", padding: "20px" }}>
        {/* header */}
        <div style={{ marginBottom: 10, borderBottom: "2px solid #0e1f3f", paddingBottom: 8 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
            {locale === "th"
              ? "ตารางเรียน — หลักสูตรความมั่นคงปลอดภัยไซเบอร์"
              : "Course Schedule — B.Sc. Cybersecurity"}
          </h1>
          <p style={{ fontSize: 12, margin: "4px 0 0", color: "#334155" }}>
            {locale === "th" ? "ปีการศึกษา" : "Academic Year"} {academicYear} ·{" "}
            {locale === "th" ? "ภาคการศึกษาที่" : "Semester"} {semester}
            {dateRange ? ` · ${dateRange}` : ""}
            {exportedAt ? ` · ${locale === "th" ? "พิมพ์เมื่อ" : "Exported"} ${exportedAt}` : ""}
          </p>
        </div>

        {/* grid */}
        <div style={{ width: PRINT_LABEL_W + width, border: "1px solid #cbd5e1" }}>
          {/* time header */}
          <div style={{ display: "flex", background: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
            <div
              style={{
                width: PRINT_LABEL_W,
                borderRight: "1px solid #cbd5e1",
                fontSize: 9,
                fontWeight: 700,
                padding: "4px 6px",
              }}
            >
              {locale === "th" ? "วัน" : "Day"}
            </div>
            <div style={{ position: "relative", width, height: 20 }}>
              {hours.map((m) => (
                <span
                  key={m}
                  style={{
                    position: "absolute",
                    left: (m - startMin) * PRINT_PX,
                    fontSize: 9,
                    transform: "translateX(-50%)",
                    color: "#475569",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {toTime(m)}
                </span>
              ))}
            </div>
          </div>

          {/* day rows */}
          {days.map((day) => {
            const placed = placeDayItems(items.filter((i) => i.day === day));
            const maxLanes = placed.reduce((mx, p) => Math.max(mx, p.lanes), 1);
            const rowHeight = maxLanes * PRINT_LANE;
            return (
              <div key={day} style={{ display: "flex", borderBottom: "1px solid #e2e8f0" }}>
                <div
                  style={{
                    width: PRINT_LABEL_W,
                    borderRight: "1px solid #cbd5e1",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 6px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {DAY_LABELS[day][locale]}
                </div>
                <div style={{ position: "relative", width, height: rowHeight }}>
                  {/* hour gridlines */}
                  {hours.map((m) => (
                    <span
                      key={m}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: (m - startMin) * PRINT_PX,
                        borderLeft: "1px solid #eef2f7",
                      }}
                    />
                  ))}
                  {placed.map((p) => {
                    const c = PRINT_COLORS[p.item.color ?? categoryToColor(p.item.category)];
                    const s = toMinutes(p.item.startTime);
                    const e = toMinutes(p.item.endTime);
                    const slotH = rowHeight / p.lanes;
                    return (
                      <div
                        key={p.item.id}
                        style={{
                          position: "absolute",
                          left: (s - startMin) * PRINT_PX,
                          width: Math.max((e - s) * PRINT_PX - 2, 24),
                          top: p.lane * slotH + 2,
                          height: slotH - 4,
                          background: c.bg,
                          border: `2px solid ${c.border}`,
                          borderLeft: `6px solid ${c.border}`,
                          borderRadius: 4,
                          padding: "2px 4px",
                          overflow: "hidden",
                          color: c.text,
                          boxSizing: "border-box",
                        }}
                      >
                        <div style={{ fontSize: 9, fontWeight: 700, fontFamily: "JetBrains Mono, monospace" }}>
                          {p.item.courseCode}
                          {p.conflict ? " ⚠" : ""}
                        </div>
                        <div style={{ fontSize: 8, lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.item.title}
                        </div>
                        <div style={{ fontSize: 7.5, opacity: 0.85 }}>
                          {toTime(s)}-{toTime(e)}
                          {p.item.room ? ` · ${p.item.room}` : ""}
                          {p.item.section ? ` · ${locale === "th" ? "กลุ่ม" : "Gr."}${p.item.section}` : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* legend */}
        {usedColors.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8, fontSize: 9 }}>
            {usedColors.map((key) => (
              <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: PRINT_COLORS[key].bg,
                    border: `1px solid ${PRINT_COLORS[key].border}`,
                  }}
                />
                {key}
              </span>
            ))}
          </div>
        )}

        {/* note */}
        <p style={{ fontSize: 8.5, color: "#64748b", marginTop: 10 }}>
          {locale === "th"
            ? "หมายเหตุ: ตารางนี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้น โปรดตรวจสอบกับประกาศของหลักสูตรและอาจารย์ที่ปรึกษาก่อนลงทะเบียนจริง"
            : "Note: This planner is a preliminary aid — verify with official announcements and your advisor before registering."}
        </p>
      </div>
    </div>
  );
}
