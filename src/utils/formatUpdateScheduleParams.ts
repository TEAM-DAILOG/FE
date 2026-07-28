import type {
  CreateScheduleParams,
  ScheduleScope,
  UpdateScheduleParams,
} from "@/src/types/schedules/schedule.types";

type FormatUpdateScheduleParamsInput = {
  params: CreateScheduleParams;
  date: string;
  scope: ScheduleScope;
  isRepeatDirty: boolean;
};

// 반복 범위(scope)와 반복 설정 변경 여부에 따라 일정 수정 요청 파라미터를 결정하는 함수
export function formatUpdateScheduleParams({
  params,
  date,
  scope,
  isRepeatDirty,
}: FormatUpdateScheduleParamsInput): UpdateScheduleParams {
  const base: UpdateScheduleParams = {
    categoryId: params.categoryId,
    title: params.title,
    content: params.content ?? null,
  };

  if (scope === "SINGLE") return { ...base, date };

  return isRepeatDirty ? params : base;
}
