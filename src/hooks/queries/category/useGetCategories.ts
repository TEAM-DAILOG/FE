import { useQuery } from "@tanstack/react-query";

import {
  categoryService,
  type CategoryWithOrder,
} from "@/src/api/categoryService";

export function useGetCategories(options?: { enabled?: boolean }) {
  return useQuery<CategoryWithOrder[], Error>({
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
    enabled: options?.enabled,
  });
}
