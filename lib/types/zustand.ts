export type modalType =
  | 'createColumn'
  | 'manageColumn'
  | 'card'
  | 'incorrectPWAlert'
  | 'deleteColumnAlert'
  | 'deleteCardAlert'
  | 'deleteCommentAlert'
  | 'dashBoard'
  | 'createTodo'
  | 'editTodo'
  | 'imgUrl'
  | 'duplicateEmailAlert'
  | 'signUpSuccessAlert'
  | 'signUpFailedAlert'
  | 'customAlert';

export interface ModalState {
  modals: modalType[];
  showModal: (type: modalType) => void;
  hideModal: (type: modalType) => void;
  clearModal: () => void;
}

export interface myboardPageState {
  dashboardSearch: string;
  myboardTotalPage: number;
  myboardPageNumber: number;
  calcTotalPage: (totalDataNum: number) => void;
  increasePage: (prev: number) => void;
  decreasePage: (prev: number) => void;
  setDashboardSearch: (word: string) => void;
}

export interface profileImgState {
  profileUrl: string;
  setProfileUrl: (src: string) => void;
}
