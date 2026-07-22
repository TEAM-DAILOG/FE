// 카테고리 색상 ENUM
export type CategoryColor = "BLUE" | "BROWN" | "GREEN" | "PURPLE" | "PINK";

export type Category = {
  id: string;
  name: string;
  color: CategoryColor;
};
