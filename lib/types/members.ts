export interface GetMemberListResponseType {
  members: {
    id: number;
    userId: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    createdAt: string;
    updatedAt: string;
    isOwner: boolean;
  }[];
}
