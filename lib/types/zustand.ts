import { CardType } from './cards';
import { UserType } from './users';

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
  | 'customAlert'
  | 'profile'
  | 'editPassword'
  | 'invite'
  | 'inviteAlert'
  | 'imgError';

export interface ModalState {
  modals: modalType[];
  modalCard: CardType;
  modalCardColumnTitle: string;
  isColumnChanged: boolean;
  setModalCard: (value: CardType) => void;
  setModalCardColumnTitle: (value: string) => void;
  setIsColumnChanged: () => void;
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
  profileUrl: string | null;
  setProfileUrl: (src: string | null) => void;
  cardUrl: string | undefined;
  setCardUrl: (src: string | undefined) => void;
}

export interface AuthState {
  authToken: string;
  isLoading: boolean;
  error: null | string;
  user: null | UserType;
  setAuthToken: (token: string) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setUser: (user: UserType | null) => void;
}
