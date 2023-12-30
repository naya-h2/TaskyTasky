import styled from 'styled-components';
import Input from '@/components/common/Input/Input';
import AddProfileImg from './AddProfileImg';
import CardFrame from './CardFrame';
import { useForm } from 'react-hook-form';
import { UserType } from '@/lib/types/users';
import { nicknameRules } from '@/lib/constants/inputErrorRules';
import { useEffect, useState } from 'react';
import { editUserInfo } from '@/api/users/editUserInfo';
import { useStore } from '@/context/stores';
import AlertModal from '@/components/common/Modal/AlertModal';

interface Props {
  data: UserType;
}

function ProfileCard({ data }: Props) {
  const [nickname, setNickname] = useState(data.nickname);
  const [alertMsg, setAlertMsg] = useState('');
  const { modals, showModal } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
  }));
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const newNickname = watch('nickname');
  const isNotValid = newNickname === nickname || errors.nickname;

  const handleUserInfoEdit = async () => {
    const body = {
      nickname: newNickname,
      profileImageUrl: null,
    };
    const response = await editUserInfo(body);

    if (response.status === 400) setAlertMsg(response.data.message);
    else {
      setAlertMsg('프로필 정보 변경이 완료되었습니다!');
      setNickname(newNickname);
    }

    showModal('profile');
  };

  useEffect(() => {
    setValue('nickname', nickname);
  }, [nickname]);

  return (
    <>
      <CardFrame title="프로필" buttonText="저장" buttonDisabled={isNotValid} handleClickFunc={handleUserInfoEdit}>
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
      {modals[modals.length - 1] === 'profile' && <AlertModal type="customAlert">{alertMsg}</AlertModal>}
    </>
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
