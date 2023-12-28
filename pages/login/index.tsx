import Link from 'next/link';
import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button';
import { FONT_16, FONT_20 } from '@/styles/FontStyles';
import { BLACK } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useForm } from 'react-hook-form';
import { login } from '@/api/auth/login';
import { emailRules, signInPwRules } from '@/lib/constants/inputErrorRules';
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  async function handleLogin(data: any) {
    try {
      // 로그인 API 호출
      await login({ email: data.email, password: data.password });
      alert('로그인에 성공했습니다!');
      router.push('/');
    } catch (error: any) {
        alert(error.message);
      }
    }

  return (
    <StyledRoot>
      <StyledContainer>
        <Link href="/">
          <StyledLogo src="/images/logo_main.svg" alt="Main logo" />
        </Link>
        <StyledWord>오늘도 만나서 반가워요!</StyledWord>
        <StyledForm onSubmit={handleSubmit(handleLogin)}>
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
