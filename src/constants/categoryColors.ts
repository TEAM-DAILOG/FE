import type { CategoryColor } from "@/src/types/categories/category.types";

// 색상 선택 UI(add/edit)에서 순서대로 노출할 목록
export const CATEGORY_COLORS: CategoryColor[] = [
  "blue",
  "brown",
  "green",
  "purple",
  "pink",
];

// CategoryCircle(선택 원)에서 쓰는 solid/soft(선택됨/비활성) 배경 클래스
export const CATEGORY_COLOR_CLASS_NAMES: Record<
  CategoryColor,
  { solid: string; soft: string }
> = {
  blue: { solid: "bg-category-01-1", soft: "bg-category-01-2" },
  brown: { solid: "bg-category-02-1", soft: "bg-category-02-2" },
  green: { solid: "bg-category-03-1", soft: "bg-category-03-2" },
  purple: { solid: "bg-category-04-1", soft: "bg-category-04-2" },
  pink: { solid: "bg-category-05-1", soft: "bg-category-05-2" },
};

// 목록 화면 등에서 쓰는 작은 색상 점(dot) 배경 클래스
export const CATEGORY_DOT_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "bg-category-01-1",
  brown: "bg-category-02-1",
  green: "bg-category-03-1",
  purple: "bg-category-04-1",
  pink: "bg-category-05-1",
};

// 삭제 모달 등에서 카테고리명에 색을 입힐 때 쓰는 텍스트 컬러 클래스
export const CATEGORY_TEXT_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "text-category-01-1",
  brown: "text-category-02-1",
  green: "text-category-03-1",
  purple: "text-category-04-1",
  pink: "text-category-05-1",
};

// 일정 카드 등에서 카테고리색의 연한 톤으로 테두리를 입힐 때 쓰는 클래스
export const CATEGORY_BORDER_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "border-category-01-2",
  brown: "border-category-02-2",
  green: "border-category-03-2",
  purple: "border-category-04-2",
  pink: "border-category-05-2",
};

// hex 값이 직접 필요한 외부 컴포넌트(예: ScheduleRecommendItem)에 넘길 때 사용
// tailwind.config.js의 category.01~05 값과 동일하게 유지해야 함
export const CATEGORY_HEX_COLORS: Record<CategoryColor, string> = {
  blue: "#6A92AF",
  brown: "#C49C64",
  green: "#79A659",
  purple: "#A381BB",
  pink: "#BD7593",
};
