import { Text, View } from "react-native";

import { Button, Divider } from "@/src/components/common";

import { AgreementRow } from "./AgreementRow";
import { SignupProgressBar } from "./SignupProgressBar";

type SignupTermsStepProps = {
  termsOfServiceAgreed: boolean;
  privacyPolicyAgreed: boolean;
  pushNotificationAgreed: boolean;
  onToggleTermsOfService: () => void;
  onTogglePrivacyPolicy: () => void;
  onTogglePushNotification: () => void;
  onToggleAll: () => void;
  onPressTermsDetail: () => void;
  onPressPrivacyDetail: () => void;
  onPressNext: () => void;
};

export function SignupTermsStep({
  termsOfServiceAgreed,
  privacyPolicyAgreed,
  pushNotificationAgreed,
  onToggleTermsOfService,
  onTogglePrivacyPolicy,
  onTogglePushNotification,
  onToggleAll,
  onPressTermsDetail,
  onPressPrivacyDetail,
  onPressNext,
}: SignupTermsStepProps) {
  const isAllAgreed =
    termsOfServiceAgreed && privacyPolicyAgreed && pushNotificationAgreed;
  const canGoNext = termsOfServiceAgreed && privacyPolicyAgreed;

  return (
    <View className="flex-1 pb-12 pt-5">
      <View className="w-[358px] self-center">
        <SignupProgressBar currentStep={1} />

        <Text className="mt-7 text-gray-900 text-h-01">
          일일 서비스 이용약관에{"\n"}동의해주세요.
        </Text>

        <View className="mt-10">
          <AgreementRow
            label="전체 동의"
            checked={isAllAgreed}
            onToggle={onToggleAll}
          />

          <Divider className="my-4 border-gray-200" />

          <View className="gap-4">
            <AgreementRow
              label="[필수] 서비스이용약관"
              checked={termsOfServiceAgreed}
              onToggle={onToggleTermsOfService}
              onPressDetail={onPressTermsDetail}
            />
            <AgreementRow
              label="[필수] 개인정보처리방침"
              checked={privacyPolicyAgreed}
              onToggle={onTogglePrivacyPolicy}
              onPressDetail={onPressPrivacyDetail}
            />
            <AgreementRow
              label="[선택] PUSH 알림 동의"
              checked={pushNotificationAgreed}
              onToggle={onTogglePushNotification}
            />
          </View>
        </View>
      </View>

      <Button
        label="가입하기"
        className="w-[358px] mt-auto self-center"
        disabled={!canGoNext}
        onPress={onPressNext}
      />
    </View>
  );
}
