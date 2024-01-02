import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AddDashBoard from './AddDashBoard';
import DashBoard from './DashBoard';
import LogoLink from './LogoLink';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY } from '@/styles/ColorStyles';
import { useStore } from '@/context/stores';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { DashboardType } from '@/lib/types/dashboards';

function SideMenu() {
  const router = useRouter();
  const { page, setTotal } = useStore((state) => ({
    page: state.myboardPageNumber,
    setTotal: state.calcTotalPage,
  }));
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardList('pagination', 10, undefined, page);
      setDashboardList(dashboardData?.dashboards);
      setTotal(Math.ceil(dashboardData?.totalCount / 5));
    };

    fetchDashboardData();
  }, [page]);

  return (
    <StyledWrapper>
      <StyledLogoWrapper>
        <LogoLink />
      </StyledLogoWrapper>
      <StyledAddDashBoardWrapper>
        <AddDashBoard />
      </StyledAddDashBoardWrapper>
      <StyledDashboardList>
        {dashboardList?.map((dashboard) => (
          <StyledLink href={`/board/${dashboard.id}`} key={dashboard.id}>
            <DashBoard
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

export default SideMenu;

const StyledWrapper = styled.div`
  width: 300px;
  height: 1550px;
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
    height: 1666px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 67px;
    height: 1859px;
  }
`;

const StyledLogoWrapper = styled.div`
  padding: 0 12px;
`;

const StyledAddDashBoardWrapper = styled.div`
  width: 100%;
  padding: 0 12px;
`;

const StyledDashboardList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 18px;
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 22px;
  }
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
