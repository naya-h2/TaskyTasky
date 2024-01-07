import dynamic from 'next/dynamic';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useStore } from '@/context/stores';
import Button from '../Button';
import { FONT_12, FONT_14, FONT_16, FONT_18 } from '@/styles/FontStyles';
import { BLACK, VIOLET, RED } from '@/styles/ColorStyles';
import { PostCardRequestType } from '@/lib/types/cards';
import 'react-quill/dist/quill.snow.css';
import Loader from './Loader';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <Loader />,
});

type Value = PostCardRequestType;

interface Props {
  type: 'toDo' | 'comment';
  isEditing?: boolean;
  value?: string;
  setValue?: (value: SetStateAction<Value>) => void;
  setCommentValue?: (value: string) => void;
  onClick?: () => void;
}

function Textarea({ type, isEditing, value, setValue, setCommentValue, onClick }: Props) {
  const [violet, setViolet] = useState(false);
  const [red, setRed] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const todoModalDescription = useStore((state) => state.todoModalDescription);
  const setTodoModalDescription = useStore((state) => state.setTodoModalDescription);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ size: ['small', false, 'large'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['clean'],
      ],
    }),
    [],
  );

  const formats = [
    'size',
    'header',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
  ];

  const handleReactQuillFocus = () => {
    setViolet(true);
    setRed(false);
  };

  const handleReactQuillBlur = () => {
    if (value === '' || value === '<p><br></p>') {
      setViolet(false);
      setRed(true);
      setErrMsg('내용을 입력해주세요.');
    } else {
      setViolet(false);
      setRed(false);
    }
  };

  const handleTextareaChange = () => {
    if (setValue) {
      setValue((prev) => ({
        ...prev,
        description: todoModalDescription,
      }));
    }
    setErrMsg('');
  };

  useEffect(() => {
    handleTextareaChange();
  }, [todoModalDescription]);

  return (
    <StyledWrapper>
      {type === 'toDo' && (
        <StyledLabel $type={type} htmlFor={type}>
          설명 <StyledSpan> *</StyledSpan>
        </StyledLabel>
      )}
      {type === 'comment' && !isEditing && <StyledLabel $type={type}>댓글</StyledLabel>}
      <StyledReactQuill
        theme="snow"
        value={type === 'comment' ? value : todoModalDescription}
        onChange={type === 'comment' ? setCommentValue : setTodoModalDescription}
        onFocus={handleReactQuillFocus}
        onBlur={handleReactQuillBlur}
        placeholder="내용을 입력해 주세요"
        modules={modules}
        formats={formats}
        $violet={violet}
        $red={red}
        $type={type}
      />
      {type === 'comment' && (
        <StyledButtonWrapper>
          <Button.Plain
            style="secondary"
            roundSize="S"
            onClick={onClick}
            isNotActive={value ? (value === '<p><br></p>' ? true : false) : true}
          >
            <StyledButtonText>입력</StyledButtonText>
          </Button.Plain>
        </StyledButtonWrapper>
      )}
      {type === 'toDo' && <StyledErrorMessage>{errMsg}</StyledErrorMessage>}
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

const StyledLabel = styled.label<{ $type: 'toDo' | 'comment' }>`
  ${({ $type }) => $type === 'comment' && `${FONT_16}`};
  ${({ $type }) => $type === 'toDo' && `${FONT_18}`};
  color: ${BLACK[2]};
`;

const StyledSpan = styled.span`
  color: ${VIOLET[1]};
  font-size: 1.8rem;
  font-weight: 500;
`;

const StyledReactQuill = styled(ReactQuill)<{ $violet: boolean; $red: boolean; $type: 'comment' | 'toDo' }>`
  width: 100%;
  margin-bottom: ${({ $type }) => ($type === 'comment' ? '10px' : '0px')};

  .ql-snow {
    ${(props) => props.$violet && `border: 1px solid ${VIOLET[1]}`};
    ${(props) => props.$red && `border: 1px solid ${RED}`};
  }

  .ql-toolbar {
    border-radius: 6px 6px 0px 0px;
  }

  .ql-container {
    height: 100px;
    border-radius: 0px 0px 6px 6px;
  }

  .ql-editor {
    min-height: 50px;
  }
`;

const StyledButtonWrapper = styled.div`
  width: 83px;
  height: 32px;
  position: absolute;
  right: 10px;
  bottom: 20px;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }
`;

const StyledButtonText = styled.span`
  ${FONT_12};
`;

const StyledErrorMessage = styled.span`
  ${FONT_14};
  color: ${RED};
`;
