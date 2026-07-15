import { Pressable, Text, type PressableProps } from "react-native";

import PlusIcon from "@/assets/icons/plus.svg";
import { cn } from "@/src/lib/cn";

export type AddButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  className?: string;
};

export function AddButton({ label, className, ...rest }: AddButtonProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-center gap-1 self-start rounded-[100px] border border-green-400 bg-white px-2 py-1.5",
        className
      )}
      {...rest}
    >
      <PlusIcon width={16} height={16} color="#82B5A0" />
      <Text className="text-green-400 text-b-04-m">{label}</Text>
    </Pressable>
  );
}
