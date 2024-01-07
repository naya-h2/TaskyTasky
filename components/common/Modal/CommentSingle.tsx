import { useState } from 'react';
import styled, { css } from 'styled-components';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import ProfileImg from '../Profile/ProfileImg';
import Textarea from '../Textarea/TextArea';
import { FONT_12, FONT_14_B } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import { CommentType } from '@/lib/types/comments';
import { editComment } from '@/api/comments/editComment';
import { timestamp } from '@/lib/utils/timestamp';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  data: CommentType;
}

function CommentSingle({ data }: Props) {
  const initialCommentContent = data.content;
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(initialCommentContent);
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const setCardCommentId = useStore((state) => state.setCardCommentId);

  const time = timestamp(new Date(data.createdAt));

  const handleDeleteClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
    setCardCommentId(data.id);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleTextareaClick = async () => {
    const commentData = {
      content: commentContent,
    };
    await editComment(data.id, commentData);
    setIsEditing(!isEditing);
  };

  return (
    <StyledContainer>
      <StyledLeftWrapper>
        <ProfileImg url={data.author.profileImageUrl} name={data.author.nickname} id={data.id} size={34} />
      </StyledLeftWrapper>
      <StyledRightWrapper>
        <StyledInformation>
          <StyledAuthor>{data.author.nickname}</StyledAuthor>
          <StyledDate>{time}</StyledDate>
        </StyledInformation>
        {isEditing ? (
          <Textarea
            type="comment"
            isEditing={true}
            value={commentContent}
            setCommentValue={setCommentContent}
            onClick={handleTextareaClick}
          />
        ) : (
          <StyledContent dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(commentContent) }}></StyledContent>
        )}
        <StyledToolBox $isEditing={isEditing}>
          {isEditing ? (
            <StyledCancleButton onClick={handleEditClick}>취소</StyledCancleButton>
          ) : (
            <StyledEditButton onClick={handleEditClick}>수정</StyledEditButton>
          )}
          {isEditing || (
            <StyledDeleteButton onClick={() => handleDeleteClick('deleteCommentAlert')}>삭제</StyledDeleteButton>
          )}
        </StyledToolBox>
      </StyledRightWrapper>
    </StyledContainer>
  );
}

export default CommentSingle;

const StyledButtonText = css`
  width: 30px;
  ${FONT_12};
  font-weight: 400;
  color: ${GRAY[40]};
  text-decoration-line: underline;
  background-color: white;
`;

const StyledContainer = styled.div`
  width: 450px;
  display: flex;
  gap: 10px;
`;

const StyledLeftWrapper = styled.div`
  width: 44px;
`;

const StyledRightWrapper = styled.div`
  width: 85%;
  padding-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledAuthor = styled.span`
  ${FONT_14_B};
  font-weight: 600;
  color: ${BLACK[2]};
`;

const StyledDate = styled.span`
  ${FONT_12};
  font-weight: 400;
  color: ${GRAY[40]};
`;

const StyledContent = styled.p`
  ${FONT_14_B};
  font-weight: 400;
  color: ${BLACK[2]};
  margin-bottom: 5px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 330px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 200px;
  }
`;

const StyledToolBox = styled.div<{ $isEditing: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isEditing ? 'column' : 'row')};
  gap: 5px;
`;

const StyledEditButton = styled.button`
  ${StyledButtonText};
`;

const StyledCancleButton = styled.button`
  ${StyledButtonText};
`;

const StyledDeleteButton = styled.button`
  ${StyledButtonText};
`;
