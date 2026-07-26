import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import { AddButton } from "@/src/components/common/AddButton";
import { Checkbox } from "@/src/components/common/Checkbox";
import {
  CATEGORY_BORDER_CLASS_NAMES,
  CATEGORY_COLOR_CLASS_NAMES,
  CATEGORY_DOT_CLASS_NAMES,
  CATEGORY_TEXT_CLASS_NAMES,
} from "@/src/constants/categoryColors";
import { useDeleteSchedule } from "@/src/hooks/mutations/schedules/useDeleteSchedule";
import { cn } from "@/src/lib/cn";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CategoryColor } from "@/src/types/categories/category.types";
import type { ScheduleScope } from "@/src/types/schedules/schedule.types";

export type ScheduleItemAction =
  | {
      type: "checkbox";
      id: string;
      // 수정 이동/삭제 모달에 쓰는 실제 일정 날짜(YYYY-MM-DD). 화면에 보이는 date prop과는 별개.
      date: string;
      groupId: number | null;
      checked: boolean;
      onToggle: () => void;
    }
  | { type: "button"; label: string; onPress?: () => void }
  | { type: "none" };

export type ScheduleItemProps = {
  categoryLabel: string;
  categoryColor: CategoryColor;
  description: string;
  date?: string;
  action: ScheduleItemAction;
  className?: string;
};

const ACTION_SIZE = 55;
const ACTION_GAP = 4;
const ACTIONS_WIDTH = ACTION_SIZE * 2 + ACTION_GAP;
// 열렸을 때 일정 박스와 버튼 패널 사이에 둘 간격
const ROW_GAP = 8;
const OPEN_OFFSET = -(ACTIONS_WIDTH + ROW_GAP);

export function ScheduleItem({
  categoryLabel,
  categoryColor,
  description,
  date,
  action,
  className,
}: ScheduleItemProps) {
  const router = useRouter();
  const openModal = useBaseModal((state) => state.openModal);
  const deleteScheduleMutation = useDeleteSchedule();

  // 버튼/체크박스가 있으면 오른쪽 공간이 좁아 날짜를 위에 따로 쌓고,
  // 액션이 없는(완료) 항목은 카테고리 줄 오른쪽에 날짜를 나란히 붙인다.
  const isDateInline = action.type === "none";

  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-10, 10])
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      const next = startX.value + event.translationX;
      translateX.value = Math.min(0, Math.max(next, OPEN_OFFSET));
    })
    .onEnd(() => {
      const shouldOpen = translateX.value < OPEN_OFFSET / 2;
      translateX.value = withSpring(shouldOpen ? OPEN_OFFSET : 0, {});
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const row = (
    <View
      className={cn(
        "w-full flex-row items-center justify-between rounded-xl border bg-gray-0 px-3 py-2",
        CATEGORY_BORDER_CLASS_NAMES[categoryColor],
        className
      )}
    >
      <View className="flex-1 gap-1">
        {date && !isDateInline && (
          <Text className="text-gray-600 text-cap-r">{date}</Text>
        )}

        <View className="gap-0.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <View
                className={cn(
                  "h-4 w-4 rounded-full",
                  CATEGORY_DOT_CLASS_NAMES[categoryColor]
                )}
              />
              <Text
                className={cn(
                  "text-b-05-b",
                  CATEGORY_TEXT_CLASS_NAMES[categoryColor]
                )}
              >
                {categoryLabel.toUpperCase()}
              </Text>
            </View>
            {date && isDateInline && (
              <Text className="text-gray-600 text-cap-r">{date}</Text>
            )}
          </View>
          <Text numberOfLines={1} className="text-gray-800 text-b-03-m">
            {description}
          </Text>
        </View>
      </View>

      {action.type === "checkbox" && (
        <Checkbox
          checked={action.checked}
          onToggle={action.onToggle}
          className="ml-2"
        />
      )}
      {action.type === "button" && (
        <AddButton
          label={action.label}
          onPress={action.onPress}
          className="ml-2"
        />
      )}
    </View>
  );

  // 체크박스 모드(할 일 목록)에서만 왼쪽 스와이프로 수정/삭제 버튼을 노출
  if (action.type !== "checkbox") return row;

  const { id, date: scheduleDate, groupId } = action;
  const actionBgClassName = CATEGORY_COLOR_CLASS_NAMES[categoryColor].soft;

  // 일정 등록 화면을 수정 모드로 열어 기존 값을 채워서 보여준다
  const handleEdit = () => {
    router.push({
      pathname: "/schedule",
      params: {
        scheduleId: id,
        title: description,
        date: scheduleDate,
        categoryColor,
      },
    });
  };

  const handleDelete = () => {
    openModal("deleteScheduleModal", {
      props: {
        date: scheduleDate,
        description,
        isRepeating: groupId !== null,
        onConfirm: (scope: ScheduleScope) => {
          deleteScheduleMutation.mutate({ scheduleId: Number(id), scope });
        },
      },
    });
  };

  return (
    <View className="relative">
      <View
        pointerEvents="box-none"
        className="absolute inset-y-0 right-0 flex-row items-stretch"
        style={{ gap: ACTION_GAP, width: ACTIONS_WIDTH }}
      >
        <Pressable
          onPress={handleEdit}
          className={cn(
            "aspect-square items-center justify-center rounded-xl p-2.5",
            actionBgClassName
          )}
          style={{ width: ACTION_SIZE }}
        >
          <EditIcon width={24} height={24} color="#020303" />
        </Pressable>
        <Pressable
          onPress={handleDelete}
          className={cn(
            "aspect-square items-center justify-center rounded-xl p-2.5",
            actionBgClassName
          )}
          style={{ width: ACTION_SIZE }}
        >
          <CloseIcon width={24} height={24} color="#020303" />
        </Pressable>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={rowStyle}>{row}</Animated.View>
      </GestureDetector>
    </View>
  );
}
