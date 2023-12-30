import CommentSingle from './CommentSingle';
import { comments } from './Mockup';

interface Props {
  cardId: number;
}

function CommentCollection({ cardId }: Props) {
  return (
    <>
      {comments.comments.map((comment) => {
        return <CommentSingle key={comment.id} data={comment} />;
      })}
    </>
  );
}

export default CommentCollection;
