import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import ProfileCard from '@/components/pages/mypage/ProfileCard';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_16 } from '@/styles/FontStyles';
import styled from 'styled-components';
import BackwordIcon from '@/public/icon/arrow_backward.svg';
import { USER1 } from '@/lib/constants/mockup';
import PasswordCard from '@/components/pages/mypage/PasswordCard';
import dashboardData from '@/components/common/SideMenu/mock';

function MyPage() {
  const data = USER1;

  return (
    <>
      <Header page="others">계정관리</Header>
      <SideMenu data={dashboardData.dashboards} />
      <StyledBody>
        <StyledContainer>
          <BackButton />
          <StyledCardWrapper>
            <ProfileCard data={data} />
            <PasswordCard />
          </StyledCardWrapper>
        </StyledContainer>
      </StyledBody>
    </>
  );
}

export default MyPage;

function BackButton() {
  return (
    <StyledBackWrapper>
      <BackwordIcon />
      <StyledBackText>돌아가기</StyledBackText>
    </StyledBackWrapper>
  );
}

const StyledBody = styled.div`
  padding-top: 70px;
  padding-left: 300px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-left: 67px;
  }
`;

const StyledContainer = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 20px;
  }
`;

const StyledBackWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledBackText = styled.div`
  ${FONT_16};
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
