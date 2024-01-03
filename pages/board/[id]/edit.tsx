import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Second from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { FONT_16, FONT_18 } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import EditMyDash from '@/components/common/Table/EditMyDash';
import DashMyMember from '@/components/common/Table/DashMyMember';
import DashInviteList from '@/components/common/Table/DashInviteList';
import boardMockData from '@/components/common/SideMenu/mock';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import { GetDashboardListDetailResponseType } from '@/lib/types/dashboards';
import BackButton from '@/components/pages/mypage/BackButton';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import { getDashboardInvitationList } from '@/api/dashboards/getDashboardInvitationList';
import { deleteDashboard } from '@/api/dashboards/deleteDashboard';

function Edit() {
  useCheckLogin();
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  const hadnlerDashBoardDelete = async () => {
    if (confirm('대쉬보드를 삭제하시겠습니까?')) {
      await deleteDashboard(dashboardId);
      alert('대쉬보드를 삭제했습니다.');
      router.push('/myboard');
    }
  };
  const [dashBoardInfo, setDashBoardInfo] = useState<GetDashboardListDetailResponseType>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
    userId: 0,
  });

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const fetchDashboardInfo = async () => {

  //     console.log(dashBoardData);

  //   };
  //   fetchDashboardInfo();
  // }, [router.isReady]);
  useEffect(() => {
    if (!router.isReady) return;
    const fetchDashboardData = async () => {
      //const memberData = await getMemberList(1, 5, dashboardId);
      const dashBoardData = await getDashboardInfo(dashboardId);
      //setMemberList(memberData);
      setDashBoardInfo(dashBoardData);
    };
    fetchDashboardData();
  }, [router.isReady]);

  return (
    <Root>
      <Second page="others" children="제목" />
      <SideMenu />
      <Content>
        <Wrapper>
          <ButtonLink href={`/board/${id}`}>
            <ReturnButton>
              <BackButton>돌아가기</BackButton>
            </ReturnButton>
          </ButtonLink>
          {dashBoardInfo && <EditMyDash dashboardData={dashBoardInfo} />}
          <DashMyMember />
          <DashInviteList />
          <DeleteDashButton onClick={hadnlerDashBoardDelete}>대시보드 삭제하기</DeleteDashButton>
        </Wrapper>
      </Content>
    </Root>
  );
}

export default Edit;

const Root = styled.div``;

const Content = styled.div`
  width: 100%;
  padding-top: 70px;
  padding-left: 300px;
  background-color: ${[GRAY[20]]};
  display: flex;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-top: 70px;
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 70px;
    padding-left: 67px;
  }
`;

const Wrapper = styled.div`
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;

  &:link,
  &:visited {
    color: ${[BLACK[2]]};
    text-decoration: none;
  }
`;

const ReturnButton = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 6px;
`;

const DeleteDashButton = styled.button`
  width: 320px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${[GRAY[30]]};
  ${[FONT_18]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 52px;
    ${[FONT_16]}
  }
`;
