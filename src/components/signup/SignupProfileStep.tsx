import { Image, Pressable, Text, View } from "react-native";

import CloseIcon from "@/assets/icons/closeIcon.svg";
import ImageIcon from "@/assets/icons/imageIcon.svg";
import { Button, TextField } from "@/src/components/common";
import { USER_NAME_MAX_LENGTH } from "@/src/constants/inputLimits";

import { SignupProgressBar } from "./SignupProgressBar";

type SignupProfileStepProps = {
  nickname: string;
  onChangeNickname: (value: string) => void;
  profileImageUri?: string | null;
  isPending?: boolean;
  onPressImageUpload: () => void;
  onPressImageRemove: () => void;
  onPressComplete: () => void;
};

export function SignupProfileStep({
  nickname,
  onChangeNickname,
  profileImageUri,
  isPending = false,
  onPressImageUpload,
  onPressImageRemove,
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
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChangeText={onChangeNickname}
            maxLength={USER_NAME_MAX_LENGTH}
          />
        </View>

        <View className="mt-7 gap-3">
          <Text className="text-gray-900 text-b-02-m">프로필 이미지(선택)</Text>
          <Pressable
            className="w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-4"
            onPress={onPressImageUpload}
          >
            {profileImageUri ? (
              <View className="relative size-[100px]">
                <Image
                  source={{ uri: profileImageUri }}
                  className="size-[100px] rounded-lg"
                  resizeMode="cover"
                />
                <Pressable
                  className="absolute right-1 top-1 size-5 items-center justify-center rounded-full bg-white/40"
                  onPress={onPressImageRemove}
                >
                  <CloseIcon width={18} height={18} color="#020303" />
                </Pressable>
              </View>
            ) : (
              <ImageIcon width={48} height={48} color="#AEB2B0" />
            )}
            <Text className="text-gray-400 text-b-03-sb">
              {profileImageUri ? "사진 변경" : "사진 업로드"}
            </Text>
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
