import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import { FONT_14 } from '@/styles/FontStyles';
import { GRAY } from '@/styles/ColorStyles';
import AlertModal from './AlertModal';

interface Props {
  type: modalType;
}

function ColumnModal({ type }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleDeleteClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  const handleButtonClick = () => {};

  return (
    <ModalFrame
      type={type}
      title={type === 'createColumn' ? '새 컬럼 생성' : '컬럼 관리'}
      height="Mid"
      btnFnc={handleButtonClick}
    >
      <Input type="name" />
      {type === 'manageColumn' && (
        <StyledDeleteButton onClick={() => handleDeleteClick('deleteColumnAlert')}>삭제하기</StyledDeleteButton>
      )}
      {modal[modal.length - 1] === 'deleteColumnAlert' && <AlertModal type="deleteColumnAlert" />}
    </ModalFrame>
  );
}

export default ColumnModal;

const StyledDeleteButton = styled.button`
  position: absolute;
  bottom: -75px;
  ${FONT_14};
  font-weight: 400;
  color: ${GRAY[40]};
  text-decoration-line: underline;
  background-color: white;
`;
