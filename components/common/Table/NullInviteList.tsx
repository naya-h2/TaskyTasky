import styled from 'styled-components';
import { BLACK, GRAY, WHITE } from '@/styles/ColorStyles';
import NoDashImg from '@/public/images/No_Invite_Dash.svg';
import { FONT_14, FONT_18, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function NullInviteList() {
  return (
    <Wrapper>
      <Container>
        <Title>초대받은 대시보드</Title>
        <InviteDashLayout>
          <NoDashImg />
          <StyleText>아직 초대받은 대시보드가 없어요</StyleText>
        </InviteDashLayout>
      </Container>
    </Wrapper>
  );
}

export default NullInviteList;

const Wrapper = styled.div`
  width: 1022px;
  height: 400px;
  padding: 32px 28px;
  border-radius: 8px;
  background-color: ${[WHITE]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 504px;
    height: 400px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 260px;
    height: 400px;
    padding: 24px 16px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const InviteDashLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 66px;
  gap: 24px;
`;
const Title = styled.div`
  color: ${[BLACK[2]]};
  ${[FONT_24_B]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}
  }
`;
const StyleText = styled.div`
  color: ${[GRAY[40]]};
  ${[FONT_18]};
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
  }
`;
