import Link from "next/link";
import styled from "styled-components";
import LargeLogo from '@/public/images/logo_large.svg';
import SmallLogo from '@/public/images/logo_small.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';


function LogoLink() {
  return (
    <Link href="/">
      <StyledLogoWrapper>
        <StyledLargeLogoImg />
        <StyledSmallLogoImg />
      </StyledLogoWrapper>
    </Link>
  );
}

export default LogoLink;

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLargeLogoImg = styled(LargeLogo)`
  display: block;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledSmallLogoImg = styled(SmallLogo)`
  display: none;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;
  }
`;