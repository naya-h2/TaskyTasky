import { FONT_16 } from '@/styles/FontStyles';
import styled, { css } from 'styled-components';
import ProfileImg from './ProfileImg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Link from 'next/link';
import { BLACK } from '@/styles/ColorStyles';

interface Props {
  type: 'header' | 'card';
  id: number;
  name: string;
  profileImg: string;
}

function Profile({ type, id, name, profileImg }: Props) {
  return (
    <StyledContainer $type={type}>
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

const StyledContainer = styled.div<{ $type: 'header' | 'card' }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$type === 'header' ? 'space-between' : 'flex-start')};
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
