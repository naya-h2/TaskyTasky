import { StateCreator } from 'zustand';
import { profileImgState } from '@/lib/types/zustand';

export const createProfileImgSlice: StateCreator<profileImgState> = (set) => ({
  profileUrl: '',
  setProfileUrl: (src) => set((state) => ({ ...state, profileUrl: src })),
});
