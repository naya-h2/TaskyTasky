export interface AuthorType {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: AuthorType;
}

export interface PostCommentRequestType {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface PostCommentResponseType extends CommentType {}

export interface GetCommentListResponseType {
  cursorId: number;
  comments: CommentType[];
}

export interface PutCommentRequestType {
  content: string;
}

export interface PutCommentResponseType extends CommentType {}
