export interface DashboardSimpleType {
  title: string;
  id: number;
}

export interface InviteeType {
  nickname: string;
  email: string;
  id: number;
}

export interface InvitationType {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: DashboardSimpleType;
  invitee: InviteeType;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationResponseType {
  cursorId: number;
  invitations: InvitationType;
}

export interface PutInvitationRequestType {
  inviteeAccepted: boolean;
}

export interface PutInvitationResponseType extends InvitationType {}
