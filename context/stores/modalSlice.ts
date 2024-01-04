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
  modalCardComment: '',
  cardCommentId: 0,
  isCommentChanged: false,
  todoModalDescription: '',
  setModalCardComment: (value) => set((state) => ({ ...state, modalCardComment: value })),
                                                                      setCardCommentId: (value) => set((state) => ({ ...state, cardCommentId: value })),
  setIsCommentChanged: () => set((state) => ({ ...state, isCommentChanged: !state.isCommentChanged })),
  setTodoModalDescription: (value) => set((state) => ({ ...state, todoModalDescription: value })),
  showModal: (type) => set((state) => ({ ...state, modals: [...state.modals, type] })),
  hideModal: (type) =>
    set((state) => ({ ...state, modals: [...state.modals.filter((modalType) => modalType !== type)] })),
  clearModal: () => set(() => ({ modals: [] })),      
  