import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import {
  CategoryCircle,
  type CategoryCircleState,
} from "@/src/components/common/CategoryCircle";
import { TextField } from "@/src/components/common/TextField";
import { CATEGORY_COLORS } from "@/src/constants/categoryColors";
import { useAddCategory } from "@/src/hooks/mutations/category/useAddCategory";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
import type { CategoryColor } from "@/src/types/categories/category.types";

export default function CategoryAddScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(
    null
  );

  const { data: categories } = useGetCategories();
  const addCategory = useAddCategory();

  // 이미 사용 중인 색상은 서버가 400(BAD_REQUEST)으로 막으므로, UI에서도 선택 못 하게 처리
  const usedColors = categories?.map((c) => c.color) ?? [];

  const canSave =
    name.trim().length > 0 && selectedColor !== null && !addCategory.isPending;

  const getColorState = (color: CategoryColor): CategoryCircleState => {
    if (usedColors.includes(color)) return "disabled";
    if (selectedColor === color) return "selected";
    return "default";
  };

  const handleSave = () => {
    if (!canSave || !selectedColor) return;

    addCategory.mutate(
      { name: name.trim(), color: selectedColor },
      { onSuccess: () => router.back() }
    );
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 gap-4 px-4 pt-5">
        <View className="gap-3">
          <Text className="text-gray-900 text-b-02-m">카테고리명</Text>
          <TextField
            value={name}
            onChangeText={setName}
            placeholder="카테고리명을 입력해주세요"
          />
        </View>

        <View className="gap-3">
          <Text className="text-gray-900 text-b-02-m">색상 설정</Text>
          <View className="flex-row justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
            {CATEGORY_COLORS.map((color) => (
              <CategoryCircle
                key={color}
                color={color}
                state={getColorState(color)}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* 400 에러(이미 사용 중인 색상, 최대 5개 초과 등) 발생 시 서버 메시지 그대로 노출 */}
        {addCategory.isError ? (
          <Text className="text-red-500 text-b-03-m">
            {addCategory.error.message}
          </Text>
        ) : null}
      </View>

      <View className="px-4 pb-12">
        <Button label="저장" onPress={handleSave} disabled={!canSave} />
      </View>
    </ScreenContainer>
  );
}
