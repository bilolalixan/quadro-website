"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedImage } from "@/lib/admin-upload";
import type { BookingStatus } from "@/generated/prisma/enums";

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (password && password === process.env.ADMIN_PASSWORD) {
    await createAdminSession();
    redirect("/admin/bookings");
  }

  redirect("/admin/login?error=1");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function updateBookingStatusAction(
  id: string,
  status: BookingStatus,
) {
  await requireAdmin();

  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath("/admin/bookings");
}

export async function deleteBookingAction(id: string) {
  await requireAdmin();

  await prisma.booking.delete({ where: { id } });
  revalidatePath("/admin/bookings");
}

export async function createEventAction(formData: FormData) {
  await requireAdmin();

  const image = formData.get("image");
  let imageUrl: string | null = null;
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveUploadedImage(image);
  }

  const dateValue = String(formData.get("date") ?? "");

  await prisma.event.create({
    data: {
      titleRu: String(formData.get("titleRu") ?? ""),
      titleUz: String(formData.get("titleUz") ?? ""),
      titleEn: String(formData.get("titleEn") ?? ""),
      descriptionRu: String(formData.get("descriptionRu") ?? "") || null,
      descriptionUz: String(formData.get("descriptionUz") ?? "") || null,
      descriptionEn: String(formData.get("descriptionEn") ?? "") || null,
      imageUrl,
      date: dateValue ? new Date(dateValue) : null,
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEventAction(id: string, formData: FormData) {
  await requireAdmin();

  const image = formData.get("image");
  let imageUrl: string | undefined;
  if (image instanceof File && image.size > 0) {
    imageUrl = await saveUploadedImage(image);
  }

  const dateValue = String(formData.get("date") ?? "");

  await prisma.event.update({
    where: { id },
    data: {
      titleRu: String(formData.get("titleRu") ?? ""),
      titleUz: String(formData.get("titleUz") ?? ""),
      titleEn: String(formData.get("titleEn") ?? ""),
      descriptionRu: String(formData.get("descriptionRu") ?? "") || null,
      descriptionUz: String(formData.get("descriptionUz") ?? "") || null,
      descriptionEn: String(formData.get("descriptionEn") ?? "") || null,
      ...(imageUrl ? { imageUrl } : {}),
      date: dateValue ? new Date(dateValue) : null,
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEventAction(id: string) {
  await requireAdmin();

  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}

export async function createGalleryImageAction(formData: FormData) {
  await requireAdmin();

  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return;
  }

  const imageUrl = await saveUploadedImage(image);

  await prisma.galleryImage.create({
    data: {
      imageUrl,
      category: String(formData.get("category") ?? "interer"),
      order: Number(formData.get("order") ?? 0),
    },
  });

  revalidatePath("/admin/gallery");
}

export async function deleteGalleryImageAction(id: string) {
  await requireAdmin();

  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
}

export async function deleteEventInquiryAction(id: string) {
  await requireAdmin();

  await prisma.eventInquiry.delete({ where: { id } });
  revalidatePath("/admin/event-inquiries");
}
