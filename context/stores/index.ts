import { create } from 'zustand';
import { createModalSlice } from './modalSlice';
import { createMyboardPageSlice } from './myboardPageSlice';
import { createProfileImgSlice } from './profileImgSlice';
import { createAuthSlice } from './authSlice';
import { ModalState, myboardPageState, profileImgState, AuthState } from '@/lib/types/zustand';

type SliceType = ModalState & myboardPageState & profileImgState & AuthState;

export const useStore = create<SliceType>()((...a) => ({
  ...createModalSlice(...a),
  ...createMyboardPageSlice(...a),
  ...createProfileImgSlice(...a),
  ...createAuthSlice(...a),
}));
