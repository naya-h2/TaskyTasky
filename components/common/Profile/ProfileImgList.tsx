import styled from 'styled-components';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import { PINK, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE, DEVICE_SIZE_NUM } from '@/styles/DeviceSize';
import { useEffect } from 'react';
import useGetWindowWidth from '@/hooks/useGetWindowWidth';
import { useMediaQuery } from 'react-responsive';

interface Props {
  memberCount: number;
  data: any[];
}

/**
 * @param memberCount member 목록의 totalCount
 * @param data members 배열
 */
function ProfileImgList({ memberCount, data }: Props) {
  const isTablet = useMediaQuery({ query: `(max-width: ${DEVICE_SIZE.tablet})` });
  let rest = memberCount - 4;

  if (isTablet) rest += 2;

  console.log(isTablet);

  return (
    <Container>
      {data[0] && (
        <Img alt="대시보드 멤버1 이미지" $order={Z_INDEX.profileImgList_Img[0]} src={data[0].profileImageUrl} />
      )}
      {data[1] && (
        <Img alt="대시보드 멤버2 이미지" $order={Z_INDEX.profileImgList_Img[1]} src={data[1].profileImageUrl} />
      )}
      <Wrapper>
        {data[2] && (
          <Img alt="대시보드 멤버3 이미지" $order={Z_INDEX.profileImgList_Img[2]} src={data[2].profileImageUrl} />
        )}
        {data[3] && (
          <Img alt="대시보드 멤버4 이미지" $order={Z_INDEX.profileImgList_Img[3]} src={data[3].profileImageUrl} />
        )}
      </Wrapper>
      {rest > 0 && <Rest $order={isTablet ? 3 : 5}>+{rest <= 999 ? rest : '999'}</Rest>}
    </Container>
  );
}

export default ProfileImgList;

const Container = styled.div`
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

const Img = styled.img<{ $order: number }>`
  width: 38px;
  height: 38px;

  position: absolute;
  left: ${({ $order }) => `${29 * $order - 29}px`};

  z-index: ${({ $order }) => $order};

  border-radius: 100%;
  border: 2px solid ${WHITE};

  background-size: cover;
  background-position: center;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 34px;
    height: 34px;

    left: ${({ $order }) => `${25 * $order - 25}px`};
  }
`;

const Rest = styled.div<{ $order: number }>`
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

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    min-width: 34px;
    min-height: 34px;

    left: ${({ $order }) => `${25 * $order - 25}px`};

    ${FONT_14};
  }
`;

const Wrapper = styled(Container)`
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: none;
  }
`;
