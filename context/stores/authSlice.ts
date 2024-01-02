import { StateCreator } from 'zustand';
import { AuthState } from '@/lib/types/zustand';
import { UserType } from '@/lib/types/users';

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  authToken: '',
  isLoading: false,
  error: null,
  user: null,
  setAuthToken: (token: string) => set({ authToken: token }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string) => set({ error: error }),
  setUser: (user: UserType) => set({ user: user }),
});
