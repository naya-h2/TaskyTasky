import Head from 'next/head';
import styled from 'styled-components';
import Header from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import ProfileCard from '@/components/pages/mypage/ProfileCard';
import PasswordCard from '@/components/pages/mypage/PasswordCard';
import BackButton from '@/components/pages/mypage/BackButton';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useGetUser } from '@/hooks/useGetUser';
import dashboardData from '@/components/common/SideMenu/mock'; // 사이드메뉴 되면 목업데이터 삭제 예정

function MyPage() {
  const user = useGetUser();

  return (
    <>
      <Head>
        <title>내 정보 | TaskyTasky</title>
      </Head>
      <Header page="myboard">계정관리</Header>
      <SideMenu data={dashboardData.dashboards} />
      <StyledBody>
        <StyledContainer>
          <BackButton>돌아가기</BackButton>
          <StyledCardWrapper>
            {user && <ProfileCard data={user} />}
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
