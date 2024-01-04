import { ChangeEvent, SetStateAction, useState } from 'react';
import styled, { css } from 'styled-components';
import { GRAY, VIOLET, RED, BLACK } from '@/styles/ColorStyles';
import { FONT_16, FONT_14 } from '@/styles/FontStyles';
import Calendar from './Calendar';
import TagMaker from './TagMaker';
import { validateSignInput } from '@/lib/utils/checkSign';
import { getPlaceholder } from '@/lib/utils/getPlaceholder';
import { getInputLabel } from '@/lib/utils/getInputLabel';
import { InputType } from '@/lib/types/type';
import EyeOff from '@/public/icon/visibility_off.svg';
import EyeOn from '@/public/icon/visibility.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { PostCardRequestType } from '@/lib/types/cards';

type Value = PostCardRequestType;

interface InputProps {
  type: InputType;
  isPassword?: boolean;
  register?: any;
  error?: any;
  isHookForm?: boolean;
  initPlaceholder?: string;
  initLabel?: string;
  disabled?: boolean;
  value?: string | string[];
  setValue?: (value: SetStateAction<Value>) => void;
}

function Input({
  type,
  isPassword, // isPassword가 true라면 눈모양 아이콘이 보이도록
  register,
  error,
  isHookForm = false,
  initPlaceholder,
  initLabel,
  disabled = false,
  value,
  setValue,
}: InputProps) {
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const placeholder = initPlaceholder ? initPlaceholder : getPlaceholder(type);
  const label = initLabel ? initLabel : getInputLabel(type);

  const togglePasswordIcon = () => {
    setPasswordInvisible((prev) => !prev);
  };

  const handleInputFocusOut = () => {
    validateSignInput(type, value as string, setErrorMessage);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!setValue) return;

    if (type === 'title') {
      setValue((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    }
    setErrorMessage('');
  };

  return (
    <>
      <StyledContainer
        $type={
          type === 'email' || type === 'password' || type === 'passwordConfirm' || type === 'nickname' ? true : false
        }
      >
        <StyledLabel $bold={type === 'dueDate' || type === 'title' || type === 'tag' ? true : false} htmlFor={type}>
          {label} {(type === 'title' || type === 'dueDate') && <StyledSpan> *</StyledSpan>}
        </StyledLabel>
        {type === 'dueDate' ? (
          <Calendar
            placeholder={placeholder}
            initialValue={value as string}
            setValue={setValue as (value: SetStateAction<Value>) => void}
          />
        ) : type === 'tag' ? (
          <TagMaker initialValue={value as string[]} setValue={setValue as (value: SetStateAction<Value>) => void} />
        ) : isHookForm ? (
          <StyledInputBox
            id={type}
            placeholder={placeholder}
            type={
              type === 'password' || type === 'passwordConfirm' ? (passwordInvisible ? 'password' : 'text') : 'text'
            }
            disabled={disabled}
            onBlur={handleInputFocusOut}
            $error={error}
            {...register}
          />
        ) : (
          <StyledInputBox
            id={type}
            placeholder={placeholder}
            type={
              type === 'password' || type === 'passwordConfirm' ? (passwordInvisible ? 'password' : 'text') : 'text'
            }
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputFocusOut}
            $error={errorMessage}
          />
        )}
        {isPassword &&
          (passwordInvisible ? (
            <StyledEyeOffIcon alt="비밀번호 가리기 아이콘" onClick={togglePasswordIcon} />
          ) : (
            <StyledEyeOnIcon alt="비밀번호 보이기 아이콘" onClick={togglePasswordIcon} />
          ))}
        {isHookForm && error && <StyledErrorMessage>{error.message}</StyledErrorMessage>}
        {isHookForm || (errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>)}
      </StyledContainer>
    </>
  );
}

export default Input;

const StyledIcon = css`
  position: absolute;
  top: 42px;
  right: 13px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledContainer = styled.div<{ $type: boolean }>`
  width: ${({ $type }) => ($type ? '520px' : '100%')};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  ${({ $type }) => $type && 'margin-bottom: 16px'};
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 100%;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 100%;
  }
`;

const StyledLabel = styled.label<{ $bold: boolean }>`
  color: ${BLACK[2]};
  font-size: ${({ $bold }) => ($bold ? '1.8rem' : '1.6rem')};
  font-weight: ${({ $bold }) => ($bold ? '500' : '400')};
`;

const StyledSpan = styled.span`
  color: ${VIOLET[1]};
  font-size: 1.8rem;
  font-weight: 500;
`;

const StyledInputBox = styled.input<{ $error: string }>`
  box-sizing: border-box;
  width: 100%;
  padding: 15px 16px;
  border: 1px solid ${(props) => (props.$error ? `${RED}` : `${GRAY[30]}`)};
  outline: none;
  border-radius: 8px;
  ${FONT_16};

  &:focus {
    border: 1px solid ${VIOLET[1]};
  }
`;

const StyledEyeOffIcon = styled(EyeOff)`
  ${StyledIcon}
`;

const StyledEyeOnIcon = styled(EyeOn)`
  ${StyledIcon}
`;

const StyledErrorMessage = styled.p`
  ${FONT_14};
  color: ${RED};
`;
