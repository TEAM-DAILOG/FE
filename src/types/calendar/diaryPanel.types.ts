export type DiaryPanelTab = "calendar" | "thread";

export type ThreadItem = {
  date: string; // YYYY-MM-DD
  summary: string;
  isUnread?: boolean;
};
