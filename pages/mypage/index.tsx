import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import ProfileCard from '@/components/pages/mypage/ProfileCard';
import PasswordCard from '@/components/pages/mypage/PasswordCard';
import BackButton from '@/components/pages/mypage/BackButton';
import { getUserInfo } from '@/api/users/getUserInfo';
import { UserType } from '@/lib/types/users';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
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
      <SideMenu />
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

const StyledCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
