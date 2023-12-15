import { VIOLET } from '@/styles/ColorStyles';
import { FONT_20_B } from '@/styles/FontStyles';
import styled from 'styled-components';

export default function Home() {
  return (
    <>
      <Div>폰트, 색상변수 사용방법</Div>
    </>
  );
}

const Div = styled.div`
  color: ${VIOLET[1]};
  ${FONT_20_B}
`;
