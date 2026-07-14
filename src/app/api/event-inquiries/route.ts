import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendTelegramMessage } from "@/lib/telegram";

const inquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().min(5).max(30),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const data = parsed.data;

  const inquiry = await prisma.eventInquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description || null,
    },
  });

  const message = [
    "🎉 <b>Заявка на мероприятие — Quadro</b>",
    `Имя: ${escapeHtml(inquiry.name)}`,
    `Email: ${escapeHtml(inquiry.email)}`,
    `Телефон: ${escapeHtml(inquiry.phone)}`,
    inquiry.description ? `Описание: ${escapeHtml(inquiry.description)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await sendTelegramMessage(message).catch(() => null);

  return NextResponse.json({ id: inquiry.id }, { status: 201 });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
