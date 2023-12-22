import styled from 'styled-components';
import Button from '@/components/common/Button';
import { FONT_14 } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  data: any;
}
/**
 * @param data dashboard 목록의 배열
 */
function DashBoardList({ data }: Props) {
  return (
    <StyledLayout>
      <StyledBoardList>
        {data &&
          data.map((dashboard) => (
            <StyledButtonWrapper key={dashboard.id}>
              <Button.DashBoard isOwner={dashboard.createdByMe} chipColor="pink" roundSize="L">
                {dashboard.title}
              </Button.DashBoard>
            </StyledButtonWrapper>
          ))}
        <StyledButtonWrapper>
          <Button.Add roundSize="L">새로운 대시보드</Button.Add>
        </StyledButtonWrapper>
      </StyledBoardList>
      <StyledPagination>
        <StyledPageInfo>1 페이지 중 1</StyledPageInfo>
        <StyledMoveButtonWrapper>
          <Button.Arrow type="left" />
          <Button.Arrow type="right" />
        </StyledMoveButtonWrapper>
      </StyledPagination>
    </StyledLayout>
  );
}

export default DashBoardList;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledBoardList = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
  }
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 70px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    height: 68px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 58px;
  }
`;

const StyledMoveButtonWrapper = styled.div`
  display: flex;
`;

const StyledPageInfo = styled.div`
  ${FONT_14};

  display: flex;
  align-items: center;
`;

const StyledPagination = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
