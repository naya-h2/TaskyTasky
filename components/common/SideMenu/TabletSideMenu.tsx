import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TabletAddDashBoard from './TabletAddDashBoard';
import TabletDashBoard from './TabletDashBoard';
import TabletLogoLink from './TabletLogoLink';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY } from '@/styles/ColorStyles';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import { customScroll } from '@/styles/CustomScroll';
import AngleLeft from '@/public/icon/angle_left.svg';

function TabletSideMenu({ setIsTablet }: any) {
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const fetchMoreData = async () => {
    if (loading) return;
    setLoading(true);
    //setHasMore(false);

    try {
      const size = page === 1 ? 15 : 5;
      const dashboardData = await getDashboardList('pagination', size, undefined, page);
      if (dashboardData.dashboards.length > 0) {
        setDashboardList((prevList) => {
          const newDashboards = dashboardData.dashboards.filter(
            (newDashboard: DashboardType) => !prevList.some((dashboard) => dashboard.id === newDashboard.id),
          );
          if (newDashboards.length === 0) {
            setHasMore(false);
            return prevList;
          } else {
            setHasMore(true);
            return [...prevList, ...newDashboards];
          }
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching dashboards:', error);
    } finally {
      setLoading(false);
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        setHasMore(true);
        return newPage;
      });
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <StyledWrapper isTablet={setIsTablet}>
      <StyledLogoWrapper>
        <TabletLogoLink />
        <StyledButton onClick={() => setIsTablet(false)}>
          <StyledIcon />
        </StyledButton>
      </StyledLogoWrapper>
      <StyledAddDashBoardWrapper>
        <TabletAddDashBoard data={dashboardList} />
      </StyledAddDashBoardWrapper>
      <StyledDashboardList>
        <InfiniteScroll
          pageStart={0}
          threshold={10}
          loadMore={fetchMoreData}
          hasMore={hasMore}
          // loader={<h4>Loading...</h4>}
          useWindow={false}
          initialLoad={false}
        >
          {dashboardList.map((dashboard) => (
            <Link href={`/board/${dashboard.id}`} passHref key={dashboard.id}>
              <StyledLink current={router.asPath === `/board/${dashboard.id}`}>
                <TabletDashBoard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
              </StyledLink>
            </Link>
          ))}
        </InfiniteScroll>
      </StyledDashboardList>
    </StyledWrapper>
  );
}

export default TabletSideMenu;

const StyledWrapper = styled.div<{ isTablet: boolean }>`
  width: 160px;
  height: 100vh;
  padding: 20px 12px;
  border-right: 1px solid ${GRAY[30]};
  left: 0;
  display: none;
  flex-direction: column;
  align-items: flex-start;

  position: fixed;
  left: 0;
  z-index: ${Z_INDEX.SideMenu_Wrapper};

  background-color: ${WHITE};

  animation: ${(props) => (props.isTablet ? slideIn : slideOut)} 0.5s ease-in-out;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
  }
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 0 12px;
  margin-bottom: 20px;
`;

const StyledAddDashBoardWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
`;

const StyledDashboardList = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: 100%;
  ${customScroll};
`;

const StyledLink = styled.div<{ current: boolean }>`
  border-radius: 2px;
  background-color: ${(props) => (props.current ? '#f1effd' : 'transparent')};
  color: ${(props) => (props.current ? '#5534da' : '#787486')};
  text-decoration: none;
  &:hover {
    text-decoration: none;
    background-color: #f3f2f9;
    color: ${(props) => (props.current ? '#5534da' : '#787486')};
  }
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const StyledButton = styled.button`
  background-color: #5534da;
  color: #fff;
  border: none;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  width: 24px;
  height: 24px;
  z-index: 1;

  &:hover {
    background-color: #f3f2f9;
    color: #5534da;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;
    position: absolute;
    top: 110px;
    left: 160px;
    transform: translateX(-50%);
  }
`;

const StyledIcon = styled(AngleLeft)`
  margin-top: 2px;
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;
