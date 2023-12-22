import Input from '@/components/common/Input/Input';
import { BLACK, WHITE } from '@/styles/ColorStyles';
import { FONT_24_B } from '@/styles/FontStyles';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function PasswordCard() {
  return (
    <StyledBody>
      <StyledTitle>비밀번호 변경</StyledTitle>
      <StyledInfoSection>
        <StyledWrapper>
          <Input type="password" />
          <Input type="password" />
          <Input type="password" />
        </StyledWrapper>
      </StyledInfoSection>
      <StyledButtonSection>
        <StyledButtonWrapper>
          <Button.Plain style="primary" roundSize="S">
            변경
          </Button.Plain>
        </StyledButtonWrapper>
      </StyledButtonSection>
    </StyledBody>
  );
}

export default PasswordCard;

const StyledBody = styled.div`
  width: 100%;
  max-width: 620px;
  padding: 32px 28px 28px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  background-color: ${WHITE};
  border-radius: 8px;
`;

const StyledTitle = styled.div`
  color: ${BLACK[2]};
  ${FONT_24_B};
`;

const StyledInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    align-items: normal;
    gap: 24px;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const StyledButtonSection = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
`;

const StyledButtonWrapper = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;
