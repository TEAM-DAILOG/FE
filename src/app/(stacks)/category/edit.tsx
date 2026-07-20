import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryCircle } from "@/src/components/common/CategoryCircle";
import { CATEGORY_COLORS } from "@/src/constants/categoryColors";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CategoryColor } from "@/src/types/categories/category.types";

// TODO: id로 실제 카테고리 데이터 조회 (API 연동 전까지는 더미)
const DUMMY_NAME = "CATEGORY";
const DUMMY_COLOR: CategoryColor = "blue";

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const openModal = useBaseModal((state) => state.openModal);

  const [selectedColor, setSelectedColor] =
    useState<CategoryColor>(DUMMY_COLOR);

  const hasChanged = selectedColor !== DUMMY_COLOR;

  const handleSave = () => {
    if (!hasChanged) return;
    // TODO: API 연동 단계에서 실제 수정 로직 연결 (id: ${id})
    router.back();
  };

  const handleDelete = () => {
    // TODO: API 연동 단계에서 실제 삭제 로직 연결 (id: ${id})
    router.back();
  };

  const openDeleteCategoryModal = () => {
    openModal("deleteCategoryModal", {
      props: {
        categoryName: DUMMY_NAME,
        categoryColor: selectedColor,
        onConfirm: handleDelete,
      },
    });
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 px-4 pt-5">
        {/* TODO: 이 구분선(h-px bg-gray-100)은 category/index.tsx의 ItemSeparatorComponent와
            중복됨 -> 공용 컴포넌트 분리 PR 머지되면 그걸로 교체 */}
        <View className="gap-4 rounded-lg border border-gray-100 bg-white px-4 py-6">
          <Text className="text-gray-800 text-b-02-sb">{DUMMY_NAME}</Text>
          <View className="h-px bg-gray-100" />
          <View className="flex-row justify-between">
            {CATEGORY_COLORS.map((color) => (
              <CategoryCircle
                key={color}
                color={color}
                state={selectedColor === color ? "selected" : "default"}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="mb-12 gap-3 px-4">
        <Button
          label="삭제"
          variant="stroke-green"
          onPress={openDeleteCategoryModal}
        />
        <Button label="저장" onPress={handleSave} disabled={!hasChanged} />
      </View>
    </ScreenContainer>
  );
}
