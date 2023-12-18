import { WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  url: string;
  size: number;
}

function ProfileImg({ url, size }: Props) {
  return <Img alt="프로필 이미지" src={url} width={size} height={size} />;
}

export default ProfileImg;

const Img = styled(Image)`
  border-radius: 100%;
  border: 2px solid ${WHITE};

  background-size: cover;
  background-position: center;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 34px;
    height: 34px;
  }
`;
