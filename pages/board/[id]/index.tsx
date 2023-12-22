import { useRouter } from 'next/router';
import styled from 'styled-components';

import Second from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import CardList from '@/components/common/Card/CardList';
import { Button } from '@/components/common/Button';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

import mockData from '@/components/common/Card/mock.json';
import boardMockData from '@/components/common/SideMenu/mock';

function Board() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Root>
      <Second page="others" children="제목" />
      <SideMenu dashboards={boardMockData.dashboards} />
      <Content>
        <CardList label="To Do" cardList={mockData} />
        <CardList label="On Progress" cardList={mockData} />
        <CardList label="Done" cardList={mockData} />
        <AddColumnBtnWrapper>
          <Button.Add roundSize="L" fontSize="L" isBoldFont>
            새로운 컬럼 추가하기
          </Button.Add>
        </AddColumnBtnWrapper>
      </Content>
    </Root>
  );
}

export default Board;

const Root = styled.div``;

const Content = styled.div`
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

const AddColumnBtnWrapper = styled.div`
  width: 100%;
  max-width: 354px;
  height: 70px;
  margin: 68px 20px;
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    max-width: none;
    margin: 0 0 20px;
    padding: 0 20px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 60px;
    margin: 0 0 12px;
    padding: 0 15px;
  }
`;
