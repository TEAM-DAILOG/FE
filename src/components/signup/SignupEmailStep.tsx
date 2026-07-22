import { Text, View } from "react-native";

import { Button, TextField } from "@/src/components/common";
import { isValidEmail } from "@/src/utils";

import { SignupProgressBar } from "./SignupProgressBar";

type SignupEmailStepProps = {
  email: string;
  onChangeEmail: (value: string) => void;
  onPressNext: () => void;
};

export function SignupEmailStep({
  email,
  onChangeEmail,
  onPressNext,
}: SignupEmailStepProps) {
  const isEmailValid = isValidEmail(email);

  return (
    <View className="flex-1 px-4 pb-12 pt-5">
      <View className="w-full">
        <SignupProgressBar currentStep={2} />

        <Text className="mt-7 text-gray-900 text-h-01">
          로그인에 사용하실{"\n"}이메일을 입력해주세요.
        </Text>

        <View className="mt-10 gap-3">
          <Text className="text-gray-900 text-b-02-m">이메일</Text>
          <TextField
            type="input"
            placeholder="이메일을 입력하세요."
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={onChangeEmail}
          />
        </View>
      </View>

      <Button
        label="인증코드 전송하기"
        className="mt-auto"
        disabled={!isEmailValid}
        onPress={onPressNext}
      />
    </View>
  );
}
