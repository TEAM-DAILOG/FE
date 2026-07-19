import dayjs from "dayjs";
import { Pressable, Text } from "react-native";

import DownIcon from "@/assets/icons/downIcon.svg";
import { AnchoredDropdown, MonthPickerBox } from "@/src/components/common";
import { useAnchoredTrigger } from "@/src/hooks/useAnchoredTrigger";
import { cn } from "@/src/lib/cn";
import { formatYearMonth } from "@/src/utils/formatDate";

export type MonthSelectorProps = {
  date: Date;
  onSelectDate?: (date: Date) => void;
  className?: string;
};

export function MonthSelector({
  date,
  onSelectDate,
  className,
}: MonthSelectorProps) {
  const { year, month } = formatYearMonth(date);
  const picker = useAnchoredTrigger();

  const handleSelect = (nextDate: string) => {
    onSelectDate?.(dayjs(nextDate).toDate());
    picker.close();
  };

  return (
    <>
      <Pressable
        ref={picker.triggerRef}
        className={cn("flex-row items-center gap-1", className)}
        onPress={picker.open}
      >
        <Text className="text-gray-900 text-h-01">
          {year}년 {month}월
        </Text>
        <DownIcon width={24} height={24} color="#020303" />
      </Pressable>

      <AnchoredDropdown
        visible={picker.visible}
        anchor={picker.anchor}
        align="left"
        onRequestClose={picker.close}
      >
        <MonthPickerBox
          initialDate={dayjs(date).format("YYYY-MM-DD")}
          onSelect={handleSelect}
        />
      </AnchoredDropdown>
    </>
  );
}
