"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

type DatePickerProps = {
  name: string;
  placeholder: string;
  className?: string;
  error?: boolean;
  onSelect?: () => void;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toISODate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function DatePicker({
  name,
  placeholder,
  className = "",
  error = false,
  onSelect,
}: DatePickerProps) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(viewMonth);

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });
  const weekdayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2024, 0, i + 1);
    return weekdayFormatter.format(d).slice(0, 2);
  });

  const firstWeekday = (startOfMonth(viewMonth).getDay() + 6) % 7;
  const daysInMonth = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth() + 1,
    0,
  ).getDate();
  const prevMonthDays = new Date(
    viewMonth.getFullYear(),
    viewMonth.getMonth(),
    0,
  ).getDate();

  const cells: { date: Date; outside: boolean }[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({
      date: new Date(
        viewMonth.getFullYear(),
        viewMonth.getMonth() - 1,
        prevMonthDays - i,
      ),
      outside: true,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      date: new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d),
      outside: false,
    });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, outside: true });
  }

  const displayLabel = selected
    ? new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(selected)
    : "";

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={selected ? toISODate(selected) : ""} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${className} text-left ${
          selected ? "" : "text-foreground/50"
        } ${error ? "border-red-500" : ""}`}
      >
        {displayLabel || placeholder}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-[300px] rounded-md border border-maroon/15 bg-cream p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setViewMonth(
                  new Date(
                    viewMonth.getFullYear(),
                    viewMonth.getMonth() - 1,
                    1,
                  ),
                )
              }
              className="flex h-7 w-7 items-center justify-center text-maroon hover:opacity-60"
              aria-label="Previous month"
            >
              ‹
            </button>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-foreground">
              {monthLabel}
            </span>
            <button
              type="button"
              onClick={() =>
                setViewMonth(
                  new Date(
                    viewMonth.getFullYear(),
                    viewMonth.getMonth() + 1,
                    1,
                  ),
                )
              }
              className="flex h-7 w-7 items-center justify-center text-maroon hover:opacity-60"
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
            {weekdayLabels.map((label, i) => (
              <span
                key={i}
                className="text-[10px] font-medium uppercase tracking-wide text-foreground/40"
              >
                {label}
              </span>
            ))}
            {cells.map(({ date, outside }, i) => {
              const disabled = date < today;
              const isSelected = selected && isSameDay(date, selected);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setSelected(date);
                    setOpen(false);
                    onSelect?.();
                  }}
                  className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-maroon text-cream"
                      : outside || disabled
                        ? "cursor-default text-foreground/25"
                        : "text-foreground hover:bg-maroon/10"
                  }`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
