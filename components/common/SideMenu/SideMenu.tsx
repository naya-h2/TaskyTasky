import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import AddDashBoard from './AddDashBoard';
import DashBoard from './DashBoard';
import LogoLink from './LogoLink';
import TabletSideMenu from './TabletSideMenu';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY, VIOLET } from '@/styles/ColorStyles';
import { useGetDashboardList } from '@/hooks/useGetDashboardList';
import { customScroll } from '@/styles/CustomScroll';

function SideMenu() {
  const router = useRouter();
  const [isTablet, setIsTablet] = useState(false);
  const { dashboardList, fetchDashboardData, hasMore } = useGetDashboardList();

  useEffect(() => {
    const fetch = async () => {
      await fetchDashboardData();
      console.log(dashboardList);
    };
    fetch();
  }, []);

  if (isTablet) {
    return <TabletSideMenu setIsTablet={setIsTablet} />;
  }

  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <LogoLink />
        <StyledButton onClick={() => setIsTablet(true)}>
          <Arrow>&gt;&gt;</Arrow>
        </StyledButton>
      </StyledLogoWrapper>
      <StyledAddDashBoardWrapper>
        <AddDashBoard data={dashboardList} />
      </StyledAddDashBoardWrapper>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchDashboardData}
        hasMore={hasMore}
        loader={
          <StyledSpinner>
            <Image src="/images/Spinner-1s-200px.gif" alt="로딩중" width={80} height={80} />
          </StyledSpinner>
        }
        useWindow={false}
        initialLoad={false}
      >
        <StyledDashboardList>
          {dashboardList?.map((dashboard) => (
            <StyledLink href={`/board/${dashboard.id}`} current={router.asPath === `/board/${dashboard.id}`}>
              <DashBoard
                key={dashboard.id}
                color={dashboard.color}
                title={dashboard.title}
                createdByMe={dashboard.createdByMe}
              />
            </StyledLink>
          ))}
        </StyledDashboardList>
      </InfiniteScroll>
    </StyledWrapper>
  );
}

export default SideMenu;

const StyledWrapper = styled.div`
  width: 300px;
  height: 100vh;
  padding: 20px 12px;
  border-right: 1px solid ${GRAY[30]};
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: fixed;
  left: 0;
  z-index: ${Z_INDEX.SideMenu_Wrapper};

  background-color: ${WHITE};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 160px;
    /* height: 1666px; */
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 67px;
    /* height: 1859px; */
  }
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 20px;
  }
`;

const StyledAddDashBoardWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
`;

const StyledDashboardList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 55%;
  ${customScroll};
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 18px;
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 22px;
  }
`;

const StyledLink = styled(Link)<{ current: boolean }>`
  border-radius: 2px;
  background-color: ${(props) => (props.current ? '#f1effd' : 'transparent')};
  color: ${(props) => (props.current ? '#5534da' : 'inherit')};
  &:hover {
    text-decoration: none;
    background-color: #f3f2f9;
    color: ${(props) => (props.current ? '#5534da' : 'inherit')};
  }
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledButton = styled.button`
  background-color: #fff;
  border: none;
  display: none;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;
    position: absolute;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Arrow = styled.span`
  font-size: 20px;
  color: #5534da;
  font-weight: bold;
`;

const StyledSpinner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
