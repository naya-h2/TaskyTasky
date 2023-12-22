import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import ModalFrame from './ModalFrame';
import { BLACK } from '@/styles/ColorStyles';
import { FONT_18 } from '@/styles/FontStyles';

interface Props {
  type: modalType;
}

function AlertModal({ type }: Props) {
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
      default:
        break;
    }
    return errorMsg;
  };

  const handleButtonClick = () => {};

  return (
    <ModalFrame type={type} title={''} height="High" btnFnc={handleButtonClick}>
      <ErrorMsgBox>
        <ErrorMsg>{getErrorMsg(type)}</ErrorMsg>
      </ErrorMsgBox>
    </ModalFrame>
  );
}

export default AlertModal;

const ErrorMsgBox = styled.div`
  padding: 20px 0;
`;

const ErrorMsg = styled.h1`
  ${FONT_18};
  color: ${BLACK[2]};
  text-align: center;
`;
