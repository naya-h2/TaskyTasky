export interface DashboardType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface PostDashboardRequestType {
  title: string;
  color: string;
}

export interface PostDashboardResponseType extends DashboardType {}

export interface GetDashboardListResponseType {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardType[];
}

export interface GetDashboardListDetailResponseType extends DashboardType {}

export interface PutDashboardRequestType {
  title: string | undefined;
  color: string | undefined;
}

export interface PutDashboardResponseType extends DashboardType {}

export interface InviteeType {
  nickname: string;
  email: string;
  id: number;
}

export interface DashboardInvitationType {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: InviteeType;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PostDashboardInvitationRequestType {
  email: string;
}

export interface PostDashboardInvitationResponseType extends DashboardInvitationType {}

export interface GetDashboardInvitationResponseType {
  totalCount: number;
  invitations: DashboardInvitationType[];
}
