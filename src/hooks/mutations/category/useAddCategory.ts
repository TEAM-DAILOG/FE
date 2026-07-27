import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "@/src/api/categoryService";
import type {
  AddCategoryParams,
  CategoryWithOrder,
} from "@/src/types/categories/category.types";

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder, Error, AddCategoryParams>({
    mutationFn: (params) => categoryService.postCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
