import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import CardList from '@/components/common/Card/CardList';
import Button from '@/components/common/Button';
import ColumnModal from '@/components/common/Modal/ColumnModal';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_18_B } from '@/styles/FontStyles';
import { DashboardType } from '@/lib/types/dashboards';

import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import { getDashboardList } from '@/api/dashboards/getDashboardList';
import { getCardList } from '@/api/cards/getCardList';
import { ColumnType } from '@/lib/types/columns';
import { getColumnList } from '@/api/columns/getColumnList';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import { createCard } from '@/api/cards/createCard';

function Board() {
  const [currentDashboard, setCurrentDashboard] = useState<DashboardType>();
  const [dashboardList, setDashboardList] = useState<DashboardType[]>([]);
  const [columnList, setColumnList] = useState<ColumnType[]>([]);
  const [isColumnChanged, setIsColumnChanged] = useState<boolean>(false);

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const router = useRouter();
  const { id } = router.query;

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        return;
      }

      const resCurrentDashboard = await getDashboardInfo(Number(id));
      setCurrentDashboard(resCurrentDashboard);

      const resDashboardList = await getDashboardList('infiniteScroll', 10);
      setDashboardList(resDashboardList.dashboards);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchColumnData = async () => {
      if (!id) {
        return;
      }
      const resColumnList = await getColumnList(Number(id));
      setColumnList(resColumnList.data);
    };

    fetchColumnData();
  }, [id, isColumnChanged]);

  const renderColumn = async () => {
    const columnsWithCards = await Promise.all(
      columnList.map(async (column) => {
        const resCardList = await getCardList(column.id);

        const onClickAddCard = async (boardID: number, comlunmID: number) => {
          // 모달 전 mock
          createCard({
            assigneeUserId: 149,
            dashboardId: Number(id),
            columnId: comlunmID,
            title: '임시 제목',
            description: '임시 설명',
            dueDate: '2023-12-22 07:30',
            tags: ['백엔드'],
          });
          setIsColumnChanged(!isColumnChanged);
        };

        return (
          <CardList
            key={column.id}
            label={column.title}
            cardList={resCardList}
            onClickAddCard={() => onClickAddCard(Number(id), column.id)}
          />
        );
      }),
    );

    return columnsWithCards;
  };

  const handleAddColumnBtn = async () => {
    if (!id) {
      return;
    }
    showModal('createColumn');
  };

  // 카드 추가
  const handleAddCardBtn = async (columnID: number) => {
    if (!id || !columnID) {
      return;
    }
    // 카드 생성 모달 띄우기
    console.log('카드생성을 위한 모달이 떴다.');
  };

  return (
    <StyledRoot>
      <Header page="others" children={currentDashboard?.title} crown={currentDashboard?.createdByMe} />
      <SideMenu dashboards={dashboardList} />
      <StyledContent>
        {columnList.length > 0 && <AsyncColumns renderColumn={renderColumn} />}
        <StyledBtnWrapper>
          <Button.Add roundSize="L" onClick={handleAddColumnBtn}>
            <StyledText>새로운 컬럼 추가하기</StyledText>
          </Button.Add>
        </StyledBtnWrapper>
      </StyledContent>
      {modal.length > 0 && (
        <ColumnModal
          type={'createColumn'}
          dashboardID={Number(id)}
          refreshColumn={() => setIsColumnChanged(!isColumnChanged)}
        />
      )}
    </StyledRoot>
  );
}

const AsyncColumns = ({ renderColumn }: { renderColumn: Function }) => {
  const [renderedColumns, setRenderedColumns] = useState([]);

  useEffect(() => {
    const renderAsyncColumns = async () => {
      const columns = await renderColumn();
      setRenderedColumns(columns);
    };

    renderAsyncColumns();
  }, [renderColumn]);

  return <>{renderedColumns}</>;
};

export default Board;

const StyledRoot = styled.div``;

const StyledContent = styled.div`
  width: 100%;
  padding-top: 70px;
  padding-left: 300px;

  display: flex;
  flex-direction: row;

  background-color: ${GRAY[10]};

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
