import type {
  CategoryApiRaw,
  CategoryWithOrder,
} from "@/src/types/categories/category.types";

export function toCategory(raw: CategoryApiRaw): CategoryWithOrder {
  return {
    id: String(raw.categoryId),
    name: raw.categoryName,
    color: raw.categoryColor,
    order: raw.categoryOrder,
  };
}
