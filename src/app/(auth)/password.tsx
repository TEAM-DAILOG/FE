import { Text, View } from "react-native";

import { BackHeader, ScreenContainer } from "@/src/components/common";

export default function PasswordScreen() {
  return (
    <ScreenContainer>
      <BackHeader label="비밀번호 찾기" />
      <View className="flex-1 items-start justify-start gap-7 px-4 pt-10">
        <Text>비밀번호 찾기</Text>
      </View>
    </ScreenContainer>
  );
}
