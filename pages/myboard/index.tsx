import Head from 'next/head';
import styled from 'styled-components';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import InviteDash from '@/components/common/Table/InviteDash';
import DashBoardList from '@/components/pages/myboard/DashBoardList';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useGetDashboard } from '@/hooks/useGetDashboard';
import { useGetInvitationList } from '@/hooks/useGetInvitationList';
import { useCheckLogin } from '@/hooks/useCheckLogin';

function Myboard() {
  useCheckLogin();

  const dashboardList = useGetDashboard();
  const invitationList = useGetInvitationList();

  return (
    <>
      <Head>
        <title>내 대시보드 | TaskyTasky</title>
      </Head>
      <Header page="myboard">내 대시보드</Header>
      <SideMenu dashboards={dashboardList} />
      <StyledBody>
        <StyledContainer>
          {dashboardList && <DashBoardList data={dashboardList} />}
          {invitationList && <InviteDash inviteList={invitationList} />}
        </StyledContainer>
      </StyledBody>
    </>
  );
}

export default Myboard;

const StyledBody = styled.div`
  padding-top: 70px;
  padding-left: 300px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-left: 67px;
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1022px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;
