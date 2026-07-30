import type { CreateDiaryParams } from "@/src/types/diaries/diary.types";

// 일기 작성 API 요청값 형식 변환
export function toDiaryFormData(params: CreateDiaryParams) {
  const formData = new FormData();

  formData.append("title", params.title);
  formData.append("content", params.content);
  formData.append("date", params.date);

  if (typeof params.questionId === "number") {
    formData.append("questionId", String(params.questionId));
  }

  params.images?.forEach((image) => {
    formData.append("images", image as unknown as Blob);
  });

  return formData;
}
