import dayjs from "dayjs";
import { useState } from "react";
import { View } from "react-native";

import { ModalActionButtons } from "@/src/components/modals/ModalActionButtons";
import { DatePickerGrid } from "@/src/components/modals/schedule/DatePickerGrid";
import { DatePickerHeader } from "@/src/components/modals/schedule/DatePickerHeader";
import { DatePickerRecurringPanel } from "@/src/components/modals/schedule/DatePickerRecurringPanel";
import { DatePickerTabs } from "@/src/components/modals/schedule/DatePickerTabs";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type {
  DatePickerModalProps,
  DatePickerModalResult,
  DatePickerTabKey,
  ScheduleRepeatValue,
} from "@/src/types/modals/datepickerModal.types";
import { getMinRecurEndDate } from "@/src/utils";

// 반복 모드 값을 기준으로 초기 활성 탭 결정
function tabFromRepeatMode(
  mode: ScheduleRepeatValue["mode"]
): DatePickerTabKey {
  switch (mode) {
    case "multi":
      return "multi";
    case "range":
      return "range";
    case "weekly":
    case "monthly":
    case "yearly":
      return "recurring";
    default:
      return "basic";
  }
}

export function DatePickerModal({
  initialDate,
  initialRepeat,
  onApply,
}: DatePickerModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const [activeTab, setActiveTab] = useState<DatePickerTabKey>(
    tabFromRepeatMode(initialRepeat.mode)
  );

  const [viewMonth, setViewMonth] = useState(initialDate);
  // 캘린더에 표시되는 달을 한 달 전으로 이동
  const goPrevMonth = () =>
    setViewMonth((prev) =>
      dayjs(prev).subtract(1, "month").format("YYYY-MM-DD")
    );
  // 캘린더에 표시되는 달을 한 달 후로 이동
  const goNextMonth = () =>
    setViewMonth((prev) => dayjs(prev).add(1, "month").format("YYYY-MM-DD"));

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [multiDates, setMultiDates] = useState<string[]>(
    initialRepeat.mode === "multi" ? initialRepeat.dates : [initialDate]
  );
  const [rangeStart, setRangeStart] = useState<string | null>(
    initialRepeat.mode === "range" ? initialRepeat.startDate : initialDate
  );
  const [rangeEnd, setRangeEnd] = useState<string | null>(
    initialRepeat.mode === "range" ? initialRepeat.endDate : null
  );

  const [repeatType, setRepeatType] = useState<"weekly" | "monthly" | "yearly">(
    initialRepeat.mode === "weekly" ||
      initialRepeat.mode === "monthly" ||
      initialRepeat.mode === "yearly"
      ? initialRepeat.mode
      : "weekly"
  );
  const [weekdays, setWeekdays] = useState<number[]>(
    initialRepeat.mode === "weekly" ? initialRepeat.weekdays : []
  );
  const [recurStart, setRecurStart] = useState(
    initialRepeat.mode === "weekly" ||
      initialRepeat.mode === "monthly" ||
      initialRepeat.mode === "yearly"
      ? initialRepeat.startDate
      : initialDate
  );
  const [recurEnd, setRecurEnd] = useState(
    initialRepeat.mode === "weekly" ||
      initialRepeat.mode === "monthly" ||
      initialRepeat.mode === "yearly"
      ? initialRepeat.endDate
      : initialDate
  );
  const [editingField, setEditingField] = useState<"start" | "end" | null>(
    null
  );
  const [isRepeatTypeMenuOpen, setIsRepeatTypeMenuOpen] = useState(false);
  const [isLastDayOfMonth, setIsLastDayOfMonth] = useState(
    initialRepeat.mode === "monthly" ? initialRepeat.isLastDayOfMonth : false
  );

  // 탭 전환 시 모든 선택 상태를 초기값으로 리셋
  const handleTabChange = (tab: DatePickerTabKey) => {
    setActiveTab(tab);
    setSelectedDate(initialDate);
    setMultiDates([initialDate]);
    setRangeStart(initialDate);
    setRangeEnd(null);
    setRepeatType("weekly");
    setWeekdays([]);
    setRecurStart(initialDate);
    setRecurEnd(initialDate);
    setEditingField(null);
    setIsRepeatTypeMenuOpen(false);
    setIsLastDayOfMonth(false);
  };

  // 반복 요일 선택/해제를 토글하고 정렬된 상태로 유지
  const toggleWeekday = (day: number) => {
    setWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  // 다른 달의 날짜를 눌렀을 때 캘린더 뷰를 해당 달로 이동
  const jumpToMonthIfNeeded = (date: string, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) setViewMonth(date);
  };

  // 단일 날짜 탭에서 날짜 선택
  const handleBasicDayPress = (date: string, isCurrentMonth: boolean) => {
    jumpToMonthIfNeeded(date, isCurrentMonth);
    setSelectedDate(date);
  };

  // 다중 선택 탭에서 날짜 추가/제거
  const handleMultiDayPress = (date: string, isCurrentMonth: boolean) => {
    jumpToMonthIfNeeded(date, isCurrentMonth);
    setMultiDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  // 기간 선택 탭에서 시작일/종료일을 순서대로 지정
  const handleRangeDayPress = (date: string, isCurrentMonth: boolean) => {
    jumpToMonthIfNeeded(date, isCurrentMonth);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else if (date < rangeStart) {
      setRangeStart(date);
    } else {
      setRangeEnd(date);
    }
  };

  // 반복 일정 탭에서 편집 중인 필드(시작일/종료일)에 날짜 반영
  const handleRecurDayPress = (date: string, isCurrentMonth: boolean) => {
    if (
      editingField === "end" &&
      date < getMinRecurEndDate(repeatType, recurStart)
    ) {
      return;
    }

    jumpToMonthIfNeeded(date, isCurrentMonth);
    if (editingField === "start") {
      setRecurStart(date);
      const minEnd = getMinRecurEndDate(repeatType, date);
      if (recurEnd < minEnd) setRecurEnd(minEnd);
    } else {
      setRecurEnd(date);
    }
    setEditingField(null);
  };

  // 시작일/종료일 편집 필드를 열고 캘린더를 해당 날짜로 이동
  const openEditingField = (field: "start" | "end") => {
    setEditingField((prev) => {
      const next = prev === field ? null : field;
      if (next) setViewMonth(field === "start" ? recurStart : recurEnd);
      return next;
    });
  };

  // 현재 탭과 선택 상태를 바탕으로 최종 적용 결과를 계산 (유효하지 않으면 null)
  const computeResult = (): DatePickerModalResult | null => {
    if (activeTab === "basic") {
      return { date: selectedDate, repeat: { mode: "none" } };
    }

    if (activeTab === "multi") {
      if (multiDates.length === 0) return null;
      const sorted = [...multiDates].sort();
      return { date: sorted[0], repeat: { mode: "multi", dates: sorted } };
    }

    if (activeTab === "range") {
      if (!rangeStart || !rangeEnd) return null;
      return {
        date: rangeStart,
        repeat: { mode: "range", startDate: rangeStart, endDate: rangeEnd },
      };
    }

    if (repeatType === "weekly" && weekdays.length === 0) return null;

    const repeatValue: ScheduleRepeatValue =
      repeatType === "weekly"
        ? {
            mode: "weekly",
            weekdays,
            startDate: recurStart,
            endDate: recurEnd,
          }
        : repeatType === "monthly"
          ? {
              mode: "monthly",
              startDate: recurStart,
              endDate: recurEnd,
              isLastDayOfMonth,
            }
          : { mode: "yearly", startDate: recurStart, endDate: recurEnd };

    return { date: recurStart, repeat: repeatValue };
  };

  const result = computeResult();

  // 계산된 결과를 상위로 전달
  const handleApply = () => {
    if (!result) return;
    onApply(result);
    closeModal();
  };

  return (
    <View className="h-fit w-full rounded-xl bg-gray-0">
      <View className="gap-3 px-4 pb-6 pt-5">
        <DatePickerHeader
          month={viewMonth}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
        />

        <View className="gap-4">
          <DatePickerTabs activeTab={activeTab} onChangeTab={handleTabChange} />

          {activeTab === "basic" ? (
            <DatePickerGrid
              month={viewMonth}
              onDayPress={handleBasicDayPress}
              getDayState={(date) => ({ isSelected: date === selectedDate })}
            />
          ) : null}

          {activeTab === "multi" ? (
            <DatePickerGrid
              month={viewMonth}
              onDayPress={handleMultiDayPress}
              getDayState={(date) => ({
                isSelected: multiDates.includes(date),
              })}
            />
          ) : null}

          {activeTab === "range" ? (
            <DatePickerGrid
              month={viewMonth}
              onDayPress={handleRangeDayPress}
              getDayState={(date) => ({
                isRangeStart: date === rangeStart,
                isRangeEnd: date === rangeEnd,
                isInRange: !!(
                  rangeStart &&
                  rangeEnd &&
                  date > rangeStart &&
                  date < rangeEnd
                ),
              })}
            />
          ) : null}

          {activeTab === "recurring" ? (
            <DatePickerRecurringPanel
              viewMonth={viewMonth}
              repeatType={repeatType}
              onChangeRepeatType={(type) => {
                setRepeatType(type);
                setRecurEnd(getMinRecurEndDate(type, recurStart));
                setIsRepeatTypeMenuOpen(false);
              }}
              isRepeatTypeMenuOpen={isRepeatTypeMenuOpen}
              onToggleRepeatTypeMenu={() =>
                setIsRepeatTypeMenuOpen((prev) => !prev)
              }
              weekdays={weekdays}
              onToggleWeekday={toggleWeekday}
              isLastDayOfMonth={isLastDayOfMonth}
              onToggleLastDayOfMonth={() =>
                setIsLastDayOfMonth((prev) => !prev)
              }
              recurStart={recurStart}
              recurEnd={recurEnd}
              editingField={editingField}
              onOpenEditingField={openEditingField}
              onRecurDayPress={handleRecurDayPress}
            />
          ) : null}
        </View>
      </View>
      <ModalActionButtons
        confirmLabel="저장"
        disabled={!result}
        onCancel={closeModal}
        onConfirm={handleApply}
      />
    </View>
  );
}
