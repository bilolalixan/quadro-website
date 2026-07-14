"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowCircle } from "@/components/arrow-circle";
import { DatePicker } from "@/components/date-picker";
import { TimePicker } from "@/components/time-picker";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<Status>("idle");
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      partySize: String(formData.get("partySize") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      comment: String(formData.get("comment") ?? ""),
    };

    const missingDate = !payload.date;
    const missingTime = !payload.time;
    setDateError(missingDate);
    setTimeError(missingTime);
    if (missingDate || missingTime) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "peer w-full border-b border-maroon/25 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/50 focus:border-maroon";

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <input
          name="name"
          required
          placeholder={`${t("name")} *`}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <input
          name="phone"
          required
          type="tel"
          placeholder={`${t("phone")} *`}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <input
          name="email"
          type="email"
          placeholder={t("email")}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <input
          name="partySize"
          required
          type="number"
          min={1}
          max={50}
          placeholder={`${t("partySize")} *`}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <DatePicker
          name="date"
          placeholder={`${t("date")} *`}
          className={inputClass}
          error={dateError}
          onSelect={() => setDateError(false)}
        />
        {dateError && (
          <p className="mt-1 text-xs text-red-700">{t("required")}</p>
        )}
      </div>
      <div className="sm:col-span-1">
        <TimePicker
          name="time"
          placeholder={`${t("time")} *`}
          className={inputClass}
          error={timeError}
          onSelect={() => setTimeError(false)}
        />
        {timeError && (
          <p className="mt-1 text-xs text-red-700">{t("required")}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <textarea
          name="comment"
          rows={2}
          placeholder={t("comment")}
          className={inputClass}
        />
      </div>

      <div className="mt-4 flex flex-col items-start gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-3 border-b border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-opacity hover:opacity-70 disabled:opacity-50"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
          <ArrowCircle variant="on-light" />
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-green-700">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-700">{t("error")}</p>
        )}

        <p className="text-xs text-foreground/60">{t("privacy")}</p>
      </div>
    </form>
  );
}
