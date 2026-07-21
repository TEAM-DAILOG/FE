import {
  PolicyDocument,
  TERMS_OF_SERVICE_DOCUMENT,
} from "@/src/components/signup";

export default function TermsOfServiceScreen() {
  return <PolicyDocument document={TERMS_OF_SERVICE_DOCUMENT} />;
}
