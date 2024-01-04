import { ChangeEvent, KeyboardEvent, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import { PostCardRequestType } from '@/lib/types/cards';
import ChipColor from '../Chip/ChipColor';

type Value = PostCardRequestType;

interface Props {
  initialValue: string[];
  setValue: (value: SetStateAction<Value>) => void;
}

function TagMaker({ initialValue, setValue }: Props) {
  const [tagList, setTagList] = useState<string[]>(initialValue);
  const [tag, setTag] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (isLoading) return;
    if (tagList.includes(tag)) {
      setTag('');
      return;
    }
    if (e.key === 'Enter') {
      setTagList((prev) => [...prev, tag]);
    }
    setTag('');
  };

  const handleInputFocusOut = () => {
    setValue((prev) => ({
      ...prev,
      tags: tagList,
    }));
  };

  return (
    <StyledContainer>
      {tagList.length > 0 && (
        <StyledTagBoxes>
          {tagList.map((tag) => {
            return (
              <ChipColor
                key={tag}
                text={tag}
                setIsLoading={setIsLoading}
                type={'toDo'}
                tagList={tagList}
                setTagList={setTagList}
              />
            );
          })}
        </StyledTagBoxes>
      )}
      <StyledInput
        value={tag}
        placeholder="입력 후 Enter"
        onKeyPress={handleInputKeyDown}
        onChange={handleInputChange}
        onBlur={handleInputFocusOut}
      />
    </StyledContainer>
  );
}

export default TagMaker;

const StyledContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;

  &:focus-within {
    border: 1px solid ${VIOLET[1]};
  }
`;

const StyledInput = styled.input`
  flex-grow: 1;
`;

const StyledTagBoxes = styled.div`
  max-width: 200px;
  overflow-x: auto;
  display: flex;
  gap: 4px;

  &::-webkit-scrollbar {
    /* display: none; */
    height: 5px;
    color: black;
  }

  &::-webkit-scrollbar-track {
    background: ${GRAY[20]}; /* 스크롤바 뒷 배경 색상 */
  }

  &::-webkit-scrollbar-thumb {
    background: ${GRAY[40]}; /* 스크롤바 뒷 배경 색상 */
  }
`;
