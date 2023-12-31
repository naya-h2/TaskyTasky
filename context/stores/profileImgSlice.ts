import { StateCreator } from 'zustand';
import { profileImgState } from '@/lib/types/zustand';

export const createProfileImgSlice: StateCreator<profileImgState> = (set) => ({
  profileUrl: null,
  setProfileUrl: (src) => set((state) => ({ ...state, profileUrl: src })),
  cardUrl: null,
  setCardUrl: (src) => set((state) => ({ ...state, cardUrl: src })),
});
