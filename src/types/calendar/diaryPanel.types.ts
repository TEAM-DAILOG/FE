export type DiaryPanelTab = "calendar" | "thread";

export type ThreadItem = {
  diaryId: number;
  date: string | null; // YYYY-MM-DD
  summary: string;
  title: string;
  content: string;
  images: string[];
  isUnread?: boolean;
};

export type ThreadGroup = {
  monthKey: string;
  date: string | null;
  items: ThreadItem[];
};
