"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CalendarClock } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import {
  type DayKey,
  type ScheduleItem,
  type Semester,
  type ViewMode,
  ALL_DAY_KEYS,
} from "@/lib/schedule/types";
import {
  clamp,
  durationMinutes,
  exportJson,
  findFreeSlot,
  findScheduleConflicts,
  loadSchedule,
  newId,
  saveSchedule,
  snapToSlot,
  toMinutes,
  toTime,
} from "@/lib/schedule/utils";
import {
  buildSampleSchedule,
  courseOptions,
  DEFAULT_ACADEMIC_YEAR,
  DEFAULT_DATE_RANGE,
} from "@/lib/schedule/sample-data";
import {
  type DragKind,
  type DragPreview,
  type GridGeometry,
  type NewDragPayload,
  GRID_START_MIN,
  LANE_HEIGHT,
  PX_PER_MIN,
  endMinFor,
} from "./geometry";
import { ScheduleToolbar } from "./ScheduleToolbar";
import { ScheduleGrid } from "./ScheduleGrid";
import { CourseSearchPanel } from "./CourseSearchPanel";
import { ScheduleEditDialog } from "./ScheduleEditDialog";
import { ConflictSummary } from "./ConflictSummary";
import { PrintScheduleView } from "./PrintScheduleView";

type Doc = Record<Semester, ScheduleItem[]>;

type ActiveDrag = {
  kind: DragKind;
  itemId?: string;
  payload?: NewDragPayload;
  durationMin: number;
  grabOffsetMin: number; // pointer-minutes minus item start, for move
  grabX: number;
  grabY: number;
  started: boolean;
};

const DAYS: DayKey[] = [...ALL_DAY_KEYS];

