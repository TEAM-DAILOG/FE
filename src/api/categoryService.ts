import { baseApi } from "@/src/api/baseApi";
import { unwrapApiResponse } from "@/src/lib/apiResponse";
import type { ApiResponse } from "@/src/types/api/api.types";
import {
  toApiColor,
  toCategory,
} from "@/src/types/categories/category.mappers";
import type {
  CategoryApiRaw,
  CategoryWithOrder,
  PatchCategoryOrderParams,
  PatchCategoryParams,
  PostCategoryParams,
} from "@/src/types/categories/category.types";

export const categoryService = {
  getCategories: () =>
    baseApi
      .get<ApiResponse<CategoryApiRaw[]>>("/api/v1/categories")
      .then((res) => unwrapApiResponse(res).map(toCategory)),

  postCategory: (params: PostCategoryParams) =>
    baseApi
      .post<ApiResponse<CategoryApiRaw>>("/api/v1/categories", {
        categoryName: params.name,
        categoryColor: toApiColor(params.color),
      })
      .then((res) => toCategory(unwrapApiResponse(res))),

  patchCategory: ({ categoryId, name, color }: PatchCategoryParams) =>
    baseApi
      .patch<ApiResponse<CategoryApiRaw>>(`/api/v1/categories/${categoryId}`, {
        ...(name !== undefined && { categoryName: name }),
        ...(color !== undefined && { categoryColor: toApiColor(color) }),
      })
      .then((res) => toCategory(unwrapApiResponse(res))),

  deleteCategory: (categoryId: string) =>
    baseApi
      .delete<ApiResponse<null>>(`/api/v1/categories/${categoryId}`)
      .then((res) => unwrapApiResponse(res)),

  patchCategoryOrder: (items: { id: string; order: number }[]) =>
    baseApi
      .patch<ApiResponse<CategoryApiRaw[]>>("/api/v1/categories/order", {
        categories: items.map((item) => ({
          categoryId: Number(item.id),
          categoryOrder: item.order,
        })),
      } satisfies PatchCategoryOrderParams)
      .then((res) => unwrapApiResponse(res).map(toCategory)),
};

// 훅에서 import하던 CategoryWithOrder를 여기서도 재노출 (기존 import 경로 유지용)
export type { CategoryWithOrder };
