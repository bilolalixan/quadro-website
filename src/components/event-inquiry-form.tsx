"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowCircle } from "@/components/arrow-circle";

type Status = "idle" | "submitting" | "success" | "error";

export function EventInquiryForm() {
  const t = useTranslations("eventInquiry");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      description: String(formData.get("description") ?? ""),
    };

    try {
      const response = await fetch("/api/event-inquiries", {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <input
          name="email"
          required
          type="email"
          placeholder={`${t("email")} *`}
          className={inputClass}
        />
      </div>
      <div>
        <input
          name="name"
          required
          placeholder={`${t("name")} *`}
          className={inputClass}
        />
      </div>
      <div>
        <input
          name="phone"
          required
          type="tel"
          placeholder={`${t("phone")} *`}
          className={inputClass}
        />
      </div>
      <div>
        <textarea
          name="description"
          rows={3}
          placeholder={t("description")}
          className={inputClass}
        />
      </div>

      <div className="mt-2 flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center gap-3 border-b border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-opacity hover:opacity-70 disabled:opacity-50"
        >
          {status === "submitting" ? t("sending") : t("send")}
          <ArrowCircle variant="on-light" />
        </button>

        {status === "success" && (
          <p className="text-sm font-medium text-green-700">{t("success")}</p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-red-700">{t("error")}</p>
        )}
      </div>
    </form>
  );
}
