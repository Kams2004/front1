// authStore.js
import create from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userRole: null,
  accessToken: null,
  sessionId: null,
  setAuth: (authData) => set({
    isAuthenticated: true,
    userRole: authData.role,
    accessToken: authData.accessToken,
    sessionId: authData.sessionId,
  }),
  clearAuth: () => set({
    isAuthenticated: false,
    userRole: null,
    accessToken: null,
    sessionId: null,
  }),
}));

export default useAuthStore;
