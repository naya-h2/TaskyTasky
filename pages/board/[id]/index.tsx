import { useRouter } from 'next/router';
import styled from 'styled-components';

import Second from '@/components/common/Header/Second';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import CardList from '@/components/common/Card/CardList';
import Button from '@/components/common/Button';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

import mockData from '@/components/common/Card/mock.json';

function Board() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Root>
      <Second page="others" children="제목" />
      <SideMenu />
      <Content>
        <CardList label="To Do" cardList={mockData} />
        <CardList label="On Progress" cardList={mockData} />
        <CardList label="Done" cardList={mockData} />
        <AddColumnBtnWrapper>
          <Button height="70px" type="plain" fontSize="XL" fontBold={true} roundSize="L" chip={true}>
            새로운 컬럼 추가하기
          </Button>
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
  margin: 0 auto;
  padding: 68px 20px;
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    max-width: none;
  }
`;
