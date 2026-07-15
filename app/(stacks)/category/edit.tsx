import { useState } from "react";
import { Modal, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryCircle } from "@/src/components/common/CategoryCircle";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

const CATEGORY_COLORS: CategoryColor[] = [
  "blue",
  "brown",
  "green",
  "purple",
  "pink",
];

const CATEGORY_DOT_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "bg-category-01-1",
  brown: "bg-category-02-1",
  green: "bg-category-03-1",
  purple: "bg-category-04-1",
  pink: "bg-category-05-1",
};

const CATEGORY_TEXT_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "text-category-01-1",
  brown: "text-category-02-1",
  green: "text-category-03-1",
  purple: "text-category-04-1",
  pink: "text-category-05-1",
};

// TODO: id로 실제 카테고리 데이터 조회 (API 연동 전까지는 더미)
const DUMMY_NAME = "CATEGORY";
const DUMMY_COLOR: CategoryColor = "blue";

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [selectedColor, setSelectedColor] =
    useState<CategoryColor>(DUMMY_COLOR);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const hasChanged = selectedColor !== DUMMY_COLOR;

  const handleSave = () => {
    if (!hasChanged) return;
    // TODO: API 연동 단계에서 실제 수정 로직 연결 (id: ${id})
    router.back();
  };

  const handleDelete = () => {
    // TODO: API 연동 단계에서 실제 삭제 로직 연결 (id: ${id})
    setIsDeleteModalOpen(false);
    router.back();
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 px-4 pt-5">
        {/* TODO: 이 구분선(h-px bg-gray-100)은 category/index.tsx의 ItemSeparatorComponent와
            중복됨 -> 공용 컴포넌트 분리 PR 머지되면 그걸로 교체 */}
        <View className="gap-4 rounded-lg border border-gray-100 bg-white px-4 py-6">
          <Text className="text-b-02-sb text-gray-800">{DUMMY_NAME}</Text>
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
          onPress={() => setIsDeleteModalOpen(true)}
        />
        <Button label="저장" onPress={handleSave} disabled={!hasChanged} />
      </View>

      <Modal
        visible={isDeleteModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDeleteModalOpen(false)}
      >
        {/* bg-black/40 오버레이는 디자인 확인 완료된 값 */}
        <View className="flex-1 items-center justify-center bg-black/40 px-4">
          <View className="w-full overflow-hidden rounded-xl bg-white">
            <View className="items-center gap-3 px-4 py-10">
              <View className="flex-row items-center gap-1">
                <View
                  className={cn(
                    "h-6 w-6 rounded-full",
                    CATEGORY_DOT_CLASS_NAMES[selectedColor],
                  )}
                />
                <Text
                  className={cn(
                    "text-b-02-sb",
                    CATEGORY_TEXT_CLASS_NAMES[selectedColor],
                  )}
                >
                  {DUMMY_NAME}
                </Text>
                <Text className="text-b-02-m text-gray-900">
                  를 삭제할까요?
                </Text>
              </View>
              <Text className="text-b-04-m text-gray-900">
                등록된 일정은 삭제되지 않아요
              </Text>
            </View>

            <View className="flex-row">
              <View className="flex-1">
                <Button
                  label="취소"
                  variant="fill-gray"
                  onPress={() => setIsDeleteModalOpen(false)}
                  className="rounded-none"
                />
              </View>
              <View className="flex-1">
                <Button
                  label="삭제"
                  onPress={handleDelete}
                  className="rounded-none"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
