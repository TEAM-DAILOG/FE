import { Text, View } from "react-native";

export type DiaryQuestionCardProps = {
  question: string;
};

export function DiaryQuestionCard({ question }: DiaryQuestionCardProps) {
  return (
    <View className="gap-3">
      <Text className="text-gray-900 text-b-02-m">오늘의 질문</Text>
      <View className="min-h-12 items-center justify-center rounded-xl border border-green-200 bg-green-100 p-3">
        <Text className="text-green-800 text-b-03-sb">{question}</Text>
      </View>
    </View>
  );
}
