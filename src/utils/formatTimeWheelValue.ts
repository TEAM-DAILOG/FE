import type { TimeWheelValue } from "@/src/components/alarm";
import { PERIOD_DATA } from "@/src/constants/timeWheelPicker";

const PERIOD_LABEL_MAP = Object.fromEntries(
  PERIOD_DATA.map(({ value, label }) => [value, label])
) as Record<TimeWheelValue["period"], string>;

export function formatTimeWheelValue({ period, hour, minute }: TimeWheelValue) {
  return `${PERIOD_LABEL_MAP[period]} ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}
