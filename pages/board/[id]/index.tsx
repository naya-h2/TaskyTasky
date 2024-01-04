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
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import LeftRightButton from '@/components/pages/Board/LeftRightButton';
import UpDownButton from '@/components/pages/Board/UpDownButton';

function Board() {
  useCheckLogin();

  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>();
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [memberList, setMemberList] = useState<GetMemberListResponseType>();
  const [modalColumnId, setModalColumnId] = useState<number>();
  const [modalColumnName, setModalColumnName] = useState<string>();

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
          <LeftRightButton />
          <UpDownButton />
          <StyledContent>
            {columnList.length > 0 && (
              <ColumnLists
                columnList={columnList}
                setModalColumnId={setModalColumnId as (value: SetStateAction<number>) => void}
                setModalColumnName={setModalColumnName as (value: SetStateAction<string>) => void}
              />
            )}
          </StyledContent>
          <NewColumnBtn onClick={handleAddColumnBtn}>+</NewColumnBtn>
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
        {modal.includes('manageColumn') && (
          <ColumnModal type={'manageColumn'} columnID={modalColumnId} columnName={modalColumnName} />
        )}
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
  padding: 120px 80px 0 300px;

  display: flex;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding: 90px 20px 0 175px;

    flex-direction: column;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 80px 20px 0 80px;
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

const NewColumnBtn = styled.button`
  width: 50px;
  height: 50px;

  position: fixed;
  z-index: 1;
  bottom: 35px;
  right: 35px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 35px;
  font-weight: 580;
  color: #968dce;

  background-color: ${WHITE};
  border-radius: 13px;
  border: 1.5px solid ${GRAY[30]};
  cursor: pointer;

  box-shadow: 1px 1px 1px ${GRAY[40]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 25px;
  }
`;