export function SchedulePlanner() {
  const { t, locale } = useLang();

  /* ----------------------------------------------------------- settings */
  const [academicYear, setAcademicYear] = useState(DEFAULT_ACADEMIC_YEAR);
  const [semester, setSemester] = useState<Semester>("1");
  const [endHour, setEndHour] = useState("19:30");
  const [slotMinutes, setSlotMinutes] = useState<30 | 60>(30);
  const [viewMode, setViewMode] = useState<ViewMode>("traditional");
  const [dateRange, setDateRange] = useState<Record<Semester, string>>(DEFAULT_DATE_RANGE);

  /* --------------------------------------------------------------- data */
  const [doc, setDoc] = useState<Doc>(() => buildSampleSchedule());
  const [past, setPast] = useState<Doc[]>([]);
  const [future, setFuture] = useState<Doc[]>([]);

  const docRef = useRef(doc);
  docRef.current = doc;
  const semRef = useRef(semester);
  semRef.current = semester;

  /* --------------------------------------------------------------- ui */
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; tone: "ok" | "err" } | null>(null);
  const toastTimer = useRef<number>();

  const [dragPreview, setDragPreview] = useState<DragPreview | null>(null);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [ghost, setGhost] = useState<{ x: number; y: number; label: string } | null>(null);

  /* ----------------------------------------------------------- geometry */
  const geometry: GridGeometry = useMemo(
    () => ({
      startMin: GRID_START_MIN,
      endMin: endMinFor(endHour),
      slotMinutes,
      pxPerMinute: PX_PER_MIN,
      laneHeight: LANE_HEIGHT[viewMode],
    }),
    [endHour, slotMinutes, viewMode],
  );
  const geoRef = useRef(geometry);
  geoRef.current = geometry;

  const items = doc[semester];
  const conflicts = useMemo(() => findScheduleConflicts(items), [items]);
  const bounds = { startMin: geometry.startMin, endMin: geometry.endMin };

  /* --------------------------------------------------------- persistence */
  useEffect(() => {
    const saved = loadSchedule();
    if (saved) {
      setDoc(saved.bySemester);
      docRef.current = saved.bySemester;
      setAcademicYear(saved.academicYear || DEFAULT_ACADEMIC_YEAR);
      setEndHour(saved.endHour || "19:30");
      setSlotMinutes(saved.slotMinutes || 30);
      setViewMode(saved.viewMode || "traditional");
      setSemester(saved.semester || "1");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showToast = useCallback((msg: string, tone: "ok" | "err" = "ok") => {
    setToast({ msg, tone });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2500);
  }, []);

  /* ----------------------------------------------- mutations + history */
  const applyDoc = useCallback((next: Doc) => {
    const prev = docRef.current;
    if (next === prev) return;
    setPast((p) => [...p, prev].slice(-100));
    setFuture([]);
    docRef.current = next;
    setDoc(next);
  }, []);

  const mutateItems = useCallback(
    (fn: (items: ScheduleItem[]) => ScheduleItem[]) => {
      const sem = semRef.current;
      const prev = docRef.current;
      applyDoc({ ...prev, [sem]: fn(prev[sem]) });
    },
    [applyDoc],
  );

  const addItem = useCallback(
    (item: ScheduleItem) => mutateItems((arr) => [...arr, item]),
    [mutateItems],
  );
  const updateItemById = useCallback(
    (id: string, patch: Partial<ScheduleItem>) =>
      mutateItems((arr) => arr.map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [mutateItems],
  );
  const removeItemById = useCallback(
    (id: string) => mutateItems((arr) => arr.filter((i) => i.id !== id)),
    [mutateItems],
  );

  const undo = useCallback(() => {
    if (past.length === 0) return;
    // Capture the current doc BEFORE reassigning docRef — otherwise the
    // functional setState updater below would read the already-mutated ref.
    const cur = docRef.current;
    const prev = past[past.length - 1];
    setFuture((f) => [cur, ...f].slice(0, 100));
    setPast((p) => p.slice(0, -1));
    docRef.current = prev;
    setDoc(prev);
  }, [past]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const cur = docRef.current;
    const next = future[0];
    setPast((p) => [...p, cur].slice(-100));
    setFuture((f) => f.slice(1));
    docRef.current = next;
    setDoc(next);
  }, [future]);

  /* ------------------------------------------------------------ actions */
  const handleClear = useCallback(() => {
    if (docRef.current[semRef.current].length === 0) return;
    if (!window.confirm(t("schedule.confirm.clear"))) return;
    mutateItems(() => []);
  }, [mutateItems, t]);

  const handleSaveDraft = useCallback(() => {
    const ok = saveSchedule({
      academicYear,
      endHour,
      slotMinutes,
      viewMode,
      semester,
      bySemester: docRef.current,
      savedAt: new Date().toISOString(),
    });
    showToast(ok ? t("schedule.toast.saved") : t("schedule.toast.saveErr"), ok ? "ok" : "err");
  }, [academicYear, endHour, slotMinutes, viewMode, semester, showToast, t]);

  const handleLoad = useCallback(() => {
    const saved = loadSchedule();
    if (!saved) {
      showToast(t("schedule.toast.noSaved"), "err");
      return;
    }
    applyDoc(saved.bySemester);
    setAcademicYear(saved.academicYear || DEFAULT_ACADEMIC_YEAR);
    setEndHour(saved.endHour || "19:30");
    setSlotMinutes(saved.slotMinutes || 30);
    setViewMode(saved.viewMode || "traditional");
    setSemester(saved.semester || "1");
    showToast(t("schedule.toast.loaded"), "ok");
  }, [applyDoc, showToast, t]);

  const handleExportJson = useCallback(() => {
    try {
      const blob = new Blob([exportJson(docRef.current)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cy-schedule-${academicYear}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      showToast(t("schedule.toast.exportErr"), "err");
    }
  }, [academicYear, showToast, t]);

  const handlePrint = useCallback(() => {
    try {
      window.print();
    } catch {
      showToast(t("schedule.toast.printErr"), "err");
    }
  }, [showToast, t]);

  /* --------------------------------------------------------- add course */
  const buildItem = useCallback(
    (p: NewDragPayload, day: DayKey, startMin: number, endMin: number): ScheduleItem => ({
      id: newId(),
      courseCode: p.courseCode,
      title: p.title,
      section: p.section,
      credits: p.credits,
      room: p.room,
      building: p.building,
      instructor: p.instructor,
      category: p.category,
      color: p.color,
      day,
      startTime: toTime(startMin),
      endTime: toTime(endMin),
    }),
    [],
  );

  const handleAdd = useCallback(
    (p: NewDragPayload) => {
      const geo = geoRef.current;
      const day = p.preferredDay ?? "mon";
      const slot = findFreeSlot(docRef.current[semRef.current], day, p.durationMin, {
        startMin: geo.startMin,
        endMin: geo.endMin,
      }, geo.slotMinutes);
      const item = buildItem(p, day, toMinutes(slot.startTime), toMinutes(slot.endTime));
      addItem(item);
      // Courses with no fixed meeting time open the editor so the user can
      // pick the day/time (this is also the mobile add fallback).
      if (!p.preferredDay) setEditing(item);
    },
    [addItem, buildItem],
  );

  /* ------------------------------------------------------ drag controller */
  const trackRefs = useRef(new Map<DayKey, HTMLDivElement | null>());
  const registerTrack = useCallback((day: DayKey, el: HTMLDivElement | null) => {
    trackRefs.current.set(day, el);
  }, []);
  const dragRef = useRef<ActiveDrag | null>(null);
  const lastTargetRef = useRef<DragPreview | null>(null);

  const startMove = useCallback((item: ScheduleItem, e: React.PointerEvent) => {
    if (e.button != null && e.button !== 0) return;
    e.preventDefault();
    const geo = geoRef.current;
    const rect = trackRefs.current.get(item.day)?.getBoundingClientRect();
    const pointerMin = rect
      ? geo.startMin + (e.clientX - rect.left) / geo.pxPerMinute
      : toMinutes(item.startTime);
    dragRef.current = {
      kind: "move",
      itemId: item.id,
      durationMin: durationMinutes(item),
      grabOffsetMin: pointerMin - toMinutes(item.startTime),
      grabX: e.clientX,
      grabY: e.clientY,
      started: false,
    };
  }, []);

  const startResize = useCallback(
    (item: ScheduleItem, edge: "start" | "end", e: React.PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragRef.current = {
        kind: edge === "start" ? "resize-start" : "resize-end",
        itemId: item.id,
        durationMin: durationMinutes(item),
        grabOffsetMin: 0,
        grabX: e.clientX,
        grabY: e.clientY,
        started: false,
      };
    },
    [],
  );

  const startNewDrag = useCallback((payload: NewDragPayload, e: React.PointerEvent) => {
    if (e.button != null && e.button !== 0) return;
    dragRef.current = {
      kind: "new",
      payload,
      durationMin: payload.durationMin,
      grabOffsetMin: 0,
      grabX: e.clientX,
      grabY: e.clientY,
      started: false,
    };
  }, []);

  // Window-level pointer handlers (bound once; read live state via refs).
  useEffect(() => {
    const locateDay = (clientY: number) => {
      let best: { day: DayKey; rect: DOMRect } | null = null;
      let bestDist = Infinity;
      for (const day of DAYS) {
        const el = trackRefs.current.get(day);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (clientY >= rect.top && clientY <= rect.bottom) {
          return { day, rect, inside: true };
        }
        const dist = clientY < rect.top ? rect.top - clientY : clientY - rect.bottom;
        if (dist < bestDist) {
          bestDist = dist;
          best = { day, rect };
        }
      }
      return best ? { ...best, inside: false } : null;
    };

    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      if (!d.started) {
        if (Math.hypot(e.clientX - d.grabX, e.clientY - d.grabY) < 4) return;
        d.started = true;
        document.body.style.userSelect = "none";
        if (d.kind !== "new" && d.itemId) setDraggingItemId(d.itemId);
      }

      const geo = geoRef.current;
      const px = geo.pxPerMinute;
      const slot = geo.slotMinutes;

      if (d.kind === "new") {
        setGhost({ x: e.clientX, y: e.clientY, label: d.payload!.courseCode });
        const loc = locateDay(e.clientY);
        if (!loc || !loc.inside) {
          setDragPreview(null);
          lastTargetRef.current = null;
          return;
        }
        const pMin = geo.startMin + (e.clientX - loc.rect.left) / px;
        let start = snapToSlot(pMin, slot);
        start = clamp(start, geo.startMin, geo.endMin - d.durationMin);
        const preview: DragPreview = {
          kind: "new",
          day: loc.day,
          startMin: start,
          endMin: start + d.durationMin,
          valid: true,
        };
        setDragPreview(preview);
        lastTargetRef.current = preview;
        return;
      }

      const item = docRef.current[semRef.current].find((i) => i.id === d.itemId);
      if (!item) return;

      if (d.kind === "move") {
        const loc = locateDay(e.clientY);
        if (!loc) return;
        const pMin = geo.startMin + (e.clientX - loc.rect.left) / px;
        let start = snapToSlot(pMin - d.grabOffsetMin, slot);
        start = clamp(start, geo.startMin, geo.endMin - d.durationMin);
        const preview: DragPreview = {
          kind: "move",
          day: loc.day,
          startMin: start,
          endMin: start + d.durationMin,
          valid: true,
        };
        setDragPreview(preview);
        lastTargetRef.current = preview;
        return;
      }

      // resize — keep the item's day, adjust one edge
      const rect = trackRefs.current.get(item.day)?.getBoundingClientRect();
      if (!rect) return;
      const pMin = geo.startMin + (e.clientX - rect.left) / px;
      const itemStart = toMinutes(item.startTime);
      const itemEnd = toMinutes(item.endTime);
      if (d.kind === "resize-end") {
        const end = clamp(snapToSlot(pMin, slot), itemStart + slot, geo.endMin);
        const preview: DragPreview = {
          kind: "resize-end",
          day: item.day,
          startMin: itemStart,
          endMin: end,
          valid: true,
        };
        setDragPreview(preview);
        lastTargetRef.current = preview;
      } else {
        const start = clamp(snapToSlot(pMin, slot), geo.startMin, itemEnd - slot);
        const preview: DragPreview = {
          kind: "resize-start",
          day: item.day,
          startMin: start,
          endMin: itemEnd,
          valid: true,
        };
        setDragPreview(preview);
        lastTargetRef.current = preview;
      }
    };

    const finish = (cancelled: boolean) => {
      const d = dragRef.current;
      const target = lastTargetRef.current;
      dragRef.current = null;
      lastTargetRef.current = null;
      setDragPreview(null);
      setDraggingItemId(null);
      setGhost(null);
      document.body.style.userSelect = "";
      if (!d) return;

      if (!d.started) {
        // No movement → treat a block press as a click to edit.
        if (d.kind === "move" && d.itemId) {
          const item = docRef.current[semRef.current].find((i) => i.id === d.itemId);
          if (item) setEditing(item);
        }
        return;
      }
      if (cancelled || !target) return;

      if (d.kind === "move" && d.itemId) {
        updateItemById(d.itemId, {
          day: target.day,
          startTime: toTime(target.startMin),
          endTime: toTime(target.endMin),
        });
      } else if (d.kind === "resize-end" && d.itemId) {
        updateItemById(d.itemId, { endTime: toTime(target.endMin) });
      } else if (d.kind === "resize-start" && d.itemId) {
        updateItemById(d.itemId, { startTime: toTime(target.startMin) });
      } else if (d.kind === "new" && d.payload) {
        const item = buildItem(d.payload, target.day, target.startMin, target.endMin);
        addItem(item);
      }
    };

    const onUp = () => finish(false);
    const onCancel = () => finish(true);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onCancel);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onCancel);
    };
  }, [addItem, buildItem, updateItemById]);

  /* -------------------------------------------------------- keyboard nav */
  const onBlockKeyDown = useCallback(
    (item: ScheduleItem, e: React.KeyboardEvent) => {
      const geo = geoRef.current;
      const slot = geo.slotMinutes;
      const start = toMinutes(item.startTime);
      const end = toMinutes(item.endTime);
      const dur = end - start;
      const dayIdx = DAYS.indexOf(item.day);

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          setEditing(item);
          break;
        case "Delete":
        case "Backspace":
          e.preventDefault();
          removeItemById(item.id);
          break;
        case "ArrowRight":
          e.preventDefault();
          if (e.shiftKey) {
            const ne = clamp(end + slot, start + slot, geo.endMin);
            updateItemById(item.id, { endTime: toTime(ne) });
          } else {
            const ns = clamp(start + slot, geo.startMin, geo.endMin - dur);
            updateItemById(item.id, { startTime: toTime(ns), endTime: toTime(ns + dur) });
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (e.shiftKey) {
            const ne = clamp(end - slot, start + slot, geo.endMin);
            updateItemById(item.id, { endTime: toTime(ne) });
          } else {
            const ns = clamp(start - slot, geo.startMin, geo.endMin - dur);
            updateItemById(item.id, { startTime: toTime(ns), endTime: toTime(ns + dur) });
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (dayIdx > 0) updateItemById(item.id, { day: DAYS[dayIdx - 1] });
          break;
        case "ArrowDown":
          e.preventDefault();
          if (dayIdx < DAYS.length - 1) updateItemById(item.id, { day: DAYS[dayIdx + 1] });
          break;
      }
    },
    [removeItemById, updateItemById],
  );

  const handleLoadMockup = useCallback(() => {
    applyDoc(buildSampleSchedule());
    showToast(t("schedule.toast.loaded"), "ok");
  }, [applyDoc, showToast, t]);

  /* --------------------------------------------------------------- render */
  const searchPanel = (
    <CourseSearchPanel
      courses={courseOptions}
      locale={locale}
      t={t}
      onAdd={handleAdd}
      onStartDragNew={startNewDrag}
    />
  );

  return (
    <div className="container-page py-6 pb-24">
      <div className="no-print">
      {/* header */}
      <header className="mb-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-cyan-700 dark:text-cyan-400">
          Course Schedule Planner
        </p>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-navy-900 dark:text-slate-100">
          <CalendarClock className="h-8 w-8 text-cyan-500" />
          {t("schedule.title")}
        </h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">{t("schedule.desc")}</p>

        <div className="mt-4 flex flex-wrap items-end gap-3 no-print">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {t("schedule.field.year")}
            </span>
            <input
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-28 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-navy-900 outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-950 dark:text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {t("schedule.field.dateRange")}
            </span>
            <input
              value={dateRange[semester]}
              onChange={(e) =>
                setDateRange((d) => ({ ...d, [semester]: e.target.value }))
              }
              className="w-56 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-navy-900 outline-none focus:border-cyan-400 dark:border-navy-700 dark:bg-navy-950 dark:text-slate-100"
            />
          </label>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-300">
            {locale === "th" ? "ภาคการศึกษาที่" : "Semester"} {semester} · 08:00–{endHour}
          </span>
        </div>
      </header>

      {/* toolbar + summary */}
      <div className="space-y-3 no-print">
        <ScheduleToolbar
          locale={locale}
          t={t}
          semester={semester}
          onSemester={setSemester}
          endHour={endHour}
          onEndHour={setEndHour}
          slotMinutes={slotMinutes}
          onSlot={setSlotMinutes}
          viewMode={viewMode}
          onViewMode={setViewMode}
          canUndo={past.length > 0}
          canRedo={future.length > 0}
          onUndo={undo}
          onRedo={redo}
          onClear={handleClear}
          onSaveDraft={handleSaveDraft}
          onLoad={handleLoad}
          onExportJson={handleExportJson}
          onPrint={handlePrint}
          onToggleSearch={() => setSearchOpen(true)}
        />
        <ConflictSummary conflicts={conflicts} items={items} locale={locale} t={t} />
      </div>

      {/* main: search + grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden lg:block no-print">
          <div className="card sticky top-20 flex max-h-[calc(100vh-6rem)] flex-col p-3">
            <h2 className="mb-2 text-sm font-semibold text-navy-900 dark:text-slate-100">
              {t("schedule.search.title")}
            </h2>
            {searchPanel}
          </div>
        </aside>

        <section className="min-w-0 flex h-full flex-col">
          <div className="flex-1">
            <ScheduleGrid
              items={items}
              geometry={geometry}
              viewMode={viewMode}
              locale={locale}
              days={DAYS}
              draggingItemId={draggingItemId}
              dragPreview={dragPreview}
              registerTrack={registerTrack}
              onBlockMoveStart={startMove}
              onBlockResizeStart={startResize}
              onBlockEdit={setEditing}
              onBlockDelete={(item) => removeItemById(item.id)}
              onBlockKeyDown={onBlockKeyDown}
              onLoadMockup={handleLoadMockup}
              t={t}
            />
          </div>
          <p className="mt-2 px-1 text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            {t("schedule.guideline")}
          </p>
        </section>
      </div>

      {/* mobile / tablet search drawer */}
      {searchOpen && (
        <div className="fixed inset-0 z-40 lg:hidden no-print" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-navy-950/40 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-[var(--color-card)] p-3 shadow-2xl">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-navy-900 dark:text-slate-100">
                {t("schedule.search.title")}
              </h2>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="btn-ghost px-3 py-1.5 text-sm"
              >
                {t("schedule.close")}
              </button>
            </div>
            {searchPanel}
          </div>
        </div>
      )}

      {/* edit dialog */}
      <ScheduleEditDialog
        open={editing !== null}
        item={editing}
        bounds={bounds}
        slotMinutes={slotMinutes}
        locale={locale}
        t={t}
        onClose={() => setEditing(null)}
        onSave={(item) => {
          updateItemById(item.id, item);
          setEditing(null);
        }}
        onDelete={(id) => {
          removeItemById(id);
          setEditing(null);
        }}
      />

      {/* floating drag ghost */}
      {ghost && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-cyan-400 bg-white/95 px-2 py-1 font-mono text-xs font-bold text-navy-900 shadow-lg dark:bg-navy-900/95 dark:text-slate-100"
          style={{ left: ghost.x, top: ghost.y }}
        >
          {ghost.label}
        </div>
      )}

      {/* toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl px-4 py-2.5 text-sm font-medium shadow-lg no-print ${
            toast.tone === "ok"
              ? "bg-navy-800 text-white dark:bg-cyan-500 dark:text-navy-950"
              : "bg-rose-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}
      </div>

      {/* print-only clean timetable */}
      <PrintScheduleView
        items={items}
        days={DAYS}
        academicYear={academicYear}
        semester={semester}
        dateRange={dateRange[semester]}
        endHour={endHour}
        locale={locale}
      />
    </div>
  );
}
