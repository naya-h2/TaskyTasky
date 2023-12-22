import { useState } from 'react';
import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import { GREEN, PURPLE, ORANGE, BLUE, PINK } from '@/styles/ColorStyles';
import DashBoardColor from '../Chip/DashBoardColor';

interface Props {
  type: modalType;
}

function DashboardModal({ type }: Props) {
  const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK[1]];
  const initialColor = colors[0];
  const [color, setColor] = useState(initialColor);
  const handleButtonClick = () => {};

  return (
    <ModalFrame type={type} title={'새로운 대시보드'} height="Low" btnFnc={handleButtonClick}>
      <Input type="dashboard" />
      <StyledColorWrapper>
        <DashBoardColor selectedColor={color} setSelectedColor={setColor} />
      </StyledColorWrapper>
    </ModalFrame>
  );
}

export default DashboardModal;

const StyledColorWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`;
