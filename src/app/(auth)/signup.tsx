import { router } from "expo-router";
import { useState } from "react";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { SignupTermsStep } from "@/src/components/signup";

export default function SignUpScreen() {
  const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [pushNotificationAgreed, setPushNotificationAgreed] = useState(false);

  function handleToggleAll() {
    const nextValue = !(
      termsOfServiceAgreed &&
      privacyPolicyAgreed &&
      pushNotificationAgreed
    );

    setTermsOfServiceAgreed(nextValue);
    setPrivacyPolicyAgreed(nextValue);
    setPushNotificationAgreed(nextValue);
  }

  return (
    <ScreenContainer>
      <BackHeader label="회원가입" background="bg" />
      <SignupTermsStep
        termsOfServiceAgreed={termsOfServiceAgreed}
        privacyPolicyAgreed={privacyPolicyAgreed}
        pushNotificationAgreed={pushNotificationAgreed}
        onToggleTermsOfService={() =>
          setTermsOfServiceAgreed((prev) => !prev)
        }
        onTogglePrivacyPolicy={() => setPrivacyPolicyAgreed((prev) => !prev)}
        onTogglePushNotification={() =>
          setPushNotificationAgreed((prev) => !prev)
        }
        onToggleAll={handleToggleAll}
        onPressTermsDetail={() => router.push("/terms-of-service")}
        onPressPrivacyDetail={() => router.push("/privacy-policy")}
        onPressNext={() => undefined}
      />
    </ScreenContainer>
  );
}
