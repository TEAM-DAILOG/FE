import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService, type CategoryWithOrder } from "@/src/api/categoryService";
import type { CategoryColor } from "@/src/types/categories/category.types";

type UpdateCategoryParams = {
  categoryId: string;
  name?: string;
  color?: CategoryColor;
};

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder, Error, UpdateCategoryParams>({
    mutationFn: (params) => categoryService.patchCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}