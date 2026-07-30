import { DiaryCard } from "@/src/components/common/DiaryCard";
import type { ThreadItem } from "@/src/types/calendar/diaryPanel.types";

type DiaryThreadCardProps = {
  item: ThreadItem;
};

// 일기 이미지 개수에 맞는 DiaryCard variant로 렌더링하는 함수
export function DiaryThreadCard({ item }: DiaryThreadCardProps) {
  const images = item.images.slice(0, 3);

  if (images.length === 0) {
    return (
      <DiaryCard variant="no-image" title={item.title} content={item.content} />
    );
  }

  if (images.length === 1) {
    return (
      <DiaryCard
        variant="one-image"
        title={item.title}
        content={item.content}
        images={[{ uri: images[0] }]}
      />
    );
  }

  if (images.length === 2) {
    return (
      <DiaryCard
        variant="two-images"
        title={item.title}
        content={item.content}
        images={[{ uri: images[0] }, { uri: images[1] }]}
      />
    );
  }

  return (
    <DiaryCard
      variant="three-images"
      title={item.title}
      content={item.content}
      images={[{ uri: images[0] }, { uri: images[1] }, { uri: images[2] }]}
    />
  );
}
