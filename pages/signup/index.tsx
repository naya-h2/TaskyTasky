import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import { FONT_16, FONT_18, FONT_20 } from '@/styles/FontStyles';
import { BLACK } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useForm } from 'react-hook-form';
import { createUser } from '@/api/users/createUser';
import { emailRules, nicknameRules, signUpPasswordRules, signUpPasswordCheckRules } from '@/lib/constants/inputErrorRules';

function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const isButtonActive = Object.keys(errors).length === 0 && isChecked;

  const onSubmit = async (data: any) => {
    try {
      // 유저 생성 API 호출
      const result = await createUser(data);
      alert('회원가입에 성공했습니다!');
      router.push('/'); 
    } catch (error: any) {
      // 에러 처리: error.message를 사용하여 에러를 확인합니다.
      alert(error.message);
    }
  };

  return (
    <StyledRoot>
      <StyledContainer>
        <Link href='/'>
          <StyledLogo src="/images/logo_main.svg" alt="Main logo" />
        </Link>
        <StyledWord>첫 방문을 환영합니다!</StyledWord>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" register={register('email', emailRules)} error={errors.email} />
          <Input type="nickname" register={register('nickname', nicknameRules)} error={errors.nickname} />
          <Input type="password" isPassword register={register('password', signUpPasswordRules)} error={errors.password} />
          <Input
            type="passwordConfirm"
            isPassword
            register={register('passwordCheck', signUpPasswordCheckRules(getValues))}
            error={errors.passwordCheck}
          />
          <Checkbox label="이용약관에 동의합니다." onChange={() => setIsChecked(!isChecked)} />
          <StyledButtonWrapper>
            <Button.Plain 
              type="submit"
              style="primary" 
              roundSize="L" 
              isNotActive={!isButtonActive}>
              가입하기
            </Button.Plain>
          </StyledButtonWrapper>
          <StyledWrapper>
            이미 가입하셨나요? <Link href="/login">로그인하기</Link>
          </StyledWrapper>
          </StyledForm>
      </StyledContainer>
    </StyledRoot>
  );
}

export default SignUp;

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
  ${FONT_18};
`;
