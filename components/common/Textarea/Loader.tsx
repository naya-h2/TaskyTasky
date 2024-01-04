import styled, { keyframes } from 'styled-components';
import spinnerImg from '@/public/images/spinner.png';

function Loader() {
  return (
    <StyledContainer>
      <Spinner />
    </StyledContainer>
  );
}

export default Loader;

const placeholderRotate = keyframes`
  100% {
      transform: rotate(360deg);
  }
`;

const StyledContainer = styled.div`
  width: 440px;
  height: 165px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  animation: ${placeholderRotate} 1.5s linear infinite;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-image: url(${`${spinnerImg}`});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
