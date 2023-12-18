import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import eyeOffIcon from '@/public/icon/visibility_off.svg';
import eyeOnIcon from '@/public/icon/visibility.svg';
import { GRAY, VIOLET, RED } from '@/styles/ColorStyles';
import { FONT_16, FONT_14 } from '@/styles/FontStyles';

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
  passwordCheck, // password와 passwordConfirm이 같은지 확인하는 것
  setPassword, // 비밀번호가 무엇인지 props로 받아온 것
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordIcon = () => {
    setPasswordVisible((prev) => !prev);
  };
  
  const validateInput = () => {
    if (type === 'email') {
      const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (!emailReg.test(value)) {
        setErrorMessage('이메일 형식으로 작성해주세요.');
      }
    } else if (type === 'password') {
      const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      if (!passwordReg.test(value)) {
        setErrorMessage('비밀번호는 8자 이상 입력해주세요.');
      }
    } else if (type === 'passwordConfirm' && passwordCheck) {
      if (value !== passwordCheck) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      }
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          type={type === 'email' ? 'text' : (passwordVisible ? 'password' : 'text')}
          className={`${errorMessage ? 'error' : ''}`}
          value={value}
          onChange={handleChange}
          onBlur={validateInput}
        />
        {isPassword &&
          (passwordVisible ? (
            <EyeIcon
              alt='비밀번호 보이기 아이콘'
              src={eyeOffIcon}
              width={24}
              height={24}
              onClick={togglePasswordIcon}
            />
          ) : (
            <EyeIcon
              alt='비밀번호 가리기 아이콘'
              src={eyeOnIcon}
              width={24}
              height={24}
              onClick={togglePasswordIcon}
            />
          ))}
        {errorMessage && (
          <ErrorMessage className='errorMessage'>{errorMessage}</ErrorMessage>
        )}
      </Container>
    </>
  );
}

export default Input;

const Container = styled.form`
  margin: 30px;
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

const EyeIcon = styled(Image)`
  position: absolute;
  top: 10px;
  right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  ${FONT_14};
  color: ${RED};
`;


