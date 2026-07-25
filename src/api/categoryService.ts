import { baseApi } from "@/src/api/baseApi";
import type { ApiResponse } from "@/src/types/api/api.types";
import type { Category, CategoryColor } from "@/src/types/categories/category.types";

type CategoryColorApi = "BLUE" | "BROWN" | "GREEN" | "PURPLE" | "PINK";

type CategoryApiRaw = {
  categoryId: number;
  categoryName: string;
  categoryColor: CategoryColorApi;
  categoryOrder: number;
};

// 공용 Category 타입엔 order가 없어서, order가 필요한 화면(목록/정렬)에서만 이 타입 사용
export type CategoryWithOrder = Category & { order: number };

function toAppColor(apiColor: CategoryColorApi): CategoryColor {
  return apiColor.toLowerCase() as CategoryColor;
}

function toApiColor(color: CategoryColor): CategoryColorApi {
  return color.toUpperCase() as CategoryColorApi;
}

function toCategory(raw: CategoryApiRaw): CategoryWithOrder {
  return {
    id: String(raw.categoryId),
    name: raw.categoryName,
    color: toAppColor(raw.categoryColor),
    order: raw.categoryOrder,
  };
}

function unwrap<T>(res: { data: ApiResponse<T> }): T {
  if (res.data.resultType === "FAIL") throw new Error(res.data.reason);
  return res.data.data;
}

type PostCategoryParams = {
  name: string;
  color: CategoryColor;
};

type PatchCategoryParams = {
  categoryId: string;
  name?: string;
  color?: CategoryColor;
};

type PatchCategoryOrderParams = {
  categories: { categoryId: number; categoryOrder: number }[];
};

export const categoryService = {
  getCategories: () =>
    baseApi
      .get<ApiResponse<CategoryApiRaw[]>>("/api/v1/categories")
      .then((res) => unwrap(res).map(toCategory)),

  postCategory: (params: PostCategoryParams) =>
    baseApi
      .post<ApiResponse<CategoryApiRaw>>("/api/v1/categories", {
        categoryName: params.name,
        categoryColor: toApiColor(params.color),
      })
      .then((res) => toCategory(unwrap(res))),

  patchCategory: ({ categoryId, name, color }: PatchCategoryParams) =>
    baseApi
      .patch<ApiResponse<CategoryApiRaw>>(`/api/v1/categories/${categoryId}`, {
        ...(name !== undefined && { categoryName: name }),
        ...(color !== undefined && { categoryColor: toApiColor(color) }),
      })
      .then((res) => toCategory(unwrap(res))),

  deleteCategory: (categoryId: string) =>
    baseApi
      .delete<ApiResponse<null>>(`/api/v1/categories/${categoryId}`)
      .then((res) => unwrap(res)),

  patchCategoryOrder: (items: { id: string; order: number }[]) =>
    baseApi
      .patch<ApiResponse<CategoryApiRaw[]>>("/api/v1/categories/order", {
        categories: items.map((item) => ({
          categoryId: Number(item.id),
          categoryOrder: item.order,
        })),
      } satisfies PatchCategoryOrderParams)
      .then((res) => unwrap(res).map(toCategory)),
};