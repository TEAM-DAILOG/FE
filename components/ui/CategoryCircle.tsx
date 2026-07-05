import { Pressable, Text } from "react-native";

type CategoryColor = "blue" | "brown" | "green" | "purple" | "pink";
type CategoryCircleState = "default" | "selected" | "disabled";

type CategoryCircleProps = {
  color?: CategoryColor;
  state?: CategoryCircleState;
  onPress?: () => void;
};

const CATEGORY_COLOR_CLASS_NAMES: Record<
  CategoryColor,
  {
    solid: string;
    soft: string;
  }
> = {
  blue: {
    solid: "bg-category-01-1",
    soft: "bg-category-01-2",
  },
  brown: {
    solid: "bg-category-02-1",
    soft: "bg-category-02-2",
  },
  green: {
    solid: "bg-category-03-1",
    soft: "bg-category-03-2",
  },
  purple: {
    solid: "bg-category-04-1",
    soft: "bg-category-04-2",
  },
  pink: {
    solid: "bg-category-05-1",
    soft: "bg-category-05-2",
  },
};

export function CategoryCircle({
  color = "blue",
  state = "default",
  onPress,
}: CategoryCircleProps) {
  const isDisabled = state === "disabled";
  const isSelected = state === "selected";

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      className={`h-9 w-9 items-center justify-center rounded-full ${
        isDisabled
          ? CATEGORY_COLOR_CLASS_NAMES[color].soft
          : CATEGORY_COLOR_CLASS_NAMES[color].solid
      }`}
    >
      {isSelected || isDisabled ? (
        <Text
          className={`font-suit text-b-02-sb ${
            isDisabled ? "text-gray-400" : "text-white"
          }`}
        >
          ✓
        </Text>
      ) : null}
    </Pressable>
  );
}
