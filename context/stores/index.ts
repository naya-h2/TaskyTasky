import { create } from 'zustand';
import { createModalSlice } from './modalSlice';
import { createMyboardPageSlice } from './myboardPageSlice';
import { createProfileImgSlice } from './profileImgSlice';
import { ModalState, myboardPageState, profileImgState } from '@/lib/types/zustand';
// 공식문서
// SlicePattern: https://docs.pmnd.rs/zustand/guides/slices-pattern#slicing-the-store-into-smaller-stores
// TypeScript: https://docs.pmnd.rs/zustand/guides/typescript

type SliceType = ModalState & myboardPageState & profileImgState;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createMyboardPageSlice(...a),
  ...createProfileImgSlice(...a),
}));
