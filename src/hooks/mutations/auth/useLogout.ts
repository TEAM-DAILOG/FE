import { useMutation } from "@tanstack/react-query";

import { logout } from "@/src/utils/logout";

export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: logout,
    meta: {
      skipGlobalErrorToast: true,
    },
  });
}
