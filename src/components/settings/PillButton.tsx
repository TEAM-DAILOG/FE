import { Pressable, Text, type PressableProps } from "react-native";

import { cn } from "@/src/lib/cn";

export type PillButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  className?: string;
};

export function PillButton({ label, className, ...rest }: PillButtonProps) {
  return (
    <Pressable
      className={cn(
        "items-center justify-center rounded-[100px] border border-green-600 bg-white px-2 py-1",
        className
      )}
      {...rest}
    >
      <Text className="text-green-600 text-b-04-m">{label}</Text>
    </Pressable>
  );
}
