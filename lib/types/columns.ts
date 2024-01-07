export interface ColumnType {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostColumnRequestType {
  title: string;
  dashboardId: number;
}

export interface PostColumnResponseType extends ColumnType {}

export interface GetColumnResponseType {
  result: 'SUCCESS'; //????????????????????
  data: ColumnType[];
}

export interface PutColumnRequestType {
  title: string;
}

export interface PutColumnResponseType extends ColumnType {}

export interface PostColumnImageRequestType {
  image: string;
}

export interface PostColumnImageResponseType {
  imageUrl: string;
}
