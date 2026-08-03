import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";

import { BackHeader, Divider, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryCircle } from "@/src/components/common/CategoryCircle";
import { CATEGORY_COLORS } from "@/src/constants/categoryColors";
import { CATEGORY_NAME_MAX_LENGTH } from "@/src/constants/inputLimits";
import { useDeleteCategory } from "@/src/hooks/mutations/category/useDeleteCategory";
import { useUpdateCategory } from "@/src/hooks/mutations/category/useUpdateCategory";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
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

  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(
    null
  );

  useEffect(() => {
    if (category) {
      setName(category.name);
      setSelectedColor(category.color);
    }
  }, [category]);

  const trimmedName = name.trim();
  const hasChanged =
    !!category &&
    selectedColor !== null &&
    (trimmedName !== category.name || selectedColor !== category.color);
  const canSave = hasChanged && trimmedName.length > 0;

  const handleSave = () => {
    if (!canSave || updateCategory.isPending || !category || !selectedColor) {
      return;
    }
    updateCategory.mutate(
      {
        categoryId: id,
        ...(trimmedName !== category.name ? { name: trimmedName } : {}),
        ...(selectedColor !== category.color ? { color: selectedColor } : {}),
      },
      { onSuccess: () => router.back() }
    );
  };

  const handleDelete = () => {
    deleteCategory.mutate(id, { onSuccess: () => router.back() });
  };

  const openDeleteCategoryModal = () => {
    if (!category || !selectedColor) return;
    openModal("deleteCategoryModal", {
      props: {
        categoryName: trimmedName || category.name,
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
        <View className="gap-4 rounded-lg border border-gray-100 bg-white px-4 py-6">
          <TextInput
            value={name}
            onChangeText={setName}
            maxLength={CATEGORY_NAME_MAX_LENGTH}
            className="p-0 text-gray-800 text-b-02-sb"
          />
          <Divider className="border-gray-100" />
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
        <Button
          label={updateCategory.isPending ? "저장 중" : "저장"}
          onPress={handleSave}
          disabled={!canSave || updateCategory.isPending}
        />
      </View>
    </ScreenContainer>
  );
}
