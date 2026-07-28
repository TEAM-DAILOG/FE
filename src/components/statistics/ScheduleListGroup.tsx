import type { ReactNode } from "react";
import { View } from "react-native";

import {
  ScheduleItem,
  type ScheduleItemAction,
  type ScheduleItemProps,
} from "@/src/components/common";
import { cn } from "@/src/lib/cn";

export type ScheduleListGroupEntry = Pick<
  ScheduleItemProps,
  "date" | "categoryLabel" | "categoryColor" | "description"
> & { id: string };

export type ScheduleListGroupProps = {
  title: ReactNode;
  schedules: ScheduleListGroupEntry[];
  action: ScheduleItemAction;
  className?: string;
};

export function ScheduleListGroup({
  title,
  schedules,
  action,
  className,
}: ScheduleListGroupProps) {
  return (
    <View className={cn("w-full gap-3", className)}>
      {title}

      <View className="w-full gap-2">
        {schedules.map(({ id, ...schedule }) => (
          <ScheduleItem key={id} {...schedule} action={action} />
        ))}
      </View>
    </View>
  );
}
