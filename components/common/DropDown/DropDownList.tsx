import { RefObject, SetStateAction } from 'react';
import styled from 'styled-components';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import CheckIcon from '@/public/icon/dropdown_check.svg';
import ModalPortal from '../Modal/ModalPortal';
import AlertModal from '../Modal/AlertModal';
import { modalType } from '@/lib/types/zustand';
import { useStore } from '@/context/stores';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import ColumnNameChip from '../Chip/ColumnNameChip';
import Profile from '../Profile/Profile';
import { getFilteredUser } from '@/lib/utils/getFilteredUser';
import { columnLists } from '@/lib/types/type';
import { MemberListType } from '@/lib/types/members';

interface Value {
  status: string;
  member: string;
  memberImage: string;
  memberId: number;
}

interface Props {
  anchorRef: RefObject<HTMLElement>;
  setValue: (value: SetStateAction<Value>) => void;
  value: Value;
  type: 'status' | 'member' | 'kebab';
  handleDropDownClose: () => void;
  columnLists?: columnLists;
  memberLists?: MemberListType[];
}

function DropDownList({ anchorRef, setValue, value, type, handleDropDownClose, columnLists, memberLists }: Props) {
  const modal = useStore((state) => state.modals);
  const showModal = useStore((state) => state.showModal);
  const filteredUser = getFilteredUser(type, memberLists, value);

  const handleClickOption = (value: string, img?: string, id?: string) => {
    const memberId = parseInt(id as string);
    if (type === 'status') {
      setValue((prev) => ({
        ...prev,
        status: value,
      }));
    }
    if (type === 'member') {
      if (img) {
        setValue((prev) => ({
          ...prev,
          member: value,
          memberImage: img,
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          member: value,
          memberImage: '',
          memberId: memberId,
        }));
      }
    }
    handleDropDownClose();
  };

  const handleButtonClick = (type: modalType) => {
    if (modal.includes(type)) return;
    showModal(type);
  };

  return (
    <ModalPortal container={anchorRef.current}>
      <StyledWrapperUl $isUser={filteredUser ? filteredUser.length : 0} $type={type}>
        {type === 'status' &&
          columnLists &&
          columnLists.data.map((item) => {
            return (
              <StyledWrapperLi key={item.id} onClick={() => handleClickOption(item.title)}>
                {value.status === item.title ? <CheckIcon /> : <StyledTransparentBox />}
                <ColumnNameChip content={item.title} />
              </StyledWrapperLi>
            );
          })}
        {type === 'member' &&
          value.member &&
          filteredUser &&
          filteredUser.map((item) => {
            return (
              <StyledWrapperLi
                key={item.id}
                onClick={() => handleClickOption(item.nickname, item.profileImageUrl, String(item.id))}
              >
                {value.member === item.nickname ? <CheckIcon /> : <StyledTransparentBox />}
                <Profile type="card" id={item.id} name={item.nickname} profileImg={item.profileImageUrl} />
              </StyledWrapperLi>
            );
          })}
        {type === 'kebab' && (
          <>
            <StyledModalPopLi onClick={() => handleButtonClick('editTodo')}>수정하기</StyledModalPopLi>
            <StyledModalPopLi onClick={() => handleButtonClick('deleteCardAlert')}>삭제하기</StyledModalPopLi>
            {modal[modal.length - 1] === 'deleteCardAlert' && <AlertModal type="deleteCardAlert" />}
          </>
        )}
      </StyledWrapperUl>
    </ModalPortal>
  );
}

export default DropDownList;

const StyledWrapperUl = styled.ul<{ $isUser: number; $type: string }>`
  width: ${({ $type }) => ($type === 'kebab' ? '93px' : '217px')};
  padding: ${({ $type }) => ($type === 'kebab' ? '6px' : null)};
  position: absolute;
  top: ${({ $type }) => ($type === 'kebab' ? '30px' : '88px')};
  right: ${({ $type }) => ($type === 'kebab' ? '10px' : null)};
  background-color: white;
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
  z-index: ${Z_INDEX.modalFrame_Body_Mid};

  ${({ $isUser, $type }) => $isUser === 0 && $type === 'member' && `display: none`};
`;

const StyledWrapperLi = styled.li`
  width: 100%;
  height: 45px;
  padding: 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  background-color: white;
  border-radius: 6px;
  z-index: ${Z_INDEX.modalFrame_Body_Mid};

  &:hover {
    background-color: ${GRAY[15]};
  }
`;

const StyledTransparentBox = styled.div`
  width: 22px;
  height: 22px;
`;

const StyledModalPopLi = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${VIOLET[1]};
    background-color: ${VIOLET[8]};
  }
`;
