import { Text, View } from "react-native";

import { TextField } from "@/src/components/common/TextField";

type PasswordEmailStepProps = {
  email: string;
  onChangeEmail: (value: string) => void;
};

export function PasswordEmailStep({
  email,
  onChangeEmail,
}: PasswordEmailStepProps) {
  return (
    <View className="w-full flex-col gap-3">
      <Text className="text-gray-900 text-b-02-m">이메일</Text>
      <TextField
        type="input"
        placeholder="이메일을 입력하세요."
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={onChangeEmail}
      />
    </View>
  );
}
