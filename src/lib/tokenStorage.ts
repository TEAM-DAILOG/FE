import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "dailog.accessToken";
const REFRESH_TOKEN_KEY = "dailog.refreshToken";

export const tokenStorage = {
  setTokens: async (accessToken: string, refreshToken: string) => {
    await Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken),
    ]);
  },

  setAccessToken: (accessToken: string) =>
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),

  getAccessToken: () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY),

  getRefreshToken: () => SecureStore.getItemAsync(REFRESH_TOKEN_KEY),

  clearTokens: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  },
};
