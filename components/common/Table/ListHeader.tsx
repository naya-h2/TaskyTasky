import { FONT_12, FONT_14, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import styled from 'styled-components';
import Button from '../Button';
import AddBoxIcon from '@/public/icon/add_box_fill.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useMediaQuery } from 'react-responsive';

interface ListHeaderProps {
  title: '구성원' | '초대 내역';
}

function ListHeader({ title = '구성원' }: ListHeaderProps) {
  const isMobile = useMediaQuery({ query: `(max-width: ${DEVICE_SIZE.mobile})` });
  return (
    <ListHeaderLayout>
      <HeaderLeft>{title}</HeaderLeft>
      <HeaderRight>
        <PageStatus>1 페이지 중 1</PageStatus>
        <ArrowButton>
          <ButtonLayout>
            <Button
              type="arrow-b"
              active={false}
              width={isMobile ? '36px' : '40px'}
              height={isMobile ? '36px' : '40px'}
            ></Button>
            <Button
              type="arrow-f"
              active={false}
              width={isMobile ? '36px' : '40px'}
              height={isMobile ? '36px' : '40px'}
            ></Button>
          </ButtonLayout>
        </ArrowButton>
        {title === '초대 내역' && (
          <Button
            type="primary"
            width={isMobile ? '86px' : '105px'}
            height={isMobile ? '28px' : '32px'}
            fontSize={isMobile ? 'S' : 'M'}
            roundSize="S"
          >
            <AddBox />
            초대하기
          </Button>
        )}
      </HeaderRight>
    </ListHeaderLayout>
  );
}

export default ListHeader;

const ListHeaderLayout = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;

  padding: 0 28px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 0 20px;
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  ${[FONT_24_B]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}

    align-items: center;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 12px;

    flex-wrap: wrap;
    justify-content: right;
    width: 150px;
  }
`;

const PageStatus = styled.div`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;

const ArrowButton = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-wrap: wrap;
    justify-content: right;
    gap: 10px;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
`;

const AddBox = styled(AddBoxIcon)`
  width: 16px;
  heightL 16px;
`;
