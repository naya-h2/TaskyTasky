import { styled } from 'styled-components';
import { WHITE } from '@/styles/ColorStyles';

function DashMyMember() {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
}

export default DashMyMember;

const Wrapper = styled.div`
  width: 620px;
  height: 404px;
  border-radius: 8px;
  background-color: ${[WHITE]};
`;

const Container = styled.div``;
