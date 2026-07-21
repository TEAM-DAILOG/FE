import { useEffect, useState } from "react";

import { tokenStorage } from "@/src/lib/tokenStorage";
import { useAuthStore } from "@/src/store/auth/authStore";

type AuthBootstrapState = {
  isBootstrapping: boolean;
};

export function useAuthBootstrap(): AuthBootstrapState {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const [state, setState] = useState<AuthBootstrapState>({
    isBootstrapping: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAuth() {
      const accessToken = await tokenStorage.getAccessToken();

      if (!isMounted) {
        return;
      }

      setAuthenticated(Boolean(accessToken));
      setState({
        isBootstrapping: false,
      });
    }

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, [setAuthenticated]);

  return state;
}
