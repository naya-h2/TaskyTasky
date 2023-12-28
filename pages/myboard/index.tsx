import styled from 'styled-components';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import InviteDash from '@/components/common/Table/InviteDash';
import DashBoardList from '@/components/pages/myboard/DashBoardList';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { useEffect, useState } from 'react';
import { DashboardType } from '@/lib/types/dashboards';
import { useStore } from '@/context/stores';
import { getInvitationList } from '@/api/invitations/getInvitationList';
import { inviteDashboard } from '@/api/dashboards/inviteDashboard';
import { login } from '@/api/auth/login';
import { GetInvitationResponseType } from '@/lib/types/invitations';

const inviteData = {
  cursorId: 123,
  invitations: [
    {
      id: 1,
      inviterUserId: 2,
      teamId: 'team-10',
      dashboard: {
        title: '프로덕트 디자인',
        id: 234,
      },
      invitee: {
        nickname: '손동희',
        id: 2,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
    {
      id: 2,
      inviterUserId: 3,
      teamId: 'team-8',
      dashboard: {
        title: '새로운 기획 문서',
        id: 234,
      },
      invitee: {
        nickname: '안귀영',
        id: 3,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
    {
      id: 3,
      inviterUserId: 3,
      teamId: 'team-8',
      dashboard: {
        title: '유닛A',
        id: 234,
      },
      invitee: {
        nickname: '장혁',
        id: 3,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
  ],
};

function Myboard() {
  const { page, setTotal, search } = useStore((state) => ({
    page: state.myboardPageNumber,
    setTotal: state.calcTotalPage,
    search: state.dashboardSearch,
  }));
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [invitationList, setInvitationList] = useState<GetInvitationResponseType>({ cursorId: null, invitations: [] });

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardList('pagination', 5, undefined, page);
      setDashboardList(dashboardData.dashboards);
      setTotal(Math.ceil(dashboardData.totalCount / 5));
    };

    fetchDashboardData();
  }, [page]);

  useEffect(() => {
    const fetchInviteListData = async () => {
      //login
      //const lg = login({ email: 'test@codeit.com', password: '1234asdf!' });
      //const lg = login({ email: 'spfe01032@codeit.kr', password: 'asdf1234' });
      //대시보드 초대
      // const data = await inviteDashboard(351, { email: 'test@codeit.com' });
      // const data1 = await inviteDashboard(350, { email: 'test@codeit.com' });
      // const data2 = await inviteDashboard(348, { email: 'test@codeit.com' });
      // const data3 = await inviteDashboard(347, { email: 'test@codeit.com' });
      // const data4 = await inviteDashboard(346, { email: 'test@codeit.com' });

      /**TODO : 무한스크롤
       * 무한스크롤 완료되면 위에 시험 코드들 지울 예정
       */
      const dashboardData = await getInvitationList(10, null, search);
      setInvitationList(dashboardData);
    };

    fetchInviteListData();
  }, [search]);

  return (
    <>
      <Header page="myboard">내 대시보드</Header>
      <SideMenu dashboards={dashboardList} />
      <StyledBody>
        <StyledContainer>
          <DashBoardList data={dashboardList} />
          <InviteDash inviteList={invitationList} />
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
