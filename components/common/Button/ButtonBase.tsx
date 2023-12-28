import { BLACK, GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const ROUND_SIZE = {
  L: '8px',
  M: '6px',
  S: '4px',
};

export interface BaseProps {
  style?: 'primary' | 'secondary' | 'outline';
  roundSize: 'L' | 'M' | 'S';
  isNotActive?: boolean;
  children?: ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
}

function ButtonBase({ style = 'outline', roundSize, isNotActive = false, children, onClick, type }: BaseProps) {
  return (
    <StyledButtonBase $style={style} $isNotActive={isNotActive} $roundSize={roundSize} onClick={onClick} type={type}>
      {children}
    </StyledButtonBase>
  );
}

export default ButtonBase;

const inactive = css`
  background-color: ${GRAY[40]};

  color: ${WHITE};

  &:hover {
    background-color: ${GRAY[40]};
    cursor: not-allowed;
  }
`;

const primary = css`
  background-color: ${VIOLET[1]};

  color: ${WHITE};

  &:hover {
    background-color: ${VIOLET[2]};
  }
`;

const secondary = css`
  background-color: ${WHITE};
  border: 1px solid ${GRAY[30]};

  color: ${VIOLET[1]};

  &:hover {
    background-color: ${VIOLET[8]};
  }
`;

export const outline = css`
  ${secondary};

  color: ${BLACK[2]};

  &:hover {
    background-color: ${GRAY[15]};
  }
`;

const StyledButtonBase = styled.button<{
  $style: 'primary' | 'secondary' | 'outline';
  $isNotActive: boolean;
  $roundSize: 'L' | 'M' | 'S';
}>`
  width: 100%;
  height: 100%;

  border-radius: ${({ $roundSize }) => ROUND_SIZE[`${$roundSize}`]};

  ${({ $isNotActive, $style }) => {
    if ($isNotActive) return inactive;
    if ($style === 'primary') return primary;
    if ($style === 'secondary') return secondary;
    if ($style === 'outline') return outline;
  }}
`;
