import { useStore } from 'zustand';
import { createStore } from 'zustand/vanilla';

const AUTH_STATUS = {
  LOGGED_OUT: 0,
  LOGGED_IN: 1,
};

// This is a store that holds the login token and refresh token for use throughout the application
// This store is used outside of React, so it specified as 'vanilla' and then imported into a hook
const authStore = createStore((set) => ({
  authState: AUTH_STATUS.LOGGED_IN,
  setAuthState: (authState) => set({ authState }),
  logout: () => set({ authState: 0, }),
}));

const useAuthStore = (selector) => useStore(authStore, selector);

const selectIsAuthenticated = (state) => state.authState === AUTH_STATUS.LOGGED_IN;

export {
  authStore, useAuthStore, selectIsAuthenticated, AUTH_STATUS
};
