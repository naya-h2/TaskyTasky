import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import { FONT_14 } from '@/styles/FontStyles';
import { GRAY } from '@/styles/ColorStyles';
import { createColumn } from '@/api/columns/createColumn';
import { FieldValues, useForm } from 'react-hook-form';
import { PostCardRequestType } from '@/lib/types/cards';
import { PostColumnRequestType } from '@/lib/types/columns';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  type: modalType;
  dashboardID: number;
  refreshColumn: () => void;
}

function ColumnModal({ type, dashboardID, refreshColumn }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const hideModal = useStore((state) => state.hideModal);

  const { register, handleSubmit } = useForm();

  const handleDeleteClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  const addNewColumn = async (data: FieldValues) => {
    const body: PostColumnRequestType = { title: data.newColumn, dashboardId: dashboardID };
    const response = await createColumn(body);
    refreshColumn();
    hideModal('createColumn');
  };

  return (
    <ModalFrame
      type={type}
      title={type === 'createColumn' ? '새 컬럼 생성' : '컬럼 관리'}
      height="Mid"
      btnFnc={handleSubmit((data) => addNewColumn(data))}
    >
      {type === 'manageColumn' && (
        <StyledDeleteButton onClick={() => handleDeleteClick('deleteColumnAlert')}>삭제하기</StyledDeleteButton>
      )}
      <form onSubmit={handleSubmit((data) => addNewColumn(data))}>
        <Input type="name" register={register('newColumn')} />
      </form>
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
