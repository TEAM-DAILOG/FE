import WheelPicker, {
  type PickerItem,
  type ValueChangedEvent,
} from "@quidone/react-native-wheel-picker";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import {
  DIGIT_WIDTH,
  HOUR_DATA,
  ITEM_HEIGHT,
  MINUTE_DATA,
  PERIOD_DATA,
  PERIOD_WIDTH,
  VISIBLE_ITEM_COUNT,
} from "@/src/constants/timeWheelPicker";
import { cn } from "@/src/lib/cn";

import {
  createWheelRowLabel,
  noOverlay,
  renderWheelRowFrame,
} from "./TimeWheelPickerRow";

export type Period = "am" | "pm";

export type TimeWheelValue = {
  period: Period;
  hour: number;
  minute: number;
};

export type TimeWheelPickerProps = {
  value: TimeWheelValue;
  onChange: (value: TimeWheelValue) => void;
  className?: string;
};

export function TimeWheelPicker({
  value,
  onChange,
  className,
}: TimeWheelPickerProps) {
  const [mountKey, setMountKey] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setMountKey((prev) => prev + 1), 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePeriodChanged = ({
    item,
  }: ValueChangedEvent<PickerItem<Period>>) => {
    onChange({ ...value, period: item.value });
  };

  const handleHourChanged = ({
    item,
  }: ValueChangedEvent<PickerItem<number>>) => {
    onChange({ ...value, hour: item.value });
  };

  const handleMinuteChanged = ({
    item,
  }: ValueChangedEvent<PickerItem<number>>) => {
    onChange({ ...value, minute: item.value });
  };

  return (
    <View
      className={cn(
        "w-full flex-row items-center justify-center gap-6 overflow-hidden",
        className
      )}
    >
      <View
        pointerEvents="none"
        className="absolute inset-0 items-center justify-center"
      >
        <View className="h-8 w-full rounded-lg bg-green-100" />
      </View>

      <WheelPicker
        key={`period-${mountKey}`}
        data={PERIOD_DATA}
        value={value.period}
        onValueChanged={handlePeriodChanged}
        onValueChanging={handlePeriodChanged}
        itemHeight={ITEM_HEIGHT}
        visibleItemCount={VISIBLE_ITEM_COUNT}
        width={PERIOD_WIDTH}
        renderItem={createWheelRowLabel(value.period)}
        renderItemContainer={renderWheelRowFrame}
        renderOverlay={noOverlay}
        enableScrollByTapOnItem
      />

      <View className="flex-row items-center gap-3">
        <WheelPicker
          key={`hour-${mountKey}`}
          data={HOUR_DATA}
          value={value.hour}
          onValueChanged={handleHourChanged}
          onValueChanging={handleHourChanged}
          itemHeight={ITEM_HEIGHT}
          visibleItemCount={VISIBLE_ITEM_COUNT}
          width={DIGIT_WIDTH}
          renderItem={createWheelRowLabel(value.hour)}
          renderItemContainer={renderWheelRowFrame}
          renderOverlay={noOverlay}
          enableScrollByTapOnItem
        />
        <Text className="text-green-700 text-b-02-sb">:</Text>
        <WheelPicker
          key={`minute-${mountKey}`}
          data={MINUTE_DATA}
          value={value.minute}
          onValueChanged={handleMinuteChanged}
          onValueChanging={handleMinuteChanged}
          itemHeight={ITEM_HEIGHT}
          visibleItemCount={VISIBLE_ITEM_COUNT}
          width={DIGIT_WIDTH}
          renderItem={createWheelRowLabel(value.minute)}
          renderItemContainer={renderWheelRowFrame}
          renderOverlay={noOverlay}
          enableScrollByTapOnItem
        />
      </View>
    </View>
  );
}
