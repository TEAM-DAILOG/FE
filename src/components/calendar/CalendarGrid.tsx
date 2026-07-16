import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";

import BambooIcon from "@/assets/images/bambooLogo.svg";
import { WEEKDAY_LABELS } from "@/src/constants";
import { CATEGORY_DOT_CLASS_NAMES } from "@/src/constants/categoryColors";
import { cn } from "@/src/lib/cn";
import type {
  CalendarDayInfo,
  CalendarMode,
} from "@/src/types/calendar/calendarGrid.types";
import { buildCalendarGrid, chunkIntoWeeks } from "@/src/utils";

type CalendarGridProps = {
  month: string;
  mode: CalendarMode;
  onDayPress?: (date: string, isCurrentMonth: boolean) => void;
  getDayInfo?: (date: string, isCurrentMonth: boolean) => CalendarDayInfo;
};

const CELL_PADDING_CLASS_NAMES: Record<CalendarMode, string> = {
  schedule: "min-h-[54px] gap-2 px-1 py-2",
  diary: "h-fit gap-2 px-2.5 pt-3 pb-2",
};

export function CalendarGrid({
  month,
  mode,
  onDayPress,
  getDayInfo,
}: CalendarGridProps) {
  const weeks = chunkIntoWeeks(buildCalendarGrid(month));
  const today = dayjs().format("YYYY-MM-DD");

  return (
    <View className="gap-2 overflow-hidden rounded-xl bg-white px-3 pb-2 pt-1 shadow-card-1">
      {/* 요일 */}
      <View className="flex-row border-b border-green-100">
        {WEEKDAY_LABELS.map((label) => (
          <View
            key={label}
            className="size-12 flex-1 items-center justify-center p-2.5"
          >
            <Text className="text-center text-gray-900 text-b-04-r">
              {label}
            </Text>
          </View>
        ))}
      </View>

      {/* 날짜 */}
      <View className={cn(mode === "schedule" && "gap-2")}>
        {weeks.map((week) => (
          <View key={week[0].date} className="flex-row">
            {week.map((cell) => {
              const { categoryColors = [], hasDiary = false } =
                getDayInfo?.(cell.date, cell.isCurrentMonth) ?? {};
              const isToday = cell.date === today;
              const showsDiaryIcon = cell.isCurrentMonth && hasDiary;

              return (
                <Pressable
                  key={cell.date}
                  onPress={() => onDayPress?.(cell.date, cell.isCurrentMonth)}
                  className={cn(
                    "flex-1 items-center",
                    CELL_PADDING_CLASS_NAMES[mode]
                  )}
                >
                  <Text
                    className={cn(
                      !cell.isCurrentMonth
                        ? "text-gray-600 text-b-04-r"
                        : isToday
                          ? "text-green-600 text-b-04-sb"
                          : "text-gray-900 text-b-04-r"
                    )}
                  >
                    {cell.day}
                  </Text>

                  {mode === "schedule" ? (
                    <View className="w-full flex-row flex-wrap items-center justify-start gap-0.5">
                      {categoryColors.map((color, index) => (
                        <View
                          key={`${cell.date}-${index}`}
                          className={cn(
                            "size-3 rounded-sm",
                            CATEGORY_DOT_CLASS_NAMES[color]
                          )}
                        />
                      ))}
                    </View>
                  ) : (
                    <BambooIcon
                      width={28}
                      height={28}
                      color={showsDiaryIcon ? "#4D826C" : "#E2E4E3"}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
