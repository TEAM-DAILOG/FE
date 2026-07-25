import { useQuery } from "@tanstack/react-query";

import { categoryService, type CategoryWithOrder } from "@/src/api/categoryService";

export function useGetCategories() {
  return useQuery<CategoryWithOrder[], Error>({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
  });
}