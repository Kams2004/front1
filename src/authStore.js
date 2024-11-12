import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  userRole: null,
  accessToken: null,
  sessionId: null,
  userId: null, // Added userId to state

  // Function to set authentication data
  setAuth: (authData) => {
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('sessionId', authData.sessionId);
    localStorage.setItem('userId', authData.id); // Store userId in local storage

    set({
      isAuthenticated: true,
      userRole: authData.role,
      accessToken: authData.accessToken,
      sessionId: authData.sessionId,
      userId: authData.id, // Store userId in Zustand state
    });
  },

  // Function to clear authentication data
// Clear all data from Zustand store and localStorage on logout
clearAuth: () => {
  localStorage.clear(); // Clear all items from localStorage
  set({
      isAuthenticated: false,
      userRole: null,
      accessToken: null,
      sessionId: null,
      userId: null,
  });
},

}));

export default useAuthStore;
