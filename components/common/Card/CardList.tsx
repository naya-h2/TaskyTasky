import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from '@/context/stores';
import Card from './Card';
import Button from '../Button';
import ImgUrlModal from '../Modal/ImgUrlModal';
import { getCardList } from '@/api/cards/getCardList';
import SettingIcon from '@/public/icon/settings.svg';
import CountChip from '../Chip/CountChip';
import { BLACK, VIOLET, GRAY } from '@/styles/ColorStyles';
import { FONT_18_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { modalType } from '@/lib/types/zustand';
import { ColumnType } from '@/lib/types/columns';
import { GetCardListResponseType } from '@/lib/types/cards';
import ColumnModal from '../Modal/ColumnModal';

interface Props {
  column: ColumnType;
  setModalColumnId: (value: SetStateAction<number>) => void;
  setModalColumnName: (value: SetStateAction<string>) => void;
}

/**
 * @param label 컬럼 제목
 * @param cardList 카드 리스트
 */

function CardList({ column, setModalColumnId, setModalColumnName }: Props) {
  const [isColumnChanged, setIsColumnChanged] = useState<boolean>(false);
  const [cardList, setCardList] = useState<GetCardListResponseType>();

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

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

  useEffect(() => {
    const fetchCardList = async () => {
      const resCardList = await getCardList(column.id);
      setCardList(resCardList);
    };

    fetchCardList();
  }, [column]);

  return (
    <StyledRoot>
      <StyledTop>
        <StyledLabelWrapper>
          <StyledEllipse />
          <StyledLabel>{column.title}</StyledLabel>
          <StyledCountChip number={cardList ? cardList.totalCount : 0}></StyledCountChip>
        </StyledLabelWrapper>
        <StyledSettingButton onClick={() => handleManageButtonClick('manageColumn', column.id, column.title)}>
          <SettingIcon />
        </StyledSettingButton>
      </StyledTop>
      <StyledBtnWrapper>
        <Button.Add roundSize="M" onClick={() => handleAddButtonClick('createTodo', column.id, column.title)} />
      </StyledBtnWrapper>
      {cardList && cardList.cards.map((card) => <Card key={card.id} card={card} column={column} />)}
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
