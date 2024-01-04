import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AddDashBoard from './AddDashBoard';
import DashBoard from './DashBoard';
import LogoLink from './LogoLink';
import TabletSideMenu from './TabletSideMenu';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY } from '@/styles/ColorStyles';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroller';
import { customScroll } from '@/styles/CustomScroll';

function SideMenu() {
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [isTablet, setIsTablet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  // 데이터를 불러오는 함수
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
            return prevList; // 변경 사항 없이 이전 리스트를 반환
          } else {
            // 새 데이터를 이전 리스트에 추가하여 반환
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
                <DashBoard color={dashboard.color} title={dashboard.title} createdByMe={dashboard.createdByMe} />
              </StyledLink>
            </Link>
          ))}
        </InfiniteScroll>
      </StyledDashboardList>
    </StyledWrapper>
  );
}

export default SideMenu;

const StyledWrapper = styled.div`
  width: 300px;
  height: 100%;
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
    //height: 1666px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 67px;
    //height: 1859px;
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
  height: 70%;
  ${customScroll};
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 18px;
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 22px;
  }
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
