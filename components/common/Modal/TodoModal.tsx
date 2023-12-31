import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import ModalFrame from './ModalFrame';
import { modalType } from '@/lib/types/zustand';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Card, columnLists } from '@/lib/types/type';
import AddProfileImg from '@/components/pages/mypage/AddProfileImg';
import { MemberListType } from '@/lib/types/members';
import { PostCardRequestType } from '@/lib/types/cards';
import DropDown from '../DropDown/DropDown';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import { useStore } from '@/context/stores';
import { createCard } from '@/api/cards/createCard';

interface Props {
  type: modalType;
  memberLists: MemberListType[];
  dashboardId: number;
  columnId: number;
  isColumnChanged: boolean;
  setIsColumnChanged: (value: SetStateAction<boolean>) => void;
  cardInfo?: Card;
  columnLists?: columnLists;
  initialStatus?: string;
}

function TodoModal({
  type,
  cardInfo,
  columnLists,
  initialStatus,
  memberLists,
  dashboardId,
  columnId,
  setIsColumnChanged,
  isColumnChanged,
}: Props) {
  const [reqValue, setReqValue] = useState<PostCardRequestType>({
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: columnId,
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageUrl: null,
  });
  const hideModal = useStore((state) => state.hideModal);

  const handleButtonClick = async () => {
    if (type === 'createTodo') {
      await createCard(reqValue);
    }
    hideModal('createTodo');
  };

  console.log(reqValue);

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
            <DropDown type="status" initialStatus={initialStatus} columnLists={columnLists as columnLists} />
          )}
          <DropDown
            type="member"
            initialMember={cardInfo?.assignee.nickname}
            initialMemberImg={cardInfo?.assignee.profileImageUrl}
            initialMemberId={cardInfo?.assignee.id}
            memberLists={memberLists as MemberListType[]}
            setReqValue={setReqValue}
          />
        </StyledDropDownBox>
        <Input type="title" value={reqValue.title} setValue={setReqValue} />
        <Textarea type="basic" value={reqValue.description} setValue={setReqValue} />
        <Input type="dueDate" value={reqValue.dueDate} setValue={setReqValue} />
        <Input type="tag" value={reqValue.tags} setValue={setReqValue} />
        <AddProfileImg type="card" profileImgUrl={reqValue.imageUrl} setValue={setReqValue} columnId={columnId} />
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
