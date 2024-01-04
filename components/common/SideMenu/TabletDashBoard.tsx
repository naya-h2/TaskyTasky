import styled from 'styled-components';
import Crown from '@/public/icon/crown.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_18, FONT_16 } from '@/styles/FontStyles';
import { GRAY } from '@/styles/ColorStyles';

interface DashBoardProps {
  color: string;
  title: string;
  createdByMe?: boolean;
  current?: boolean;
}

function TabletDashBoard({ color, title, createdByMe, current }: DashBoardProps) {
  return (
    <StyledContainer>
      <StyledColor color={color} />
      <StyledDashBoardTitle>{title}</StyledDashBoardTitle>
      {createdByMe && <StyledCrown />}
    </StyledContainer>
  );
}

export default TabletDashBoard;

const StyledContainer = styled.div`
  width: 134px;
  height: 43px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-shrink: 0;
  border-radius: 4px;
`;

const StyledColor = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  margin-right: 16px;
  margin-left: 12px;
  background-color: ${(props: { color: string }) => props.color};
  border-radius: 100%;
`;

const StyledDashBoardTitle = styled.div`
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 4px;
  color: ${GRAY[50]};
  ${FONT_16};
`;

const StyledCrown = styled(Crown)``;
