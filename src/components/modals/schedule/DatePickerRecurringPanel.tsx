import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import DownIcon from "@/assets/icons/downIcon.svg";
import CheckIcon from "@/assets/icons/lightCheckIcon.svg";
import { DatePickerGrid } from "@/src/components/modals/schedule/DatePickerGrid";
import { REPEAT_TYPE_OPTIONS, WEEKDAY_LABELS } from "@/src/constants";
import { cn } from "@/src/lib/cn";

type RepeatType = "weekly" | "monthly" | "yearly";

type DatePickerRecurringPanelProps = {
  viewMonth: string;
  repeatType: RepeatType;
  onChangeRepeatType: (type: RepeatType) => void;
  isRepeatTypeMenuOpen: boolean;
  onToggleRepeatTypeMenu: () => void;
  weekdays: number[];
  onToggleWeekday: (day: number) => void;
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
          <View className="z-10">
            <Pressable
              onPress={onToggleRepeatTypeMenu}
              className="flex-row items-center justify-between"
            >
              <Text className="text-gray-800 text-b-04-r">반복유형</Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-gray-800 text-b-04-r">
                  {
                    REPEAT_TYPE_OPTIONS.find(
                      (option) => option.key === repeatType
                    )?.label
                  }
                </Text>
                <DownIcon width={20} height={20} color="#020303" />
              </View>
            </Pressable>

            {isRepeatTypeMenuOpen ? (
              <Animated.View
                entering={FadeIn.duration(300).easing(Easing.out(Easing.ease))}
                exiting={FadeOut.duration(300).easing(Easing.out(Easing.ease))}
                className="absolute right-0 top-full z-50 mt-1 w-[120px] shadow-dropdown"
              >
                <View className="gap-1.5 overflow-hidden rounded-lg bg-white px-3 py-1.5">
                  {REPEAT_TYPE_OPTIONS.map((option) => (
                    <Pressable
                      key={option.key}
                      onPress={() => onChangeRepeatType(option.key)}
                      className="flex-row items-center justify-between"
                    >
                      <Text className="text-gray-800 text-b-04-r">
                        {option.label}
                      </Text>
                      {repeatType === option.key ? (
                        <CheckIcon width={20} height={20} color="#2F3131" />
                      ) : null}
                    </Pressable>
                  ))}
                </View>
              </Animated.View>
            ) : null}
          </View>

          {repeatType === "weekly" ? (
            <View className="flex-row justify-between px-2">
              {WEEKDAY_LABELS.map((label, index) => {
                const isSelected = weekdays.includes(index);
                return (
                  <Pressable
                    key={label}
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
            isDisabled: editingField === "end" && date < recurStart,
          })}
        />
      ) : null}
    </View>
  );
}
