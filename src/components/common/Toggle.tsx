import { useEffect } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/src/lib/cn";

export type ToggleSize = "md" | "sm";

export type ToggleProps = Omit<PressableProps, "children"> & {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  size?: ToggleSize;
  className?: string;
};

const SIZE_CONFIG: Record<
  ToggleSize,
  { track: string; knob: string; knobTranslateX: number }
> = {
  md: { track: "w-12 p-1", knob: "size-4", knobTranslateX: 20 },
  sm: { track: "w-8 p-[2.5px] h-4", knob: "size-2.5", knobTranslateX: 13.5 },
};

export function Toggle({
  value,
  onValueChange,
  size = "md",
  className,
  ...rest
}: ToggleProps) {
  const { track, knob, knobTranslateX } = SIZE_CONFIG[size];
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 150 });
  }, [progress, value]);

  const knobTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * knobTranslateX }],
  }));

  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-start rounded-[100px]",
        track,
        value ? "bg-green-100" : "bg-gray-200",
        className
      )}
      onPress={() => onValueChange?.(!value)}
      {...rest}
    >
      <Animated.View
        className={cn(
          knob,
          "rounded-full",
          value ? "bg-green-600" : "bg-gray-400"
        )}
        style={knobTranslateStyle}
      />
    </Pressable>
  );
}
