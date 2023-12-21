import styled from 'styled-components';
import Header from '@/components/common/Header/Second';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import dashboardData from '@/components/common/SideMenu/mock';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import Button from '@/components/common/Button';
import { FONT_14 } from '@/styles/FontStyles';
import InviteDash from '@/components/common/Table/InviteDash';

const inviteData = {
  cursorId: 123,
  invitations: [
    {
      id: 1,
      inviterUserId: 2,
      teamId: 'team-10',
      dashboard: {
        title: '프로덕트 디자인',
        id: 234,
      },
      invitee: {
        nickname: '손동희',
        id: 2,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
    {
      id: 2,
      inviterUserId: 3,
      teamId: 'team-8',
      dashboard: {
        title: '새로운 기획 문서',
        id: 234,
      },
      invitee: {
        nickname: '안귀영',
        id: 3,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
    {
      id: 2,
      inviterUserId: 3,
      teamId: 'team-8',
      dashboard: {
        title: '유닛A',
        id: 234,
      },
      invitee: {
        nickname: '장혁',
        id: 3,
      },
      inviteAccepted: true,
      createdAt: '2023-12-20T04:38:51.003Z',
      updatedAt: '2023-12-20T04:38:51.003Z',
    },
  ],
};

function Myboard() {
  const data = dashboardData.dashboards;

  return (
    <>
      <Header page="myboard">내 대시보드</Header>
      <SideMenu />
      <Body>
        <Container>
          <DashBoardSection>
            <DashBoardList>
              {data &&
                data.map((dashboard) => (
                  <ButtonWrapper>
                    <Button type="dashboard" height="100%" fontSize="L" fontBold crown={dashboard.createdByMe}>
                      {dashboard.title}
                    </Button>
                  </ButtonWrapper>
                ))}
              <ButtonWrapper>
                <Button type="plain" height="100%" fontSize="L" chip fontBold>
                  새로운 대시보드
                </Button>
              </ButtonWrapper>
            </DashBoardList>
            <PageWrapper>
              <PageInfo>1 페이지 중 1</PageInfo>
              <MoveButton>
                <Button type="arrow-b" />
                <Button type="arrow-f" />
              </MoveButton>
            </PageWrapper>
          </DashBoardSection>
          <InviteDash inviteList={inviteData} />
        </Container>
      </Body>
    </>
  );
}

export default Myboard;

const Body = styled.body`
  padding-top: 70px;
  padding-left: 300px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-left: 67px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1022px;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const DashBoardList = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 13px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    grid-template-columns: repeat(1, 1fr);
    gap: 8px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: 70px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    height: 68px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 58px;
  }
`;

const MoveButton = styled.div`
  display: flex;
`;

const DashBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PageInfo = styled.div`
  ${FONT_14};

  display: flex;
  align-items: center;
`;

const PageWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;
