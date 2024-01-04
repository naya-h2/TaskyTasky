import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalFrame from './ModalFrame';
import { modalType } from '@/lib/types/zustand';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import AddProfileImg from '@/components/pages/mypage/AddProfileImg';
import { MemberListType } from '@/lib/types/members';
import { PostCardRequestType } from '@/lib/types/cards';
import DropDown from '../DropDown/DropDown';
import Input from '../Input/Input';
import Textarea from '../Textarea/TextArea';
import { useStore } from '@/context/stores';
import { createCard } from '@/api/cards/createCard';
import { editCard } from '@/api/cards/editCard';
import { ColumnType } from '@/lib/types/columns';

interface Props {
  type: modalType;
  memberLists: MemberListType[];
  dashboardId: number;
  columnId: number;
  columnList?: ColumnType[];
}

function TodoModal({ type, columnList, memberLists, dashboardId, columnId }: Props) {
  const modalCard = useStore((state) => state.modalCard);
  const [reqValue, setReqValue] = useState<PostCardRequestType>({
    assigneeUserId: type === 'editTodo' ? modalCard.assignee.id : 0,
    dashboardId: dashboardId,
    columnId: columnId,
    title: type === 'editTodo' ? modalCard.title : '',
    description: type === 'editTodo' ? modalCard.description : '',
    dueDate: type === 'editTodo' ? modalCard.dueDate : '',
    tags: type === 'editTodo' ? modalCard.tags : [],
    imageUrl: type === 'editTodo' ? (modalCard?.imageUrl ? modalCard.imageUrl : '') : '',
  });
  const clearModal = useStore((state) => state.clearModal);
  const modalCardColumnTitle = useStore((state) => state.modalCardColumnTitle);
  const cardUrl = useStore((state) => state.cardUrl);
  const setIsColumnChanged = useStore((state) => state.setIsColumnChanged);
  const setTodoModalDescription = useStore((state) => state.setTodoModalDescription);

  const handleButtonClick = async () => {
    if (type === 'createTodo') {
      if (!reqValue.imageUrl) delete reqValue.imageUrl;
      await createCard(reqValue);
    } else if (type === 'editTodo') {
      if (!reqValue.imageUrl) delete reqValue.imageUrl;
      delete reqValue.dashboardId;
      await editCard(modalCard.id, reqValue);
    }
    clearModal();
    setIsColumnChanged();
    setTodoModalDescription('');
  };

  useEffect(() => {
    if (type === 'editTodo') {
      setTodoModalDescription(reqValue.description);
    }
    setReqValue((prev) => ({
      ...prev,
      imageUrl: cardUrl,
    }));
  }, [cardUrl]);

  return (
    <ModalFrame
      type={type}
      title={type === 'createTodo' ? '할 일 생성' : '할 일 수정'}
      height="High"
      btnFnc={handleButtonClick}
      disabledBtn={
        (reqValue.assigneeUserId === 0 ||
          reqValue.description === '' ||
          reqValue.dueDate === '' ||
          reqValue.title === '') &&
        true
      }
    >
      <StyledContainer>
        <StyledDropDownBox>
          {type === 'editTodo' && (
            <DropDown
              type="status"
              initialStatus={modalCardColumnTitle}
              columnList={columnList as ColumnType[]}
              setReqValue={setReqValue}
            />
          )}
          <DropDown
            type="member"
            initialMember={type === 'editTodo' ? modalCard?.assignee.nickname : ''}
            initialMemberImg={type === 'editTodo' ? modalCard?.assignee.profileImageUrl : ''}
            initialMemberId={type === 'editTodo' ? modalCard?.assignee.id : 0}
            memberLists={memberLists as MemberListType[]}
            setReqValue={setReqValue}
          />
        </StyledDropDownBox>
        <Input type="title" value={reqValue.title} setValue={setReqValue} />
        <Textarea type="toDo" value={reqValue.description} setValue={setReqValue} />
        <Input type="dueDate" value={reqValue.dueDate} setValue={setReqValue} />
        <Input type="tag" value={reqValue.tags} setValue={setReqValue} />
        <AddProfileImg type="card" initialUrl={reqValue.imageUrl} columnId={columnId} />
      </StyledContainer>
    </ModalFrame>
  );
}

export default TodoModal;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledDropDownBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`;
