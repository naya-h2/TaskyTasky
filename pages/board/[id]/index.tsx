import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import Button from '@/components/common/Button';
import ColumnModal from '@/components/common/Modal/ColumnModal';
import ColumnLists from '@/components/pages/Board/ColumnLists';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_18_B } from '@/styles/FontStyles';

import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { getColumnList } from '@/api/columns/getColumnList';
import { getMemberList } from '@/api/members/getMemberList';
import { DashboardType } from '@/lib/types/dashboards';
import { GetMemberListResponseType } from '@/lib/types/members';
import { ColumnType } from '@/lib/types/columns';
import { useStore } from '@/context/stores';
import Head from 'next/head';

function Board() {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>();
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [memberList, setMemberList] = useState<GetMemberListResponseType>();
  const [isColumnChanged, setIsColumnChanged] = useState<boolean>(false);

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      const [resCurrentDashboard, resColumnList, resDashboardList] = await axios.all([
        getDashboardInfo(Number(id)),
        getColumnList(Number(id)),
        getDashboardList('infiniteScroll', 10),
      ]);

      setCurrentDashboard(resCurrentDashboard);
      setDashboardList(resDashboardList.dashboards);
      setColumnList(resColumnList.data);
    };

    fetchData();
  }, [id, isColumnChanged]);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!currentDashboard) return;

      const resMemberList = await getMemberList(currentDashboard.id);
      setMemberList(resMemberList); //헤더에서 totalCount 데이터가 필요해서 이 부분 수정했어요!
    };

    fetchMemberData();
  }, [currentDashboard]);

  const handleAddColumnBtn = async () => {
    if (!id) {
      return;
    }
    showModal('createColumn');
  };

  return (
    <>
      <Head>
        <title>{`${currentDashboard?.title} | Taskify`}</title>
      </Head>
      <StyledRoot>
        <Header
          page="others"
          children={currentDashboard?.title}
          crown={currentDashboard?.createdByMe}
          membersData={memberList}
        />
        <SideMenu dashboards={dashboardList} />
        <StyledContent>
          {columnList.length > 0 && (
            <ColumnLists
              columnList={columnList}
              id={Number(id)}
              isColumnChanged={isColumnChanged}
              setIsColumnChanged={setIsColumnChanged}
              memberList={memberList?.members}
            />
          )}
          <StyledBtnWrapper>
            <Button.Add roundSize="L" onClick={handleAddColumnBtn}>
              <StyledText>새로운 컬럼 추가하기</StyledText>
            </Button.Add>
          </StyledBtnWrapper>
        </StyledContent>
        {modal[modal.length - 1] === 'createColumn' && (
          <ColumnModal
            type={'createColumn'}
            dashboardID={Number(id)}
            refreshColumn={() => setIsColumnChanged(!isColumnChanged)}
          />
        )}
      </StyledRoot>
    </>
  );
}

export default Board;

const StyledRoot = styled.div``;

const StyledContent = styled.div`
  width: 100%;
  padding-top: 70px;
  padding-left: 300px;

  display: flex;
  flex-direction: row;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-top: 70px;
    padding-left: 160px;

    flex-direction: column;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 70px;
    padding-left: 67px;
  }
`;

const StyledBtnWrapper = styled.div`
  width: 100%;
  max-width: 354px;
  height: 70px;
  margin: 68px 20px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    max-width: none;
    margin: 20px 0;
    padding: 0 20px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 60px;
    margin: 12px 0;
    padding: 0 15px;
  }
`;

const StyledText = styled.div`
  ${FONT_18_B}
`;
