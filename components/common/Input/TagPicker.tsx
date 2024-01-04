import { SetStateAction } from 'react';
import styled from 'styled-components';
import TagPicker from 'rsuite/TagPicker';
import { GRAY, VIOLET } from '@/styles/ColorStyles';
import { PostCardRequestType } from '@/lib/types/cards';
import 'rsuite/dist/rsuite.css';

type Value = PostCardRequestType;

interface Props {
  initialValue: string[];
  setValue: (value: SetStateAction<Value>) => void;
}

function TagPickerCreatable({ initialValue, setValue }: Props) {
  const data = initialValue?.length
    ? initialValue.map((item) => ({
        label: item,
        value: item,
      }))
    : [];

  const handleTagPickerSelect = (item: string) => {
    if (initialValue.includes(item)) return;
    // setValue((prev) => ({
    //   ...prev,
    //   tags: item,
    // }));
  };

  const handleTagPickerClean = () => {
    setValue((prev) => ({
      ...prev,
      tags: [],
    }));
  };

  return (
    <StyledTagPicker
      creatable
      data={data}
      menuStyle={{ height: 120, zIndex: 900, overflowY: 'auto' }}
      placeholder="입력 후 Enter"
      onSelect={handleTagPickerSelect}
      onClean={handleTagPickerClean}
    />
  );
}

export default TagPickerCreatable;

const StyledTagPicker = styled(TagPicker)`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;

  &:focus {
    border: 1px solid ${VIOLET[1]};
  }
`;
