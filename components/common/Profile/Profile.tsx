import { FONT_16 } from '@/styles/FontStyles';
import styled, { css } from 'styled-components';
import ProfileImg from './ProfileImg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Link from 'next/link';
import { BLACK } from '@/styles/ColorStyles';

interface Props {
  type: 'header';
  id: number;
  name: string;
  profileImg: string;
}

function Profile({ type, id, name, profileImg }: Props) {
  return (
    <StyledContainer>
      <ProfileImg url={profileImg} size={38} name={name} id={id} />
      <StyledLink href="/mypage">
        <StyledName $type={type}>{name}</StyledName>
      </StyledLink>
    </StyledContainer>
  );
}

export default Profile;

const invisibleMobile = css`
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const StyledName = styled.div<{ $type: string }>`
  ${FONT_16};

  ${(props) => (props.$type === 'header' ? invisibleMobile : null)};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK[2]};
`;
