import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BLACK, GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import ArrowDropDownIcon from '@/public/icon/arrow_drop_down.svg';
import useModal from '@/hooks/useDropDown';
import useOnClickOutside from '@/hooks/useOnClickOutSide';
import DropDownList from './DropDownList';
import ColumnNameChip from '../Chip/ColumnNameChip';
import MoreIcon from '@/public/icon/more.svg';
import { FONT_18 } from '@/styles/FontStyles';
import { columnLists, memberLists } from '@/lib/types/type';
import ProfileImg from '../Profile/ProfileImg';

interface Props {
  type: 'status' | 'member' | 'kebab';
  initialStatus?: string;
  initialMember?: string;
  initialMemberImg?: string;
  initialMemberId?: number;
  columnLists?: columnLists;
  memberLists?: memberLists;
}

interface Value {
  status: string;
  member: string;
  memberImage: string;
  memberId: number;
}

function DropDown({
  type,
  initialStatus,
  initialMember,
  initialMemberImg,
  initialMemberId,
  columnLists,
  memberLists,
}: Props) {
  const [value, setValue] = useState<Value>({
    status: initialStatus ? initialStatus : '',
    member: initialMember ? initialMember : '',
    memberImage: initialMemberImg ? initialMemberImg : '',
    memberId: initialMemberId ? initialMemberId : 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDropDownOpen,
    handleDropDownOpen: handleDropDownOpen,
    handleDropDownClose: handleDropDownClose,
  } = useModal();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleAnchorRefClick = () => {
    if (type === 'member') return;
    if (isDropDownOpen) {
      handleDropDownClose();
    } else {
      handleDropDownOpen();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      member: e.target.value,
    }));
  };

  const handleArrowIconClick = () => {
    if (type === 'status') return;
    if (isDropDownOpen) {
      handleDropDownClose();
    } else {
      handleDropDownOpen();
    }
  };

  useEffect(() => {
    if (!value.member) {
      handleDropDownClose();
    } else if (value.member) {
      handleDropDownOpen();
    }
  }, [value.member]);

  return (
    <>
      <StyledWrapper ref={containerRef} $type={type}>
        {(type === 'status' || type === 'member') && (
          <StyledMainWrapper>
            <StyledMainLabel>{type === 'status' ? '상태' : '담당자'}</StyledMainLabel>
            <StyledMainBox $isOpen={isDropDownOpen} $type={type} onClick={handleAnchorRefClick}>
              {type === 'status' && value.status && <ColumnNameChip content={value.status} />}
              {type === 'member' && (
                <ProfileImg url={value.memberImage} name={value.member} size={26} id={value.memberId} />
              )}
              {type === 'member' && (
                <StyledInput value={value.member} onChange={handleInputChange} placeholder="이름을 입력해 주세요" />
              )}
              {type === 'member' && !value.member ? null : (
                <StyledArrowIcon $type={type} onClick={handleArrowIconClick} />
              )}
            </StyledMainBox>
          </StyledMainWrapper>
        )}
        {type === 'kebab' && <StyledKebabIcon onClick={handleAnchorRefClick} />}
      </StyledWrapper>
      {isDropDownOpen && (
        <DropDownList
          anchorRef={containerRef}
          setValue={setValue}
          value={value}
          type={type}
          handleDropDownClose={handleDropDownClose}
          columnLists={columnLists as columnLists}
          memberLists={memberLists as memberLists}
        />
      )}
    </>
  );
}

export default DropDown;

const StyledWrapper = styled.div<{ $type: string }>`
  width: ${({ $type }) => ($type === 'kebab' ? '28px' : '217px')};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledMainLabel = styled.h3`
  ${FONT_18};
  color: ${BLACK[2]};
`;

const StyledMainBox = styled.div<{ $isOpen: boolean; $type: string }>`
  width: 100%;
  height: 48px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? `${VIOLET[1]}` : `${GRAY[30]}`)};
  background-color: ${WHITE};
  ${({ $type }) => $type === 'status' && `cursor: pointer`};
`;

const StyledInput = styled.input`
  width: 100%;
  margin-left: 5px;

  &::placeholder {
    color: ${GRAY[40]};
  }
`;

const StyledArrowIcon = styled(ArrowDropDownIcon)<{ $type: string }>`
  position: ${({ $type }) => ($type === 'status' ? 'absolute' : 'static')};
  right: 10px;
  cursor: pointer;
`;

const StyledKebabIcon = styled(MoreIcon)`
  cursor: pointer;
`;
