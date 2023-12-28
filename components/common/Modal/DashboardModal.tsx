import { useRef, useState } from 'react';
import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import { GREEN, PURPLE, ORANGE, BLUE, PINK } from '@/styles/ColorStyles';
import DashBoardColor from '../Chip/DashBoardColor';
import { FieldValues, useForm } from 'react-hook-form';
import { createDashboard } from '@/api/dashboards/createDashboard';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/stores';

interface Props {
  type: modalType;
}

function DashboardModal({ type }: Props) {
  const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK[1]];
  const initialColor = colors[0];
  const [color, setColor] = useState(initialColor);
  const { hideModal } = useStore((state) => ({ hideModal: state.hideModal }));
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

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
      >
        <form onSubmit={handleSubmit((data) => addNewDashboard(data))}>
          <Input type="dashboard" register={register('newDashboard')} />
          <StyledColorWrapper>
            <DashBoardColor selectedColor={color} setSelectedColor={setColor} />
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
