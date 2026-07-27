import {
  PolicyDocument,
  PRIVACY_POLICY_DOCUMENT,
} from "@/src/components/signup";

export default function PrivacyPolicyScreen() {
  return <PolicyDocument document={PRIVACY_POLICY_DOCUMENT} />;
}
