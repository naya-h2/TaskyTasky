import { SetStateAction } from 'react';
import styled from 'styled-components';
import DoneIcon from '@/public/icon/done_Fillo.svg';
import { GREEN, PURPLE, ORANGE, BLUE, PINK } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  selectedColor: string;
  setSelectedColor: (value: SetStateAction<string>) => void;
  isInModal?: boolean;
}

/**
 * @param selectedColor 현재 선택된 색상.
 * @param setSelectedColor 색상을 선택할 때 호출되는 함수. 선택된 색상을 인수로 받습니다.
 */

function DashBoardColor({ selectedColor, setSelectedColor, isInModal }: Props) {
  const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK[1]];

  return (
    <StyledContainer>
      {colors.map((color) => (
        <StyledColorBox
          key={color}
          onClick={() => setSelectedColor(color)}
          $color={color}
          $isSelected={selectedColor === color}
          style={isInModal ? { display: 'flex' } : {}}
        >
          {selectedColor === color && <DoneIcon />}
        </StyledColorBox>
      ))}
    </StyledContainer>
  );
}

export default DashBoardColor;

const StyledContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledColorBox = styled.div<{ $isSelected: boolean; $color: string }>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color};
  cursor: pointer;
  border-radius: 50%;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 28px;
    height: 28px;

    display: ${(props) => (props.$isSelected ? 'flex' : 'none')};
  }
`;
