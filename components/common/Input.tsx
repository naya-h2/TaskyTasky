import { useState } from 'react';
import styled, { css } from 'styled-components';
import EyeOff from '@/public/icon/visibility_off.svg';
import EyeOn from '@/public/icon/visibility.svg';
import { GRAY, VIOLET, RED } from '@/styles/ColorStyles';
import { FONT_16, FONT_14 } from '@/styles/FontStyles';
import { validateSignInput } from '@/lib/utils/checkSign';

interface InputProps {
  type: 'email' | 'password' | 'passwordConfirm';
  isPassword?: boolean;
  placeholder: string;
  passwordCheck?: string;
  setPassword?: (value: string) => void;
}

function Input({
  type, // email, password, passwordConfirm 중 어떤 타입인지
  isPassword, // isPassword가 true라면 눈모양 아이콘이 보이도록
  placeholder,
  passwordCheck, // passwordConfirm으로 쓰일 경우, password와 passwordConfirm이 같은지 확인하는 것 (password 값)
  setPassword, // 비밀번호가 무엇인지 props로 받아온 것
}: InputProps) {
  const [passwordInvisible, setPasswordInvisible] = useState(true);
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordIcon = () => {
    setPasswordInvisible((prev) => !prev);
  };

  const handleInputFocusOut = () => {
    if (passwordCheck) {
      validateSignInput(type, value, setErrorMessage, passwordCheck);
    } else {
      validateSignInput(type, value, setErrorMessage);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setErrorMessage('');
    if (setPassword && type === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <>
      <Container>
        <InputInnerBox
          placeholder={placeholder}
          type={type === 'email' ? 'text' : passwordInvisible ? 'password' : 'text'}
          className={`${errorMessage ? 'error' : ''}`}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputFocusOut}
        />
        {isPassword &&
          (passwordInvisible ? (
            <EyeOffIcon alt="비밀번호 가리기 아이콘" onClick={togglePasswordIcon} />
          ) : (
            <EyeOnIcon alt="비밀번호 보이기 아이콘" onClick={togglePasswordIcon} />
          ))}
        {errorMessage && <ErrorMessage className="errorMessage">{errorMessage}</ErrorMessage>}
      </Container>
    </>
  );
}

export default Input;

const EyeIcon = css`
  position: absolute;
  top: 10px;
  right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.form`
  width: 520px;
  height: 50px;
  position: relative;
  ${FONT_16};
`;

const InputInnerBox = styled.input`
  width: 100%;
  padding: 15px 16px;
  border: 1px solid ${GRAY[30]};
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${VIOLET[1]};
  }
  &.error {
    border: 1px solid ${RED};
  }
  &.error .errorMessage {
    display: block;
  }
`;

const EyeOffIcon = styled(EyeOff)`
  ${EyeIcon}
`;

const EyeOnIcon = styled(EyeOn)`
  ${EyeIcon}
`;

const ErrorMessage = styled.p`
  ${FONT_14};
  color: ${RED};
`;
