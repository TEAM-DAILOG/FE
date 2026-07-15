import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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
      {WEEKDAYS.map(({ key, label }) => (
        <WeekdayToggle
          key={key}
          label={label}
          isSelected={selectedDays.includes(key)}
          onPress={() => onToggleDay(key)}
        />
      ))}
    </View>
  );
}

function WeekdayToggle({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(isSelected ? "#4D826CFF" : "#4D826C00", {
      duration: 300,
    }),
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isSelected ? "#FCFDFD" : "#2F3131", { duration: 300 }),
  }));

  return (
    <Pressable
      onPress={onPress}
      className="size-10 items-center justify-center rounded-[100px]"
    >
      <Animated.View
        pointerEvents="none"
        collapsable={false}
        className="absolute inset-0 rounded-[100px]"
        style={backgroundStyle}
      />

      <Animated.Text
        className={isSelected ? "text-b-02-m" : "text-b-02-r"}
        style={textStyle}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}
