import { SetStateAction } from 'react';
import CardList from '@/components/common/Card/CardList';
import { ColumnType } from '@/lib/types/columns';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import { MemberListType } from '@/lib/types/members';

interface Props {
  columnList: ColumnType[];
  id: number;
  isColumnChanged: boolean;
  setIsColumnChanged: (value: SetStateAction<boolean>) => void;
  memberList: MemberListType[];
}

function ColumnLists({ columnList, id, isColumnChanged, setIsColumnChanged, memberList }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  return (
    <>
      {columnList.map((column) => {
        return (
          <CardList
            key={column.id}
            column={column}
            onClickAddCard={() => handleButtonClick('createTodo')}
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
