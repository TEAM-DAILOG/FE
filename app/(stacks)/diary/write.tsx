import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import {
  BackHeader,
  Button,
  Divider,
  ScreenContainer,
  TextField,
} from "@/src/components/common";
import {
  DiaryDateCard,
  DiaryPhotoCard,
  DiaryQuestionCard,
  DiaryTabBar,
  type DiaryTabType,
} from "@/src/components/daily";

// TODO: API 연동 전까지 오늘의 질문 더미 사용
const DUMMY_QUESTION = "Lorem ipsum dolor sit amet consectetur.";

const PHOTO_MAX_COUNT = 3;

export default function DiaryWriteScreen() {
  const [selectedTab, setSelectedTab] = useState<DiaryTabType>("question");
  const [selectedDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  // TODO: 날짜 선택 모달 머지되면 가져와서 여기서 열기
  const handlePressDate = () => {};

  const handleAddPhoto = async () => {
    if (photos.length >= PHOTO_MAX_COUNT) return;

    // 사진 선택 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid = content.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid) return;
    // TODO: API 연동 단계에서 실제 저장 로직 연결
  };

  return (
    <ScreenContainer variant="stack">
      <BackHeader label="일기작성" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4 px-4 pt-5">
          <DiaryTabBar selectedTab={selectedTab} onSelectTab={setSelectedTab} />
          <DiaryDateCard date={selectedDate} onPress={handlePressDate} />

          <View className="gap-3">
            <Text className="text-gray-900 text-b-02-m">제목</Text>
            <TextField
              placeholder="제목을 입력하세요"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        <Divider className="mt-6 border-green-100" />

        <View className="gap-4 px-4 pt-6">
          {selectedTab === "question" && (
            <DiaryQuestionCard question={DUMMY_QUESTION} />
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
            photos={photos}
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

          <Button label="저장" onPress={handleSave} disabled={!isFormValid} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
