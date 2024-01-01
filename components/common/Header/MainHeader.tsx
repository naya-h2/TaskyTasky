import Link from 'next/link';
import styled from 'styled-components';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import { WHITE, BLACK } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Logo from '../Logo/Logo';

function MainHeader() {
  return (
    <Wrapper>
      <StyledPcWrapper>
        <Logo type="main" />
      </StyledPcWrapper>
      <StyledMobileWrapper>
        <Logo type="small" />
      </StyledMobileWrapper>
      <Right>
        <StyledLink href="/login">로그인</StyledLink>
        <StyledLink href="/signup">회원가입</StyledLink>
      </Right>
    </Wrapper>
  );
}

export default MainHeader;

const StyledPcWrapper = styled.div`
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledMobileWrapper = styled.div`
  display: none;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: block;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 100vw;
  height: 70px;
  padding: 20px 80px 20px 26px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 3.6rem;

  background-color: ${WHITE};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding: 20px 24px;
  }
`;

const Left = styled(Link)`
  cursor: pointer;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 36px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    column-gap: 20px;
  }
`;

const StyledLink = styled(Link)`
  color: ${BLACK[2]};
  ${FONT_16};

  text-decoration: none;
  cursor: pointer;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${FONT_14};
  }
`;
