import Image from 'next/image';
import styled from 'styled-components';
import { Card as CardType } from '@/lib/types/type';
import { WHITE, BLACK, GRAY } from '@/styles/ColorStyles';
import { FONT_12, FONT_16 } from '@/styles/FontStyles';
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

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  return (
    <StyledWrapper onClick={() => handleButtonClick('card')}>
      {card.imageUrl && <StyledThumbnail src={card.imageUrl} width={274} height={160} alt="" />}
      <StyledContent>
        <StyledTitle>{card.title}</StyledTitle>
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
            <StyledProfileChip src={card.assignee.profileImageUrl} width={24} height={24} alt="프로필 이미지" />
          ) : (
            <StyledDefaultProfileChip>{card.assignee.nickname[0]}</StyledDefaultProfileChip>
          )}
        </StyledDetail>
      </StyledContent>
      {modal.includes('card') && <CardModal type={'card'} cardInfo={card} columnTitle={columnTitle} />}
    </StyledWrapper>
  );
}

export default Card;

const StyledWrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin-bottom: 16px;
  padding: 20px;

  position: relative;

  background: ${WHITE};

  border-radius: 6px;
  border: 1px solid ${GRAY[30]};

  cursor: pointer;

  &:hover {
    background-color: ${GRAY[20]};
  }

  @media (max-width: ${DEVICE_SIZE.tablet}) and (min-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    flex-direction: row;
  }
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

const StyledTitle = styled.div`
  margin-bottom: 10px;

  ${FONT_16}
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
