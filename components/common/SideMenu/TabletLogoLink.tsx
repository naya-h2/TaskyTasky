import styled from 'styled-components';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Logo from '../Logo/Logo';

function LogoLink() {
  return (
    <StyledLogoWrapper>
      <StyledLargeLogoImg>
        <Logo type="main" />
      </StyledLargeLogoImg>
    </StyledLogoWrapper>
  );
}

export default LogoLink;

const StyledLogoWrapper = styled.div`
  display: none;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    align-items: center;
  }
`;

const StyledLargeLogoImg = styled.div`
  display: none;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;
  }
`;
