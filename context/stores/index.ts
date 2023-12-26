import { create } from 'zustand';
import { createModalSlice } from './modalSlice';
import { createMyboardPageSlice } from './myboardPageSlice';
import { ModalState, myboardPageState } from '@/lib/types/zustand';
// 공식문서
// SlicePattern: https://docs.pmnd.rs/zustand/guides/slices-pattern#slicing-the-store-into-smaller-stores
// TypeScript: https://docs.pmnd.rs/zustand/guides/typescript

type SliceType = ModalState & myboardPageState;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createMyboardPageSlice(...a),
}));
