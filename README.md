# :tanabata_tree:DAILOG Frontend:tanabata_tree:

<div align="center">

<img width="400px" alt="일일-타이포로고" src="https://github.com/user-attachments/assets/0187b282-3947-4a8e-a1eb-a71116e1fbde" />
   
일정과 일기를 함께 기록하는 모바일 앱서비스,

DAILOG의 프론트엔드 레포지토리입니다.

</div>

---

## Team

| <img alt="hyochan 1" src="https://github.com/user-attachments/assets/a2459dc5-d988-45b2-b17a-af736f0a9c6d" /> | <img alt="yuna" src="https://github.com/user-attachments/assets/0fe12626-a6a3-404c-9252-cf011b7a4bf7" /> | <img alt="yewon" src="https://github.com/user-attachments/assets/4010759a-c7bb-4558-a815-e0c4ee5df3f0" /> | <img alt="taegyeong" src="https://github.com/user-attachments/assets/b8e48bcc-6161-42d5-b625-e8b5075e91dc" /> | <img alt="yejin" src="https://github.com/user-attachments/assets/ee54d03c-fa53-4424-8c54-816bd429afbe" /> |
|:-:|:-:|:-:|:-:|:-:|
| [차니/진효찬](https://github.com/Hyochan02) | [뮤/김유나](https://github.com/nonshaman) | [도토/김예원](https://github.com/yewon20804) | [신/성태경](https://github.com/sungtaegyeong) | [예나/윤예진](https://github.com/yejin045) |
| **Front-End Leader** | **Front-End** | **Front-End** | **Front-End** | **Front-End** |
| ⚙️프로젝트 초기 설계<br/>🎨캘린더·일정등록·비밀번호재설정 UI<br/>🛠️일정·통계·일기 API 연동<br/>⚙️EAS 배포 환경 세팅 | 🎨홈 UI<br/>🛠️홈·비밀번호 관련·회원 API 연동 | 🎨설정·통계·일기작성 UI<br/>🛠️AI·통계·알림 API 연동 | ⚙️개발 컨벤션 문서화<br/>🎨로그인·회원가입 UI<br/>🛠️로그인·로그아웃·회원가입·회원탈퇴 API 연동 | 🎨카테고리·일기상세 UI<br/>🛠️카테고리·AI 답변&추천 API 연동 |


---

## ✨ 주요 기능

- **홈**: 오늘의 일정 체크리스트, 오늘의 질문(AI) 확인
- **캘린더**: 월간 캘린더에서 날짜별 일정·일기 확인, 일정 목록 모달
- **일정 관리**: 일정 등록/수정(반복 설정 포함), 카테고리 지정, 완료 처리
- **일기**: 일기 작성(사진 첨부), 일기 상세 조회 — 오늘의 질문 · AI 답변 · AI 추천 일정 포함
- **카테고리 관리**: 카테고리 등록/수정/삭제, 드래그 순서 변경(최대 5개)
- **통계 분석**: 월간 달성률, 완료/미완료 일정 조회, 카테고리별 통계
- **알림 설정**: 요일별 리마인드 알림 시간 설정, 푸시 알림(FCM) 등록
- **인증**: 로그인 / 회원가입(이메일 인증, 약관 동의 포함 멀티스텝) / 로그아웃 / 비밀번호 재설정 / 회원탈퇴, 토큰 자동 갱신
- **설정**: 사용자 정보 관리, 프로필/비밀번호 변경, 계정 탈퇴

---

## 🔧 기술 스택

| 구분           | 내용                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| 프레임워크     | Expo SDK 54 (React Native 0.81, React 19)                                                                  |
| 언어           | TypeScript                                                                                                 |
| 라우팅         | Expo Router (file-based routing)                                                                           |
| 스타일링       | NativeWind (Tailwind for RN)                                                                               |
| 상태 관리      | Zustand, TanStack Query                                                                                    |
| 네트워킹       | Axios                                                                                                      |
| 푸시 알림      | Firebase (FCM)                                                                                             |
| 배포           | EAS Build / Submit                                                                                         |
| 기타 라이브러리 | dayjs, react-native-calendars, react-native-draggable-flatlist, react-native-reanimated, expo-image-picker |

---

## ⚙️ 프로젝트 실행 방법

### 1️⃣ 의존성 설치

```bash
npm install
```

### 2️⃣ 환경 변수 설정 (.env)

EXPO_PUBLIC_API_BASE_URL="https://dailog.kro.kr"


### 3️⃣ 개발 서버 실행

```bash
npx expo start
```

### 4️⃣ Expo Go로 실행

1. 스마트폰에 **Expo Go** 앱 설치 (App Store / Google Play)
2. 터미널에 뜬 QR 코드를 Expo Go 앱으로 스캔

### 📱 iOS 베타 테스트 참여 (TestFlight)

iOS 사용자의 경우, **TestFlight** 앱 설치 후 하단 QR 코드를 스캔해 TestFlight 앱에서 베타 테스트에 참여할 수 있습니다.

<img width="200" height="200" alt="qr" src="https://github.com/user-attachments/assets/425dfc51-94fb-4ad4-8e7b-03b37c391317" />

---

## 📁 시스템 디렉토리 구조

`src/app/`은 페이지 라우팅과 관련된 파일, 그 외 컴포넌트·api·hook 등은 `src/` 아래 각 폴더에서 도메인 단위로 관리합니다.

```
DAILOG-FE/
├── src/
│ ├── api/ # 도메인별 axios 서비스
│ │ ├── baseApi.ts # 공통 axios 인스턴스
│ │ ├── authService.ts
│ │ ├── userService.ts
│ │ ├── categoryService.ts
│ │ ├── scheduleService.ts
│ │ ├── diaryService.ts
│ │ ├── alarmService.ts
│ │ ├── statsService.ts
│ │ └── aiService.ts
│ ├── app/ # 라우팅 (Expo Router)
│ │ ├── \_layout.tsx
│ │ ├── (auth)/ # login, signup, password, privacy-policy, terms-of-service
│ │ ├── (tabs)/ # index(홈), calendar, statistics, settings
│ │ └── (stacks)/ # alarm, category, diary, schedule, statistic
│ ├── components/
│ │ ├── common/ # Button, TextField, Header/, BottomTabBar, Toggle, Checkbox, ProgressBar 등
│ │ ├── home/
│ │ ├── auth/
│ │ ├── signup/ # SignupEmailStep, SignupCodeStep, SignupPasswordStep, SignupProfileStep, SignupTermsStep 등
│ │ ├── calendar/ # CalendarGrid, CalendarMenuBox, DiaryPanel, SchedulePanel, ThreadTab
│ │ ├── daily/ # DiaryDateCard, DiaryQuestionCard, DiaryTabBar, DiaryPhotoCard
│ │ ├── diaries/ # DiaryDetailCard
│ │ ├── password/ # PasswordEmailStep, PasswordCodeStep, PasswordResetStep
│ │ ├── schedule/ # RepeatTypeBox, ScheduleRepeatSummary
│ │ ├── settings/ # PillButton, PushAlarmCard
│ │ ├── statistics/ # MonthAchieveCard, CategoryBarChart, CategoryAccordion 등
│ │ └── modals/ # ModalPage, ModalBackground, DeleteConfirmModal + calendar/ category/ schedule/ settings/ 하위 모달
│ ├── constants/ # theme, categoryColors, inputLimits, timeWheelPicker
│ ├── hooks/
│ │ ├── queries/ # ai/ alarm/ category/ diaries/ schedules/ stats/ user/ — API별 useQuery 훅
│ │ ├── mutations/ # ai/ alarm/ auth/ category/ diaries/ schedules/ user/ — API별 useMutation 훅
│ │ └── schedules/ # useScheduleForm 등 폼 로직 훅
│ ├── lib/ # cn, queryClient, tokenStorage, pushNotifications
│ ├── store/ # auth/ modals/ toast/ (Zustand)
│ ├── types/ # ai/ alarm/ api/ auth/ calendar/ categories/ diaries/ modals/ schedules/ stats/ user/ — 도메인별 .types.ts, .mappers.ts
│ └── utils/ # formatDate, formatScheduleItem, formatReminderAlarm, getErrorMessage 등
├── assets/
├── app.config.ts
├── eas.json
└── package.json
```

---

## 📍 Front-End GitHub 협업

### ▷ Branch 전략

형식: `타입/이슈번호-작업내용` (ex. feature/12-ui-login)

### ▷ Commit 컨벤션

형식: `태그 : 커밋 내용` (ex. Feat: 로그인 화면 소셜 로그인 버튼 추가)

| 태그     | 의미                     |
| -------- | ------------------------ |
| Feat     | 새로운 기능 추가         |
| Fix      | 버그 수정                |
| UI       | UI 컴포넌트 추가/수정    |
| Design   | 스타일링 변경            |
| Docs     | 문서 수정                |
| Refactor | 코드 리팩토링            |
| Test     | 테스트 코드              |
| Chore    | 패키지 매니저, 기타 잡일 |
| Setting  | 환경설정, config 수정    |
| Build    | 빌드 관련                |
| Asset    | 리소스 추가/교체         |
| Comment  | 주석 작업                |
| Rename   | 파일/폴더명 변경         |
| Remove   | 파일 삭제                |
| Hotfix   | 긴급 버그 수정           |

---

## 📝 코드 스타일 컨벤션

- **절대경로 import**: `tsconfig.json`에 `@/` 경로를 설정해 사용 (`import { useAuthStore } from '@/store/auth/authStore'`)
- **함수 선언 방식**
  - 컴포넌트 / 커스텀 훅 / 순수 유틸 함수 → `export function Name() {}` (단독 export)
  - 서비스 객체 / 전역 상수 / Zustand 스토어 → `export const xxx = ...` (여러 값을 묶거나 값 자체를 할당)
- **TypeScript**: `any` 남용 지양, 타입 단언보다 타입 가드 사용 지향
- **파일 네이밍**

  | 대상          | 컨벤션                   | 예시                              |
  | ------------- | ------------------------ | --------------------------------- |
  | 컴포넌트 파일 | PascalCase               | `UserCard.tsx`                    |
  | 라우트 파일   | kebab-case               | `user-profile.tsx`                |
  | 동적 라우트   | 대괄호                   | `[userId].tsx`                    |
  | 훅 파일       | camelCase + `use` 접두사 | `useAuthStore.ts`                 |
  | 유틸/서비스   | camelCase                | `formatDate.ts`, `userService.ts` |
  | 타입 파일     | camelCase + `.types`     | `user.types.ts`                   |
  | 상수 파일     | camelCase                | `colors.ts`                       |
  | 상수 값       | UPPER_SNAKE_CASE         | `MAX_RETRY_COUNT`                 |
  | barrel export | `index.ts`               | `components/common/index.ts`      |

### API 연동 패턴

- 모든 API 코드는 `src/api/` 아래, **도메인 단위로 파일 하나씩** 분리 (`userService.ts`, `authService.ts` 등)
- 공통 axios 인스턴스는 `src/api/baseApi.ts` 하나만 사용
- API 요청/응답 타입은 `src/types/도메인폴더/도메인.types.ts`, 변환 어댑터는 `도메인.mappers.ts`에 정의

```typescript
// src/api/userService.ts
import { baseApi } from "@/api/baseApi";
import type { User } from "@/types/user/user.types";

export const userService = {
  getUser: (userId: string) =>
    baseApi.get<User>(`/users/${userId}`).then((res) => res.data),
};
```

```typescript
// src/hooks/queries/user/useGetMe.ts
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/api/userService";

export function useGetMe() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => userService.getUser("me"),
  });
}
```

---

## 📦 패키지 설치 컨벤션

- 라이브러리 이름이 `expo-`로 시작 → `npx expo install <패키지명>` (Expo SDK 버전에 맞는 의존성 자동 설치)
- 그 외 일반 JS/React 라이브러리 → `npm install <패키지명>`

```bash
npx expo install expo-camera
npm install axios
```

---

## 📱 화면 라우터 구조

### (auth) — 인증 그룹

| Route Path          | Screen                 | 주요 기능                                                       |
| ------------------- | ---------------------- | --------------------------------------------------------------- |
| `/login`            | `login.tsx`            | 로그인                                                          |
| `/signup`           | `signup.tsx`           | 회원가입 (이메일 인증 → 비밀번호 → 프로필 → 약관 동의 멀티스텝) |
| `/password`         | `password.tsx`         | 비밀번호 재설정 (이메일 인증 → 코드 확인 → 재설정 3단계)        |
| `/privacy-policy`   | `privacy-policy.tsx`   | 개인정보처리방침                                                |
| `/terms-of-service` | `terms-of-service.tsx` | 이용약관                                                        |

### (tabs) — 하단 탭 네비게이션

| Route Path    | Screen           | 주요 기능                                            |
| ------------- | ---------------- | ---------------------------------------------------- |
| `/`           | `index.tsx`      | 홈 — 오늘의 일정 체크리스트, 오늘의 질문             |
| `/calendar`   | `calendar.tsx`   | 캘린더 — 월간 캘린더, 날짜별 일기/일정 패널          |
| `/statistics` | `statistics.tsx` | 통계분석 — 월간 달성률, 카테고리별 통계              |
| `/settings`   | `settings.tsx`   | 설정 — 사용자 정보, 알림/카테고리/비밀번호 관리 진입 |

### (stacks) — 스택 네비게이션 (탭 위에 쌓이는 화면)

| Route Path               | Screen                      | 주요 기능                                         |
| ------------------------ | --------------------------- | ------------------------------------------------- |
| `/alarm`                 | `alarm/index.tsx`           | 알림 설정 (요일별 시간 설정)                      |
| `/category`              | `category/index.tsx`        | 카테고리 목록 (드래그 순서 변경, 최대 5개)        |
| `/category/add`          | `category/add.tsx`          | 카테고리 추가                                     |
| `/category/edit`         | `category/edit.tsx`         | 카테고리 수정/삭제                                |
| `/diary/[id]`            | `diary/[id].tsx`            | 일기 상세 (오늘의 질문·AI 답변·AI 추천 일정 포함) |
| `/diary/write`           | `diary/write.tsx`           | 일기 작성 (사진 첨부)                             |
| `/diary/recommendations` | `diary/recommendations.tsx` | AI 일정 추천                                      |
| `/schedule`              | `schedule/index.tsx`        | 일정 등록/수정 (카테고리·반복 설정 포함)          |
| `/statistic/detail`      | `statistic/detail.tsx`      | 일정 통계 상세                                    |
| `/statistic/incomplete`  | `statistic/incomplete.tsx`  | 미완료 일정 목록                                  |

---

## 🧩 컴포넌트 구조

### 공통 컴포넌트 (`src/components/common`)

| 컴포넌트명                                                          | 설명                                        | 사용 위치                             |
| ------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| `Button`                                                            | 공통 버튼                                   | 알림, 카테고리, 일정, 홈 등 다수 화면 |
| `TextField`                                                         | 입력 필드                                   | 카테고리 추가, 일정 등록              |
| `ScreenContainer`                                                   | 화면 공통 레이아웃 래퍼 (tab/stack variant) | 전체 화면                             |
| `TabScrollView`                                                     | 탭 화면 공통 스크롤 컨테이너                | 홈, 캘린더, 통계                      |
| `Header` (`BackHeader`/`DateHeader`/`LogoHeader`/`HeaderContainer`) | 상단 헤더 (뒤로가기/날짜/로고)              | 전체 화면                             |
| `BottomTabBar`                                                      | 하단 탭 바                                  | (tabs) 그룹                           |
| `Divider`                                                           | 구분선                                      | 다수 화면                             |
| `Toggle`                                                            | 스위치 토글                                 | 설정, 알림                            |
| `Checkbox`                                                          | 체크박스                                    | 일정 체크 항목                        |
| `ProgressBar`                                                       | 진행률 바                                   | 통계                                  |
| `CategoryChip`/`CategoryCircle`                                     | 카테고리 색상 칩/원                         | 카테고리, 일정, 일기                  |
| `DiaryCard`                                                         | 일기 카드                                   | 캘린더/일기 관련 화면                 |
| `ScheduleItem`                                                      | 일정 항목                                   | 홈, 통계, 일기 상세                   |
| `AddButton`/`AddScheduleButton`                                     | 추가 버튼                                   | 카테고리, 홈                          |
| `AnchoredDropdown`                                                  | 앵커 기반 드롭다운                          | 캘린더 등                             |
| `MonthPickerBox`                                                    | 월 선택 박스                                | 캘린더, 통계                          |
| `Toast`                                                             | 전역 토스트 알림                            | 전체 화면 (API 에러/성공 피드백)      |

### 도메인별 컴포넌트

| 도메인 폴더 | 주요 컴포넌트 | 사용 화면 |
|---|---|---|
| `calendar` | `CalendarGrid`, `CalendarMenuBox`, `DiaryPanel`<br/>`SchedulePanel`, `ThreadTab`, `DiaryThreadCard` | 캘린더 (`/calendar`) |
| `signup` | `SignupEmailStep`, `SignupCodeStep`, `SignupPasswordStep`<br/>`SignupProfileStep`, `SignupTermsStep`, `SignupProgressBar`<br/>`AgreementRow`, `PolicyDocument` | 회원가입 (`/signup`) |
| `password` | `PasswordEmailStep`, `PasswordCodeStep`, `PasswordResetStep` | 비밀번호 재설정 (`/password`) |
| `daily` | `DiaryDateCard`, `DiaryQuestionCard`, `DiaryEmptyState`<br/>`DiaryTabBar`, `DiaryPhotoCard` | 일기 작성/조회 (`/diary/write`, `/diary/[id]`) |
| `diaries` | `DiaryDetailCard` | 일기 상세 (`/diary/[id]`) |
| `schedule` | `RepeatTypeBox`, `ScheduleRepeatSummary` | 일정 등록/수정 (`/schedule`) |
| `statistics` | `MonthAchieveCard`, `MonthSelector`, `CategoryBarChart`<br/>`CategoryAccordion`, `MonthlyCategoryStatCard`, `ScheduleListGroup`<br/>`ScheduleRecommendSection`, `ScheduleStatSection`, `DetailToggleButton` | 통계분석 (`/statistics`, `/statistic/detail`, `/statistic/incomplete`) |
| `settings` | `PillButton`, `PushAlarmCard` | 설정 (`/settings`, `/alarm`) |
| `modals` | `ModalPage`, `ModalBackground`, `DeleteConfirmModal`<br/>`DatePickerModal`, `DatePickerGrid`, `DatePickerHeader`<br/>`DatePickerTabs`, `DatePickerRecurringPanel`, `ScheduleListModal`<br/>`DeleteCategoryModal`, `ChangePasswordModal`, `EditProfileModal`<br/>`DeleteAccountModal`, `SettingsModalContainer` | 전역 모달 (일정/캘린더/카테고리/설정) |

---
