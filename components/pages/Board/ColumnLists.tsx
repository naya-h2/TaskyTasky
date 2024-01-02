import { SetStateAction } from 'react';
import CardList from '@/components/common/Card/CardList';
import { ColumnType } from '@/lib/types/columns';

interface Props {
  columnList: ColumnType[];
  setModalColumnId: (value: SetStateAction<number>) => void;
}

function ColumnLists({ columnList, setModalColumnId }: Props) {
  return (
    <>
      {columnList.map((column) => {
        return <CardList key={column.id} column={column} setModalColumnId={setModalColumnId} />;
      })}
    </>
  );
}

export default ColumnLists;
