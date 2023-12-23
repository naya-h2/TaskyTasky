export type modalType =
  | 'createColumn'
  | 'manageColumn'
  | 'card'
  | 'incorrectPWAlert'
  | 'deleteColumnAlert'
  | 'deleteCardAlert'
  | 'deleteCommentAlert'
  | 'dashBoard';

export interface ModalState {
  modals: modalType[];
  showModal: (type: modalType) => void;
  hideModal: (type: modalType) => void;
  clearModal: () => void;
}
