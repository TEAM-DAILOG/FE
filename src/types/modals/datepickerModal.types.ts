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
  isDisabled?: boolean;
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

// content1: "2025.06.03"과 같은 날짜 형식 / content2: "외 2", "월요일", "~" 등 그 외 기호
export type ScheduleRepeatSummaryPart = {
  type: "date" | "etc";
  text: string;
};

export type ScheduleRepeatSummary = {
  mode: string;
  parts: ScheduleRepeatSummaryPart[];
};
