import type { CategoryColor } from "@/src/types/categories/category.types";

export type DeleteCategoryModalProps = {
  categoryName: string;
  categoryColor: CategoryColor;
  onConfirm: () => void;
};
