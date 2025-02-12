import { create } from "zustand";

const useAuthStore = create((set) => ({
  auth: null,
  setAuth: (authData) => set({ auth: authData }),
}));

export default useAuthStore;
