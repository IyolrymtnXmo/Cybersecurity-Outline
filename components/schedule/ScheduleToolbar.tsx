"use client";

import {
  Download,
  FileDown,
  FolderOpen,
  LayoutGrid,
  Printer,
  Redo2,
  Rows3,
  Save,
  Search,
  Table2,
  Trash2,
  Undo2,
} from "lucide-react";
import type { Semester, ViewMode } from "@/lib/schedule/types";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  t: (k: string) => string;
  semester: Semester;
  onSemester: (s: Semester) => void;
  endHour: string;
  onEndHour: (h: string) => void;
  slotMinutes: 30 | 60;
  onSlot: (m: 30 | 60) => void;
  viewMode: ViewMode;
  onViewMode: (v: ViewMode) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onSaveDraft: () => void;
  onLoad: () => void;
  onExportJson: () => void;
  onPrint: () => void;
  onToggleSearch: () => void;
};

export function ScheduleToolbar(props: Props) {
  const { t, locale } = props;
  return (
    <div className="card flex flex-wrap items-center gap-x-3 gap-y-2 p-2.5 no-print">
      {/* search toggle (mobile / tablet) */}
      <button
        type="button"
        onClick={props.onToggleSearch}
        className="btn-outline px-3 py-2 lg:hidden"
        aria-label={t("schedule.search.label")}
      >
        <Search className="h-4 w-4" /> {t("schedule.tool.search")}
      </button>

      {/* term */}
      <Seg label={t("common.semester")}>
        {(["1", "2"] as const).map((s) => (
          <SegItem
            key={s}
            active={props.semester === s}
            onClick={() => props.onSemester(s)}
          >
            {locale === "th" ? `เทอม ${s}` : `Term ${s}`}
          </SegItem>
        ))}
      </Seg>

      {/* time scale */}
      <Seg label={t("schedule.tool.scale")}>
        {([30, 60] as const).map((m) => (
          <SegItem key={m} active={props.slotMinutes === m} onClick={() => props.onSlot(m)}>
            {m}
            {locale === "th" ? " นาที" : "m"}
          </SegItem>
        ))}
      </Seg>

      {/* end hour */}
      <Seg label={t("schedule.tool.endTime")}>
        {["19:30", "20:00"].map((h) => (
          <SegItem key={h} active={props.endHour === h} onClick={() => props.onEndHour(h)}>
            {h}
          </SegItem>
        ))}
      </Seg>

      {/* view mode */}
      <Seg label={t("schedule.tool.view")}>
        <SegItem
          active={props.viewMode === "traditional"}
          onClick={() => props.onViewMode("traditional")}
          title={t("schedule.view.traditional")}
        >
          <Table2 className="h-4 w-4" />
        </SegItem>
        <SegItem
          active={props.viewMode === "modern"}
          onClick={() => props.onViewMode("modern")}
          title={t("schedule.view.modern")}
        >
          <LayoutGrid className="h-4 w-4" />
        </SegItem>
        <SegItem
          active={props.viewMode === "compact"}
          onClick={() => props.onViewMode("compact")}
          title={t("schedule.view.compact")}
        >
          <Rows3 className="h-4 w-4" />
        </SegItem>
      </Seg>

      <span className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-navy-700 sm:block" aria-hidden />

      {/* history */}
      <div className="flex items-center gap-1">
        <IconBtn onClick={props.onUndo} disabled={!props.canUndo} label={t("schedule.tool.undo")}>
          <Undo2 className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={props.onRedo} disabled={!props.canRedo} label={t("schedule.tool.redo")}>
          <Redo2 className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={props.onClear} label={t("schedule.tool.clear")} tone="danger">
          <Trash2 className="h-4 w-4" />
        </IconBtn>
      </div>

      <span className="mx-1 hidden h-6 w-px bg-slate-200 dark:bg-navy-700 sm:block" aria-hidden />

      {/* persistence + export */}
      <div className="flex flex-wrap items-center gap-1">
        <IconBtn onClick={props.onSaveDraft} label={t("schedule.tool.save")}>
          <Save className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={props.onLoad} label={t("schedule.tool.load")}>
          <FolderOpen className="h-4 w-4" />
        </IconBtn>
        <IconBtn onClick={props.onExportJson} label={t("schedule.tool.exportJson")}>
          <Download className="h-4 w-4" />
        </IconBtn>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button type="button" onClick={props.onPrint} className="btn-outline px-3 py-2">
          <Printer className="h-4 w-4" /> {t("schedule.tool.print")}
        </button>
        <button
          type="button"
          onClick={props.onPrint}
          className="btn-primary px-3 py-2"
          title={t("schedule.tool.exportPdfHint")}
        >
          <FileDown className="h-4 w-4" /> {t("schedule.tool.exportPdf")}
        </button>
      </div>
    </div>
  );
}

function Seg({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden text-[10px] font-medium uppercase tracking-wider text-slate-400 md:inline">
        {label}
      </span>
      <div className="inline-flex overflow-hidden rounded-lg border border-slate-200 dark:border-navy-700">
        {children}
      </div>
    </div>
  );
}

function SegItem({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={title}
      className={`inline-flex min-h-[36px] items-center justify-center px-2.5 text-xs font-medium transition ${
        active
          ? "bg-navy-700 text-white dark:bg-cyan-500 dark:text-navy-950"
          : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-navy-900 dark:text-slate-300 dark:hover:bg-navy-800"
      }`}
    >
      {children}
    </button>
  );
}

function IconBtn({
  onClick,
  disabled,
  label,
  tone = "default",
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  tone?: "default" | "danger";
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-40 ${
        tone === "danger"
          ? "border-slate-200 text-slate-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:border-navy-700 dark:hover:bg-rose-500/10 dark:hover:text-rose-300"
          : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-navy-700 dark:text-slate-300 dark:hover:bg-navy-800"
      }`}
    >
      {children}
    </button>
  );
}
