import { useState } from 'react';
import styled, { css } from 'styled-components';
import { GRAY, VIOLET, RED, BLACK } from '@/styles/ColorStyles';
import { FONT_16, FONT_14 } from '@/styles/FontStyles';
import Calendar from './Calendar';
import { validateSignInput } from '@/lib/utils/checkSign';
import { getPlaceholder } from '@/lib/utils/getPlaceholder';
import { getInputLabel } from '@/lib/utils/getInputLabel';
import EyeOff from '@/public/icon/visibility_off.svg';
import EyeOn from '@/public/icon/visibility.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

interface Props {
  type: 'email' | 'password' | 'passwordConfirm' | 'title' | 'dueDate' | 'tag' | 'nickname' | 'name' | 'dashboard';
  isPassword?: boolean;
  passwordCheck?: string;
  setPassword?: (value: string) => void;
  register?: any;
  error?: any;
}

function Input({
  type, // email, password, passwordConfirm 중 어떤 타입인지
  isPassword, // isPassword가 true라면 눈모양 아이콘이 보이도록
  register,
  error,
}: Props) {
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const placeholder = getPlaceholder(type);
  const label = getInputLabel(type);

  const togglePasswordIcon = () => {
    setPasswordInvisible((prev) => !prev);
  };

  return (
    <>
      <StyledContainer $type={type === 'email' || type === 'password' || type === 'passwordConfirm' || type === 'nickname' ? true : false}>
        <StyledLabel
          $bold={type === 'dueDate' || type === 'title' || type === 'tag' ? true : false}
          htmlFor={type}
        >
          {label} {type === 'title' && <StyledSpan> *</StyledSpan>}
        </StyledLabel>
        {type === 'dueDate' ? (
          <Calendar placeholder={placeholder} />
        ) : (
          <StyledInputBox
            id={type}
            placeholder={placeholder}
            type={
              type === 'email' ||
              type === 'title' ||
              type === 'tag' ||
              type === 'nickname' ||
              type === 'name' ||
              type === 'dashboard'
                ? 'text'
                : passwordInvisible
                  ? 'password'
                  : 'text'
            }
            $error={error}
            {...register}
          />
        )}
        {isPassword &&
          (passwordInvisible ? (
            <StyledEyeOffIcon alt="비밀번호 가리기 아이콘" onClick={togglePasswordIcon} />
          ) : (
            <StyledEyeOnIcon alt="비밀번호 보이기 아이콘" onClick={togglePasswordIcon} />
          ))}
        {error && <StyledErrorMessage>{error.message}</StyledErrorMessage>}
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
