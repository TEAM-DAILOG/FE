import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "dailog.accessToken";
const REFRESH_TOKEN_KEY = "dailog.refreshToken";
const PUSH_TOKEN_ID_KEY = "dailog.pushTokenId";

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

  setPushTokenId: (tokenId: number) =>
    SecureStore.setItemAsync(PUSH_TOKEN_ID_KEY, String(tokenId)),

  getPushTokenId: async () => {
    const value = await SecureStore.getItemAsync(PUSH_TOKEN_ID_KEY);
    return value ? Number(value) : null;
  },

  clearPushTokenId: () => SecureStore.deleteItemAsync(PUSH_TOKEN_ID_KEY),
};
