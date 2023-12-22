import styled, { css } from 'styled-components';
import { GRAY, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Image from 'next/image';
import { Z_INDEX } from '@/styles/ZIndexStyles';

interface Props {
  profileImgUrl: string;
}

function AddProfileImg({ profileImgUrl }: Props) {
  return (
    <ProfileImgBox $url={profileImgUrl}>
      <Mask />
      <AddButton src="/icon/add_Fillo.svg" alt="프로필 이미지 수정하기" width={30} height={30} />
    </ProfileImgBox>
  );
}

export default AddProfileImg;

const noProfileImg = css`
  background-color: ${GRAY[15]};
`;

const ProfileImgBox = styled.div<{ $url: string }>`
  width: 182px;
  height: 182px;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 6px;

  ${(props) => (props.$url ? `background-image: url(${props.$url})` : noProfileImg)};
  background-position: center;
  background-size: cover;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${WHITE};
  opacity: 50%;

  position: absolute;
  top: 0;
  left: 0;
`;

const AddButton = styled(Image)`
  z-index: ${Z_INDEX.AddProfileImg_AddButton};

  &:hover {
    cursor: pointer;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 20px;
    height: 20px;
  }
`;
