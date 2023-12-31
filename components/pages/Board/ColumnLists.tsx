import { SetStateAction } from 'react';
import CardList from '@/components/common/Card/CardList';
import { ColumnType } from '@/lib/types/columns';
import { MemberListType } from '@/lib/types/members';

interface Props {
  columnList: ColumnType[];
  id: number;
  isColumnChanged: boolean;
  setIsColumnChanged: (value: SetStateAction<boolean>) => void;
  memberList: MemberListType[];
}

function ColumnLists({ columnList, id, isColumnChanged, setIsColumnChanged, memberList }: Props) {
  return (
    <>
      {columnList.map((column) => {
        return (
          <CardList
            key={column.id}
            column={column}
            memberList={memberList}
            dashboardId={id}
            isColumnChanged={isColumnChanged}
            setIsColumnChanged={setIsColumnChanged}
          />
        );
      })}
    </>
  );
}

export default ColumnLists;
