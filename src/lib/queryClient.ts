import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { useToastStore } from "@/src/store/toast/toastStore";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      useToastStore.getState().showToast(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      useToastStore.getState().showToast(getErrorMessage(error));
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});
