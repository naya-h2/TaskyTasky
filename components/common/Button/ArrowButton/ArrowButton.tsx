import styled, { css } from 'styled-components';
import { WHITE } from '@/styles/ColorStyles';
import { outline } from '../ButtonBase';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ForwordIcon from '@/public/icon/arrow_forward.svg';
import BackwordIcon from '@/public/icon/arrow_backward.svg';

interface Props {
  type: 'left' | 'right';
  isNotActive?: boolean;
  onClick?: () => void;
}

export function ArrowButton({ type, isNotActive = false, onClick }: Props) {
  return (
    <StyledArrowButton $type={type} $isNotActive={isNotActive} onClick={onClick}>
      {type === 'left' ? <BackwordIcon /> : <ForwordIcon />}
    </StyledArrowButton>
  );
}

const arrowInactive = css`
  opacity: 55%;

  &:hover {
    background-color: ${WHITE};
    cursor: not-allowed;
  }
`;

const StyledArrowButton = styled.button<{ $type: string; $isNotActive: boolean }>`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${outline};
  border-radius: ${({ $type }) => ($type === 'right' ? ' 0 4px 4px 0' : '4px 0 0 4px')};
  ${({ $isNotActive }) => ($isNotActive ? arrowInactive : null)};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 36px;
    height: 36px;
  }
`;
