import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import DraggableFlatList, {
  type RenderItemParams,
} from "react-native-draggable-flatlist";

import DragIcon from "@/assets/icons/dragIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import ExclamationIcon from "@/assets/icons/exclamationIcon.svg";
import type { CategoryWithOrder } from "@/src/api/categoryService";
import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CATEGORY_DOT_CLASS_NAMES } from "@/src/constants/categoryColors";
import { useUpdateCategoryOrder } from "@/src/hooks/mutations/category/useUpdateCategoryOrder";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
import { cn } from "@/src/lib/cn";

const MAX_CATEGORY_COUNT = 5;

export default function CategoryListScreen() {
  const router = useRouter();
  const { data, isLoading } = useGetCategories();
  const updateOrder = useUpdateCategoryOrder();

  // 서버에서 받은 순서대로 정렬해서 로컬 state로 관리 (드래그 중엔 로컬만 바뀜)
  const [categories, setCategories] = useState<CategoryWithOrder[]>([]);

  useEffect(() => {
    if (data) {
      setCategories([...data].sort((a, b) => a.order - b.order));
    }
  }, [data]);

  const isEmpty = categories.length === 0;
  const isMaxReached = categories.length >= MAX_CATEGORY_COUNT;

  const handleDragEnd = (newData: CategoryWithOrder[]) => {
    setCategories(newData);
    updateOrder.mutate(
      newData.map((item, index) => ({ id: item.id, order: index + 1 }))
    );
  };

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<CategoryWithOrder>) => (
    <View
      className={cn(
        "h-14 flex-row items-center px-4",
        // TODO: 드래그 중 배경색(bg-gray-50) 디자인 확인 대기 중
        isActive && "bg-gray-50"
      )}
    >
      <View
        className={cn(
          "h-5 w-5 rounded-full",
          CATEGORY_DOT_CLASS_NAMES[item.color]
        )}
      />
      <Text className="ml-2 flex-1 text-gray-900 text-b-03-m">{item.name}</Text>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/category/edit",
            params: { id: item.id },
          })
        }
        hitSlop={8}
      >
        <EditIcon width={24} height={24} />
      </Pressable>
      <Pressable onPressIn={drag} hitSlop={8} className="ml-1">
        <DragIcon width={24} height={24} />
      </Pressable>
    </View>
  );

  if (isLoading) {
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

      <View className="flex-1 justify-between px-4 pt-5">
        <View className={isEmpty ? "flex-1 items-center justify-center" : ""}>
          {isEmpty ? (
            <View className="items-center justify-center gap-3">
              <ExclamationIcon width={96} height={96} color="#4D826C" />
              <Text className="text-green-600 text-b-02-sb">
                등록된 카테고리가 없어요
              </Text>
            </View>
          ) : (
            <View className="overflow-hidden rounded-xl border border-gray-100 bg-white">
              <DraggableFlatList
                data={categories}
                keyExtractor={(item) => item.id}
                onDragEnd={({ data: newData }) => handleDragEnd(newData)}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-gray-100" />
                )}
                renderItem={renderItem}
              />
            </View>
          )}
        </View>

        <View className="mb-12 gap-3">
          <Text className="text-center text-gray-600 text-b-03-m">
            카테고리는 최대 {MAX_CATEGORY_COUNT}개까지 생성 가능합니다
          </Text>
          <Button
            label="카테고리 추가"
            onPress={() => router.push("/category/add")}
            disabled={isMaxReached}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
