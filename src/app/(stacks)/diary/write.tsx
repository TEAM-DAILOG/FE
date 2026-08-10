import dayjs from "dayjs";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  Divider,
  ScreenContainer,
  TextField,
} from "@/src/components/common";
import {
  DiaryDateCard,
  DiaryEmptyState,
  DiaryPhotoCard,
  DiaryQuestionCard,
  DiaryTabBar,
  type DiaryTabType,
} from "@/src/components/daily";
import { DIARY_TITLE_MAX_LENGTH } from "@/src/constants/inputLimits";
import { useCreateAiAnswer } from "@/src/hooks/mutations/ai/useCreateAiAnswer";
import { useCreateSchedules } from "@/src/hooks/mutations/ai/useCreateSchedules";
import { useCreateDiary } from "@/src/hooks/mutations/diaries/useCreateDiary";
import { useGetTodayQuestion } from "@/src/hooks/queries/ai/useGetTodayQuestion";
import { useToastStore } from "@/src/store/toast/toastStore";
import type { DiaryImageFile } from "@/src/types/diaries/diary.types";

const PHOTO_MAX_COUNT = 3;

export default function DiaryWriteScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<DiaryTabType>("question");
  const [selectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<DiaryImageFile[]>([]);

  const { data: todayQuestion, isLoading: isQuestionLoading } =
    useGetTodayQuestion();
  const createDiary = useCreateDiary();
  const createSchedules = useCreateSchedules();
  const createAiAnswer = useCreateAiAnswer();
  const showToast = useToastStore((state) => state.showToast);

  const handleAddPhoto = async () => {
    if (images.length >= PHOTO_MAX_COUNT) return;

    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      // 한 번 거부되면 OS가 다시 다이얼로그를 띄우지 않으므로 설정 화면으로 유도
      if (!permission.canAskAgain) {
        Linking.openSettings();
        return;
      }

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: PHOTO_MAX_COUNT - images.length,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => {
          const fileExtension = asset.mimeType?.split("/")[1] ?? "jpg";
          return {
            uri: asset.uri,
            name: asset.fileName ?? `diary.${fileExtension}`,
            type: asset.mimeType ?? "image/jpeg",
          };
        }),
      ]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid = content.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid) return;

    createDiary.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        questionId:
          selectedTab === "question" ? todayQuestion?.questionId : undefined,
        date: dayjs(selectedDate).format("YYYY-MM-DDTHH:mm:ssZ"),
        images,
      },
      {
        onSuccess: (diary) => {
          showToast("일기가 저장되었습니다.", "icon");

          if (diary.diaryType === "QUESTION") {
            createAiAnswer.mutate(diary.diaryId);
          }

          createSchedules.mutate(undefined, {
            onSettled: () => {
              router.push("/diary/recommendations");
            },
          });
        },
      }
    );
  };

  const showEmptyState =
    selectedTab === "question" && !isQuestionLoading && !todayQuestion;

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="일기작성" />

      {showEmptyState ? (
        <>
          <View className="px-4 pt-5">
            <DiaryTabBar
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
          </View>
          <DiaryEmptyState onPressWriteFree={() => setSelectedTab("free")} />
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="gap-4 px-4 pt-5">
            <DiaryTabBar
              selectedTab={selectedTab}
              onSelectTab={setSelectedTab}
            />
            <DiaryDateCard date={selectedDate} />

            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">
                <Text className="text-green-600">* </Text>
                제목
              </Text>
              <TextField
                placeholder="제목을 입력하세요"
                value={title}
                onChangeText={setTitle}
                maxLength={DIARY_TITLE_MAX_LENGTH}
              />
            </View>
          </View>

          <Divider className="mt-6 border-green-100" />

          <View className="gap-4 px-4 pt-6">
            {selectedTab === "question" && isQuestionLoading && (
              <DiaryQuestionCard question="오늘의 질문을 불러오는 중입니다." />
            )}
            {selectedTab === "question" && todayQuestion && (
              <DiaryQuestionCard question={todayQuestion.content} />
            )}

            <View className="gap-3">
              <Text className="text-gray-900 text-b-02-m">
                <Text className="text-green-600">* </Text>
                오늘의 일기
              </Text>
              <TextField
                type="textarea"
                placeholder="질문에 답변하며 일기를 작성해 보세요!"
                value={content}
                onChangeText={setContent}
              />
            </View>

            <DiaryPhotoCard
              photos={images.map((image) => image.uri)}
              onAddPhoto={handleAddPhoto}
              onRemovePhoto={handleRemovePhoto}
              maxCount={PHOTO_MAX_COUNT}
            />
          </View>

          <View className="gap-3 px-4 pb-12 pt-7">
            <View className="flex-row items-center">
              <Text className="text-green-600 text-h-01">*</Text>
              <Text className="text-gray-700 text-b-04-m">
                항목은 필수입니다.
              </Text>
            </View>

            <Button
              label="저장"
              onPress={handleSave}
              disabled={
                !isFormValid ||
                createDiary.isPending ||
                createSchedules.isPending
              }
            />
          </View>
        </ScrollView>
      )}
    </ScreenContainer>
  );
}
