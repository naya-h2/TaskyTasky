import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { FONT_16, FONT_18 } from '@/styles/FontStyles';
import { BLACK, GRAY, RED } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import EditMyDash from '@/components/common/Table/EditMyDash';
import DashMyMember from '@/components/common/Table/DashMyMember';
import DashInviteList from '@/components/common/Table/DashInviteList';
import BackButton from '@/components/pages/mypage/BackButton';
import { useCheckLogin } from '@/hooks/useCheckLogin';
import Head from 'next/head';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import { useStore } from '@/context/stores';
import EditModal from '@/components/common/Modal/EditModal';
import { DashboardType, GetDashboardListDetailResponseType } from '@/lib/types/dashboards';
import { useState, useEffect } from 'react';
import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import { getMemberList } from '@/api/members/getMemberList';
import { GetMemberListResponseType } from '@/lib/types/members';
import { getColumnList } from '@/api/columns/getColumnList';
import axios from 'axios';
import { ColumnType } from '@/lib/types/columns';

function Edit() {
  useCheckLogin();
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const { modal, showModal } = useStore((state) => ({
    modal: state.modals,
    showModal: state.showModal,
  }));

  const [memberList, setMemberList] = useState<GetMemberListResponseType>();
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>();
  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [dashBoardInfo, setDashBoardInfo] = useState<GetDashboardListDetailResponseType>();

  const fetchDashboardData = async () => {
    const dashBoardData = await getDashboardInfo(dashboardId);
    setDashBoardInfo(dashBoardData);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      const [resCurrentDashboard, resColumnList] = await axios.all([
        getDashboardInfo(Number(id)),
        getColumnList(Number(id)),
      ]);

      setCurrentDashboard(resCurrentDashboard);
      setColumnList(resColumnList?.data);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!currentDashboard) return;

      const resMemberList = await getMemberList(currentDashboard.id);
      setMemberList(resMemberList);
    };

    fetchMemberData();
  }, [currentDashboard]);

  return (
    <Root>
      <Head>
        <title>{`${currentDashboard?.title} | TaskyTasky`}</title>
      </Head>
      <Header
        page="others"
        children={currentDashboard?.title}
        crown={currentDashboard?.createdByMe}
        membersData={memberList}
      />
      {/*<Header page="myboard">내 대시보드</Header>*/}
      <SideMenu />
      <StyledBody>
        <StyledContainer>
          <ButtonLink href={`/board/${id}`}>
            <ReturnButton>
              <BackButton>돌아가기</BackButton>
            </ReturnButton>
          </ButtonLink>
          <EditMyDash />
          <DashMyMember />
          <DashInviteList />
          <DeleteDashButton onClick={() => showModal('deleteDashboard')}>대시보드 삭제하기</DeleteDashButton>
        </StyledContainer>
      </StyledBody>
      {modal.includes('deleteDashboard') && <EditModal type="deleteDashboard" dashboardId={dashboardId} />}
    </Root>
  );
}

export default Edit;

const Root = styled.div``;
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

  &: hover {
    border: 1px solid ${[RED]};
    color: ${[RED]};
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 52px;
    ${[FONT_16]}
  }
`;
