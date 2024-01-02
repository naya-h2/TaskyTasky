import SideMenu from '@/components/common/SideMenu/SideMenu';
import styled from 'styled-components';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import InviteDash from '@/components/common/Table/InviteDash';
import DashBoardList from '@/components/pages/myboard/DashBoardList';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { useEffect, useState } from 'react';
import { DashboardType } from '@/lib/types/dashboards';
import { useStore } from '@/context/stores';
import { getInvitationList } from '@/api/invitations/getInvitationList';
import { inviteDashboard } from '@/api/dashboards/inviteDashboard';
import { GetInvitationResponseType } from '@/lib/types/invitations';

function Test1() {
  const { page, setTotal } = useStore((state) => ({
    page: state.myboardPageNumber,
    setTotal: state.calcTotalPage,
  }));
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const dashboardData = await getDashboardList('pagination', 5, undefined, page);
      setDashboardList(dashboardData.dashboards);
      setTotal(Math.ceil(dashboardData.totalCount / 5));
    };

    fetchDashboardData();
  }, [page]);

  // useEffect(() => {
  //   const fetchInviteListData = async () => {
  //     //대시보드 초대
  //     // const data = await inviteDashboard(487, { email: 'test@codeit.com' });
  //     // const data1 = await inviteDashboard(486, { email: 'test@codeit.com' });
  //     // const data2 = await inviteDashboard(485, { email: 'test@codeit.com' });
  //     // const data3 = await inviteDashboard(484, { email: 'test@codeit.com' });
  //     // const data4 = await inviteDashboard(483, { email: 'test@codeit.com' });

  //     /**TODO : 무한스크롤
  //      * 초대하기 기능 완료되면 위에 시험 코드들 지울 예정
  //      */
  //     const dashboardData = await getInvitationList(10, null, search);
  //     setInvitationList(dashboardData);
  //   };

  //   fetchInviteListData();
  // }, [search]);
  return (
    <>
      <SideMenu dashboards={dashboardList} />
    </>
  );
}

export default Test1;
