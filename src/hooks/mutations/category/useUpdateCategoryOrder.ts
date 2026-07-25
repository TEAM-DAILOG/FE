import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService, type CategoryWithOrder } from "@/src/api/categoryService";

type OrderItem = { id: string; order: number };

export function useUpdateCategoryOrder() {
  const queryClient = useQueryClient();

  return useMutation<CategoryWithOrder[], Error, OrderItem[]>({
    mutationFn: (items) => categoryService.patchCategoryOrder(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}