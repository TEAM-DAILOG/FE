import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";

import BambooLogo from "@/assets/images/bambooLogo.svg";
import { Button, TextField } from "@/src/components/common";
import { useBaseModal } from "@/src/store/modals/baseModal";
import type { EditProfileModalProps } from "@/src/types/modals/settingModal.types";

export function EditProfileModal({
  initialEmail,
  initialNickname,
  onSave,
}: EditProfileModalProps) {
  const closeModal = useBaseModal((state) => state.closeModal);

  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState(initialNickname);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // 저장 버튼 활성화 여부
  const canSave =
    email !== initialEmail || nickname !== initialNickname || photoUri !== null;

  //  사진 업로드 클릭 시 실행 함수
  const handlePickPhoto = async () => {
    const permission = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
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
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  // 저장 버튼 클릭 시 실행 함수
  const handleSave = () => {
    if (!canSave) return;
    onSave({ email, nickname, photoUri });
    closeModal();
  };

  return (
    <View className="w-full items-start gap-10 rounded-xl bg-gray-0 pt-5">
      <View className="w-full items-center gap-4 px-4">
        <Text className="w-full border-b border-gray-200 pb-2 text-gray-900 text-b-02-m">
          내 정보 수정
        </Text>

        <View className="items-center gap-3">
          <View className="size-[120px] items-center justify-center overflow-hidden rounded-lg bg-bg">
            {photoUri ? (
              <Image source={{ uri: photoUri }} className="size-full" />
            ) : (
              <BambooLogo width={84} height={84} color="#4D826C" />
            )}
          </View>
          <Pressable
            onPress={handlePickPhoto}
            className="items-center justify-center rounded-full border border-green-600 bg-white px-4 py-1.5"
          >
            <Text className="text-green-700 text-b-04-m">사진 업로드</Text>
          </Pressable>
        </View>

        <View className="w-full items-start gap-3">
          <Text className="text-gray-900 text-b-03-r">이메일</Text>
          <TextField
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="w-full items-start gap-3">
          <Text className="text-gray-900 text-b-03-r">닉네임</Text>
          <TextField value={nickname} onChangeText={setNickname} />
        </View>
      </View>

      <View className="w-full flex-row">
        <Button
          label="취소"
          variant="fill-gray"
          onPress={closeModal}
          className="w-0 flex-1 rounded-t-none rounded-bl-xl rounded-br-none"
        />
        <Button
          label="저장"
          disabled={!canSave}
          variant="fill-green"
          onPress={handleSave}
          className="w-0 flex-1 rounded-t-none rounded-bl-none rounded-br-xl"
        />
      </View>
    </View>
  );
}
