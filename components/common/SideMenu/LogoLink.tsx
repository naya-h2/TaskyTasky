import styled from 'styled-components';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Logo from '../Logo/Logo';

function LogoLink() {
  return (
    <StyledLogoWrapper>
      <StyledLargeLogoImg>
        <Logo type="main" />
      </StyledLargeLogoImg>
      <StyledSmallLogoImg>
        <Logo type="small" />
      </StyledSmallLogoImg>
    </StyledLogoWrapper>
  );
}

export default LogoLink;

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLargeLogoImg = styled.div`
  display: block;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledSmallLogoImg = styled.div`
  display: none;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;

    position: absolute;
    top: 20px;
    left: 15px;
  }
`;
