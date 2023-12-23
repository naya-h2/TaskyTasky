export interface UserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostSignupRequestType {
  email: string;
  nickname: string;
  password: string;
}

export interface PostSignupResponseType extends UserType {}

export interface GetUserInfoResponseType extends UserType {}

export interface PutDashboardRequestType {
  nickname: string;
  profileImageUrl: string;
}

export interface PutDashboardResponseType extends UserType {}

export interface PostDashboardRequestType {
  image: string;
}

export interface PostDashboardResponseType {
  profileImageUrl: string;
}
