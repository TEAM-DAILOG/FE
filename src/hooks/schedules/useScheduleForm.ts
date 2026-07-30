import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";

import { useCreateSchedule } from "@/src/hooks/mutations/schedules/useCreateSchedule";
import { useDeleteSchedule } from "@/src/hooks/mutations/schedules/useDeleteSchedule";
import { useUpdateSchedule } from "@/src/hooks/mutations/schedules/useUpdateSchedule";
import { useGetCategories } from "@/src/hooks/queries/category/useGetCategories";
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
import { formatScheduleParams } from "@/src/utils/formatScheduleParams";
import { formatScheduleRepeatValue } from "@/src/utils/formatScheduleRepeatValue";
import { formatUpdateScheduleParams } from "@/src/utils/formatUpdateScheduleParams";

// 일정 등록/수정에 필요한 상태, 핸들러 등을 관리하는 hook
export function useScheduleForm() {
  const router = useRouter();
  const {
    date: initialDate,
    scheduleId,
    title: initialTitle,
    categoryId: initialCategoryId,
    categoryColor: initialCategoryColor,
    memo: initialMemo,
    groupId,
    repeatType: initialRepeatType,
    repeatStartDate: initialRepeatStartDate,
    repeatEndDate: initialRepeatEndDate,
    repeatDays: initialRepeatDays,
    repeatDates: initialRepeatDatesRaw,
    isLastDayOfMonth: initialIsLastDayOfMonth,
  } = useLocalSearchParams<{
    date?: string;
    scheduleId?: string;
    title?: string;
    categoryId?: string;
    categoryColor?: CategoryColor;
    memo?: string;
    groupId?: string;
    repeatType?: ScheduleRepeatType;
    repeatStartDate?: string;
    repeatEndDate?: string;
    repeatDays?: string;
    repeatDates?: string;
    isLastDayOfMonth?: string;
  }>();

  const isEdit = !!scheduleId;
  const isRepeatingSchedule = !!groupId;

  const { data: categoriesData } = useGetCategories();
  const categories = useMemo(
    () => [...(categoriesData ?? [])].sort((a, b) => a.order - b.order),
    [categoriesData]
  );

  const [title, setTitle] = useState(initialTitle ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const hasAppliedInitialCategoryRef = useRef(false);

  // 수정 진입 시 전달받은 카테고리 색상으로 목록 로딩 후 최초 1회만 초기 선택값을 채움 + 카테고리 id가 전달되면 id 우선으로 선택
  useEffect(() => {
    if (hasAppliedInitialCategoryRef.current) return;
    if (
      (!initialCategoryId && !initialCategoryColor) ||
      categories.length === 0
    )
      return;

    const matched = initialCategoryId
      ? categories.find((category) => category.id === initialCategoryId)
      : categories.find((category) => category.color === initialCategoryColor);

    if (matched) {
      setCategoryId(matched.id);
      hasAppliedInitialCategoryRef.current = true;
    }
  }, [categories, initialCategoryId, initialCategoryColor]);

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
      repeatDates: initialRepeatDatesRaw
        ? initialRepeatDatesRaw.split(",")
        : undefined,
      isLastDayOfMonth: initialIsLastDayOfMonth === "true",
      date,
    })
  );

  const [isRepeatDirty, setIsRepeatDirty] = useState(false);

  const openModal = useBaseModal((state) => state.openModal);
  const createScheduleMutation = useCreateSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();

  const scrollViewRef = useRef<ScrollView>(null);

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

  // 키보드가 메모란을 가리지 않도록 포커스 시 맨 아래로 스크롤
  const handleMemoFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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

    const params = formatScheduleParams({
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
    categories,
    categoryId,
    toggleCategory,
    memo,
    setMemo,
    dateLabel,
    repeat,
    canSave,
    isSaving,
    isDeleting,
    scrollViewRef,
    handleMemoFocus,
    openDatePicker,
    handleSave,
    handleDelete,
  };
}
