import styled, { css } from 'styled-components';
import { WHITE } from '@/styles/ColorStyles';
import { outline } from '../ButtonBase';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ForwardIcon from '@/public/icon/arrow_forward.svg';
import BackwardIcon from '@/public/icon/arrow_backward.svg';
import DoubleBackward from '@/public/icon/double-small-left.svg';
import DoubleForward from '@/public/icon/double-small-right.svg';

interface Props {
  type: 'left' | 'right' | 'double_left' | 'double_right';
  isNotActive?: boolean;
  onClick?: () => void;
}

export function ArrowButton({ type, isNotActive = false, onClick }: Props) {
  return (
    <StyledArrowButton $type={type} $isNotActive={isNotActive} onClick={onClick} disabled={isNotActive}>
      {type === 'left' && <BackwardIcon />}
      {type === 'right' && <ForwardIcon />}
      {type === 'double_left' && <DoubleBackward />}
      {type === 'double_right' && <DoubleForward />}
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
  border-radius: ${({ $type }) => ($type === 'right' ? ' 0 8px 8px 0' : '8px 0 0 8px')};
  ${({ $isNotActive }) => ($isNotActive ? arrowInactive : null)};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 36px;
    height: 36px;
  }
`;
