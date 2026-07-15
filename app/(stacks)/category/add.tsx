import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { TextField } from "@/src/components/common/TextField";
import {
  CategoryCircle,
  type CategoryCircleState,
} from "@/src/components/common/CategoryCircle";
import type { CategoryColor } from "@/src/types/categories/category.types";

const CATEGORY_COLORS: CategoryColor[] = [
  "blue",
  "brown",
  "green",
  "purple",
  "pink",
];

// TODO: API 연동 단계에서 실제 카테고리 목록(store/service)으로 교체
const USED_COLORS: CategoryColor[] = ["blue", "green", "pink"];

export default function CategoryAddScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState<CategoryColor | null>(
    null,
  );

  const canSave = name.trim().length > 0 && selectedColor !== null;

  const getColorState = (color: CategoryColor): CategoryCircleState => {
    if (USED_COLORS.includes(color)) return "disabled";
    if (selectedColor === color) return "selected";
    return "default";
  };

  const handleSave = () => {
    if (!canSave) return;
    // TODO: API 연동 단계에서 실제 저장 로직 연결
    router.back();
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 gap-4 px-4 pt-5">
        <View className="gap-3">
          <Text className="text-b-02-m text-gray-900">카테고리명</Text>
          <TextField
            value={name}
            onChangeText={setName}
            placeholder="카테고리명을 입력해주세요"
          />
        </View>

        <View className="gap-3">
          <Text className="text-b-02-m text-gray-900">색상 설정</Text>
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
      </View>

      <View className="px-4 pb-12">
        <Button label="저장" onPress={handleSave} disabled={!canSave} />
      </View>
    </ScreenContainer>
  );
}
