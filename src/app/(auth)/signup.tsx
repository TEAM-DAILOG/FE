import { router } from "expo-router";
import { useEffect, useState } from "react";

import { BackHeader, ScreenContainer } from "@/src/components/common";
import {
  type SignupCodeCheckStatus,
  SignupCodeStep,
  SignupEmailStep,
  SignupPasswordStep,
  SignupTermsStep,
} from "@/src/components/signup";

type SignupStep = "terms" | "email" | "code" | "password" | "profile";

const PREVIOUS_STEP: Partial<Record<SignupStep, SignupStep>> = {
  email: "terms",
  code: "email",
  password: "code",
  profile: "password",
};

const CODE_TIMER_SECONDS = 180;
const MOCK_VALID_CODE = "123456";

export default function SignUpScreen() {
  const [step, setStep] = useState<SignupStep>("terms");

  const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);
  const [pushNotificationAgreed, setPushNotificationAgreed] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(CODE_TIMER_SECONDS);
  const [codeCheckStatus, setCodeCheckStatus] =
    useState<SignupCodeCheckStatus>("idle");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (step !== "code") return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

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
      setStep("email");
      return;
    }
    if (step === "email") {
      setRemainingSeconds(CODE_TIMER_SECONDS);
      setCodeCheckStatus("idle");
      setStep("code");
      return;
    }
    if (step === "code") {
      if (codeCheckStatus === "valid") {
        setStep("password");
        return;
      }
      setCodeCheckStatus(code === MOCK_VALID_CODE ? "valid" : "invalid");
      return;
    }
  }

  function handleChangeCode(value: string) {
    setCode(value);
    setCodeCheckStatus("idle");
  }

  function handleResendCode() {
    setCode("");
    setCodeCheckStatus("idle");
    setRemainingSeconds(CODE_TIMER_SECONDS);
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
        return (
          <SignupEmailStep
            email={email}
            onChangeEmail={setEmail}
            onPressNext={handleNext}
          />
        );
      case "code":
        return (
          <SignupCodeStep
            code={code}
            onChangeCode={handleChangeCode}
            remainingSeconds={remainingSeconds}
            codeCheckStatus={codeCheckStatus}
            onPressResend={handleResendCode}
            onPressNext={handleNext}
          />
        );
      case "password":
        return (
          <SignupPasswordStep
            password={password}
            onChangePassword={setPassword}
            confirmPassword={confirmPassword}
            onChangeConfirmPassword={setConfirmPassword}
            onPressNext={handleNext}
          />
        );
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
