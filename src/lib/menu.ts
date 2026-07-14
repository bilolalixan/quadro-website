import { prisma } from "@/lib/prisma";

export function getMenuCategories() {
  return prisma.menuCategory.findMany({
    orderBy: { order: "asc" },
  });
}

export function getMenuCategoriesWithItems() {
  return prisma.menuCategory.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        orderBy: { order: "asc" },
      },
    },
  });
}

export function getCategoryBySlug(slug: string) {
  return prisma.menuCategory.findUnique({
    where: { slug },
    include: {
      items: {
        orderBy: { order: "asc" },
      },
    },
  });
}
