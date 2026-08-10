import type { ExpoConfig } from "expo/config";

const isProductionBuild = process.env.EAS_BUILD_PROFILE === "production";

const config: ExpoConfig = {
  name: "DAILOG",
  slug: "dailog",
  version: "1.0.3",
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
