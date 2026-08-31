import type { ExpoConfig } from "expo/config";

const isProductionBuild = process.env.EAS_BUILD_PROFILE === "production";

const config: ExpoConfig = {
  name: "DAILOG",
  slug: "dailog",
  version: "1.0.4",
  orientation: "portrait",
  icon: "./assets/images/appLogo.png",
  scheme: "dailog",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.hyochan02steam.dailog",
    googleServicesFile: "./GoogleService-Info.plist",
    entitlements: {
      "aps-environment": isProductionBuild ? "production" : "development",
    },
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      UIBackgroundModes: ["remote-notification"],
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#4D826C",
      foregroundImage: "./assets/images/appLogo.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.hyochan02steam.dailog",
    googleServicesFile: "./google-services.json",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/typoLogo.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#F5F9F6",
      },
    ],
    "expo-secure-store",
    [
      "expo-image-picker",
      {
        photosPermission:
          "선택한 사진은 작성 중인 일기 게시물에 첨부되어 저장되거나, 프로필 사진으로 설정하는 데 사용됩니다. 예를 들어 오늘의 일기에 사진을 추가하거나 마이페이지에서 프로필 사진을 변경할 때 사진 보관함에 접근합니다.",
        cameraPermission: false,
        microphonePermission: false,
      },
    ],
    "@react-native-firebase/app",
    "@react-native-firebase/messaging",
    "./plugins/withFirebaseMessagingManifestFix.js",
    [
      "expo-notifications",
      {
        icon: "./assets/images/notificationIcon.png",
        color: "#4D826C",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "a85bdfbf-c654-486d-ad33-18a1387ebd36",
    },
  },
};

export default config;
