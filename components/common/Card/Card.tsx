import Image from 'next/image';
import styled from 'styled-components';
import { Card as CardType } from '@/lib/types/type';
import { WHITE, GRAY, RED } from '@/styles/ColorStyles';
import { FONT_12, FONT_16, FONT_16_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Calendar from '@/public/icon/calendar.svg';
import CardModal from '@/components/common/Modal/CardModal';
import { useStore } from '@/context/stores';
import { modalType } from '@/lib/types/zustand';
import ChipColor from '../Chip/ChipColor';

interface Props {
  card: CardType;
  columnTitle: string;
}

function Card({ card, columnTitle }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const setModalCard = useStore((state) => state.setModalCard);
  const setModalCardColumnTitle = useStore((state) => state.setModalCardColumnTitle);

  const currentDate = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 3);
  const isCloseDuedate = currentDate < new Date(card.dueDate) && new Date(card.dueDate) <= threeDaysLater;

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
    setModalCard(card);
    setModalCardColumnTitle(columnTitle);
  };

  return (
    <StyledWrapper isRed={isCloseDuedate} onClick={() => handleButtonClick('card')}>
      {card.imageUrl && <StyledThumbnail src={card.imageUrl} width={274} height={160} alt="" />}
      <StyledCircle isRed={isCloseDuedate} />
      <StyledContent>
        <StyledTitle isRed={isCloseDuedate}>{card.title}</StyledTitle>
        <StyledDetail>
          <StyledTagWrapper>
            {card.tags.map((t) => (
              <ChipColor key={t} backgroundColor="#f9eee3" fontColor="#d58d49" text={t}></ChipColor>
            ))}
          </StyledTagWrapper>
          <StyledDateWrapper>
            <Calendar />
            {card.dueDate}
          </StyledDateWrapper>
          {card.assignee.profileImageUrl ? (
            <StyledProfileChip src={card.assignee?.profileImageUrl} width={24} height={24} alt="프로필 이미지" />
          ) : (
            <StyledDefaultProfileChip>{card.assignee.nickname[0]}</StyledDefaultProfileChip>
          )}
        </StyledDetail>
      </StyledContent>
    </StyledWrapper>
  );
}

export default Card;

const StyledWrapper = styled.div<{ isRed: boolean }>`
  width: 100%;
  height: fit-content;
  margin-bottom: 16px;
  padding: 20px;

  position: relative;

  background-color: ${WHITE};

  border-radius: 6px;
  /* border: ${(props) => (props.isRed ? '2px' : '1px')} solid ${(props) => (props.isRed ? '#EBC7C7' : GRAY[30])}; */
  border: 1px solid ${GRAY[30]};

  cursor: pointer;

  &:hover {
    background-color: ${GRAY[20]};
    background-color: ${(props) => (props.isRed ? '#FFE3E3' : GRAY[20])};
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    flex-direction: row;
  }
`;

const StyledCircle = styled.div<{ isRed: boolean }>`
  width: 10px;
  height: 10px;

  position: absolute;
  top: 10px;
  left: 10px;

  display: ${(props) => (props.isRed ? 'flex' : 'none')};

  background-color: ${RED};
  border-radius: 50%;
`;

const StyledThumbnail = styled(Image)`
  width: 100%;
  margin-bottom: 12px;

  border-radius: 6px;

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

const StyledTitle = styled.div<{ isRed: boolean }>`
  margin-bottom: 10px;

  ${FONT_16}
  ${(props) => (props.isRed ? FONT_16_B : FONT_16)}
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

const StyledDefaultProfileChip = styled.div`
  width: 24px;
  height: 24px;

  position: absolute;
  right: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${GRAY[40]};

  color: ${WHITE};
  ${FONT_12}

  border-radius: 50%;
`;
