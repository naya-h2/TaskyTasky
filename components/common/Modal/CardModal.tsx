import Image from 'next/image';
import styled from 'styled-components';
import ModalFrame from './ModalFrame';
import { modalType } from '@/lib/types/zustand';
import { Card } from '@/lib/types/type';
import ColumnNameChip from '../Chip/ColumnNameChip';
import Profile from '../Profile/Profile';
import ChipColor from '../Chip/ChipColor';
import Textarea from '../Textarea/Textarea';
import CommentCollection from './CommentCollection';
import { FONT_12, FONT_14 } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import VectorIcon from '@/public/icon/Vector.svg';

interface Props {
  type: modalType;
  columnTitle: string;
  cardInfo: Card;
}

function CardModal({ type, columnTitle, cardInfo }: Props) {
  const handleButtonClick = () => {};

  return (
    <ModalFrame type={type} title={cardInfo.title} height="Low" btnFnc={handleButtonClick}>
      <StyledContainer>
        <StyledLeftWrapper>
          <StyledTaskSmallInfoBox>
            <ColumnNameChip content={columnTitle} />
            <VectorIcon />
            {cardInfo.tags.map((tag) => {
              let backgroundColor, fontColor;
              switch (tag) {
                case '프로젝트':
                  backgroundColor = '#F9EEE3';
                  fontColor = '#D58D49';
                  break;
                case '일반':
                  backgroundColor = '#E7F7DB';
                  fontColor = '#86D549';
                  break;
                case '백엔드':
                  backgroundColor = '#F7DBF0';
                  fontColor = '#D549B6';
                  break;
                case '상':
                  backgroundColor = '#DBE6F7';
                  fontColor = '#4981D5';
                  break;
                default:
                  break;
              }
              return (
                <ChipColor
                  key={tag}
                  backgroundColor={backgroundColor as string}
                  fontColor={fontColor as string}
                  text={tag}
                />
              );
            })}
          </StyledTaskSmallInfoBox>
          <StyledTaskDescription>{cardInfo.description}</StyledTaskDescription>
          {cardInfo?.imageUrl && (
            <StyledImgWrapper>
              <Image src={cardInfo.imageUrl as string} alt="할일 이미지" fill priority />
            </StyledImgWrapper>
          )}
          <Textarea type="comment" isEditing={false} value="" />
          <StyledCommentsArea>
            <CommentCollection cardId={cardInfo.id} />
          </StyledCommentsArea>
        </StyledLeftWrapper>
        <StyledRightWrapper>
          <StyledTaskBigInfoBox>
            <StyledTaskInfoLabel>담당자</StyledTaskInfoLabel>
            <Profile
              type="card"
              id={cardInfo.assignee.id}
              name={cardInfo.assignee.nickname}
              profileImg={cardInfo.assignee.profileImageUrl}
            />
            <StyledTaskInfoLabel>마감일</StyledTaskInfoLabel>
            <StyledTaskDueDate>{cardInfo.dueDate}</StyledTaskDueDate>
          </StyledTaskBigInfoBox>
        </StyledRightWrapper>
      </StyledContainer>
    </ModalFrame>
  );
}

export default CardModal;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StyledLeftWrapper = styled.div`
  width: 440px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledRightWrapper = styled.div`
  width: 190px;
`;

const StyledTaskSmallInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledTaskBigInfoBox = styled.div`
  width: 200px;
  height: 155px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid ${GRAY[30]};
  border-radius: 8px;
`;

const StyledTaskDescription = styled.p`
  ${FONT_14};
  font-weight: 400;
  line-height: 171.5%;
`;

const StyledImgWrapper = styled.div`
  width: 100%;
  height: 263px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const StyledCommentsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledTaskInfoLabel = styled.span`
  ${FONT_12};
  font-weight: 600;
  line-height: 166.6%;

  &:nth-of-type(even) {
    margin-top: 10px;
  }
`;

const StyledTaskDueDate = styled.span`
  ${FONT_14};
  font-weight: 400;
  color: ${BLACK[2]};
`;
