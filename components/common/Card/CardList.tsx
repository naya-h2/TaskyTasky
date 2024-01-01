import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStore } from '@/context/stores';
import Card from './Card';
import Button from '../Button';
import TodoModal from '@/components/common/Modal/TodoModal';
import { getCardList } from '@/api/cards/getCardList';
import SettingIcon from '@/public/icon/settings.svg';
import CountChip from '../Chip/CountChip';
import { BLACK, VIOLET, GRAY } from '@/styles/ColorStyles';
import { FONT_18_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { MemberListType } from '@/lib/types/members';
import { modalType } from '@/lib/types/zustand';
import { ColumnType } from '@/lib/types/columns';
import { GetCardListResponseType } from '@/lib/types/cards';
import ImgUrlModal from '../Modal/ImgUrlModal';

interface Props {
  column: ColumnType;
  memberList: MemberListType[];
  dashboardId: number;
  isColumnChanged: boolean;
  setIsColumnChanged: (value: SetStateAction<boolean>) => void;
}

/**
 * @param label 컬럼 제목
 * @param cardList 카드 리스트
 */
function CardList({ column, memberList, dashboardId, setIsColumnChanged, isColumnChanged }: Props) {
  const [cardList, setCardList] = useState<GetCardListResponseType>();

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
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
          <CountChip number={cardList ? cardList.totalCount : 0}></CountChip>
        </StyledLabelWrapper>
        <StyledSettingButton>
          <SettingIcon />
        </StyledSettingButton>
      </StyledTop>
      <StyledBtnWrapper>
        <Button.Add roundSize="M" onClick={() => handleButtonClick('createTodo')} />
      </StyledBtnWrapper>
      {cardList && cardList.cards.map((card) => <Card key={card.id} card={card} columnTitle={column.title} />)}
      {modal.includes('createTodo') && (
        <TodoModal
          type={'createTodo'}
          memberLists={memberList}
          dashboardId={dashboardId}
          columnId={column.id}
          setIsColumnChanged={setIsColumnChanged}
          isColumnChanged={isColumnChanged}
        />
      )}
      {modal[modal.length - 1] === 'imgUrl' && <ImgUrlModal type="imgUrl" />}
    </StyledRoot>
  );
}

export default CardList;

const StyledRoot = styled.div`
  width: 354px;
  height: 100vh;
  padding: 22px 20px;

  border-right: 1px solid ${GRAY[20]};
  overflow-y: auto;

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

const StyledSettingButton = styled.button`
  width: 24px;
  height: 24px;

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
