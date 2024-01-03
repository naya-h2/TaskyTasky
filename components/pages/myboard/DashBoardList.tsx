import styled, { keyframes } from 'styled-components';
import Button from '@/components/common/Button';
import { FONT_14, FONT_14_B, FONT_16_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { BLACK, VIOLET } from '@/styles/ColorStyles';
import { useStore } from '@/context/stores';
import DashboardModal from '@/components/common/Modal/DashboardModal';
import Link from 'next/link';
import DoubleBackward from '@/public/icon/double-small-left.svg';
import DoubleForward from '@/public/icon/double-small-right.svg';
import { useGetDashboard } from '@/hooks/useGetDashboard';

/**
 * @param data dashboard 목록의 배열
 */
function DashBoardList() {
  const { modals, showModal, page, total, increasePage, decreasePage, setPage } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    page: state.myboardPageNumber,
    total: state.myboardTotalPage,
    increasePage: state.increasePage,
    decreasePage: state.decreasePage,
    setPage: state.setPage,
  }));
  const dashboardList = useGetDashboard();

  const handleDashboardAdd = () => {
    showModal('dashBoard');
  };

  return (
    <>
      <StyledLayout>
        <StyledWrapper>
          {/* <DoubleBackwardIcon onClick={() => setPage(1)} /> */}
          <StyledBoardList>
            <StyledButtonWrapper>
              <Button.Add roundSize="XL" onClick={handleDashboardAdd}>
                <StyledButtonText>새로운 대시보드</StyledButtonText>
              </Button.Add>
            </StyledButtonWrapper>
            {dashboardList &&
              dashboardList.map((dashboard) => (
                <Link href={`/board/${dashboard.id}`} key={dashboard.id}>
                  <StyledButtonWrapper>
                    <Button.DashBoard isOwner={dashboard.createdByMe} chipColor={dashboard.color} roundSize="XL">
                      <StyledButtonText>{dashboard.title}</StyledButtonText>
                    </Button.DashBoard>
                  </StyledButtonWrapper>
                </Link>
              ))}
          </StyledBoardList>
          {/* <DoubleForwardIcon onClick={() => setPage(total)} /> */}
        </StyledWrapper>
        <StyledPagination>
          <StyledPageInfo>
            {total} 페이지 중<span style={{ paddingRight: '5px' }} />
            <StyledHighlight>{page}</StyledHighlight>
          </StyledPageInfo>
          <StyledMoveButtonWrapper>
            <Button.Arrow type="left" isNotActive={page === 1} onClick={() => decreasePage(page)} />
            <Button.Arrow type="right" isNotActive={page === total} onClick={() => increasePage(page)} />
          </StyledMoveButtonWrapper>
        </StyledPagination>
      </StyledLayout>
      {modals.length > 0 && <DashboardModal type="dashBoard" />}
    </>
  );
}

export default DashBoardList;

const toRight = keyframes`
 50% {
  transform: translateX(13px);
  opacity: 50%;
 }
`;

const toLeft = keyframes`
 50% {
  transform: translateX(-13px);
  opacity: 50%;
 }
`;

const DoubleBackwardIcon = styled(DoubleBackward)`
  display: flex;
  align-items: center;

  position: absolute;
  left: -30px;

  animation: ${toRight} 2s 0.5s infinite;

  &:hover {
    cursor: pointer;
  }
`;

const DoubleForwardIcon = styled(DoubleForward)`
  display: flex;
  align-items: center;

  position: absolute;
  right: -30px;

  animation: ${toLeft} 2s 0.5s infinite;

  &:hover {
    cursor: pointer;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: relative;
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

const StyledHighlight = styled.span`
  font-weight: 700;
`;
