import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import DraggableFlatList, {
  type RenderItemParams,
} from "react-native-draggable-flatlist";

import InfoIcon from "@/assets/icons/infoIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import DragIcon from "@/assets/icons/dragIcon.svg";
import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import type { CategoryColor } from "@/src/components/common/CategoryCircle";
import { cn } from "@/src/lib/cn";
import type { Category } from "@/src/types/categories/category.types";

const MAX_CATEGORY_COUNT = 5;

const DUMMY_CATEGORIES: Category[] = [
  { id: "1", name: "CATEGORY", color: "blue" },
  { id: "2", name: "CATEGORY", color: "brown" },
  { id: "3", name: "CATEGORY", color: "green" },
  { id: "4", name: "CATEGORY", color: "purple" },
  { id: "5", name: "CATEGORY", color: "pink" },
];

const CATEGORY_DOT_CLASS_NAMES: Record<CategoryColor, string> = {
  blue: "bg-category-01-1",
  brown: "bg-category-02-1",
  green: "bg-category-03-1",
  purple: "bg-category-04-1",
  pink: "bg-category-05-1",
};

export default function CategoryListScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(DUMMY_CATEGORIES);

  const isEmpty = categories.length === 0;
  const isMaxReached = categories.length >= MAX_CATEGORY_COUNT;

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<Category>) => (
    <View
      className={cn(
        "h-14 flex-row items-center px-4",
        isActive && "bg-gray-50",
      )}
    >
      <View
        className={cn(
          "h-5 w-5 rounded-full",
          CATEGORY_DOT_CLASS_NAMES[item.color],
        )}
      />
      <Text className="ml-2 flex-1 text-b-03-m text-gray-800">
        {item.name}
      </Text>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/category/edit",
            params: { id: item.id },
          })
        }
        hitSlop={8}
      >
        <EditIcon width={20} height={20} />
      </Pressable>
      <Pressable onPressIn={drag} hitSlop={8} className="ml-3">
        <DragIcon width={20} height={20} />
      </Pressable>
    </View>
  );

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="카테고리 설정" />

      <View className="flex-1 justify-between px-4 pt-4">
        <View>
          {isEmpty ? (
            <View className="items-center justify-center gap-2 py-20">
              <InfoIcon width={96} height={96} color="#4D826C" />
              <Text className="text-b-03-m text-gray-500">
                등록된 카테고리가 없어요
              </Text>
            </View>
          ) : (
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
              <DraggableFlatList
                data={categories}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data }) => setCategories(data)}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-gray-100" />
                )}
                renderItem={renderItem}
              />
            </View>
          )}
        </View>

        <View className="gap-3">
          <Text className="text-center text-b-04-r text-gray-400">
            카테고리는 최대 {MAX_CATEGORY_COUNT}개까지 생성 가능합니다
          </Text>
          <Button
            label="카테고리 추가"
            onPress={() => router.push("/category/add")}
            disabled={isMaxReached}
            className="mb-4"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}