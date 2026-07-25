import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryCircle } from "@/src/components/common/CategoryCircle";
import { CATEGORY_COLORS } from "@/src/constants/categoryColors";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
import { useUpdateCategory } from "@/src/hooks/mutations/category/useUpdateCategory";
import { useDeleteCategory } from "@/src/hooks/mutations/category/useDeleteCategory";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CategoryColor } from "@/src/types/categories/category.types";

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const openModal = useBaseModal((state) => state.openModal);

  // TODO: 목록 전체를 불러와서 id로 찾는 방식. 단건 조회 API가 따로 있으면 그걸로 교체하는 게 더 효율적
  const { data: categories } = useGetCategories();
  const category = categories?.find((c) => c.id === id);

  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(
    null,
  );

  useEffect(() => {
    if (category) setSelectedColor(category.color);
  }, [category]);

  const hasChanged =
    selectedColor !== null && category && selectedColor !== category.color;

  const handleSave = () => {
    if (!hasChanged || !selectedColor) return;
    updateCategory.mutate(
      { categoryId: id, color: selectedColor },
      { onSuccess: () => router.back() },
    );
  };

  const handleDelete = () => {
    deleteCategory.mutate(id, { onSuccess: () => router.back() });
  };

  const openDeleteCategoryModal = () => {
    if (!category || !selectedColor) return;
    openModal("deleteCategoryModal", {
      props: {
        categoryName: category.name,
        categoryColor: selectedColor,
        onConfirm: handleDelete,
      },
    });
  };

  if (!category || selectedColor === null) {
    return (
      <ScreenContainer variant="stack">
        <BackHeader label="카테고리 설정" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 px-4 pt-5">
        {/* TODO: 이 구분선(h-px bg-gray-100)은 category/index.tsx의 ItemSeparatorComponent와
            중복됨 -> 공용 컴포넌트 분리 PR 머지되면 그걸로 교체 */}
        <View className="gap-4 rounded-lg border border-gray-100 bg-white px-4 py-6">
          <Text className="text-gray-800 text-b-02-sb">{category.name}</Text>
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

        {updateCategory.isError ? (
          <Text className="mt-3 text-red-500 text-b-03-m">
            {updateCategory.error.message}
          </Text>
        ) : null}
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