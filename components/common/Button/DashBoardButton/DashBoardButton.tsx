import styled from 'styled-components';
import ButtonBase, { BaseProps } from '../ButtonBase';
import { BLUE, GREEN, ORANGE, PINK, PURPLE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ForwordIcon from '@/public/icon/arrow_forward.svg';
import Crown from '@/public/icon/crown.svg';

const CHIP_COLOR = {
  green: GREEN,
  purple: PURPLE,
  orange: ORANGE,
  blue: BLUE,
  pink: PINK[1],
};

interface Props extends BaseProps {
  isOwner?: boolean;
  chipColor: 'green' | 'purple' | 'orange' | 'blue' | 'pink';
}

export function DashBoardButton({ isOwner = false, chipColor, roundSize, children }: Props) {
  return (
    <ButtonBase style="outline" roundSize={roundSize}>
      <StyledLayout>
        <StyledChip $color={chipColor} />
        {children}
        {isOwner && <StyledCrownIcon />}
        <StyledLinkIcon />
      </StyledLayout>
    </ButtonBase>
  );
}

const StyledLayout = styled.div`
  padding: 0 20px;

  display: flex;
  align-items: center;

  position: relative;
`;

const StyledChip = styled.div<{ $color: 'green' | 'purple' | 'orange' | 'blue' | 'pink' }>`
  margin-right: 16px;

  width: 8px;
  height: 8px;

  background-color: ${({ $color }) => `${CHIP_COLOR[$color]}`};
  border-radius: 100%;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-right: 12px;
  }
`;

const StyledLinkIcon = styled(ForwordIcon)`
  position: absolute;
  right: 20px;
`;

const StyledCrownIcon = styled(Crown)`
  margin-left: 8px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-left: 6px;
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-left: 4px;
  }
`;
