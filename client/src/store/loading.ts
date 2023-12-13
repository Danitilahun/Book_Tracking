import { create } from "zustand";

type LoadingStore = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export default useLoadingStore;
