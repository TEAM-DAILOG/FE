export type DiaryPanelTab = "calendar" | "thread";

export type ThreadItem = {
  date: string; // YYYY-MM-DD
  summary: string;
  title: string;
  content: string;
  imageCount: number; // 0~3
  isUnread?: boolean;
};
