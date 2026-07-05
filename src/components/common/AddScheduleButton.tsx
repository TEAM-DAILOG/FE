import { Pressable, Text, type PressableProps } from "react-native";

import PlusIcon from "@/assets/icons/plus.svg";
import { cn } from "@/src/lib/cn";

export type AddScheduleButtonProps = Omit<PressableProps, "children"> & {
  label?: string;
  className?: string;
};

export function AddScheduleButton({
  label = "일정 등록하기",
  className,
  ...rest
}: AddScheduleButtonProps) {
  return (
    <Pressable
      className={cn(
        "h-[45px] w-full flex-row items-center justify-between rounded-lg bg-gray-100 px-3 py-2",
        className
      )}
      {...rest}
    >
      <Text className="text-b-03-m text-gray-800">{label}</Text>
      <PlusIcon width={24} height={24} color="#2F3131" />
    </Pressable>
  );
}
