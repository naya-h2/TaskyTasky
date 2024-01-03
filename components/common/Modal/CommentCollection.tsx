import { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LoadingModal from './LoadingModal';
import CommentSingle from './CommentSingle';
import { CommentType } from '@/lib/types/comments';

const LIMIT = 5;
interface Props {
  isLoading: boolean;
  commentList: CommentType[];
  offsetRef: MutableRefObject<number>;
  cardId: number;
  getCommentData: (limit: number, cardId: number, cursor: number) => Promise<void>;
}

function CommentCollection({ isLoading, commentList, offsetRef, cardId, getCommentData }: Props) {
  const areaRef = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  const observeCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      if (offsetRef.current) {
        entries.forEach((entry) => {
          if (isLoading) return;
          if (!entry.isIntersecting) return;
          getCommentData(LIMIT, cardId, offsetRef.current);
        });
      }
    },
    [offsetRef.current],
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(observeCallback, {
        threshold: 0.2,
      });

      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [offsetRef.current, observeCallback]);

  return (
    <StyledCommentsArea ref={areaRef}>
      {commentList.map((comment) => {
        return <CommentSingle key={comment.id} data={comment} />;
      })}
      {offsetRef.current > 0 && <StyledObserveTargetBox ref={target} />}
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

const StyledObserveTargetBox = styled.div`
  width: 100%;
  height: 10px;
`;
