export type CategoryColor = "blue" | "brown" | "green" | "purple" | "pink";

export type Category = {
  id: string;
  name: string;
  color: CategoryColor;
};

// 공용 Category 타입엔 order가 없어서, order가 필요한 화면(목록/정렬)에서만 사용
export type CategoryWithOrder = Category & { order: number };

// ---- 서버 응답/요청 관련 타입 ----

export type CategoryColorApi = "BLUE" | "BROWN" | "GREEN" | "PURPLE" | "PINK";

export type CategoryApiRaw = {
  categoryId: number;
  categoryName: string;
  categoryColor: CategoryColorApi;
  categoryOrder: number;
};

export type PostCategoryParams = {
  name: string;
  color: CategoryColor;
};

export type PatchCategoryParams = {
  categoryId: string;
  name?: string;
  color?: CategoryColor;
};

export type PatchCategoryOrderParams = {
  categories: { categoryId: number; categoryOrder: number }[];
};

// ---- hooks(mutation/query)에서 쓰던 타입들 분리 ----

export type AddCategoryParams = {
  name: string;
  color: CategoryColor;
};

export type UpdateCategoryParams = {
  categoryId: string;
  name?: string;
  color?: CategoryColor;
};

export type CategoryOrderItem = {
  id: string;
  order: number;
};
