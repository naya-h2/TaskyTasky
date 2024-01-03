import styled from 'styled-components';
import { FONT_14_B, FONT_16_B } from '@/styles/FontStyles';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { PINK, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ProfileImg from './ProfileImg';
import { MemberListType } from '@/lib/types/members';
import { useState } from 'react';
import MemberDropDown from '../DropDown/MemberDropDown';

interface Props {
  memberCount: number;
  data: MemberListType[];
}

/**
 * @param memberCount member 목록의 totalCount
 * @param data members 배열
 */
function ProfileImgList({ memberCount, data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const PcRest = memberCount - 4;
  const TabletRest = memberCount - 2;

  if (!memberCount) return;

  const handleRestClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledContainer>
      {data[0] && (
        <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[0]}>
          <ProfileImg
            type="header"
            url={data[0].profileImageUrl}
            size={38}
            name={data[0].nickname}
            id={data[0].userId}
          />
        </StyledProfileWrapper>
      )}
      {data[1] && (
        <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[1]}>
          <ProfileImg
            type="header"
            url={data[1].profileImageUrl}
            size={38}
            name={data[1].nickname}
            id={data[1].userId}
          />
        </StyledProfileWrapper>
      )}
      <StyledWrapper>
        {data[2] && (
          <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[2]}>
            <ProfileImg
              type="header"
              url={data[2].profileImageUrl}
              size={38}
              name={data[2].nickname}
              id={data[2].userId}
            />
          </StyledProfileWrapper>
        )}
        {data[3] && (
          <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[3]}>
            <ProfileImg
              type="header"
              url={data[3].profileImageUrl}
              size={38}
              name={data[3].nickname}
              id={data[3].userId}
            />
          </StyledProfileWrapper>
        )}
      </StyledWrapper>
      {memberCount > 4 && (
        <StyledPCRest onClick={handleRestClick} $order={5}>
          +{PcRest <= 999 ? PcRest : '999'}
          {isOpen && (
            <StyledDropDownWrapper>
              <MemberDropDown memberList={data} />
            </StyledDropDownWrapper>
          )}
        </StyledPCRest>
      )}
      {memberCount > 2 && (
        <StyledTabletRest onClick={handleRestClick} $order={3}>
          +{TabletRest <= 999 ? TabletRest : '999'}
          {isOpen && (
            <StyledDropDownWrapper>
              <MemberDropDown memberList={data} />
            </StyledDropDownWrapper>
          )}
        </StyledTabletRest>
      )}
    </StyledContainer>
  );
}

export default ProfileImgList;

const StyledContainer = styled.div`
  padding-left: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledProfileWrapper = styled.div<{ $order: number }>`
  margin-left: -10px;
  z-index: ${({ $order }) => $order};
`;

const StyledRest = styled.div<{ $order: number }>`
  min-width: 38px;
  height: 38px;
  padding: 0.6rem 0.5rem;
  margin-left: -10px;

  z-index: ${Z_INDEX.profileImgList_Rest};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${WHITE};
  border-radius: 40px;

  background-color: ${PINK[2]};

  ${FONT_16_B}
  color: ${PINK[3]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    min-width: 34px;
    height: 34px;

    ${FONT_14_B};
  }
`;

const StyledPCRest = styled(StyledRest)`
  position: relative;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;

const StyledTabletRest = styled(StyledRest)`
  display: none;
  position: relative;

  &:hover {
    cursor: pointer;
  }
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: flex;
  }
`;

const StyledWrapper = styled(StyledContainer)`
  margin-left: -10px;
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;

const StyledDropDownWrapper = styled.div`
  position: absolute;
  top: 38px;
  right: -10px;
`;
