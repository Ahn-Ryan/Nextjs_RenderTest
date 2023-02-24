import { create } from 'zustand';

type TSelectType = 'all' | 'brand' | 'model_group' | 'model';

interface TState {
  selectType: TSelectType;
  selectId: string;
  currentPage: number;
  currentPageSet: Array<number>;
  pageNumbers: Array<number>;
  setSelectType: (payload: TSelectType) => void;
  setSelectId: (payload: string) => void;
  setCurrentPage: (payload: number) => void;
  setCurrentPageSet: (payload: Array<number>) => void;
  setPageNumbers: (payload: Array<number>) => void;
}

export const useMainStore = create<TState>(set => ({
  // State
  selectType: 'all',
  selectId: '',
  currentPage: 1,
  currentPageSet: [],
  pageNumbers: [],
  // Set State
  setSelectType: payload => set({ selectType: payload }),
  setSelectId: payload => set({ selectId: payload }),
  setCurrentPage: payload => set({ currentPage: payload }),
  setCurrentPageSet: payload => set({ currentPageSet: payload }),
  setPageNumbers: payload => set({ pageNumbers: payload }),
}));
