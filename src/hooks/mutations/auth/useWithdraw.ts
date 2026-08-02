import { useMutation } from "@tanstack/react-query";

import { authService } from "@/src/api/authService";
import { clearLocalSession } from "@/src/utils/logout";

export function useWithdraw() {
  return useMutation<null, Error, void>({
    mutationFn: authService.withdraw,
    onSuccess: async () => {
      await clearLocalSession();
    },
  });
}
