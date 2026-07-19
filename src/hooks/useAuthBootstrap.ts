import { useEffect, useState } from "react";

import { tokenStorage } from "@/src/lib/tokenStorage";

type AuthBootstrapState = {
  isBootstrapping: boolean;
  isAuthenticated: boolean;
};

export function useAuthBootstrap(): AuthBootstrapState {
  const [state, setState] = useState<AuthBootstrapState>({
    isBootstrapping: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAuth() {
      const accessToken = await tokenStorage.getAccessToken();

      if (!isMounted) {
        return;
      }

      setState({
        isBootstrapping: false,
        isAuthenticated: Boolean(accessToken),
      });
    }

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
