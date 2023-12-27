import dynamic from 'next/dynamic';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { FONT_12, FONT_16, FONT_18 } from '@/styles/FontStyles';
import { BLACK, GRAY, VIOLET } from '@/styles/ColorStyles';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Props {
  type: 'basic' | 'comment';
  isEditing?: boolean;
  initialValue?: string | undefined;
}

function Textarea({ type, isEditing, initialValue }: Props) {
  const [value, setValue] = useState(initialValue);
  const [violet, setViolet] = useState(false);

  const handleReactQuillFocus = () => {
    setViolet(!violet);
  };

  const handleReactQuillBlur = () => {
    setViolet(!violet);
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {};

  return (
    <StyledWrapper>
      {type === 'basic' && (
        <StyledLabel $type={type} htmlFor={type}>
          설명 <StyledSpan> *</StyledSpan>
        </StyledLabel>
      )}
      {type === 'basic' && <StyledTextarea value={value} onChange={handleTextareaChange} id={type} />}
      {type === 'comment' && !isEditing && <StyledLabel $type={type}>댓글</StyledLabel>}
      {type === 'comment' && (
        <StyledReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          onFocus={handleReactQuillFocus}
          onBlur={handleReactQuillBlur}
          $violet={violet}
        />
      )}
      {type === 'comment' && (
        <StyledButtonWrapper>
          <Button.Plain style="secondary" roundSize="S" onClick={handleButtonClick}>
            <StyledButtonText>입력</StyledButtonText>
          </Button.Plain>
        </StyledButtonWrapper>
      )}
    </StyledWrapper>
  );
}

export default Textarea;

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

const StyledLabel = styled.label<{ $type: 'basic' | 'comment' }>`
  ${({ $type }) => $type === 'comment' && `${FONT_16}`};
  ${({ $type }) => $type === 'basic' && `${FONT_18}`};
`;

const StyledSpan = styled.span`
  color: ${VIOLET[1]};
  font-size: 1.8rem;
  font-weight: 500;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border-radius: 6px;
  border: 1px solid ${GRAY[30]};
  background-color: white;
  padding: 15px;
  color: ${BLACK[2]};
  ${FONT_16};
  font-weight: 400;
  resize: none;

  &:focus {
    border: 1px solid ${VIOLET[1]};
  }
`;

const StyledReactQuill = styled(ReactQuill)<{ $violet: boolean }>`
  width: 100%;
  margin-bottom: 50px;

  .ql-snow {
    ${(props) => props.$violet && `border: 1px solid ${VIOLET[1]}`};
  }

  .ql-toolbar {
    border-radius: 6px 6px 0px 0px;
  }

  .ql-container {
    border-radius: 0px 0px 6px 6px;
  }

  .ql-editor {
    min-height: 80px;
  }
`;

const StyledButtonWrapper = styled.div`
  width: 83px;
  height: 32px;
  position: absolute;
  right: 10px;
  bottom: 20px;
`;

const StyledButtonText = styled.span`
  ${FONT_12};
`;
