import { Pressable, Text, View } from "react-native";

import { cn } from "@/src/lib/cn";

import type { CategoryColor } from "./CategoryCircle";

export type CategoryChipProps = {
  color?: CategoryColor;
  label: string;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
};

const CATEGORY_CHIP_CLASS_NAMES: Record<
  CategoryColor,
  { border: string; text: string; bg: string }
> = {
  blue: {
    border: "border-category-01-1",
    text: "text-category-01-1",
    bg: "bg-category-01-1",
  },
  brown: {
    border: "border-category-02-1",
    text: "text-category-02-1",
    bg: "bg-category-02-1",
  },
  green: {
    border: "border-category-03-1",
    text: "text-category-03-1",
    bg: "bg-category-03-1",
  },
  purple: {
    border: "border-category-04-1",
    text: "text-category-04-1",
    bg: "bg-category-04-1",
  },
  pink: {
    border: "border-category-05-1",
    text: "text-category-05-1",
    bg: "bg-category-05-1",
  },
};

export function CategoryChip({
  color = "blue",
  label,
  selected = false,
  onPress,
  className,
}: CategoryChipProps) {
  const styles = CATEGORY_CHIP_CLASS_NAMES[color];

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center gap-1 rounded-[100px] border px-2 py-1",
        styles.border,
        selected ? styles.bg : "bg-white",
        className
      )}
    >
      <View
        className={cn(
          "size-3 rounded-full",
          selected ? "bg-gray-0" : styles.bg
        )}
      />
      <Text
        className={cn(
          "text-b-04-r",
          selected ? "text-gray-0 text-b-04-sb" : styles.text
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
