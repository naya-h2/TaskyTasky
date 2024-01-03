import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import Spinner from '@/components/common/Spinner/Spinner';
import AlertModal from '@/components/common/Modal/AlertModal';
import { FONT_16, FONT_18, FONT_20 } from '@/styles/FontStyles';
import { BLACK, VIOLET } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { createUser } from '@/api/users/createUser';
import {
  emailRules,
  nicknameRules,
  signUpPasswordRules,
  signUpPasswordCheckRules,
} from '@/lib/constants/inputErrorRules';
import { useStore } from '@/context/stores';
import Head from 'next/head';

function SignUp() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const { modals, showModal, hideModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    hideModal: state.hideModal,
  }));

  const passwordValue = watch('password');
  const { isLoading, setAuthToken, setUser, setIsLoading, setError } = useStore();
  const isButtonActive = Object.keys(errors).length === 0 && isChecked;

  const mutation = useMutation(createUser, {
    onSuccess: (result) => {
      if (result && result.token && result.user) {
        setAuthToken(result.token);
        setUser(result.user);
      }
      setIsLoading(false);
      setMessage('회원가입이 성공적으로 완료되었습니다.');
      showModal('customAlert');
      setIsSuccess(true);
    },
    onError: (error: any) => {
      setMessage(error.message);
      setError(error.message);
      setIsLoading(false);
      showModal('customAlert');
      setIsSuccess(false);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return (
    <>
      <Head>
        <title>회원가입 | TaskyTasky</title>
      </Head>
      <StyledRoot>
        <StyledContainer>
          <Link href="/">
            <StyledLogo src="/images/logo_big.svg" alt="Main logo" />
          </Link>
          <StyledWord>첫 방문을 환영해요!</StyledWord>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input type="email" register={register('email', emailRules)} error={errors.email} isHookForm={true} />
            <Input
              type="nickname"
              register={register('nickname', nicknameRules)}
              error={errors.nickname}
              isHookForm={true}
            />
            <Input
              type="password"
              isPassword
              register={register('password', signUpPasswordRules)}
              error={errors.password}
              isHookForm={true}
            />
            <Input
              type="passwordConfirm"
              isPassword
              register={register('passwordCheck', signUpPasswordCheckRules(passwordValue))}
              error={errors.passwordCheck}
              isHookForm={true}
            />
            <Checkbox label="이용약관에 동의합니다." onChange={() => setIsChecked(!isChecked)} />
            <StyledButtonWrapper>
              <Button.Plain type="submit" style="primary" roundSize="L" isNotActive={!isButtonActive || isLoading}>
                가입하기
              </Button.Plain>
              {isLoading && <Spinner />}
            </StyledButtonWrapper>
            <StyledWrapper>
              이미 가입하셨나요? <StyledLink href="/login">로그인하기</StyledLink>
            </StyledWrapper>
          </StyledForm>
          {modals[modals.length - 1] === 'customAlert' && (
            <AlertModal type="customAlert" isSuccess={isSuccess}>
              {message}
            </AlertModal>
          )}
        </StyledContainer>
      </StyledRoot>
    </>
  );
}

export default SignUp;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledLogo = styled.img`
  width: 200px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 150px;
  }
`;

const StyledWord = styled.span`
  width: 189px;
  height: 24px;
  margin: 10px auto 20px;
  text-align: center;
  ${FONT_20};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 20px;
    ${FONT_16};
  }
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

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${VIOLET[1]};
`;
