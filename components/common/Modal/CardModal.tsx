import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';
import { modalType } from '@/lib/types/zustand';
import { Card } from '@/lib/types/type';
import ModalFrame from './ModalFrame';
import ColumnNameChip from '../Chip/ColumnNameChip';
import Profile from '../Profile/Profile';
import ChipColor from '../Chip/ChipColor';
import Textarea from '../Textarea/TextArea';
import CommentCollection from './CommentCollection';
import { FONT_12, FONT_14 } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import VectorIcon from '@/public/icon/Vector.svg';
import { useStore } from '@/context/stores';
import { createComment } from '@/api/comments/createComment';
import { CommentType } from '@/lib/types/comments';
import { getCommentList } from '@/api/comments/getCommentList';

const LIMIT = 5;

interface Props {
  type: modalType;
  columnTitle: string;
  cardInfo: Card;
  dashboardId: number;
}

function CardModal({ type, columnTitle, cardInfo, dashboardId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isTagLoading, setIsTagLoading] = useState(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);

  const offsetRef = useRef<number>(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const modalCardComment = useStore((state) => state.modalCardComment);
  const isCommentChanged = useStore((state) => state.isCommentChanged);
  const setModalCardComment = useStore((state) => state.setModalCardComment);
  const setIsCommentChanged = useStore((state) => state.setIsCommentChanged);

  const getCommentData = async (limit: number, cardId: number, cursor: number) => {
    setIsLoading(true);
    try {
      const resComment = await getCommentList(limit, cardId, cursor);
      const { cursorId, comments } = resComment;
      if (!cursor) {
        setCommentList(comments);
      }
      if (cursor) {
        setCommentList((prevComment) => [...prevComment, ...comments]);
      }
      offsetRef.current = cursorId;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextareaClick = async () => {
    const commentData = {
      content: modalCardComment,
      cardId: cardInfo.id,
      columnId: cardInfo.columnId,
      dashboardId: dashboardId,
    };
    await createComment(commentData);
    setModalCardComment('');
    setIsCommentChanged();
    areaRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    getCommentData(LIMIT, cardInfo.id, 0);
  }, [isCommentChanged]);

  return (
    <ModalFrame type={type} title={cardInfo.title} height="Low">
      <StyledContainer>
        <StyledLeftWrapper>
          <StyledTaskSmallInfoBox>
            <ColumnNameChip content={columnTitle} />
            {cardInfo.tags.length > 0 && <VectorIcon />}
            {cardInfo.tags.map((tag) => {
              return <ChipColor key={tag} setIsLoading={setIsTagLoading} text={tag} />;
            })}
          </StyledTaskSmallInfoBox>
          <StyledTaskDescription
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cardInfo.description) }}
            $isImage={cardInfo?.imageUrl}
          ></StyledTaskDescription>
          {cardInfo?.imageUrl && (
            <StyledImgWrapper>
              <Image
                src={cardInfo.imageUrl as string}
                alt="할일 이미지"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </StyledImgWrapper>
          )}
          <Textarea
            type="comment"
            isEditing={false}
            value={modalCardComment}
            setCommentValue={setModalCardComment}
            onClick={handleTextareaClick}
          />
          <CommentCollection
            areaRef={areaRef}
            isLoading={isLoading}
            commentList={commentList}
            offsetRef={offsetRef}
            cardId={cardInfo.id}
            getCommentData={getCommentData}
          />
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

const StyledTaskDescription = styled.p<{ $isImage: string | undefined }>`
  ${({ $isImage }) => $isImage || 'min-height: 100px'};
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
