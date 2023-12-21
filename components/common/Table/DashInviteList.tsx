import { styled } from 'styled-components';
import { WHITE } from '@/styles/ColorStyles';

function DashInviteList() {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
}

export default DashInviteList;

const Wrapper = styled.div`
  width: 620px;
  height: 440px;
  border-radius: 8px;
  background-color: ${[WHITE]};
`;

const Container = styled.div``;
