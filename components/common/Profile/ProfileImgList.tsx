import styled from 'styled-components';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { PINK, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ProfileImg from './ProfileImg';

interface Props {
  memberCount: number;
  data: any[];
}

/**
 * @param memberCount member 목록의 totalCount
 * @param data members 배열
 */
function ProfileImgList({ memberCount, data }: Props) {
  const PcRest = memberCount - 4;
  const TabletRest = memberCount - 2;

  return (
    <StyledContainer>
      {data[0] && (
        <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[0]}>
          <ProfileImg url={data[0].profileImageUrl} size={38} name={data[0].nickname} id={data[0].userId} />
        </StyledProfileWrapper>
      )}
      {data[1] && (
        <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[1]}>
          <ProfileImg url={data[1].profileImageUrl} size={38} name={data[1].nickname} id={data[1].userId} />
        </StyledProfileWrapper>
      )}
      <StyledWrapper>
        {data[2] && (
          <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[2]}>
            <ProfileImg url={data[2].profileImageUrl} size={38} name={data[2].nickname} id={data[2].userId} />
          </StyledProfileWrapper>
        )}
        {data[3] && (
          <StyledProfileWrapper $order={Z_INDEX.profileImgList_Img[3]}>
            <ProfileImg url={data[3].profileImageUrl} size={38} name={data[3].nickname} id={data[3].userId} />
          </StyledProfileWrapper>
        )}
      </StyledWrapper>
      <StyledPCRest $order={5}>+{PcRest <= 999 ? PcRest : '999'}</StyledPCRest>
      <StyledTabletRest $order={3}>+{TabletRest <= 999 ? TabletRest : '999'}</StyledTabletRest>
    </StyledContainer>
  );
}

export default ProfileImgList;

const StyledContainer = styled.div`
  min-width: 156px;

  position: relative;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    min-width: 100px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    min-width: 95px;
  }
`;

const StyledProfileWrapper = styled.div<{ $order: number }>`
  position: absolute;
  left: ${({ $order }) => `${29 * $order - 29}px`};

  z-index: ${({ $order }) => $order};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    left: ${({ $order }) => `${25 * $order - 25}px`};
  }
`;

const StyledRest = styled.div<{ $order: number }>`
  min-width: 38px;
  height: 38px;
  padding: 0.6rem 0.5rem;

  position: absolute;
  left: ${({ $order }) => `${29 * $order - 29}px`};

  z-index: ${Z_INDEX.profileImgList_Rest};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid ${WHITE};
  border-radius: 40px;

  background-color: ${PINK[2]};

  ${FONT_16}
  color: ${PINK[3]};
  text-align: center;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    min-width: 34px;
    height: 34px;

    left: ${({ $order }) => `${25 * $order - 25}px`};

    ${FONT_14};
  }
`;

const StyledPCRest = styled(StyledRest)`
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;

const StyledTabletRest = styled(StyledRest)`
  display: none;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: flex;
  }
`;

const StyledWrapper = styled(StyledContainer)`
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;
