import { useEffect } from "react";
import { Pressable, type PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { cn } from "@/src/lib/cn";

export type ToggleProps = Omit<PressableProps, "children"> & {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  className?: string;
};

const KNOB_TRANSLATE_X = 20;

export function Toggle({
  value,
  onValueChange,
  className,
  ...rest
}: ToggleProps) {
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: 150 });
  }, [progress, value]);

  const knobTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * KNOB_TRANSLATE_X }],
  }));

  return (
    <Pressable
      className={cn(
        "w-12 flex-row items-center justify-start rounded-[100px] p-1",
        value ? "bg-green-100" : "bg-gray-200",
        className
      )}
      onPress={() => onValueChange?.(!value)}
      {...rest}
    >
      <Animated.View
        className={cn(
          "size-4 rounded-full",
          value ? "bg-green-600" : "bg-gray-400"
        )}
        style={knobTranslateStyle}
      />
    </Pressable>
  );
}
