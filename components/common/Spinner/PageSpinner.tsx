import styled from 'styled-components';
import Image from 'next/image';
import { FONT_20 } from '@/styles/FontStyles';

function PageSpinner() {
  return (
    <StyledSpinner>
      <Image src="/images/Spinner-1s-200px.gif" alt="로딩중" width={80} height={80} />
      페이지 이동중 . . .
    </StyledSpinner>
  );
}

export default PageSpinner;

const StyledSpinner = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${FONT_20};
`;
