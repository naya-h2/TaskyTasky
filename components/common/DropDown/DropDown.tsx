import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import ArrowDropDownIcon from '@/public/icon/arrow_drop_down.svg';
import useModal from '@/hooks/useModal';
import useOnClickOutside from '@/hooks/useOnClickOutSide';
import DropDownList from './DropDownList';
import ToDoLargeIcon from '@/public/icon/todo_large.svg';
import OnProgressLargeIcon from '@/public/icon/onProgress_large.svg';
import DoneLargeIcon from '@/public/icon/done_large.svg';
import MoreIcon from '@/public/icon/more.svg';

interface Props {
  type: 'status' | 'person' | 'kebab';
  initialStatus?: 'ToDo' | 'OnProgress' | 'Done';
  initialPerson?: string;
}

interface Value {
  status: string;
  person: string;
}

function DropDown({ type, initialStatus, initialPerson }: Props) {
  const [value, setValue] = useState<Value>({
    status: initialStatus ? initialStatus : '',
    person: initialPerson ? initialPerson : '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDropDownOpen,
    handleModalOpen: handleDropDownOpen,
    handleModalClose: handleDropDownClose,
  } = useModal();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleAnchorRefClick = () => {
    if (type === 'person') return;
    if (isDropDownOpen) {
      handleDropDownClose();
    } else {
      handleDropDownOpen();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      person: e.target.value,
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
    if (!value.person) {
      handleDropDownClose();
    } else if (value.person) {
      handleDropDownOpen();
    }
  }, [value.person]);

  return (
    <>
      <StyledWrapper ref={containerRef} $type={type}>
        {(type === 'status' || type === 'person') && (
          <StyledMainBox $isOpen={isDropDownOpen} $type={type} onClick={handleAnchorRefClick}>
            {type === 'status' && value.status === 'ToDo' && <ToDoLargeIcon />}
            {type === 'status' && value.status === 'OnProgress' && <OnProgressLargeIcon />}
            {type === 'status' && value.status === 'Done' && <DoneLargeIcon />}
            {type === 'person' && (
              <StyledInput value={value.person} onChange={handleInputChange} placeholder="이름을 입력해 주세요" />
            )}
            {type === 'person' && !value.person ? null : (
              <StyledArrowIcon $type={type} onClick={handleArrowIconClick} />
            )}
          </StyledMainBox>
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

const StyledMainBox = styled.div<{ $isOpen: boolean; $type: string }>`
  width: 217px;
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
