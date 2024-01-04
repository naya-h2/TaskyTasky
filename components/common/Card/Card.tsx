import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { Card as CardType } from '@/lib/types/type';
import { WHITE, GRAY, RED, BLUE, ORANGE, PURPLE, GREEN, PINK } from '@/styles/ColorStyles';
import { FONT_12, FONT_16, FONT_16_B, FONT_16_EB } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Calendar from '@/public/icon/calendar.svg';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import ChipColor from '../Chip/ChipColor';
import { ColumnType } from '@/lib/types/columns';
import { useGetUser } from '@/hooks/useGetUser';

const COLORS = [BLUE[1], ORANGE[1], PURPLE[1], GREEN[1], PINK[1]];

interface Props {
  card: CardType;
  column: ColumnType;
}

function Card({ card, column }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useGetUser();

  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const setModalCard = useStore((state) => state.setModalCard);
  const setModalCardColumnTitle = useStore((state) => state.setModalCardColumnTitle);

  const currentDate = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 3);
  const isCloseDuedate = currentDate < new Date(card.dueDate) && new Date(card.dueDate) <= threeDaysLater;
  const isOverDuedate = currentDate >= new Date(card.dueDate);

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
    setModalCard(card);
    setModalCardColumnTitle(column.title);
  };

  return (
    <StyledWrapper $isRed={isCloseDuedate} $isOver={isOverDuedate} onClick={() => handleButtonClick('card')}>
      {card.imageUrl && <StyledThumbnail src={card.imageUrl} width={274} height={160} alt="" />}
      <StyledCircle $isRed={isCloseDuedate} />
      <StyledContent>
        <StyledTitle $isRed={isCloseDuedate}>{card.title}</StyledTitle>
        <StyledDetail>
          <StyledTagWrapper>
            {card.tags.map((t) => (
              <ChipColor key={t} text={t} setIsLoading={setIsLoading}></ChipColor>
            ))}
          </StyledTagWrapper>
          <StyledDateWrapper>
            <Calendar />
            {card.dueDate}
          </StyledDateWrapper>
          {card.assignee.profileImageUrl ? (
            <StyledProfileChip src={card.assignee?.profileImageUrl} width={24} height={24} alt="프로필 이미지" />
          ) : (
            <StyledDefaultProfileChip $color={card.assignee.id % 5}>
              {card.assignee.nickname[0]}
            </StyledDefaultProfileChip>
          )}
        </StyledDetail>
      </StyledContent>
    </StyledWrapper>
  );
}

export default Card;

const StyledWrapper = styled.div<{ $isRed: boolean; $isOver: boolean }>`
  width: 100%;
  height: fit-content;
  margin-bottom: 16px;
  padding: 20px;

  position: relative;

  background-color: ${WHITE};
  opacity: ${(props) => (props.$isOver ? 0.8 : 1)};

  border-radius: 6px;
  border: ${(props) => (props.$isOver ? '2px' : '1px')} ${(props) => (props.$isOver ? 'dashed' : 'solid')} ${GRAY[30]};

  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isRed ? '#ffe3e3' : GRAY[15])};
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    flex-direction: row;
  }
`;

const StyledCircle = styled.div<{ $isRed: boolean }>`
  width: 10px;
  height: 10px;

  position: absolute;
  top: 10px;
  left: 10px;

  display: ${(props) => (props.$isRed ? 'flex' : 'none')};

  background-color: ${RED};
  border-radius: 50%;
`;

const StyledThumbnail = styled(Image)`
  width: 100%;
  margin-bottom: 12px;

  border-radius: 6px;
  object-fit: cover;
  object-position: center;

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    width: 90px;
    height: 100%;

    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const StyledContent = styled.div`
  width: 100%;
`;

const StyledTitle = styled.div<{ $isRed: boolean }>`
  margin-bottom: 10px;

  ${(props) => (props.$isRed ? FONT_16_EB : FONT_16_B)}
`;

const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: row;
    align-items: center;
  }
`;

const StyledTagWrapper = styled.div`
  margin-bottom: 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 6px;

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 0;
    margin-right: 16px;
  }
`;

const StyledDateWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;

  color: ${GRAY[50]};
`;

const StyledProfileChip = styled(Image)`
  position: absolute;
  right: 20px;
  bottom: 20px;

  border-radius: 50%;
`;

const StyledDefaultProfileChip = styled.div<{ $color: number }>`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${(props) => COLORS[`${props.$color}`]};

  color: ${WHITE};
  ${FONT_12}

  border-radius: 50%;
`;
