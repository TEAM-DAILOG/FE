import type { PickerItem } from "@quidone/react-native-wheel-picker";

import type { Period } from "@/src/components/alarm/TimeWheelPicker";

export const ITEM_HEIGHT = 32;
export const VISIBLE_ITEM_COUNT = 3;
export const PERIOD_WIDTH = 40;
export const DIGIT_WIDTH = 32;

export const PERIOD_DATA: PickerItem<Period>[] = [
  { value: "am", label: "오전" },
  { value: "pm", label: "오후" },
];

export const HOUR_DATA: PickerItem<number>[] = Array.from(
  { length: 12 },
  (_, index) => ({
    value: index + 1,
    label: String(index + 1).padStart(2, "0"),
  })
);

export const MINUTE_DATA: PickerItem<number>[] = Array.from(
  { length: 12 },
  (_, index) => ({
    value: index * 5,
    label: String(index * 5).padStart(2, "0"),
  })
);
