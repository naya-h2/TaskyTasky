import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import ModalFrame from './ModalFrame';
import { BLACK } from '@/styles/ColorStyles';
import { FONT_18 } from '@/styles/FontStyles';
import { ReactNode } from 'react';
import { useStore } from '@/context/stores';
<<<<<<< feature/GlobalState
import { useRouter } from 'next/router';
=======
>>>>>>> develop

interface Props {
  type: modalType;
  children?: ReactNode;
<<<<<<< feature/GlobalState
  isSuccess?: boolean;
}

function AlertModal({ type, children, isSuccess }: Props) {
=======
}

function AlertModal({ type, children }: Props) {
>>>>>>> develop
  const { clearModal } = useStore((state) => ({
    clearModal: state.clearModal,
  }));
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

<<<<<<< feature/GlobalState
  const router = useRouter();

  const handleButtonClick = (type: string, status?: string) => {  // status 매개변수를 추가합니다.
    if (type === 'customAlert') {
      clearModal();
      if ((router.pathname === '/login' || '/signup') && isSuccess) {  // 로그인 성공 시에만 페이지 이동합니다.
        router.push('/myboard');
      }
=======
  const handleButtonClick = (type: string) => {
    if (type === 'customAlert') {
      clearModal();
>>>>>>> develop
    }
  };

  return (
    <ModalFrame type={type} title={''} height="High" btnFnc={() => handleButtonClick(type)}>
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
