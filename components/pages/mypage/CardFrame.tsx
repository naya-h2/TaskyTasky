import Button from '@/components/common/Button';
import { BLACK, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_24_B } from '@/styles/FontStyles';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  title: string;
  buttonDisabled: boolean;
  buttonText: string;
  handleClickFunc?: () => void;
}

function CardFrame({ children, title, buttonDisabled, buttonText, handleClickFunc }: Props) {
  return (
    <StyledBody>
      <StyledTitle>{title}</StyledTitle>
      <StyledInfoSection>{children}</StyledInfoSection>
      <StyledButtonSection>
        <StyledButtonWrapper>
          <Button.Plain style="primary" roundSize="S" onClick={handleClickFunc} isNotActive={buttonDisabled}>
            {buttonText}
          </Button.Plain>
        </StyledButtonWrapper>
      </StyledButtonSection>
    </StyledBody>
  );
}

export default CardFrame;

const StyledBody = styled.div`
  width: 100%;
  max-width: 620px;
  padding: 32px 28px 28px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  background-color: ${WHITE};
  border-radius: 16px;
`;

const StyledTitle = styled.div`
  color: ${BLACK[2]};
  ${FONT_24_B};
`;

const StyledInfoSection = styled.div`
  min-height: 227px;

  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    align-items: normal;
    gap: 24px;
  }
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
