import dayjs from "dayjs";
import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import LeftIcon from "@/assets/icons/leftIcon.svg";
import RightIcon from "@/assets/icons/rightIcon.svg";
import {
  BackHeader,
  ScheduleRecommendItem,
  ScreenContainer,
} from "@/src/components/common";
import { DiaryDetailCard } from "@/src/components/diaries/DiaryDetailCard";
import { CATEGORY_HEX_COLORS } from "@/src/constants/categoryColors";
import type { CategoryColor } from "@/src/types/categories/category.types";

type DiaryRecommendation = {
  id: string;
  categoryName: string;
  categoryColor: CategoryColor;
  content: string;
};

type DiaryDetail = {
  date: string;
  hasQuestion: boolean;
  question?: string;
  title: string;
  content: string;
  images: string[];
  aiReply: string | null;
  recommendations: DiaryRecommendation[];
};

// TODO: id로 실제 일기 데이터 조회 (API 연동 전까지는 더미)
const DUMMY_DIARY: DiaryDetail = {
  date: "2026-05-21",
  hasQuestion: true,
  question: "Lorem ipsum dolor sit amet consectetur.",
  title: "제목을 입력하세요",
  content:
    "Lorem ipsum dolor sit amet consectetur. Dignissim felis facilisi sed in. Urna lorem ac eu ipsum. Et eleifend vitae mi non mattis sem purus. Nunc at amet suspendisse orci tempor fames.",
  images: [],
  aiReply:
    "Lorem ipsum dolor sit amet consectetur. Dignissim felis facilisi sed in. Urna lorem ac eu ipsum. Et eleifend vitae mi non mattis sem purus. Nunc at amet suspendisse orci tempor fames.",
  recommendations: [
    {
      id: "1",
      categoryName: "CATEGORY",
      categoryColor: "blue",
      content: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: "2",
      categoryName: "CATEGORY",
      categoryColor: "brown",
      content: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      id: "3",
      categoryName: "CATEGORY",
      categoryColor: "green",
      content: "Lorem ipsum dolor sit amet consectetur.",
    },
  ],
};

export default function DiaryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const diary = DUMMY_DIARY; // TODO: id(${id})로 실제 데이터 교체

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
              onPress={() => {
                // TODO: 이전 날짜 이동 로직 연결
              }}
            >
              <LeftIcon width={24} height={24} />
            </Pressable>

            {/* h-01 타이포 적용 + 'M월'/'D일' 사이 4px 간격 위해 분리 */}
            <View className="flex-row items-center gap-1">
              <Text className="text-gray-900 text-h-01">
                {dayjs(diary.date).format("M월")}
              </Text>
              <Text className="text-gray-900 text-h-01">
                {dayjs(diary.date).format("D일")}
              </Text>
            </View>

            <Pressable
              hitSlop={8}
              onPress={() => {
                // TODO: 다음 날짜 이동 로직 연결
              }}
            >
              <RightIcon width={24} height={24} />
            </Pressable>
          </View>

          {/* 질문일기일 때만 뱃지 노출 */}
          {diary.hasQuestion && (
            <View className="flex-row items-center gap-2.5 rounded border border-green-700 bg-white px-2 py-1">
              <Text className="text-05-m text-green-700">질문일기</Text>
            </View>
          )}
        </View>

        {/* 오늘의 질문 */}
        {diary.hasQuestion && diary.question ? (
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">오늘의 질문</Text>
            <View className="flex items-center justify-center rounded-xl border border-green-200 bg-green-100 p-3">
              <Text className="text-green-800 text-b-03-sb">
                {diary.question}
              </Text>
            </View>
          </View>
        ) : null}

        <DiaryDetailCard
          title={diary.title}
          content={diary.content}
          images={diary.images}
        />

        {/* AI의 답장 */}
        <View className="gap-3">
          <Text className="text-gray-900 text-b-02-m">AI의 답장</Text>
          {diary.aiReply ? (
            <View className="rounded-xl bg-green-200 p-3">
              <Text className="text-green-800 text-b-02-m">
                {diary.aiReply}
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

        {/* AI 추천일정 */}
        {diary.aiReply && diary.recommendations.length > 0 ? (
          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">AI 추천일정</Text>

            <View className="gap-2 rounded-xl border border-gray-100 bg-white p-3">
              {diary.recommendations.map((rec) => (
                <ScheduleRecommendItem
                  key={rec.id}
                  size="sm"
                  categoryLabel={rec.categoryName}
                  categoryColor={CATEGORY_HEX_COLORS[rec.categoryColor]}
                  description={rec.content}
                  onPressAdd={() => {
                    // TODO: API 연동 단계에서 일정 추가 로직 연결
                  }}
                />
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}
