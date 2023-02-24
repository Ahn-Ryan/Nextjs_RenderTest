import { create } from 'zustand';

interface TState {
  scrollTop: number;
  scrollDirection: string;
  setScrollTop: (payload: number) => void;
  setScrollDirection: (payload: string) => void;
}

export const useScrollStore = create<TState>(set => ({
  // State
  scrollTop: 0,
  scrollDirection: 'default',
  // Set State
  setScrollTop: payload => set({ scrollTop: payload }),
  setScrollDirection: payload => set({ scrollDirection: payload }),
}));
