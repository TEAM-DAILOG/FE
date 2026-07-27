import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "@/src/api/categoryService";
import type {
  CategoryOrderItem,
  CategoryWithOrder,
} from "@/src/types/categories/category.types";

export function useUpdateCategoryOrder() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder[], Error, CategoryOrderItem[]>({
    mutationFn: (items) => categoryService.patchCategoryOrder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
