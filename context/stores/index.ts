import { create } from 'zustand';
import { createModalSlice } from './modalSlice';
import { ModalState } from '@/lib/types/zustand';
// 공식문서
// SlicePattern: https://docs.pmnd.rs/zustand/guides/slices-pattern#slicing-the-store-into-smaller-stores
// TypeScript: https://docs.pmnd.rs/zustand/guides/typescript

export const useStore = create<ModalState>()((...a) => ({
  ...createModalSlice(...a),
}));
