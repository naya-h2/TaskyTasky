import styled from 'styled-components';
import Button from '@/components/common/Button';
import { FONT_14, FONT_14_B, FONT_16_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { BLACK } from '@/styles/ColorStyles';
import { DashboardType } from '@/lib/types/dashboards';
import { useStore } from '@/context/stores';
import DashboardModal from '@/components/common/Modal/DashboardModal';

interface Props {
  data: DashboardType[];
}
/**
 * @param data dashboard 목록의 배열
 */
function DashBoardList({ data }: Props) {
  const { modals, showModal } = useStore((state) => ({ modals: state.modals, showModal: state.showModal }));

  function handleDashboardAdd() {
    showModal('dashBoard');
  }

  return (
    <>
      <StyledLayout>
        <StyledBoardList>
          {data &&
            data.map((dashboard) => (
              <StyledButtonWrapper key={dashboard.id}>
                <Button.DashBoard isOwner={dashboard.createdByMe} chipColor="pink" roundSize="L">
                  <StyledButtonText>{dashboard.title}</StyledButtonText>
                </Button.DashBoard>
              </StyledButtonWrapper>
            ))}
          <StyledButtonWrapper>
            <Button.Add roundSize="L" onClick={handleDashboardAdd}>
              <StyledButtonText>새로운 대시보드</StyledButtonText>
            </Button.Add>
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
      {modals.length > 0 && <DashboardModal type="dashBoard" />}
    </>
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

const StyledButtonText = styled.div`
  ${FONT_16_B};
  ${BLACK[2]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_14_B};
  }
`;
