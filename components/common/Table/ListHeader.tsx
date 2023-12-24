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
            <Button.Arrow type="left" isNotActive />
            <Button.Arrow type="right" isNotActive />
          </ButtonLayout>
        </ArrowButton>
        {title === '초대 내역' && (
          <InviteButtonLayout>
            <Button.Plain style="primary" roundSize="S">
              <ButtonStyle>
                <ButtonIcon>
                  <AddBox />
                </ButtonIcon>
                <ButtonText>초대하기</ButtonText>
              </ButtonStyle>
            </Button.Plain>
          </InviteButtonLayout>
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

const InviteButtonLayout = styled.div`
  width: 105px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 86px;
    height: 28px;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 6px;
  }
`;

const AddBox = styled(AddBoxIcon)`
  width: 16px;
  heightL 16px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.text`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;
