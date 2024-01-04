import { MutableRefObject, RefObject, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import LoadingModal from './LoadingModal';
import CommentSingle from './CommentSingle';
import { CommentType } from '@/lib/types/comments';
import { GRAY } from '@/styles/ColorStyles';

const LIMIT = 5;
interface Props {
  areaRef: RefObject<HTMLDivElement>;
  isLoading: boolean;
  commentList: CommentType[];
  offsetRef: MutableRefObject<number>;
  cardId: number;
  getCommentData: (limit: number, cardId: number, cursor: number) => Promise<void>;
}

function CommentCollection({ areaRef, isLoading, commentList, offsetRef, cardId, getCommentData }: Props) {
  const target = useRef<HTMLDivElement>(null);

  const MoveToTop = () => {
    if (areaRef && areaRef.current) {
      areaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      {commentList.length > 0 && <StyledScrollTop onClick={MoveToTop}>↑</StyledScrollTop>}
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
  position: relative;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledObserveTargetBox = styled.div`
  width: 100%;
  height: 15px;
  border: 1px solid white;
`;

const StyledScrollTop = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid ${GRAY[50]};
  border-radius: 70%;
  color: ${GRAY[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  left: 410px;
  bottom: 10px;
  cursor: pointer;
`;
