import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import LeftIcon from "@/assets/icons/leftIcon.svg";
import RightIcon from "@/assets/icons/rightIcon.svg";
import {
  BackHeader,
  ScheduleItem,
  ScreenContainer,
} from "@/src/components/common";
import { Button } from "@/src/components/common/Button";
import { DiaryDetailCard } from "@/src/components/diaries/DiaryDetailCard";
import { useDeleteDiary } from "@/src/hooks/mutations/diaries/useDeleteDiary";
import { useGetDiaries } from "@/src/hooks/queries/diaries/useGetDiaries";
import { useGetDiaryDetail } from "@/src/hooks/queries/diaries/useGetDiaryDetail";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { CategoryColor } from "@/src/types/categories/category.types";

const ICON_COLOR_ACTIVE = "#020303";
const ICON_COLOR_DISABLED = "#AEB2B0";

type DiaryRecommendation = {
  id: string;
  categoryName: string;
  categoryColor: CategoryColor;
  content: string;
};

// AI 답장 조회 API 연동 후 대체
const DUMMY_AI_REPLY: string | null =
  "Lorem ipsum dolor sit amet consectetur. Dignissim felis facilisi sed in. Urna lorem ac eu ipsum. Et eleifend vitae mi non mattis sem purus. Nunc at amet suspendisse orci tempor fames.";

// AI 일정 추천 API 연동 후 대체
const DUMMY_RECOMMENDATIONS: DiaryRecommendation[] = [
  {
    id: "1",
    categoryName: "CATEGORY",
    categoryColor: "BLUE",
    content: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "2",
    categoryName: "CATEGORY",
    categoryColor: "BROWN",
    content: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: "3",
    categoryName: "CATEGORY",
    categoryColor: "GREEN",
    content: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function DiaryDetailScreen() {
  const router = useRouter();
  const openModal = useBaseModal((state) => state.openModal);
  const { id } = useLocalSearchParams<{ id: string }>();
  const diaryId = Number(id);
  const { data: diary, isLoading } = useGetDiaryDetail(diaryId);
  const { data: diariesData } = useGetDiaries();
  const deleteDiaryMutation = useDeleteDiary();

  const sortedDiaries = [...(diariesData ?? [])].sort(
    (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
  );
  const currentIndex = sortedDiaries.findIndex(
    (item) => item.diaryId === diaryId
  );
  const previousDiaryId =
    currentIndex > 0 ? sortedDiaries[currentIndex - 1].diaryId : null;
  const nextDiaryId =
    currentIndex !== -1 && currentIndex < sortedDiaries.length - 1
      ? sortedDiaries[currentIndex + 1].diaryId
      : null;

  const openDiary = (targetDiaryId: number) => {
    router.replace({
      pathname: "/diary/[id]",
      params: { id: String(targetDiaryId) },
    });
  };

  if (isLoading || !diary) {
    return (
      <ScreenContainer variant="stack">
        <BackHeader label="" />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      </ScreenContainer>
    );
  }

  const hasQuestion = diary.diaryType === "QUESTION";

  const handleDelete = () => {
    openModal("deleteConfirmModal", {
      props: {
        target: "일기",
        date: diary.createdAt,
        description: diary.diaryTitle,
        onConfirm: () => {
          deleteDiaryMutation.mutate(diaryId, {
            onSuccess: () => router.push("/(tabs)/calendar"),
          });
        },
      },
    });
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="" />

      <ScrollView
        contentContainerClassName="gap-5 px-4 pb-12 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {/* 날짜 네비게이션 + 질문일기 뱃지 */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-0.5">
            <Pressable
              hitSlop={8}
              disabled={previousDiaryId === null}
              onPress={() =>
                previousDiaryId !== null && openDiary(previousDiaryId)
              }
            >
              <LeftIcon
                width={24}
                height={24}
                color={
                  previousDiaryId !== null
                    ? ICON_COLOR_ACTIVE
                    : ICON_COLOR_DISABLED
                }
              />
            </Pressable>

            <View className="flex-row items-center gap-1">
              <Text className="text-gray-900 text-h-01">
                {dayjs(diary.createdAt).format("M월")}
              </Text>
              <Text className="text-gray-900 text-h-01">
                {dayjs(diary.createdAt).format("D일")}
              </Text>
            </View>

            <Pressable
              hitSlop={8}
              disabled={nextDiaryId === null}
              onPress={() => nextDiaryId !== null && openDiary(nextDiaryId)}
            >
              <RightIcon
                width={24}
                height={24}
                color={
                  nextDiaryId !== null ? ICON_COLOR_ACTIVE : ICON_COLOR_DISABLED
                }
              />
            </Pressable>
          </View>

          {/* 질문일기일 때만 뱃지 노출 */}
          {hasQuestion && (
            <View className="flex-row items-center gap-2.5 rounded border border-green-700 bg-white px-2 py-1">
              <Text className="text-green-700 text-b-05-m">질문일기</Text>
            </View>
          )}
        </View>

        {/* 오늘의 질문 */}
        {hasQuestion && diary.questionContent ? (
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">오늘의 질문</Text>
            <View className="flex items-center justify-center rounded-xl border border-green-200 bg-green-100 p-3">
              <Text className="text-green-800 text-b-03-sb">
                {diary.questionContent}
              </Text>
            </View>
          </View>
        ) : null}

        <DiaryDetailCard
          title={diary.diaryTitle}
          content={diary.content}
          images={diary.images}
        />

        {/* AI의 답장 */}
        {hasQuestion && (
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">AI의 답장</Text>
            {/* AI 답장 조회 API 연동 후 대체 예정 */}
            {DUMMY_AI_REPLY ? (
              <View className="rounded-xl bg-green-200 p-3">
                <Text className="text-green-800 text-b-02-m">
                  {DUMMY_AI_REPLY}
                </Text>
              </View>
            ) : (
              <View className="rounded-xl border border-green-100 bg-gray-100 p-3">
                <Text className="text-green-600 text-b-02-m">
                  아직 답장이 도착하지 않았어요.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* AI 추천일정 */}
        {/* AI 추천일정 생성 API 연동 후 대체 예정 */}
        {DUMMY_RECOMMENDATIONS.length > 0 ? (
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">AI 추천일정</Text>

            <View className="gap-2 rounded-xl border border-gray-100 bg-white p-3">
              {DUMMY_RECOMMENDATIONS.map((rec) => (
                <ScheduleItem
                  key={rec.id}
                  categoryLabel={rec.categoryName}
                  categoryColor={rec.categoryColor}
                  description={rec.content}
                  action={{
                    type: "button",
                    label: "일정추가",
                    onPress: () => {
                      // TODO: API 연동 단계에서 일정 추가 로직 연결
                    },
                  }}
                />
              ))}
            </View>
          </View>
        ) : null}

        <Button
          label={deleteDiaryMutation.isPending ? "일기 삭제 중" : "일기 삭제"}
          variant="stroke-green"
          disabled={deleteDiaryMutation.isPending}
          onPress={handleDelete}
          className="mt-5"
        />
      </ScrollView>
    </ScreenContainer>
  );
}
