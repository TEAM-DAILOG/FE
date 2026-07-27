import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { ScrollView } from "react-native";

import { useCreateSchedule } from "@/src/hooks/mutations/schedules/useCreateSchedule";
import { useDeleteSchedule } from "@/src/hooks/mutations/schedules/useDeleteSchedule";
import { useUpdateSchedule } from "@/src/hooks/mutations/schedules/useUpdateSchedule";
import { useBaseModal } from "@/src/store/modals/baseModal";
import { CategoryColor } from "@/src/types/categories/category.types";
import type {
  DatePickerModalResult,
  ScheduleRepeatValue,
} from "@/src/types/modals/datepickerModal.types";
import type {
  ScheduleRepeatType,
  ScheduleScope,
} from "@/src/types/schedules/schedule.types";
import { formatScheduleDate } from "@/src/utils";
import { formatCreateScheduleParams } from "@/src/utils/formatCreateScheduleParams";
import { formatScheduleRepeatValue } from "@/src/utils/formatScheduleRepeatValue";
import { formatUpdateScheduleParams } from "@/src/utils/formatUpdateScheduleParams";

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
export type CategoryOption = {
  id: string;
  color: CategoryColor;
  label: string;
};

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "11", color: "BLUE", label: "카테고리" },
  { id: "16", color: "BROWN", label: "카테고리" },
  { id: "3", color: "GREEN", label: "카테고리" },
  { id: "4", color: "PURPLE", label: "카테고리" },
  { id: "5", color: "PINK", label: "카테고리" },
];

// 일정 등록/수정에 필요한 상태, 핸들러 등을 관리하는 hook
export function useScheduleForm() {
  const router = useRouter();
  const {
    date: initialDate,
    scheduleId,
    title: initialTitle,
    categoryColor: initialCategoryColor,
    memo: initialMemo,
    groupId,
    repeatType: initialRepeatType,
    repeatStartDate: initialRepeatStartDate,
    repeatEndDate: initialRepeatEndDate,
    repeatDays: initialRepeatDays,
    isLastDayOfMonth: initialIsLastDayOfMonth,
  } = useLocalSearchParams<{
    date?: string;
    scheduleId?: string;
    title?: string;
    categoryColor?: CategoryColor;
    memo?: string;
    groupId?: string;
    repeatType?: ScheduleRepeatType;
    repeatStartDate?: string;
    repeatEndDate?: string;
    repeatDays?: string;
    isLastDayOfMonth?: string;
  }>();

  const isEdit = !!scheduleId;
  const isRepeatingSchedule = !!groupId;

  const [title, setTitle] = useState(initialTitle ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(
    () =>
      CATEGORY_OPTIONS.find((option) => option.color === initialCategoryColor)
        ?.id ?? null
  );
  const [memo, setMemo] = useState(initialMemo ?? "");
  const [date, setDate] = useState(() =>
    initialDate ? initialDate : dayjs().format("YYYY-MM-DD")
  );
  const [repeat, setRepeat] = useState<ScheduleRepeatValue>(() =>
    formatScheduleRepeatValue({
      repeatType: initialRepeatType,
      repeatStartDate: initialRepeatStartDate,
      repeatEndDate: initialRepeatEndDate,
      repeatDays: initialRepeatDays,
      isLastDayOfMonth: initialIsLastDayOfMonth === "true",
      date,
    })
  );

  const [isRepeatDirty, setIsRepeatDirty] = useState(false);
  const [isMemoFocused, setIsMemoFocused] = useState(false);

  const openModal = useBaseModal((state) => state.openModal);
  const createScheduleMutation = useCreateSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();

  const scrollViewRef = useRef<ScrollView>(null);
  const memoOffsetYRef = useRef(0);

  const dateLabel = useMemo(() => formatScheduleDate(date), [date]);
  const canSave =
    title.trim().length > 0 &&
    categoryId !== null &&
    (repeat.mode !== "multi" ||
      (isEdit && !isRepeatDirty) ||
      repeat.dates.length >= 2);
  const isSaving =
    createScheduleMutation.isPending || updateScheduleMutation.isPending;
  const isDeleting = deleteScheduleMutation.isPending;

  const toggleCategory = (id: string) => {
    setCategoryId((prev) => (prev === id ? null : id));
  };

  // 메모 영역의 스크롤 위치(부모 컨텐츠 기준 y)를 기억해뒀다가 포커스 시 그 위치까지만 스크롤
  const handleMemoLayout = (event: LayoutChangeEvent) => {
    memoOffsetYRef.current = event.nativeEvent.layout.y;
  };

  const handleMemoFocus = () => {
    setIsMemoFocused(true);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: memoOffsetYRef.current,
        animated: true,
      });
    }, 100);
  };

  const handleMemoBlur = () => {
    setIsMemoFocused(false);
  };

  const openDatePicker = () => {
    openModal("datePickerModal", {
      props: {
        initialDate: date,
        initialRepeat: repeat,
        onApply: ({
          date: nextDate,
          repeat: nextRepeat,
        }: DatePickerModalResult) => {
          setDate(nextDate);
          setRepeat(nextRepeat);
          setIsRepeatDirty(true);
        },
      },
    });
  };

  // 저장 버튼 핸들러
  const handleSave = () => {
    if (!canSave || !categoryId) return;

    const params = formatCreateScheduleParams({
      categoryId: Number(categoryId),
      title,
      content: memo,
      date,
      repeat,
    });

    if (isEdit) {
      const scope: ScheduleScope =
        !isRepeatingSchedule && repeat.mode === "none" ? "SINGLE" : "ALL";

      const editParams = formatUpdateScheduleParams({
        params,
        date,
        scope,
        isRepeatDirty,
      });

      updateScheduleMutation.mutate(
        { scheduleId: Number(scheduleId), scope, params: editParams },
        { onSuccess: () => router.push("/(tabs)/calendar") }
      );
      return;
    }

    createScheduleMutation.mutate(params, {
      onSuccess: () => router.push("/(tabs)/calendar"),
    });
  };

  // 삭제 버튼 핸들러
  const handleDelete = () => {
    if (!scheduleId) return;

    openModal("deleteScheduleModal", {
      props: {
        date,
        description: title,
        isRepeating: isRepeatingSchedule,
        onConfirm: (scope: ScheduleScope) => {
          deleteScheduleMutation.mutate(
            { scheduleId: Number(scheduleId), scope },
            { onSuccess: () => router.push("/(tabs)/calendar") }
          );
        },
      },
    });
  };

  return {
    isEdit,
    title,
    setTitle,
    categoryId,
    toggleCategory,
    memo,
    setMemo,
    dateLabel,
    repeat,
    canSave,
    isSaving,
    isDeleting,
    isMemoFocused,
    scrollViewRef,
    handleMemoLayout,
    handleMemoFocus,
    handleMemoBlur,
    openDatePicker,
    handleSave,
    handleDelete,
  };
}
