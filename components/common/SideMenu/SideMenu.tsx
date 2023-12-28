import styled from 'styled-components';
import AddDashBoard from './AddDashBoard';
import DashBoard from './DashBoard';
import LogoLink from './LogoLink';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { WHITE, GRAY } from '@/styles/ColorStyles';

type Dashboard = {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
};

type SideMenuProps = {
  dashboards: Dashboard[];
};

function SideMenu({ dashboards }: SideMenuProps) {
  return (
    <StyledWrapper>
      <LogoLink />
      <AddDashBoard />
      <StyledDashboardList>
        {dashboards?.map((dashboard) => (
          <DashBoard
            key={dashboard.id}
            color={dashboard.color}
            title={dashboard.title}
            createdByMe={dashboard.createdByMe}
          />
        ))}
      </StyledDashboardList>
    </StyledWrapper>
  );
}

export default SideMenu;

const StyledWrapper = styled.div`
  width: 300px;
  height: 1550px;
  padding: 20px 24px;
  /* box-shadow: 15px 0 15px -15px ${GRAY[30]}; */ //사이드메뉴 접었다 열었다..하고싶다..
  border-right: 1px solid ${GRAY[30]};
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;

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
