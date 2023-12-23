import Link from 'next/link';
import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button';
import { FONT_16, FONT_20 } from '@/styles/FontStyles';
import { BLACK } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useForm } from 'react-hook-form';
import { login } from '@/api/auth/login';
import { editPassword } from '@/api/auth/editPassword';

export const ERROR_MSG = {
  emptyEmail: '이메일을 입력해주세요.',
  emptyPassword: '비밀번호를 입력해주세요.',
  invalidEmail: '올바른 이메일 주소가 아닙니다.',
  invalidPassword: '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.',
  wrongEmail: '이메일을 확인해주세요.',
  wrongPassword: '비밀번호를 확인해주세요.',
  notEqualPassword: '비밀번호가 일치하지 않아요.',
  duplicatedEmail: '이미 존재하는 이메일입니다.',
};

export const emailRules = {
  required: ERROR_MSG.emptyEmail,
  pattern: {
    value: /[0-9a-zA-Z]*@[0-9a-zA-Z]*\.[a-zA-Z]{2,3}$/i,
    message: ERROR_MSG.invalidEmail,
  },
};

export const signInPwRules = {
  required: ERROR_MSG.emptyPassword,
};

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  return (
    <StyledRoot>
      <StyledContainer>
        <StyledLogo src="/images/logo_main.svg" alt="Main logo" />
        <StyledWord>오늘도 만나서 반가워요!</StyledWord>
        <StyledForm onSubmit={handleSubmit((data) => login({ email: data.email, password: data.password }))}>
          <Input type="email" register={register('email', emailRules)} error={errors.email} />
          <Input type="password" isPassword register={register('password', signInPwRules)} error={errors.password} />
          <StyledButtonWrapper>
            <Button.Plain style="primary" roundSize="L">
              로그인
            </Button.Plain>
          </StyledButtonWrapper>
          <StyledWrapper>
            회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
          </StyledWrapper>
        </StyledForm>
      </StyledContainer>
    </StyledRoot>
  );
}

export default Login;

const StyledRoot = styled.div`
  height: 100vh;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 520px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: 279px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 120px;
    height: 167px;
  }
`;

const StyledWord = styled.span`
  width: 189px;
  height: 24px;
  margin: 10px auto 38px;
  text-align: center;
  ${FONT_20};
`;

const StyledForm = styled.form`
  width: 100%;
`;

const StyledWrapper = styled.div`
  margin-top: 24px;
  text-align: center;
  ${FONT_16};
  color: ${BLACK[2]};
`;

const StyledButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
`;
