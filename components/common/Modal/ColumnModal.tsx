import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import { FONT_14 } from '@/styles/FontStyles';
import { GRAY } from '@/styles/ColorStyles';
import { createColumn } from '@/api/columns/createColumn';
import { editColumn } from '@/api/columns/editColumn';
import { PostColumnRequestType, PutColumnRequestType } from '@/lib/types/columns';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  type: modalType;
  dashboardID?: number;
  columnID?: number;
  columnName?: string;
}

function ColumnModal({ type, dashboardID, columnID, columnName }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const hideModal = useStore((state) => state.hideModal);
  const setIsColumnChanged = useStore((state) => state.setIsColumnChanged);

  const { register, handleSubmit } = useForm();

  const addNewColumn = async (data: FieldValues) => {
    if (!data.newColumn || !dashboardID) return;
    const body: PostColumnRequestType = { title: data.newColumn, dashboardId: dashboardID };
    const response = await createColumn(body);
    setIsColumnChanged();
    hideModal('createColumn');
  };

  const manageColumn = async (data: FieldValues) => {
    if (!data.editColumn || !columnID) return;
    const body: PutColumnRequestType = { title: data.editColumn };
    const response = await editColumn(columnID, body);
    setIsColumnChanged();
    hideModal('manageColumn');
  };

  const deleteColumn = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  return (
    <ModalFrame
      type={type}
      title={type === 'createColumn' ? '새 컬럼 생성' : '컬럼 관리'}
      height="Mid"
      btnFnc={handleSubmit((data) => (type === 'createColumn' ? addNewColumn(data) : manageColumn(data)))}
    >
      {type === 'manageColumn' && (
        <StyledDeleteButton onClick={() => deleteColumn('deleteColumnAlert')}>삭제하기</StyledDeleteButton>
      )}
      {type === 'manageColumn' ? (
        <form onSubmit={handleSubmit((data) => manageColumn(data))}>
          <Input type="name" register={register('editColumn')} isHookForm defaultValue={columnName} />
        </form>
      ) : (
        <form onSubmit={handleSubmit((data) => addNewColumn(data))}>
          <Input type="name" register={register('newColumn')} isHookForm />
        </form>
      )}
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

  cursor: pointer;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    bottom: -30px;
  }
`;
