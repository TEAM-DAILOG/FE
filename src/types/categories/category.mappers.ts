import type {
  CategoryApiRaw,
  CategoryColor,
  CategoryColorApi,
  CategoryWithOrder,
} from "@/src/types/categories/category.types";

export function toAppColor(apiColor: CategoryColorApi): CategoryColor {
  return apiColor.toLowerCase() as CategoryColor;
}

export function toApiColor(color: CategoryColor): CategoryColorApi {
  return color.toUpperCase() as CategoryColorApi;
}

export function toCategory(raw: CategoryApiRaw): CategoryWithOrder {
  return {
    id: String(raw.categoryId),
    name: raw.categoryName,
    color: toAppColor(raw.categoryColor),
    order: raw.categoryOrder,
  };
}
