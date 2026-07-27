import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "@/src/api/categoryService";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation<null, Error, string>({
    mutationFn: (categoryId) => categoryService.deleteCategory(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}