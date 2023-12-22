import Logo from '@/components/common/Logo/Logo';
import { FONT_16 } from '@/styles/FontStyles';
import styled from 'styled-components';

function NotFound() {
  return (
    <>
      <Wrapper>
        <Logo type="main" />
        <Text>
          접근 권한이 없거나 존재하지 않는 페이지입니다.
          <br /> The page does not have access or does not exist.
        </Text>
      </Wrapper>
    </>
  );
}

export default NotFound;

const Wrapper = styled.div`
  padding-top: 20vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Text = styled.div`
  ${FONT_16};
  text-align: center;
`;
