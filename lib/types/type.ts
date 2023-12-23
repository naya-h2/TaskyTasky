// Auth

export interface Auth {
  user: User;
  accessToken: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface ChangePassword {
  password: string;
  newPassword: string;
}

//Cards

export interface Card {
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

export interface CreateCard {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CheckCard {
  cursorId: number;
  totalCount: number;
  cards: Card[];
}

export interface ChangeCard {
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

//Columns

export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckColumn {
  result: 'SUCCESS'; // ???????????????
  data: Column[];
}

export interface ChangeColumn {
  title: string;
}

export interface CreateColumn {
  title: string;
  dashboardId: number;
}

//Comments

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface CreateComment {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface CheckComment {
  cursorId: number;
  comments: Comment[];
}

export interface ChangeComment {
  content: string;
}

export interface CommentList {
  cursorId: number | null;
  comments: Comment[];
}

//Dashboards
export interface CreateDashBoard {
  title: string;
  color: string;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardList {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
}

export interface DashboardInvitationList {
  totalCount: number;
  invitations: Invitation[];
}

//Invitations
export interface Invitation {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationList {
  cursorId: number | null;
  invitations: Invitation[];
}

//Members
export interface MemberList {
  members: Member[];
  totalCount: number;
}

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}
