import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

const bookingSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  partySize: z.coerce.number().int().min(1).max(50),
  date: z.string().trim().min(1),
  time: z.string().trim().min(1),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const parsedDate = new Date(data.date);

  if (Number.isNaN(parsedDate.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 422 });
  }

  const booking = await prisma.booking.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      partySize: data.partySize,
      date: parsedDate,
      time: data.time,
      comment: data.comment || null,
    },
  });

  const message = [
    "🍽 <b>Новая бронь — Quadro</b>",
    `Имя: ${escapeHtml(booking.name)}`,
    `Телефон: ${escapeHtml(booking.phone)}`,
    booking.email ? `Email: ${escapeHtml(booking.email)}` : null,
    `Гостей: ${booking.partySize}`,
    `Дата: ${booking.date.toLocaleDateString("ru-RU")}`,
    `Время: ${escapeHtml(booking.time)}`,
    booking.comment ? `Комментарий: ${escapeHtml(booking.comment)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await sendTelegramMessage(message).catch(() => null);

  return NextResponse.json({ id: booking.id }, { status: 201 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
