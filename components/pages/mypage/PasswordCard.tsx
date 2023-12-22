import Input from '@/components/common/Input/Input';
import { BLACK, WHITE } from '@/styles/ColorStyles';
import { FONT_24_B } from '@/styles/FontStyles';
import styled from 'styled-components';
import { Button } from '@/components/common/Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function PasswordCard() {
  return (
    <Body>
      <Title>비밀번호 변경</Title>
      <InfoSection>
        <Wrapper>
          <Input type="password" />
          <Input type="password" />
          <Input type="password" />
        </Wrapper>
      </InfoSection>
      <ButtonSection>
        <ButtonWrapper>
          <Button.Plain style="primary" roundSize="S" fontSize="S">
            변경
          </Button.Plain>
        </ButtonWrapper>
      </ButtonSection>
    </Body>
  );
}

export default PasswordCard;

const Body = styled.div`
  width: 100%;
  max-width: 620px;
  padding: 32px 28px 28px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  background-color: ${WHITE};
  border-radius: 8px;
`;

const Title = styled.div`
  color: ${BLACK[2]};
  ${FONT_24_B};
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    align-items: normal;
    gap: 24px;
  }
`;

const Wrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const ButtonSection = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;
