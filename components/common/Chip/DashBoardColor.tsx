import { FormEvent, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import DoneIcon from '@/public/icon/done_Fillo.svg';
import { GREEN, PURPLE, ORANGE, BLUE, PINK, GRAY, RED, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useForm } from 'react-hook-form';
import { FONT_12, FONT_14 } from '@/styles/FontStyles';
import Button from '../Button';
import { colorCodeRules } from '@/lib/constants/inputErrorRules';

interface Props {
  theme: 'pastel' | 'vivid' | 'custom' | string;
  selectedColor: string;
  setSelectedColor: (value: SetStateAction<string>) => void;
  isInModal?: boolean;
}

/**
 * @param selectedColor 현재 선택된 색상.
 * @param setSelectedColor 색상을 선택할 때 호출되는 함수. 선택된 색상을 인수로 받습니다.
 */

function DashBoardColor({ theme, selectedColor, setSelectedColor, isInModal }: Props) {
  const PASTEL = [GREEN[0], PURPLE[0], ORANGE[0], BLUE[0], PINK[0]];
  const VIVID = [GREEN[1], PURPLE[1], ORANGE[1], BLUE[1], PINK[1]];
  const colors = theme === 'pastel' ? PASTEL : VIVID;
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const customColorCode = watch('customColor');
  const isError = errors.customColor ? true : false;

  return theme === 'custom' ? (
    <StyledInputWrapper>
      <StyledErrorWrapper>
        <StyledInput
          $isError={isError}
          {...register('customColor', colorCodeRules)}
          placeholder="#FFFFFF 형식으로 입력하세요"
        />
        {errors.customColor && <StyledErrorMsg>{errors.customColor.message}</StyledErrorMsg>}
      </StyledErrorWrapper>
      <StyledButtonWrapper>
        <Button.Plain
          style="primary"
          roundSize="L"
          isNotActive={isError || !customColorCode || selectedColor === customColorCode}
          onClick={() => {
            setSelectedColor(customColorCode);
          }}
        >
          확인
        </Button.Plain>
      </StyledButtonWrapper>
    </StyledInputWrapper>
  ) : (
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

const StyledInput = styled.input<{ $isError: boolean }>`
  width: 220px;
  padding: 10px;
  border: 1px solid ${GRAY[30]};
  border-radius: 15px;

  border-color: ${(props) => (props.$isError ? `${RED}` : null)};

  &:focus-within {
    border-color: ${VIOLET[1]};
  }
`;

const StyledInputWrapper = styled.div`
  height: 60px;

  display: flex;
  gap: 10px;
`;

const StyledErrorMsg = styled.div`
  padding-left: 5px;
  color: ${RED};
  ${FONT_12};
`;

const StyledButtonWrapper = styled.div`
  margin-top: 1px;
  width: 50px;
  height: 38px;
`;

const StyledErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
