import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import { BackHeader, ScreenContainer } from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { CategoryChip } from "@/src/components/common/CategoryChip";
import { TextField } from "@/src/components/common/TextField";
import { ScheduleRepeatSummary } from "@/src/components/schedule/ScheduleRepeatSummary";
import { useCreateSchedule } from "@/src/hooks/mutations/schedules/useCreateSchedule";
import { useUpdateSchedule } from "@/src/hooks/mutations/schedules/useUpdateSchedule";
import { cn } from "@/src/lib/cn";
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

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
type CategoryOption = {
  id: string;
  color: CategoryColor;
  label: string;
};

// 카테고리 관리 화면과 데이터 연동 후 목록 API로 교체 예정
const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: "11", color: "BLUE", label: "카테고리" },
  { id: "16", color: "BROWN", label: "카테고리" },
  { id: "3", color: "GREEN", label: "카테고리" },
  { id: "4", color: "PURPLE", label: "카테고리" },
  { id: "5", color: "PINK", label: "카테고리" },
];

export default function ScheduleAddScreen() {
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

  const isBaseSchedule = !groupId;

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

  const openModal = useBaseModal((state) => state.openModal);
  const createScheduleMutation = useCreateSchedule();
  const updateScheduleMutation = useUpdateSchedule();

  const scrollViewRef = useRef<ScrollView>(null);

  const dateLabel = useMemo(() => formatScheduleDate(date), [date]);
  const isRepeatSubmitted = !isEdit || isRepeatDirty;
  const canSave =
    title.trim().length > 0 &&
    categoryId !== null &&
    (repeat.mode !== "multi" || !isRepeatSubmitted || repeat.dates.length >= 2);
  const isSaving =
    createScheduleMutation.isPending || updateScheduleMutation.isPending;

  const handleMemoFocus = () => {
    // 키보드가 메모란을 가리지 않도록 포커스 시 맨 아래로 스크롤
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

    const params = formatCreateScheduleParams({
      categoryId: Number(categoryId),
      title,
      content: memo,
      date,
      repeat,
    });

    if (isEdit) {
      const scope: ScheduleScope =
        isBaseSchedule && repeat.mode === "none" ? "SINGLE" : "ALL";

      const editParams =
        scope === "SINGLE"
          ? {
              categoryId: params.categoryId,
              title: params.title,
              content: params.content,
              date,
            }
          : isRepeatDirty
            ? params
            : {
                categoryId: params.categoryId,
                title: params.title,
                content: params.content,
              };

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

  return (
    <ScreenContainer variant="stack">
      <BackHeader label={isEdit ? "일정수정" : "일정등록"} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerClassName="gap-6 px-4 py-5"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-4">
            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">제목</Text>
              <TextField
                placeholder="제목을 입력하세요"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">카테고리</Text>
              <View className="flex-row flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => (
                  <CategoryChip
                    key={category.id}
                    color={category.color}
                    label={category.label}
                    selected={categoryId === category.id}
                    onPress={() =>
                      setCategoryId((prev) =>
                        prev === category.id ? null : category.id
                      )
                    }
                  />
                ))}
              </View>
            </View>
          </View>

          <View className="-mx-4 border-t-2 border-gray-100" />

          <View className="gap-4">
            <Pressable
              onPress={openDatePicker}
              className="flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-3"
            >
              <Text className="text-gray-900 text-b-02-m">날짜</Text>
              <View className="flex-row items-center gap-1">
                <CalendarIcon width={24} height={24} color="#020303" />
                <Text className="text-gray-800 text-b-03-r">{dateLabel}</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={openDatePicker}
              className="flex-row items-center justify-between rounded-xl border border-gray-100 bg-white p-3"
            >
              <Text className="text-gray-900 text-b-02-m">반복</Text>
              <ScheduleRepeatSummary
                value={repeat}
                textClassName={cn(
                  "text-b-03-m",
                  repeat.mode === "none" ? "text-gray-400" : "text-gray-800"
                )}
              />
            </Pressable>
          </View>

          <View className="-mx-4 border-t-2 border-gray-100" />

          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">메모</Text>
            <TextField
              type="textarea"
              placeholder="기억해야 할 정보를 메모하세요!"
              value={memo}
              onChangeText={setMemo}
              onFocus={handleMemoFocus}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="px-4 pb-12 pt-2">
        <Button
          label={isSaving ? "저장 중" : "저장"}
          disabled={!canSave || isSaving}
          onPress={handleSave}
        />
      </View>
    </ScreenContainer>
  );
}
