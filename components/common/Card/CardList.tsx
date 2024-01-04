import { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useStore } from '@/context/stores';
import { getCardList } from '@/api/cards/getCardList';

import { modalType } from '@/lib/types/zustand';
import { ColumnType } from '@/lib/types/columns';
import { CardType } from '@/lib/types/cards';

import Card from './Card';
import Button from '../Button';
import SettingIcon from '@/public/icon/settings.svg';
import CountChip from '../Chip/CountChip';

import { BLACK, VIOLET, GRAY } from '@/styles/ColorStyles';
import { FONT_18_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

const FETCH_SIZE = 10;

interface Props {
  column: ColumnType;
  setModalColumnId: (value: SetStateAction<number>) => void;
  setModalColumnName: (value: SetStateAction<string>) => void;
}

function CardList({ column, setModalColumnId, setModalColumnName }: Props) {
  const [cardList, setCardList] = useState<CardType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const offsetRef = useRef<number>(0);
  const target = useRef<HTMLDivElement>(null);

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const getCardListData = async (columnID: number, size: number, cursorID: number) => {
    setIsLoading(true);
    try {
      const resComment = await getCardList(columnID, size, cursorID);
      const { cursorId, cards } = resComment;
      if (!cursorID) {
        setCardList(cards);
      }
      if (cursorID) {
        setCardList((prev) => [...prev, ...cards]);
      }
      offsetRef.current = cursorId;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddButtonClick = (type: modalType, columnId: number, columnName: string) => {
    if (modal.includes(type)) return;
    showModal(type);
    setModalColumnId(columnId);
    setModalColumnName(columnName);
  };

  const handleManageButtonClick = (type: modalType, columnID: number, columnName: string) => {
    if (modal.includes(type)) return;
    showModal(type);
    setModalColumnId(columnID);
    setModalColumnName(columnName);
  };

  const observeCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (offsetRef.current) {
        entries.forEach((entry) => {
          if (isLoading) return;
          if (!entry.isIntersecting) return;
          getCardListData(column.id, FETCH_SIZE, offsetRef.current);
        });
      }
    },
    [offsetRef.current],
  );

  useEffect(() => {
    const firstFetch = async () => {
      const res = await getCardList(column.id, FETCH_SIZE, offsetRef.current);
      setCardList(res.cards);
      setTotalCount(res.totalCount);
      offsetRef.current = res.cursorId;
    };
    firstFetch();
  }, [column]);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(observeCallback, {
        threshold: 0.2,
      });

      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [offsetRef.current, observeCallback]);

  return (
    <StyledRoot>
      <StyledTop>
        <StyledLabelWrapper>
          <StyledEllipse />
          <StyledLabel>{column.title}</StyledLabel>
          <StyledCountChip number={cardList ? totalCount : 0}></StyledCountChip>
        </StyledLabelWrapper>
        <StyledSettingButton onClick={() => handleManageButtonClick('manageColumn', column.id, column.title)}>
          <SettingIcon />
        </StyledSettingButton>
      </StyledTop>
      <StyledBtnWrapper>
        <Button.Add roundSize="M" onClick={() => handleAddButtonClick('createTodo', column.id, column.title)} />
      </StyledBtnWrapper>
      {cardList && cardList.map((card) => <Card key={card.id} card={card} column={column} />)}
      {offsetRef.current > 0 && <StyledObserveTargetBox ref={target} />}
    </StyledRoot>
  );
}

export default CardList;

const StyledRoot = styled.div`
  flex-shrink: 0;

  width: 354px;
  height: 100vh;
  padding: 22px 20px;

  border-right: 1px solid ${GRAY[20]};
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 100%;
    height: 100%;
    border-right: none;
    border-bottom: 1px solid ${GRAY[20]};
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 17px 12px;
  }
`;

const StyledTop = styled.div`
  margin-bottom: 25px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledEllipse = styled.div`
  width: 8px;
  height: 8px;
  margin-right: 8px;

  flex-shrink: 0;

  background-color: ${VIOLET[1]};

  border-radius: 50%;
`;

const StyledLabel = styled.div`
  width: 100%;
  margin-right: 12px;

  color: ${BLACK[2]};
  ${FONT_18_B};

  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCountChip = styled(CountChip)`
  width: 24px;
  height: 24px;
`;

const StyledSettingButton = styled.button`
  width: 24px;
  height: 24px;
  margin-left: 2px;

  display: flex;
  align-items: center;

  background: none;

  cursor: pointer;
`;

const StyledBtnWrapper = styled.div`
  width: 100%;
  max-width: 314px;
  height: 40px;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  cursor: pointer;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    max-width: none;
  }
`;

const StyledObserveTargetBox = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 16px;

  background-color: ${GRAY[15]};
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;
  cursor: pointer;

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    flex-direction: row;
  }
`;
