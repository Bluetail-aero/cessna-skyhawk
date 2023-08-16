import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { persist, createJSONStorage } from 'zustand/middleware';

const authStore = createStore(persist((set) => ({
  accessToken: null,
  refreshToken: null,
  authSecret: null,
  setAuthToken: (accessToken) => set({ accessToken }),
  setRefreshToken: (refreshToken) => set({ refreshToken }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  logout: () => set({ accessToken: null, refreshToken: null }),
  setSecret: (authSecret) => set({ authSecret }),
}), {
  name: 'auth-storage',
  storage: createJSONStorage(() => localStorage),
}));

const useAuthStore = (selector) => useStore(authStore, selector);

export {
  authStore, useAuthStore,
};
