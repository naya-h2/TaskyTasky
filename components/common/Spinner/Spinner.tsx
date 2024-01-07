import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner: React.FC = () => {
  return <StyledSpinner />;
};

export default Spinner;

const StyledSpinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #5534DA;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 47%;
  transform: translate(-50%, -50%);
`;

