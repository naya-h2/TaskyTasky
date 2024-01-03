import styled from 'styled-components';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TabletAddDashBoard from './TabletAddDashBoard';
import TabletDashBoard from './TabletDashBoard';
import TabletLogoLink from './TabletLogoLink';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY } from '@/styles/ColorStyles';
import { useStore } from '@/context/stores';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function TabletSideMenu({ setIsTablet }: any) {
  const { page, setTotal } = useStore((state) => ({
    page: state.myboardPageNumber,
    setTotal: state.calcTotalPage,
  }));
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardList('pagination', 10, undefined, page);
      setDashboardList(dashboardData.dashboards);
      setTotal(Math.ceil(dashboardData.totalCount / 5));
    };

    fetchDashboardData();
  }, [page]);

  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <TabletLogoLink />
        <StyledButton onClick={() => setIsTablet(false)}>
          <Arrow>&lt;&lt;</Arrow>
        </StyledButton>
      </StyledLogoWrapper>
      <StyledAddDashBoardWrapper>
        <TabletAddDashBoard data={dashboardList} />
      </StyledAddDashBoardWrapper>
      <StyledDashboardList>
        {dashboardList?.map((dashboard) => (
          <StyledLink href={`/board/${dashboard.id}`} key={dashboard.id}>
            <TabletDashBoard
              key={dashboard.id}
              color={dashboard.color}
              title={dashboard.title}
              createdByMe={dashboard.createdByMe}
            />
          </StyledLink>
        ))}
      </StyledDashboardList>
    </StyledWrapper>
  );
}

export default TabletSideMenu;

const StyledWrapper = styled.div`
  width: 160px;
  height: 1660px;
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

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
  }
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding: 0 12px;
`;

const StyledAddDashBoardWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
`;

const StyledDashboardList = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  border-radius: 2px;
  &:hover {
    text-decoration: none;
    background-color: #f1effd;
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
