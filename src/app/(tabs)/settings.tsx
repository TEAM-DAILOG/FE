import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import BambooLogo from "@/assets/images/bambooLogo.svg";
import { Divider, LogoHeader, ScreenContainer } from "@/src/components/common";
import { PillButton, PushAlarmCard } from "@/src/components/settings";

export default function SettingsScreen() {
  const router = useRouter();
  const [isPushEnabled, setIsPushEnabled] = useState(false);
  const [isDiaryWriteEnabled, setIsDiaryWriteEnabled] = useState(false);
  const [isDiaryReplyEnabled, setIsDiaryReplyEnabled] = useState(false);

  return (
    <ScreenContainer>
      <LogoHeader />

      <View className="items-center gap-3 pt-6">
        <View className="items-center gap-2">
          {/* TODO: 내 정보 조회 API 연동 시 실제 유저로 교체 */}
          <View className="size-21 items-center justify-center rounded-lg bg-white">
            <BambooLogo width={84} height={84} />
          </View>
          <Text className="text-gray-900 text-b-02-m">USER NAME</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <PillButton label="비밀번호 변경" />
          <PillButton label="내 정보 수정" />
        </View>
      </View>

      <Divider className="mt-6 border-green-200" />

      <View className="px-4 pt-6">
        <Text className="text-gray-900 text-b-02-m">알림 설정</Text>

        <PushAlarmCard
          className="mt-4"
          isPushEnabled={isPushEnabled}
          onChangePushEnabled={setIsPushEnabled}
          isDiaryWriteEnabled={isDiaryWriteEnabled}
          onChangeDiaryWriteEnabled={setIsDiaryWriteEnabled}
          diaryWriteTimeLabel="오후 09:30"
          onPressDiaryWriteTime={() => router.push("/alarm")}
          isDiaryReplyEnabled={isDiaryReplyEnabled}
          onChangeDiaryReplyEnabled={setIsDiaryReplyEnabled}
        />
      </View>

      {/* TODO 네비바 추가 후 간격 pb 간격 확인 */}
      <View className="flex-1 items-start justify-end gap-3 px-4 pb-10">
        <Pressable className="border-b border-gray-400 pb-0.5">
          <Text className="text-gray-400 text-b-04-m">로그아웃</Text>
        </Pressable>
        <Pressable className="border-b border-gray-400 pb-0.5">
          <Text className="text-gray-400 text-b-04-m">회원탈퇴</Text>
        </Pressable>
      </View>
    </ScreenContainer>
  );
}
