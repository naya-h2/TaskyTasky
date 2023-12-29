export interface CardType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostCardRequestType {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl?: string;
}

export interface PostCardResponseType extends CardType {}

export interface GetCardListResponseType {
  cursorId: number;
  totalCount: number;
  cards: CardType[];
}

export interface PutCardRequestType {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface PutCardResponseType extends CardType {}

export interface GetCardDetailResponseType extends CardType {}
