import { useState } from 'react';
import styled, { css } from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import ProfileImg from '../Profile/ProfileImg';
import Textarea from '../Textarea/TextArea';
import { Comment } from '@/lib/types/type';
import { FONT_12, FONT_14_B } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';

interface Props {
  data: Comment;
}

function CommentSingle({ data }: Props) {
  const initialCommentContent = data.content;
  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(initialCommentContent);
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleDeleteClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <StyledContainer key={data.id}>
      <StyledLeftWrapper>
        <ProfileImg url={data.author.profileImageUrl} name={data.author.nickname} id={data.id} size={34} />
      </StyledLeftWrapper>
      <StyledRightWrapper>
        <StyledInformation>
          <StyledAuthor>{data.author.nickname}</StyledAuthor>
          <StyledDate>{data.createdAt}</StyledDate>
        </StyledInformation>
        {isEditing ? (
          <Textarea isEditing={true} initialValue={commentContent} />
        ) : (
          <StyledContent>{data.content}</StyledContent>
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
  width: 396px;
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
