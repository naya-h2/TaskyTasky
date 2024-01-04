import { useState } from 'react';
import styled, { css } from 'styled-components';
import ProfileImg from './ProfileImg';
import { FONT_12, FONT_14, FONT_16 } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import UpIcon from '@/public/icon/small-up.svg';
import DownIcon from '@/public/icon/small-down.svg';
import HeaderDropDown from '../DropDown/HeaderDropDown';
import { BLACK, GRAY } from '@/styles/ColorStyles';

interface Props {
  type: 'header' | 'card' | 'member';
  id: number;
  name: string;
  profileImg: string | null;
}

function Profile({ type, id, name, profileImg }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {isOpen && <StyledMask onClick={() => setIsOpen(false)} />}
      <StyledContainer $type={type}>
        <ProfileImg url={profileImg} size={type === 'card' ? 28 : 38} name={name} id={id} type={type} />
        <StyledNameWrapper $type={type} onClick={handleDropdownClick}>
          <StyledName $type={type}>{name}</StyledName>
          {type === 'header' && (isOpen ? <StyledUpIcon /> : <StyledDownIcon />)}
          {type === 'header' && isOpen && (
            <StyledDropDownWrapper>
              <HeaderDropDown />
            </StyledDropDownWrapper>
          )}
        </StyledNameWrapper>
      </StyledContainer>
    </>
  );
}

export default Profile;

const invisibleMobile = css`
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledContainer = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$type === 'header' ? 'space-between' : 'flex-start')};
  gap: 12px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 6px;
  }
`;

const StyledName = styled.div<{ $type: string }>`
  ${FONT_16};
  color: ${BLACK[2]};

  ${(props) => (props.$type === 'member' ? `${FONT_14}` : null)};
  ${(props) => (props.$type === 'header' ? invisibleMobile : null)};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${(props) => props.$type === 'card' && `${FONT_12}`};
  }
`;

const StyledNameWrapper = styled.div<{ $type: string }>`
  position: relative;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    ${(props) => (props.$type === 'header' ? 'cursor:pointer;' : null)};
  }
`;

const StyledDownIcon = styled(DownIcon)`
  width: 18px;
  height: 18px;
`;

const StyledUpIcon = styled(UpIcon)`
  width: 18px;
  height: 18px;
`;

const StyledDropDownWrapper = styled.div`
  position: absolute;
  top: 38px;
  right: 3px;
`;

const StyledMask = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  right: 0;
`;
