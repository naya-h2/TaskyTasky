import { useRef, useState } from 'react';
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

function DropDown({ type }: Props) {
  const [value, setValue] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDropDownOpen,
    handleModalOpen: handleDropDownOpen,
    handleModalClose: handleDropDownClose,
  } = useModal();

  useOnClickOutside(containerRef, handleDropDownClose);

  const handleMainBoxClick = () => {
    if (isDropDownOpen) {
      handleDropDownClose();
    } else {
      handleDropDownOpen();
    }
  };

  return (
    <Wrapper ref={containerRef}>
      {(type === 'status' || type === 'person') && (
        <MainBox $isOpen={isDropDownOpen} onClick={handleMainBoxClick}>
          {type === 'status' && value === 'ToDo' && <ToDoLargeIcon />}
          {type === 'status' && value === 'OnProgress' && <OnProgressLargeIcon />}
          {type === 'status' && value === 'Done' && <DoneLargeIcon />}
          <ArrowIcon />
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

const MainBox = styled.div<{ $isOpen: boolean }>`
  width: 217px;
  height: 48px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  border: 1px solid ${({ $isOpen }) => ($isOpen ? `${VIOLET[1]}` : `${GRAY[30]}`)};
  background-color: ${WHITE};
  cursor: pointer;
`;

const ArrowIcon = styled(ArrowDropDownIcon)`
  position: absolute;
  right: 10px;
`;
