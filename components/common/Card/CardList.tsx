import styled from 'styled-components';
import Card from './Card';
import Button from '../Button';
import { CheckCard } from '@/lib/types/type';
import { BLACK, VIOLET, GRAY, WHITE } from '@/styles/ColorStyles';
import { FONT_18_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import SettingIcon from '@/public/icon/settings.svg';
import CountChip from '../Chip/CountChip';

interface Props {
  label: String;
  cardList: CheckCard;
  onClickAddCard: () => void;
}

/**
 * @param label 컬럼 제목
 * @param cardList 카드 리스트
 */
function CardList({ label, cardList, onClickAddCard }: Props) {
  const { totalCount, cards } = cardList;

  return (
    <StyledRoot>
      <StyledTop>
        <StyledLabelWrapper>
          <StyledEllipse />
          <StyledLabel>{label}</StyledLabel>
          <CountChip number={totalCount}></CountChip>
        </StyledLabelWrapper>
        <StyledSettingButton>
          <SettingIcon />
        </StyledSettingButton>
      </StyledTop>
      <StyledBtnWrapper>
        <Button.Add roundSize="M" onClick={onClickAddCard} />
      </StyledBtnWrapper>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </StyledRoot>
  );
}

export default CardList;

const StyledRoot = styled.div`
  width: 354px;
  height: 100vh;
  padding: 22px 20px;

  border-right: 1px solid ${GRAY[20]};

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
`;

const StyledEllipse = styled.div`
  width: 8px;
  height: 8px;
  margin-right: 8px;

  background-color: ${VIOLET[1]};

  border-radius: 50%;
`;

const StyledLabel = styled.div`
  margin-right: 12px;

  color: ${BLACK[2]};
  ${FONT_18_B};
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
