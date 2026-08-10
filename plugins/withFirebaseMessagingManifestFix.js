const { withAndroidManifest } = require("@expo/config-plugins");

// expo-notifications가 등록하는 default_notification_color meta-data가
// @react-native-firebase/messaging 자체 매니페스트의 동일 meta-data(@color/white)와
// 충돌해 Android 매니페스트 병합이 실패하는 문제를 tools:replace로 해결해주는 플러그인
const TARGET_META_DATA_NAME =
  "com.google.firebase.messaging.default_notification_color";

function withFirebaseMessagingManifestFix(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    manifest.$["xmlns:tools"] = "http://schemas.android.com/tools";

    const application = manifest.application?.[0];
    const metaDataList = application?.["meta-data"];
    const target = metaDataList?.find(
      (item) => item.$["android:name"] === TARGET_META_DATA_NAME
    );

    if (target) {
      target.$["tools:replace"] = "android:resource";
    }

    return config;
  });
}

module.exports = withFirebaseMessagingManifestFix;
