import { StateCreator } from 'zustand';
import { ModalState } from '@/lib/types/zustand';
import { CardType } from '@/lib/types/cards';

export const createModalSlice: StateCreator<ModalState> = (set) => ({
  modals: [],
  modalCard: <CardType>{},
  modalCardColumnTitle: '',
  isColumnChanged: false,
  isDashChanged: false,
  setModalCard: (value) => set((state) => ({ ...state, modalCard: { ...state.modalCard, ...value } })),
  setModalCardColumnTitle: (value) => set((state) => ({ ...state, modalCardColumnTitle: value })),
  setIsColumnChanged: () => set((state) => ({ ...state, isColumnChanged: !state.isColumnChanged })),
  setIsDashChanged: () => set((state) => ({ ...state, isDashChanged: !state.isDashChanged })),
  showModal: (type) => set((state) => ({ ...state, modals: [...state.modals, type] })),
  hideModal: (type) =>
    set((state) => ({ ...state, modals: [...state.modals.filter((modalType) => modalType !== type)] })),
  clearModal: () => set(() => ({ modals: [] })),
});
