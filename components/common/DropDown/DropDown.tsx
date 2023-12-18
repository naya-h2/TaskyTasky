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

interface Props {
  type: 'status' | 'person' | 'kebab';
}

interface Value {
  status: string;
  person: string;
}

function DropDown({ type }: Props) {
  const [value, setValue] = useState<Value>({
    status: '',
    person: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDropDownOpen,
    handleModalOpen: handleDropDownOpen,
    handleModalClose: handleDropDownClose,
  } = useModal();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleMainBoxClick = () => {
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
    <Wrapper ref={containerRef}>
      {(type === 'status' || type === 'person') && (
        <MainBox $isOpen={isDropDownOpen} $type={type} onClick={handleMainBoxClick}>
          {type === 'status' && value.status === 'ToDo' && <ToDoLargeIcon />}
          {type === 'status' && value.status === 'OnProgress' && <OnProgressLargeIcon />}
          {type === 'status' && value.status === 'Done' && <DoneLargeIcon />}
          {type === 'person' && <Input value={value.person} onChange={handleInputChange} />}
          {type === 'person' && !value.person ? null : <ArrowIcon $type={type} onClick={handleArrowIconClick} />}
        </MainBox>
      )}
      {isDropDownOpen && (
        <DropDownList
          anchorRef={containerRef}
          setValue={setValue}
          value={value}
          type={type}
          handleDropDownClose={handleDropDownClose}
        />
      )}
    </Wrapper>
  );
}

export default DropDown;

const Wrapper = styled.div`
  width: 217px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainBox = styled.div<{ $isOpen: boolean; $type: string }>`
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

const Input = styled.input`
  width: 100%;
`;

const ArrowIcon = styled(ArrowDropDownIcon)<{ $type: string }>`
  position: ${({ $type }) => ($type === 'status' ? 'absolute' : 'static')};
  right: 10px;
  cursor: pointer;
`;
