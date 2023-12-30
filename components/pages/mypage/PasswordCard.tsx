import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import CardFrame from './CardFrame';
import { useForm } from 'react-hook-form';
import { signUpPasswordCheckRules } from '@/lib/constants/inputErrorRules';
import { editPassword } from '@/api/auth/editPassword';
import { useStore } from '@/context/stores';
import AlertModal from '@/components/common/Modal/AlertModal';
import { useState } from 'react';

function PasswordCard() {
  const [errorMsg, setErrorMsg] = useState('');
  const { modals, showModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
  }));
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const pwValue = watch('password');
  const newPwValue = watch('newPassword');
  const newPwCheckValue = watch('newPwCheck');
  const isNotAllFilled = !pwValue || !newPwValue || !newPwCheckValue;
  const hasError = errors.password || errors.newPassword || errors.newPwCheck;

  const validatePwEdit = async (password: string, newPassword: string) => {
    const body = { password, newPassword };
    const response = await editPassword(body);
    if (response.status === 400) setErrorMsg(response.data.message);
    else {
      setErrorMsg('비밀번호 변경이 완료되었습니다!');
      setValue('password', '');
      setValue('newPassword', '');
      setValue('newPwCheck', '');
    }
    showModal('editPassword');
  };

  return (
    <>
      <CardFrame
        title="비밀번호 변경"
        buttonText="변경"
        buttonDisabled={isNotAllFilled || hasError}
        handleClickFunc={() => validatePwEdit(pwValue, newPwValue)}
      >
        <StyledWrapper>
          <Input
            type="etc"
            register={register('password')}
            error={errors.password}
            initLabel="현재 비밀번호"
            initPlaceholder="현재 비밀번호를 입력하세요"
            isHookForm
          />
          <Input
            type="etc"
            register={register('newPassword')}
            error={errors.newPassword}
            initLabel="새 비밀번호"
            initPlaceholder="새로운 비밀번호를 입력하세요"
            isHookForm
          />
          <Input
            type="etc"
            register={register('newPwCheck', signUpPasswordCheckRules(newPwValue))}
            error={errors.newPwCheck}
            initLabel="새 비밀번호 확인"
            initPlaceholder="새로운 비밀번호를 입력하세요"
            isHookForm
          />
        </StyledWrapper>
      </CardFrame>
      {modals[modals.length - 1] === 'editPassword' && <AlertModal type="customAlert">{errorMsg}</AlertModal>}
    </>
  );
}

export default PasswordCard;

const StyledWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
