const { withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

// RN 0.75+는 Firebase iOS SDK를 Swift Package Manager로 해석한다.
// 그런데 SPM 경로에서는 @react-native-firebase가 앱 타겟에 FirebaseCore를
// 직접 링크해주지 못해, Expo가 AppDelegate에 넣는 Firebase 초기화 코드가
// "Undefined symbol: _OBJC_CLASS_$_FIRApp" 링커 에러를 낸다.
// CocoaPods 경로로 되돌리면 FirebaseCore가 Pods 엄브렐라를 통해 앱 타겟에
// 정상 링크된다. 이 전역 변수는 반드시 target 블록보다 앞에 있어야 한다.
const FLAG = "$RNFirebaseDisableSPM = true";

function withFirebaseDisableSPM(config) {
  return withDangerousMod(config, [
    "ios",
    (config) => {
      const podfilePath = path.join(
        config.modRequest.platformProjectRoot,
        "Podfile"
      );
      const contents = fs.readFileSync(podfilePath, "utf8");

      if (contents.includes(FLAG)) {
        return config;
      }

      const lines = contents.split("\n");
      const firstTargetIndex = lines.findIndex((line) =>
        /^\s*target\s/.test(line)
      );

      if (firstTargetIndex === -1) {
        throw new Error(
          "[withFirebaseDisableSPM] Podfile에서 target 블록을 찾지 못했습니다."
        );
      }

      lines.splice(firstTargetIndex, 0, FLAG, "");
      fs.writeFileSync(podfilePath, lines.join("\n"));

      return config;
    },
  ]);
}

module.exports = withFirebaseDisableSPM;
