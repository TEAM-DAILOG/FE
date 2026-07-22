import { router } from "expo-router";
import { useState } from "react";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import { SignupTermsStep } from "@/src/components/signup";

type SignupStep = "terms" | "email" | "code" | "password" | "profile";

const PREVIOUS_STEP: Partial<Record<SignupStep, SignupStep>> = {
  email: "terms",
  code: "email",
  password: "code",
  profile: "password",
};

export default function SignUpScreen() {
  const [step, setStep] = useState<SignupStep>("terms");

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

  function handleBack() {
    const previousStep = PREVIOUS_STEP[step];

    if (previousStep) {
      setStep(previousStep);
      return;
    }

    router.back();
  }

  function handleNext() {
    if (step === "terms") {
      return;
    }
  }

  function renderStep() {
    switch (step) {
      case "terms":
        return (
          <SignupTermsStep
            termsOfServiceAgreed={termsOfServiceAgreed}
            privacyPolicyAgreed={privacyPolicyAgreed}
            pushNotificationAgreed={pushNotificationAgreed}
            onToggleTermsOfService={() =>
              setTermsOfServiceAgreed((prev) => !prev)
            }
            onTogglePrivacyPolicy={() =>
              setPrivacyPolicyAgreed((prev) => !prev)
            }
            onTogglePushNotification={() =>
              setPushNotificationAgreed((prev) => !prev)
            }
            onToggleAll={handleToggleAll}
            onPressTermsDetail={() => router.push("/terms-of-service")}
            onPressPrivacyDetail={() => router.push("/privacy-policy")}
            onPressNext={handleNext}
          />
        );
      case "email":
      case "code":
      case "password":
      case "profile":
        return null;
    }
  }

  return (
    <ScreenContainer>
      <BackHeader label="회원가입" background="bg" onPressBack={handleBack} />
      {renderStep()}
    </ScreenContainer>
  );
}
