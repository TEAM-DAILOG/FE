import { Pressable, type PressableProps } from "react-native";

import BoxIcon from "@/assets/icons/box.svg";
import CheckboxIcon from "@/assets/icons/checkbox.svg";
import { cn } from "@/src/lib/cn";

export type CheckboxProps = Omit<PressableProps, "children" | "onPress"> & {
  checked: boolean;
  onToggle: () => void;
  className?: string;
};

export function Checkbox({
  checked,
  onToggle,
  className,
  ...rest
}: CheckboxProps) {
  const Icon = checked ? CheckboxIcon : BoxIcon;

  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      className={cn("h-6 w-6 items-center justify-center", className)}
      style={{ outlineStyle: "none" } as any}
      {...rest}
    >
      <Icon width={24} height={24} color="#020303" />
    </Pressable>
  );
}