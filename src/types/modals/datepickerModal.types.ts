export type DatePickerTabKey = "basic" | "multi" | "range" | "recurring";

export type ScheduleRepeatValue =
  | { mode: "none" }
  | { mode: "multi"; dates: string[] }
  | { mode: "range"; startDate: string; endDate: string }
  | { mode: "weekly"; weekdays: number[]; startDate: string; endDate: string }
  | { mode: "monthly"; startDate: string; endDate: string }
  | { mode: "yearly"; startDate: string; endDate: string };

export type DatePickerCell = {
  date: string;
  day: number;
  isCurrentMonth: boolean;
};

export type DatePickerDayState = {
  isSelected?: boolean;
  isRangeStart?: boolean;
  isRangeEnd?: boolean;
  isInRange?: boolean;
};

export type DatePickerModalResult = {
  date: string;
  repeat: ScheduleRepeatValue;
};

export type DatePickerModalProps = {
  initialDate: string;
  initialRepeat: ScheduleRepeatValue;
  onApply: (result: DatePickerModalResult) => void;
};
