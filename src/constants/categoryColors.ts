import type { CategoryColor } from "@/src/types/categories/category.types";

// 색상 선택 UI(add/edit)에서 순서대로 노출할 목록
export const CATEGORY_COLORS: CategoryColor[] = [
  "BLUE",
  "BROWN",
  "GREEN",
  "PURPLE",
  "PINK",
];

// CategoryCircle(선택 원)에서 쓰는 solid/soft(선택됨/비활성) 배경 클래스
export const CATEGORY_COLOR_CLASS_NAMES: Record<
  CategoryColor,
  { solid: string; soft: string }
> = {
  BLUE: { solid: "bg-category-01-1", soft: "bg-category-01-2" },
  BROWN: { solid: "bg-category-02-1", soft: "bg-category-02-2" },
  GREEN: { solid: "bg-category-03-1", soft: "bg-category-03-2" },
  PURPLE: { solid: "bg-category-04-1", soft: "bg-category-04-2" },
  PINK: { solid: "bg-category-05-1", soft: "bg-category-05-2" },
};

// 목록 화면 등에서 쓰는 작은 색상 점(dot) 배경 클래스
export const CATEGORY_DOT_CLASS_NAMES: Record<CategoryColor, string> = {
  BLUE: "bg-category-01-1",
  BROWN: "bg-category-02-1",
  GREEN: "bg-category-03-1",
  PURPLE: "bg-category-04-1",
  PINK: "bg-category-05-1",
};

// 삭제 모달 등에서 카테고리명에 색을 입힐 때 쓰는 텍스트 컬러 클래스
export const CATEGORY_TEXT_CLASS_NAMES: Record<CategoryColor, string> = {
  BLUE: "text-category-01-1",
  BROWN: "text-category-02-1",
  GREEN: "text-category-03-1",
  PURPLE: "text-category-04-1",
  PINK: "text-category-05-1",
};

// 일정 카드 등에서 카테고리색의 연한 톤으로 테두리를 입힐 때 쓰는 클래스
export const CATEGORY_BORDER_CLASS_NAMES: Record<CategoryColor, string> = {
  BLUE: "border-category-01-2",
  BROWN: "border-category-02-2",
  GREEN: "border-category-03-2",
  PURPLE: "border-category-04-2",
  PINK: "border-category-05-2",
};

// CategoryChip 등에서 카테고리색의 진한 톤으로 테두리를 입힐 때 쓰는 클래스
export const CATEGORY_SOLID_BORDER_CLASS_NAMES: Record<CategoryColor, string> = {
  BLUE: "border-category-01-1",
  BROWN: "border-category-02-1",
  GREEN: "border-category-03-1",
  PURPLE: "border-category-04-1",
  PINK: "border-category-05-1",
};

// hex 값이 직접 필요한 외부 컴포넌트(예: ScheduleRecommendItem)에 넘길 때 사용
// tailwind.config.js의 category.01~05 값과 동일하게 유지해야 함
export const CATEGORY_HEX_COLORS: Record<CategoryColor, string> = {
  BLUE: "#6A92AF",
  BROWN: "#C49C64",
  GREEN: "#79A659",
  PURPLE: "#A381BB",
  PINK: "#BD7593",
};
