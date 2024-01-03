import { useRef } from 'react';
import styled from 'styled-components';
import LoadingModal from './LoadingModal';
import CommentSingle from './CommentSingle';
import { CommentType } from '@/lib/types/comments';

interface Props {
  isLoading: boolean;
  commentList: CommentType[];
}

function CommentCollection({ isLoading, commentList }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <StyledCommentsArea ref={areaRef}>
      {commentList.map((comment) => {
        return <CommentSingle key={comment.id} data={comment} />;
      })}
      {isLoading && <LoadingModal anchorRef={areaRef} />}
    </StyledCommentsArea>
  );
}

export default CommentCollection;

const StyledCommentsArea = styled.div`
  width: 100%;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
