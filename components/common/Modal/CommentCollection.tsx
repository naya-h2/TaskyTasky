import CommentSingle from './CommentSingle';
import { comments } from './Mockup';

interface Props {
  teamId: string;
  cardId: number;
}

function CommentCollection({ teamId, cardId }: Props) {
  return (
    <>
      {comments.comments.map((comment) => {
        return <CommentSingle key={comment.id} data={comment} />;
      })}
    </>
  );
}

export default CommentCollection;
