import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import ProfileCard from '@/components/pages/mypage/ProfileCard';
import PasswordCard from '@/components/pages/mypage/PasswordCard';
import { getUserInfo } from '@/api/users/getUserInfo';
import { UserType } from '@/lib/types/users';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_16 } from '@/styles/FontStyles';
import BackwordIcon from '@/public/icon/arrow_backward.svg';
import dashboardData from '@/components/common/SideMenu/mock';

function MyPage() {
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserInfo();
      setUserData(data);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header page="myboard">계정관리</Header>
      <SideMenu data={dashboardData.dashboards} />
      <StyledBody>
        <StyledContainer>
          <BackButton />
          <StyledCardWrapper>
            {userData && <ProfileCard data={userData} />}
            <PasswordCard />
          </StyledCardWrapper>
        </StyledContainer>
      </StyledBody>
    </>
  );
}

export default MyPage;

/**
 * TODO: 컴포넌트로 따로 빼고 & 애니메이션 & 링크 설정
 */
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
  gap: 24px;
`;
