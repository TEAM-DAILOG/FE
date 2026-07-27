import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "@/src/api/categoryService";
import type {
  CategoryWithOrder,
  UpdateCategoryParams,
} from "@/src/types/categories/category.types";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder, Error, UpdateCategoryParams>({
    mutationFn: (params) => categoryService.patchCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
