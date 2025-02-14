import { create } from "zustand";

const useSyncStore = create((set) => ({
  data: null,

  updateData: (newData) => set({ data: newData }),

  resetData: () => set({ data: null }),
}));

export default useSyncStore;
