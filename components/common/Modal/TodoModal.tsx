import styled from 'styled-components';
import ModalFrame from './ModalFrame';
import { modalType } from '@/lib/types/zustand';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Card, columnLists, memberLists } from '@/lib/types/type';
import AddProfileImg from '@/components/pages/mypage/AddProfileImg';
import DropDown from '../DropDown/DropDown';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';

interface Props {
  type: modalType;
  cardInfo?: Card;
  columnLists?: columnLists;
  initialStatus?: string;
  memberLists?: memberLists;
}

function TodoModal({ type, cardInfo, columnLists, initialStatus, memberLists }: Props) {
  const handleButtonClick = () => {};

  return (
    <ModalFrame
      type={type}
      title={type === 'createTodo' ? '할 일 생성' : '할 일 수정'}
      height="High"
      btnFnc={handleButtonClick}
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
            memberLists={memberLists as memberLists}
          />
        </StyledDropDownBox>
        <Input type="title" initValue={cardInfo?.title} />
        <Textarea type="basic" initValue={cardInfo?.description} />
        <Input type="dueDate" initValue={cardInfo?.dueDate} />
        <Input type="tag" initValue={cardInfo?.tags} />
        <AddProfileImg type="card" profileImgUrl={cardInfo?.imageUrl} />
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
