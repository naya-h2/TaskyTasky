import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import AddProfileImg from './AddProfileImg';
import CardFrame from './CardFrame';
import { useForm } from 'react-hook-form';
import { UserType } from '@/lib/types/users';
import { nicknameRules } from '@/lib/constants/inputErrorRules';
import { useEffect, useState } from 'react';
import { editUserInfo } from '@/api/users/editUserInfo';

interface Props {
  data: UserType;
}

function ProfileCard({ data }: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const newNickname = watch('nickname');
  const isNotEdited = newNickname === data.nickname || errors.nickname;

  const handleUserInfoEdit = () => {
    const body = {
      nickname: newNickname,
      profileImageUrl: null,
    };
    const data = editUserInfo(body);
    setValue('nickname', newNickname);
  };

  useEffect(() => {
    setValue('nickname', data.nickname);
  }, []);

  return (
    <CardFrame title="프로필" buttonText="저장" buttonDisabled={isNotEdited} handleClickFunc={handleUserInfoEdit}>
      <AddProfileImg type="myPage" profileImgUrl={data.profileImageUrl} />
      <StyledWrapper>
        <Input type="etc" initPlaceholder={data.email} initLabel="이메일" isHookForm disabled />
        <Input
          type="etc"
          initPlaceholder="새로운 닉네임을 입력하세요"
          initLabel="닉네임"
          isHookForm
          register={register('nickname', nicknameRules)}
          error={errors.nickname}
        />
      </StyledWrapper>
    </CardFrame>
  );
}

export default ProfileCard;

const StyledWrapper = styled.div`
  width: 100%;
  max-width: 366px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
