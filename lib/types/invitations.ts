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
  inviter: InviteeType;
  teamId: string;
  dashboard: DashboardSimpleType;
  invitee: InviteeType;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationResponseType {
  cursorId: number | null;
  invitations: InvitationType[];
}

export interface PutInvitationRequestType {
  inviteAccepted: boolean;
}

export interface PutInvitationResponseType extends InvitationType {}
