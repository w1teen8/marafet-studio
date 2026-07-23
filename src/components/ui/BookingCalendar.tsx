"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const MONTHS = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export default function BookingCalendar({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date) => void;
}) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const cells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) result.push(new Date(year, month, d));
    return result;
  }, [viewDate]);

  return (
    <div className="rounded-28 glass p-5">
      <div className="flex items-center justify-between px-1 pb-4">
        <button
          type="button"
          aria-label="Попередній місяць"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
          }
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent/30"
        >
          <ChevronLeft size={15} strokeWidth={1.5} />
        </button>
        <span className="text-sm font-medium text-text-primary">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>
        <button
          type="button"
          aria-label="Наступний місяць"
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
          }
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-accent/30"
        >
          <ChevronRight size={15} strokeWidth={1.5} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[0.68rem] uppercase tracking-wide text-text-secondary">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-1">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />;
          const disabled = day < today;
          const selected = value && day.toDateString() === value.toDateString();
          return (
            <button
              type="button"
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => onChange(day)}
              className={cn(
                "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                disabled && "cursor-not-allowed text-text-secondary/25",
                !disabled && !selected && "text-text-primary hover:bg-accent/30",
                selected && "bg-text-primary text-bg",
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
