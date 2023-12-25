import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import CardList from '@/components/common/Card/CardList';
import Button from '@/components/common/Button';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_18_B } from '@/styles/FontStyles';

import mockData from '@/components/common/Card/mock.json';
import boardMockData from '@/components/common/SideMenu/mock';

function Board() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <StyledRoot>
      <Header page="others" children="제목" />
      <SideMenu dashboards={boardMockData.dashboards} />
      <StyledContent>
        <CardList label="To Do" cardList={mockData} />
        <CardList label="On Progress" cardList={mockData} />
        <CardList label="Done" cardList={mockData} />
        <StyledBtnWrapper>
          <Button.Add roundSize="L">
            <StyledText>새로운 컬럼 추가하기</StyledText>
          </Button.Add>
        </StyledBtnWrapper>
      </StyledContent>
    </StyledRoot>
  );
}

export default Board;

const StyledRoot = styled.div``;

const StyledContent = styled.div`
  width: 100%;
  padding-top: 70px;
  padding-left: 300px;

  display: flex;
  flex-direction: row;

  background-color: ${GRAY[10]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-top: 70px;
    padding-left: 160px;

    flex-direction: column;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 70px;
    padding-left: 67px;
  }
`;

const StyledBtnWrapper = styled.div`
  width: 100%;
  max-width: 354px;
  height: 70px;
  margin: 68px 20px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    max-width: none;
    margin: 20px 0;
    padding: 0 20px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 60px;
    margin: 12px 0;
    padding: 0 15px;
  }
`;

const StyledText = styled.div`
  ${FONT_18_B}
`;
