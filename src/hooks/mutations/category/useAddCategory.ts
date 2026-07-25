import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService, type CategoryWithOrder } from "@/src/api/categoryService";
import type { CategoryColor } from "@/src/types/categories/category.types";

type AddCategoryParams = {
  name: string;
  color: CategoryColor;
};

export function useAddCategory() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder, Error, AddCategoryParams>({
    mutationFn: (params) => categoryService.postCategory(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}