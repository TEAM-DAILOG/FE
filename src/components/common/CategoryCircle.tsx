import { Pressable } from "react-native";

import CheckIcon from "@/assets/icons/checkIcon.svg";
import { CATEGORY_COLOR_CLASS_NAMES } from "@/src/constants/categoryColors";
import { cn } from "@/src/lib/cn";
import type { CategoryColor } from "@/src/types/categories/category.types";

export type CategoryCircleState = "default" | "selected" | "disabled";

export type CategoryCircleProps = {
  color?: CategoryColor;
  state?: CategoryCircleState;
  onPress?: () => void;
};

export function CategoryCircle({
  color = "BLUE",
  state = "default",
  onPress,
}: CategoryCircleProps) {
  const isDisabled = state === "disabled";
  const isSelected = state === "selected";

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      className={cn(
        "h-9 w-9 items-center justify-center rounded-full",
        isDisabled
          ? CATEGORY_COLOR_CLASS_NAMES[color].soft
          : CATEGORY_COLOR_CLASS_NAMES[color].solid
      )}
    >
      {isSelected || isDisabled ? (
        <CheckIcon
          width={24}
          height={24}
          color={isDisabled ? "#AEB2B0" : "#FCFDFD"}
        />
      ) : null}
    </Pressable>
  );
}
