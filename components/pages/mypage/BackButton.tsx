import styled, { keyframes } from 'styled-components';
import { FONT_16 } from '@/styles/FontStyles';
import BackwordIcon from '@/public/icon/arrow_backward.svg';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function BackButton({ children }: Props) {
  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <StyledBackWrapper onClick={handleButtonClick}>
      <BackwordIcon />
      <StyledBackText>{children}</StyledBackText>
    </StyledBackWrapper>
  );
}

export default BackButton;

const toRight = keyframes`
 50% {
  transform: translateX(20px);
  opacity: 80%;
 }
`;

const StyledBackWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  animation: ${toRight} 2s 0.5s infinite;

  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

const StyledBackText = styled.div`
  ${FONT_16};
`;
