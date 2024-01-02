import { useState } from 'react';
import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import DashBoardColor from '../Chip/DashBoardColor';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { createDashboard } from '@/api/dashboards/createDashboard';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/stores';
import { ERROR_MSG } from '@/lib/constants/inputErrorMsg';

interface Props {
  type: modalType;
}

function DashboardModal({ type }: Props) {
  const { push } = useRouter();
  const [color, setColor] = useState('');
  const { hideModal } = useStore((state) => ({ hideModal: state.hideModal }));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const nameValue = watch('newDashboard');
  const isAllSelected = nameValue && color;

  const addNewDashboard = async (data: FieldValues) => {
    const body = { title: data.newDashboard, color };
    const response = await createDashboard(body);
    hideModal('dashBoard');
    push(`/board/${response.id}`);
  };

  return (
    <>
      <ModalFrame
        type={type}
        title={'새로운 대시보드'}
        height="Low"
        btnFnc={handleSubmit((data) => addNewDashboard(data))}
        disabledBtn={!isAllSelected}
      >
        <form onSubmit={handleSubmit((data) => addNewDashboard(data))}>
          <Input
            type="dashboard"
            register={register('newDashboard', { required: ERROR_MSG.emptyDashboardName })}
            error={errors.newDashboard}
            isHookForm
          />
          <StyledColorWrapper>
            <DashBoardColor selectedColor={color} setSelectedColor={setColor} isInModal={true} />
          </StyledColorWrapper>
        </form>
      </ModalFrame>
    </>
  );
}

export default DashboardModal;

const StyledColorWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;
