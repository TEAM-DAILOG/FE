import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import { Toggle } from "@/src/components/common/Toggle";
import { DatePickerGrid } from "@/src/components/modals/schedule/DatePickerGrid";
import { RepeatTypeBox } from "@/src/components/schedule/RepeatTypeBox";
import { WEEKDAYS } from "@/src/constants";
import { cn } from "@/src/lib/cn";
import { getMinRecurEndDate } from "@/src/utils";

type RepeatType = "weekly" | "monthly" | "yearly";

type DatePickerRecurringPanelProps = {
  viewMonth: string;
  repeatType: RepeatType;
  onChangeRepeatType: (type: RepeatType) => void;
  isRepeatTypeMenuOpen: boolean;
  onToggleRepeatTypeMenu: () => void;
  weekdays: number[];
  onToggleWeekday: (day: number) => void;
  isLastDayOfMonth: boolean;
  onToggleLastDayOfMonth: () => void;
  recurStart: string;
  recurEnd: string;
  editingField: "start" | "end" | null;
  onOpenEditingField: (field: "start" | "end") => void;
  onRecurDayPress: (date: string, isCurrentMonth: boolean) => void;
};

export function DatePickerRecurringPanel({
  viewMonth,
  repeatType,
  onChangeRepeatType,
  isRepeatTypeMenuOpen,
  onToggleRepeatTypeMenu,
  weekdays,
  onToggleWeekday,
  isLastDayOfMonth,
  onToggleLastDayOfMonth,
  recurStart,
  recurEnd,
  editingField,
  onOpenEditingField,
  onRecurDayPress,
}: DatePickerRecurringPanelProps) {
  return (
    <View className="flex-col gap-4">
      <View className="gap-3 rounded-xl border border-gray-100 bg-white p-3">
        <View className="gap-1">
          <RepeatTypeBox
            repeatType={repeatType}
            onChangeRepeatType={onChangeRepeatType}
            isRepeatTypeMenuOpen={isRepeatTypeMenuOpen}
            onToggleRepeatTypeMenu={onToggleRepeatTypeMenu}
          />

          {repeatType === "weekly" ? (
            <View className="flex-row justify-between px-2">
              {WEEKDAYS.map(({ code, label }, index) => {
                const isSelected = weekdays.includes(index);
                return (
                  <Pressable
                    key={code}
                    onPress={() => onToggleWeekday(index)}
                    className={cn(
                      "size-8 items-center justify-center rounded-full",
                      isSelected && "bg-green-600"
                    )}
                  >
                    <Text
                      className={cn(
                        isSelected
                          ? "text-gray-0 text-cap-sb"
                          : "text-gray-900 text-cap-r"
                      )}
                    >
                      {label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </View>

        {repeatType === "monthly" ? (
          <View className="flex-row items-center justify-end gap-3">
            <Text className="text-gray-800 text-b-04-r">매월 말일 반복</Text>
            <Toggle
              size="md"
              value={isLastDayOfMonth}
              onValueChange={onToggleLastDayOfMonth}
            />
          </View>
        ) : null}

        <Pressable
          onPress={() => onOpenEditingField("start")}
          className="flex-row items-center justify-between"
        >
          <Text className="text-gray-800 text-b-04-r">시작날짜</Text>
          <View className="flex-row items-center gap-1">
            <CalendarIcon width={16} height={16} color="#020303" />
            <Text className="text-gray-800 text-b-04-r">
              {dayjs(recurStart).format("YYYY.MM.DD")}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => onOpenEditingField("end")}
          className="flex-row items-center justify-between"
        >
          <Text className="text-gray-800 text-b-04-r">종료날짜</Text>
          <View className="flex-row items-center gap-1">
            <CalendarIcon width={16} height={16} color="#020303" />
            <Text className="text-gray-800 text-b-04-r">
              {dayjs(recurEnd).format("YYYY.MM.DD")}
            </Text>
          </View>
        </Pressable>
      </View>

      {editingField ? (
        <DatePickerGrid
          month={viewMonth}
          onDayPress={onRecurDayPress}
          getDayState={(date) => ({
            isSelected:
              date === (editingField === "start" ? recurStart : recurEnd),
            isDisabled:
              editingField === "end" &&
              date < getMinRecurEndDate(repeatType, recurStart),
          })}
        />
      ) : null}
    </View>
  );
}
