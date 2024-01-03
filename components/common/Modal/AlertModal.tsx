import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import ModalFrame from './ModalFrame';
import { BLACK } from '@/styles/ColorStyles';
import { FONT_18 } from '@/styles/FontStyles';
import { ReactNode } from 'react';
import { useStore } from '@/context/stores';
import { useRouter } from 'next/router';
import { deleteCard } from '@/api/cards/deleteCard';
import { deleteColumn } from '@/api/columns/deleteColumn';
import { deleteComment } from '@/api/comments/deleteComment';

interface Props {
  type: modalType;
  customName?: modalType;
  children?: ReactNode;
  isSuccess?: boolean;
  cardId?: number;
  columnID?: number;
  commentId?: number;
}

function AlertModal({ type, children, isSuccess, customName, cardId, columnID, commentId }: Props) {
  const { clearModal, hideModal } = useStore((state) => ({
    clearModal: state.clearModal,
    hideModal: state.hideModal,
  }));

  const router = useRouter();
  const setIsColumnChanged = useStore((state) => state.setIsColumnChanged);
  const setIsCommentChanged = useStore((state) => state.setIsCommentChanged);

  const getErrorMsg = (type: modalType): string | undefined => {
    let errorMsg;
    switch (type) {
      case 'incorrectPWAlert':
        errorMsg = '비밀번호가 일치하지 않습니다.';
        break;
      case 'deleteColumnAlert':
        errorMsg = '컬럼의 모든 카드가 삭제됩니다.';
        break;
      case 'deleteCardAlert':
        errorMsg = '현재 카드가 삭제됩니다.';
        break;
      case 'deleteCommentAlert':
        errorMsg = '현재 댓글이 삭제됩니다.';
        break;
      case 'duplicateEmailAlert':
        errorMsg = '이미 사용 중인 이메일입니다.';
        break;
      case 'signUpSuccessAlert':
        errorMsg = '회원가입이 성공적으로 완료되었습니다.';
        break;
      case 'signUpFailedAlert':
        errorMsg = '회원가입에 실패했습니다. 다시 시도해 주세요.';
        break;
      default:
        break;
    }
    return errorMsg;
  };

  const handleButtonClick = async () => {
    if (customName) return hideModal(customName);
    if (type === 'customAlert') {
      clearModal();
      if ((router.pathname === '/login' || '/signup') && isSuccess) {
        router.push('/myboard');
      }
      return;
    }
    if (type === 'deleteCardAlert' && cardId) {
      await deleteCard(cardId);
      setIsColumnChanged();
      clearModal();
      return;
    }
    if (type === 'deleteColumnAlert' && columnID) {
      await deleteColumn(columnID);
      setIsColumnChanged();
      clearModal();
      return;
    }
    if (type === 'deleteCommentAlert' && commentId) {
      await deleteComment(commentId);
      setIsCommentChanged();
      hideModal('deleteCommentAlert');
    }
  };

  return (
    <ModalFrame type={type} title={''} height="High" btnFnc={handleButtonClick}>
      <ErrorMsgBox>
        <ErrorMsg>{type === 'customAlert' ? children : getErrorMsg(type)}</ErrorMsg>
      </ErrorMsgBox>
    </ModalFrame>
  );
}

export default AlertModal;

const ErrorMsgBox = styled.div`
  padding: 32px 0 16px;
`;

const ErrorMsg = styled.h1`
  ${FONT_18};
  color: ${BLACK[2]};
  text-align: center;
`;
