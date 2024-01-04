import { useRouter } from 'next/router';
import Head from 'next/head';
import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import Button from '@/components/common/Button';
import ColumnModal from '@/components/common/Modal/ColumnModal';
import ColumnLists from '@/components/pages/Board/ColumnLists';
import TodoModal from '@/components/common/Modal/TodoModal';
import BackButton from '@/components/pages/mypage/BackButton';
import CardModal from '@/components/common/Modal/CardModal';
import AlertModal from '@/components/common/Modal/AlertModal';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_18_B } from '@/styles/FontStyles';

import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { getColumnList } from '@/api/columns/getColumnList';
import { getMemberList } from '@/api/members/getMemberList';
import { DashboardType } from '@/lib/types/dashboards';
import { GetMemberListResponseType, MemberListType } from '@/lib/types/members';
import { ColumnType } from '@/lib/types/columns';
import { useStore } from '@/context/stores';
import PlusIcon from '@/public/icon/add_no_background.svg';
import { useCheckLogin } from '@/hooks/useCheckLogin';

function Board() {
  useCheckLogin();

  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>();
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [memberList, setMemberList] = useState<GetMemberListResponseType>();
  const [modalColumnId, setModalColumnId] = useState<number>();

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const modalCard = useStore((state) => state.modalCard);
  const isColumnChanged = useStore((state) => state.isColumnChanged);
  const modalCardColumnTitle = useStore((state) => state.modalCardColumnTitle);
  const cardCommentId = useStore((state) => state.cardCommentId);

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
      setDashboardList(resDashboardList?.dashboards);
      setColumnList(resColumnList?.data);
    };

    fetchData();
  }, [id, isColumnChanged]);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!currentDashboard) return;

      const resMemberList = await getMemberList(currentDashboard.id);
      setMemberList(resMemberList);
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
        <title>{`${currentDashboard?.title} | TaskyTasky`}</title>
      </Head>
      <StyledRoot>
        <Header
          page="others"
          children={currentDashboard?.title}
          crown={currentDashboard?.createdByMe}
          membersData={memberList}
        />
        <SideMenu />
        <StyledBody>
          <BackButton>마이보드</BackButton>
          <StyledContent>
            {columnList.length > 0 && (
              <ColumnLists
                columnList={columnList}
                setModalColumnId={setModalColumnId as (value: SetStateAction<number>) => void}
              />
            )}
            <StyledButton onClick={handleAddColumnBtn}>
              <StyledAddChip />
            </StyledButton>
            <StyledBtnWrapper>
              <Button.Add roundSize="L" onClick={handleAddColumnBtn}>
                <StyledText>새로운 컬럼 추가하기</StyledText>
              </Button.Add>
            </StyledBtnWrapper>
          </StyledContent>
        </StyledBody>
        {modal.includes('createTodo') && (
          <TodoModal
            type={'createTodo'}
            memberLists={memberList?.members as MemberListType[]}
            dashboardId={Number(id)}
            columnId={modalColumnId as number}
          />
        )}
        {modal.includes('card') && (
          <CardModal
            type={'card'}
            cardInfo={modalCard}
            columnTitle={modalCardColumnTitle}
            dashboardId={currentDashboard?.id as number}
          />
        )}
        {modal[modal.length - 1] === 'createColumn' && <ColumnModal type={'createColumn'} dashboardID={Number(id)} />}
        {modal.includes('manageColumn') && <ColumnModal type={'manageColumn'} columnID={modalColumnId} />}
        {modal[modal.length - 1] === 'deleteColumnAlert' && (
          <AlertModal type={'deleteColumnAlert'} columnID={modalColumnId} />
        )}
        {modal[modal.length - 1] === 'editTodo' && (
          <TodoModal
            type={'editTodo'}
            memberLists={memberList?.members as MemberListType[]}
            dashboardId={Number(id)}
            columnId={modalCard.columnId as number}
            columnList={columnList}
          />
        )}
        {modal[modal.length - 1] === 'deleteCardAlert' && <AlertModal type={'deleteCardAlert'} cardId={modalCard.id} />}
        {modal[modal.length - 1] === 'deleteCommentAlert' && (
          <AlertModal type={'deleteCommentAlert'} commentId={cardCommentId} />
        )}
      </StyledRoot>
    </>
  );
}

export default Board;

const StyledRoot = styled.div`
  position: relative;
`;

const StyledBody = styled.div`
  width: 100%;
  padding: 90px 80px 0 320px;

  display: flex;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding: 90px 10px 0 175px;

    flex-direction: column;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 80px 10px 0 80px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    flex-direction: column;
  }
`;

const StyledBtnWrapper = styled.div`
  display: none;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    height: 70px;
    margin: 20px 0;
    padding: 0 20px;

    display: flex;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 60px;
    margin: 12px 0;
    padding: 0 15px;

    display: flex;
  }
`;

const StyledText = styled.div`
  ${FONT_18_B}
`;

const StyledButton = styled.button`
  position: absolute;
  top: 65px;
  right: 0;

  background: none;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;

const StyledAddChip = styled(PlusIcon)`
  width: 35px;
  height: 35px;
  margin: 20px;
`;
