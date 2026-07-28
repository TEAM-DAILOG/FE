import { Pressable, type PressableProps } from "react-native";

import BoxIcon from "@/assets/icons/boxIcon.svg";
import CheckboxIcon from "@/assets/icons/checkboxIcon.svg";
import { cn } from "@/src/lib/cn";

export type CheckboxProps = Omit<PressableProps, "children" | "onPress"> & {
  checked: boolean;
  onToggle: () => void;
  color?: string;
  size?: number;
  className?: string;
};

export function Checkbox({
  checked,
  onToggle,
  color = "#020303",
  size = 24,
  className,
  ...rest
}: CheckboxProps) {
  const Icon = checked ? CheckboxIcon : BoxIcon;

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      className={cn("items-center justify-center", className)}
      style={{ outlineStyle: "none", width: size, height: size } as any}
      {...rest}
    >
      <Icon width={size} height={size} color={color} />
    </Pressable>
  );
}
