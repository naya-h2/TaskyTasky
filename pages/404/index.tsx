import Logo from '@/components/common/Logo/Logo';
import { FONT_16 } from '@/styles/FontStyles';
import Head from 'next/head';
import styled from 'styled-components';

function NotFound() {
  return (
    <>
      <Head>
        <title>NotFound | TaskyTasky</title>
      </Head>
      <Wrapper>
        <Logo type="large" />
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
  padding-top: 30vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Text = styled.div`
  ${FONT_16};
  text-align: center;
`;
