"use client";

import { useEffect, useRef, useState } from "react";

const TIME_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 12; h <= 23; h++) {
    for (const m of [0, 30]) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
})();

type TimePickerProps = {
  name: string;
  placeholder: string;
  className?: string;
  error?: boolean;
  onSelect?: () => void;
};

export function TimePicker({
  name,
  placeholder,
  className = "",
  error = false,
  onSelect,
}: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
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

  return (
    <div ref={wrapperRef} className="relative">
      <input type="hidden" name={name} value={selected} />
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${className} text-left ${
          selected ? "" : "text-foreground/50"
        } ${error ? "border-red-500" : ""}`}
      >
        {selected || placeholder}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-56 w-40 overflow-y-auto rounded-md border border-maroon/15 bg-cream py-2 shadow-lg">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => {
                setSelected(slot);
                setOpen(false);
                onSelect?.();
              }}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                selected === slot
                  ? "bg-maroon text-cream"
                  : "text-foreground hover:bg-maroon/10"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
