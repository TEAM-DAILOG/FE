import { baseApi } from "@/src/api/baseApi";
import type { ApiSuccessResponse } from "@/src/types/api/api.types";
import { toCategory } from "@/src/types/categories/category.mappers";
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
      .get<ApiSuccessResponse<CategoryApiRaw[]>>("/api/v1/categories")
      .then((res) => res.data.data.map(toCategory)),

  postCategory: (params: PostCategoryParams) =>
    baseApi
      .post<ApiSuccessResponse<CategoryApiRaw>>("/api/v1/categories", {
        categoryName: params.name,
        categoryColor: params.color,
      })
      .then((res) => toCategory(res.data.data)),

  patchCategory: ({ categoryId, name, color }: PatchCategoryParams) =>
    baseApi
      .patch<ApiSuccessResponse<CategoryApiRaw>>(
        `/api/v1/categories/${categoryId}`,
        {
          ...(name !== undefined && { categoryName: name }),
          ...(color !== undefined && { categoryColor: color }),
        }
      )
      .then((res) => toCategory(res.data.data)),

  deleteCategory: (categoryId: string) =>
    baseApi
      .delete<ApiSuccessResponse<null>>(`/api/v1/categories/${categoryId}`)
      .then((res) => res.data.data),

  patchCategoryOrder: (items: { id: string; order: number }[]) =>
    baseApi
      .patch<ApiSuccessResponse<CategoryApiRaw[]>>("/api/v1/categories/order", {
        categories: items.map((item) => ({
          categoryId: Number(item.id),
          categoryOrder: item.order,
        })),
      } satisfies PatchCategoryOrderParams)
      .then((res) => res.data.data.map(toCategory)),
};

export type { CategoryWithOrder };
