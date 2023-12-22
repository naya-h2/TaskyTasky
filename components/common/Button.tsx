import styled, { css } from 'styled-components';
import { ReactNode } from 'react';
import AddChip from '@/components/common/Chip/AddChip';
import { BLACK, BLUE, GRAY, GREEN, ORANGE, PINK, PURPLE, VIOLET, WHITE } from '@/styles/ColorStyles';
import { FONT_12, FONT_14, FONT_16, FONT_18 } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ForwordIcon from '@/public/icon/arrow_forward.svg';
import BackwordIcon from '@/public/icon/arrow_backward.svg';
import Crown from '@/public/icon/crown.svg';

const FONT_SIZE = {
  XL: FONT_18,
  L: FONT_16,
  M: FONT_14,
  S: FONT_12,
};

const ROUND_SIZE = {
  L: '8px',
  M: '6px',
  S: '4px',
};

const CHIP_COLOR = {
  green: GREEN,
  purple: PURPLE,
  orange: ORANGE,
  blue: BLUE,
  pink: PINK[1],
};

interface AddProps {
  roundSize: 'L' | 'M' | 'S';
  fontSize?: 'XL' | 'L' | 'M' | 'S';
  isBoldFont?: boolean;
  children?: ReactNode;
}

interface DashBoardProps extends AddProps {
  isOwner?: boolean;
  chipColor: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
}

interface BodyProps extends AddProps {
  style: 'primary' | 'secondary' | 'outline';
  isNotActive?: boolean;
}

function ButtonBody({
  style,
  isNotActive = false,
  roundSize,
  fontSize = 'L',
  isBoldFont = false,
  children,
}: BodyProps) {
  return (
    <Default
      $style={style}
      $isNotActive={isNotActive}
      $roundSize={roundSize}
      $fontSize={fontSize}
      $isBoldFont={isBoldFont}
    >
      {children}
    </Default>
  );
}

function AddButton({ roundSize, fontSize, isBoldFont, children }: AddProps) {
  return (
    <ButtonBody style="outline" roundSize={roundSize} fontSize={fontSize} isBoldFont={isBoldFont}>
      <AddWrapper>
        {children}
        <AddChip />
      </AddWrapper>
    </ButtonBody>
  );
}

function DashBoardButton({ isOwner = false, chipColor, roundSize, fontSize, isBoldFont, children }: DashBoardProps) {
  return (
    <ButtonBody style="outline" roundSize={roundSize} fontSize={fontSize} isBoldFont={isBoldFont}>
      <DashBoardWrapper>
        <Chip $color={chipColor} />
        {children}
        {isOwner && <CrownIcon />}
        <LinkIcon />
      </DashBoardWrapper>
    </ButtonBody>
  );
}

interface ArrowProps {
  type: 'left' | 'right';
  isNotActive?: boolean;
}

function ArrowButton({ type, isNotActive = false }: ArrowProps) {
  return (
    <Arrow $type={type} $isNotActive={isNotActive}>
      {type === 'left' ? <BackwordIcon /> : <ForwordIcon />}
    </Arrow>
  );
}

export const Button = Object.assign({
  Plain: ButtonBody,
  Add: AddButton,
  DashBoard: DashBoardButton,
  Arrow: ArrowButton,
});

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

const outline = css`
  ${secondary};

  color: ${BLACK[2]};

  &:hover {
    background-color: ${GRAY[15]};
  }
`;

const Default = styled.button<{
  $style: 'primary' | 'secondary' | 'outline';
  $isNotActive: boolean;
  $roundSize: 'L' | 'M' | 'S';
  $fontSize: 'XL' | 'L' | 'M' | 'S';
  $isBoldFont: boolean;
}>`
  width: 100%;
  height: 100%;

  border-radius: ${(props) => ROUND_SIZE[`${props.$roundSize}`]};

  ${(props) => FONT_SIZE[`${props.$fontSize}`]};
  font-weight: ${(props) => (props.$isBoldFont ? '700' : null)};

  ${(props) => {
    if (props.$isNotActive) return inactive;
    if (props.$style === 'primary') return primary;
    if (props.$style === 'secondary') return secondary;
    if (props.$style === 'outline') return outline;
  }}
`;

const AddWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const DashBoardWrapper = styled.div`
  padding: 0 20px;

  display: flex;
  align-items: center;

  position: relative;
`;

const Chip = styled.div<{ $color: 'green' | 'purple' | 'orange' | 'blue' | 'pink' }>`
  margin-right: 16px;

  width: 8px;
  height: 8px;

  background-color: ${(props) => `${CHIP_COLOR[props.$color]}`};
  border-radius: 100%;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-right: 12px;
  }
`;

const LinkIcon = styled(ForwordIcon)`
  position: absolute;
  right: 20px;
`;

const CrownIcon = styled(Crown)`
  margin-left: 8px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-left: 6px;
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-left: 4px;
  }
`;

const arrowInactive = css`
  opacity: 55%;

  &:hover {
    background-color: ${WHITE};
    cursor: not-allowed;
  }
`;

const Arrow = styled.button<{ $type: string; $isNotActive: boolean }>`
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${outline};
  border-radius: ${(props) => (props.$type === 'right' ? ' 0 4px 4px 0' : '4px 0 0 4px')};
  ${(props) => (props.$isNotActive ? arrowInactive : null)};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 36px;
    height: 36px;
  }
`;
