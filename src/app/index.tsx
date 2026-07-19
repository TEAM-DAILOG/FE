import { Redirect } from "expo-router";

import { useAuthBootstrap } from "@/src/hooks/useAuthBootstrap";

export default function IndexScreen() {
  const { isBootstrapping, isAuthenticated } = useAuthBootstrap();

  if (isBootstrapping) {
    return null;
  }

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/login"} />;
}
