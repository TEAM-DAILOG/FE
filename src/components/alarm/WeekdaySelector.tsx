import { Pressable, Text, View } from "react-native";

import { cn } from "@/src/lib/cn";

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const WEEKDAYS: { key: Weekday; label: string }[] = [
  { key: "mon", label: "월" },
  { key: "tue", label: "화" },
  { key: "wed", label: "수" },
  { key: "thu", label: "목" },
  { key: "fri", label: "금" },
  { key: "sat", label: "토" },
  { key: "sun", label: "일" },
];

export type WeekdaySelectorProps = {
  selectedDays: Weekday[];
  onToggleDay: (day: Weekday) => void;
  className?: string;
};

export function WeekdaySelector({
  selectedDays,
  onToggleDay,
  className,
}: WeekdaySelectorProps) {
  return (
    <View
      className={cn("w-full flex-row items-center justify-between", className)}
    >
      {WEEKDAYS.map(({ key, label }) => {
        const isSelected = selectedDays.includes(key);

        return (
          <Pressable
            key={key}
            onPress={() => onToggleDay(key)}
            className={cn(
              "size-10 items-center justify-center rounded-[100px]",
              isSelected && "bg-green-600"
            )}
          >
            <Text
              className={
                isSelected
                  ? "text-gray-0 text-b-02-m"
                  : "text-gray-800 text-b-02-r"
              }
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
