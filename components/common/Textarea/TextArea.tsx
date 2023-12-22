import dynamic from 'next/dynamic';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { FONT_12, FONT_16 } from '@/styles/FontStyles';
import { VIOLET } from '@/styles/ColorStyles';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Textarea() {
  const [value, setValue] = useState('');
  const [violet, setViolet] = useState(false);

  const handleReactQuillFocus = () => {
    setViolet(!violet);
  };

  const handleReactQuillBlur = () => {
    setViolet(!violet);
  };

  const handleButtonClick = () => {};

  return (
    <StyledWrapper>
      <StyledLabel>댓글</StyledLabel>
      <StyledReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        onFocus={handleReactQuillFocus}
        onBlur={handleReactQuillBlur}
        $violet={violet}
      />
      <StyledButtonWrapper>
        <Button.Plain style="secondary" roundSize="S" onClick={handleButtonClick}>
          <StyledButtonText>입력</StyledButtonText>
        </Button.Plain>
      </StyledButtonWrapper>
    </StyledWrapper>
  );
}

export default Textarea;

const StyledWrapper = styled.div`
  width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledLabel = styled.label`
  ${FONT_16}
`;

const StyledReactQuill = styled(ReactQuill)<{ $violet: boolean }>`
  width: 450px;

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
    min-height: 110px;
    padding-bottom: 42px;
  }
`;

const StyledButtonWrapper = styled.div`
  width: 83px;
  height: 32px;
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

const StyledButtonText = styled.span`
  ${FONT_12};
`;
