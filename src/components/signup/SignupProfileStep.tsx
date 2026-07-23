import { Pressable, Text, View } from "react-native";

import ImageIcon from "@/assets/icons/imageIcon.svg";
import { Button, TextField } from "@/src/components/common";

import { SignupProgressBar } from "./SignupProgressBar";

type SignupProfileStepProps = {
  nickname: string;
  onChangeNickname: (value: string) => void;
  isPending?: boolean;
  onPressImageUpload: () => void;
  onPressComplete: () => void;
};

export function SignupProfileStep({
  nickname,
  onChangeNickname,
  isPending = false,
  onPressImageUpload,
  onPressComplete,
}: SignupProfileStepProps) {
  const canComplete = nickname.trim().length > 0;

  return (
    <View className="flex-1 px-4 pb-12 pt-5">
      <View className="w-full">
        <SignupProgressBar currentStep={4} />

        <Text className="mt-7 text-gray-900 text-h-01">
          서비스에서 사용하실{"\n"}프로필을 설정해주세요.
        </Text>

        <View className="mt-10 gap-3">
          <Text className="text-gray-900 text-b-02-m">닉네임</Text>
          <TextField
            type="input"
            placeholder="닉네임"
            value={nickname}
            onChangeText={onChangeNickname}
          />
        </View>

        <View className="mt-7 gap-3">
          <Text className="text-gray-900 text-b-02-m">프로필 이미지(선택)</Text>
          <Pressable
            className="w-full items-center rounded-lg border border-gray-200 bg-white px-3 py-4"
            onPress={onPressImageUpload}
          >
            <ImageIcon width={48} height={48} color="#AEB2B0" />
            <Text className="mt-2 text-gray-400 text-b-03-sb">사진 업로드</Text>
          </Pressable>
        </View>
      </View>

      <Button
        label={isPending ? "가입 중" : "회원가입 완료"}
        className="mt-auto"
        disabled={!canComplete || isPending}
        onPress={onPressComplete}
      />
    </View>
  );
}
