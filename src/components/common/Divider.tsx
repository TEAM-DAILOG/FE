import { View, type ViewProps } from "react-native";

import { cn } from "@/src/lib/cn";

export type DividerThickness = 1 | 2;

export type DividerProps = Omit<ViewProps, "children"> & {
  thickness?: DividerThickness;
  className?: string;
};

const THICKNESS_CLASSES: Record<DividerThickness, string> = {
  1: "border-t",
  2: "border-t-2",
};

export function Divider({ thickness = 1, className, ...rest }: DividerProps) {
  return (
    <View className={cn(THICKNESS_CLASSES[thickness], className)} {...rest} />
  );
}
