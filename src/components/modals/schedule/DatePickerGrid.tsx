import { Pressable, Text, View } from "react-native";

import { cn } from "@/src/lib/cn";
import type { DatePickerDayState } from "@/src/types/modals/datepickerModal.types";
import { buildCalendarGrid, chunkIntoWeeks } from "@/src/utils";
import { WEEKDAY_LABELS } from "@/src/constants";

type DatePickerGridProps = {
  month: string;
  onDayPress: (date: string, isCurrentMonth: boolean) => void;
  getDayState?: (date: string, isCurrentMonth: boolean) => DatePickerDayState;
};

const COLUMN_COUNT = 7;

function getRowRangeFill(states: DatePickerDayState[]) {
  const filledIndexes = states
    .map((state, index) =>
      state.isInRange || state.isRangeStart || state.isRangeEnd ? index : -1
    )
    .filter((index) => index !== -1);

  if (filledIndexes.length === 0) return null;

  const start = filledIndexes[0];
  const end = filledIndexes[filledIndexes.length - 1];
  const hasStart = states.some((state) => state.isRangeStart);
  const hasEnd = states.some((state) => state.isRangeEnd);

  return {
    leftPercent: (start / COLUMN_COUNT) * 100,
    widthPercent: ((end - start + 1) / COLUMN_COUNT) * 100,
    roundLeft: hasStart,
    roundRight: hasEnd || end !== COLUMN_COUNT - 1,
  };
}

export function DatePickerGrid({
  month,
  onDayPress,
  getDayState,
}: DatePickerGridProps) {
  const weeks = chunkIntoWeeks(buildCalendarGrid(month));

  return (
    <View className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* 요일 */}
      <View className="flex-row border-b border-gray-100">
        {WEEKDAY_LABELS.map((label) => (
          <View
            key={label}
            className="size-12 flex-1 items-center justify-center py-1"
          >
            <Text className="text-center text-gray-900 text-b-03-r">
              {label}
            </Text>
          </View>
        ))}
      </View>

      {/* 날짜 */}
      <View className="gap-0.5 py-1">
        {weeks.map((week) => {
          const states = week.map(
            (cell) => getDayState?.(cell.date, cell.isCurrentMonth) ?? {}
          );
          const rowRangeFill = getRowRangeFill(states);

          return (
            <View key={week[0].date} className="flex-row">
              {rowRangeFill ? (
                <View
                  pointerEvents="none"
                  className={cn(
                    "absolute inset-y-0 bg-green-100",
                    rowRangeFill.roundLeft && "rounded-l-full",
                    rowRangeFill.roundRight && "rounded-r-full"
                  )}
                  style={{
                    left: `${rowRangeFill.leftPercent}%`,
                    width: `${rowRangeFill.widthPercent}%`,
                  }}
                />
              ) : null}

              {week.map((cell, index) => {
                const { isSelected, isRangeStart, isRangeEnd, isInRange } =
                  states[index];
                const isEndpoint = isSelected || isRangeStart || isRangeEnd;

                return (
                  <Pressable
                    key={cell.date}
                    onPress={() => onDayPress(cell.date, cell.isCurrentMonth)}
                    className="aspect-square flex-1 items-center justify-center"
                  >
                    <View
                      className={cn(
                        "aspect-square flex-1 items-center justify-center self-stretch rounded-full",
                        isEndpoint && "bg-green-600"
                      )}
                    >
                      <Text
                        className={cn(
                          isEndpoint
                            ? "text-green-100 text-b-03-sb"
                            : isInRange
                              ? "text-green-600 text-b-03-r"
                              : cell.isCurrentMonth
                                ? "text-gray-900 text-b-03-r"
                                : "text-gray-600 text-b-03-sb"
                        )}
                      >
                        {cell.day}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}
