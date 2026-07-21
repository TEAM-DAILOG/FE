import { View } from "react-native";

type SignupProgressBarProps = {
  currentStep: number;
  totalSteps?: number;
};

export function SignupProgressBar({
  currentStep,
  totalSteps = 4,
}: SignupProgressBarProps) {
  return (
    <View className="h-1 w-full flex-row gap-0.5">
      {Array.from({ length: totalSteps }, (_, index) => {
        const isActive = index < currentStep;

        return (
          <View
            key={index}
            className={`h-1 flex-1 rounded-full ${
              isActive ? "bg-gray-800" : "bg-gray-200"
            }`}
          />
        );
      })}
    </View>
  );
}
