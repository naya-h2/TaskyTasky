import Header from '@/components/common/Header/Second';
import { VIOLET } from '@/styles/ColorStyles';
import { FONT_20_B } from '@/styles/FontStyles';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      {/* <Div>폰트, 색상변수 사용방법</Div> */}
      <Header page="myboard" crown={true}>
        내 대시보드
      </Header>
      <Header page="others" crown={true}>
        내 대시보드
      </Header>
    </>
  );
}

const Div = styled.div`
  color: ${VIOLET[1]};
  ${FONT_20_B}
`;
