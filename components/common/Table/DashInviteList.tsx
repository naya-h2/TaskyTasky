import { styled } from 'styled-components';
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ListHeader from './ListHeader';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import Button from '../Button';
import { GetDashboardInvitationResponseType } from '@/lib/types/dashboards';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDashboardInvitationList } from '@/api/dashboards/getDashboardInvitationList';
import NoDashImg from '@/public/images/No_Invite_Dash.svg';

// interface Props {
//   invitationsList: GetDashboardInvitationResponseType;
// }

function DashInviteList() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [dashInvitation, setDashInvitation] = useState<GetDashboardInvitationResponseType>({
    totalCount: 0,
    invitations: [],
  });
  const { invitations, totalCount } = dashInvitation;
  const [page, setPage] = useState(1);

  const fetchDashboardData = async (page: number) => {
    const dashInvitation = await getDashboardInvitationList(dashboardId, 5, page);
    setDashInvitation(dashInvitation);
  };
  const getPage = (num: number) => {
    setPage(num);
    fetchDashboardData(num);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchDashboardData(page);
  }, [router.isReady]);

  return (
    <Wrapper>
      <Container>
        <ListHeader title="초대 내역" totalCount={totalCount} page={page} getPage={getPage} />
        {invitations.length === 0 ? (
          <NullWrapper>
            <NoDashImg />
            <NullInviteList>초대내역이 없습니다.</NullInviteList>
          </NullWrapper>
        ) : (
          <>
            <ListTitle>이메일</ListTitle>
            <ListLayout>
              {invitations.map((invitation) => (
                <InviterEmailWrapper key={invitation.id}>
                  <InviterEmailLayout>
                    <InviteEmail>{invitation.invitee.email}</InviteEmail>
                    <InviteCancelButton>
                      <Button.Plain style="outline" roundSize="S">
                        <ButtonText>취소</ButtonText>
                      </Button.Plain>
                    </InviteCancelButton>
                  </InviterEmailLayout>
                </InviterEmailWrapper>
              ))}
            </ListLayout>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default DashInviteList;

const Wrapper = styled.div`
  width: 620px;
  height: 495px;
  border-radius: 8px;
  background-color: ${[WHITE]};
  padding-top: 30px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 544px;
    height: 495px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 419px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListTitle = styled.div`
  ${[FONT_16]}
  padding: 0 28px;
  color: ${[GRAY[40]]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
    padding: 0 20px;
  }
`;

const ListLayout = styled.div``;

const InviterEmailWrapper = styled.div`
  border-bottom: 1px solid ${[GRAY[20]]};
  padding-top: 19px;
  padding-bottom: 19px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 12px;
    padding-bottom: 12px;
  }
`;

const InviterEmailLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
    padding: 0 20px;
  }
`;
const InviteEmail = styled.div`
  ${[FONT_16]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
  }
`;
const InviteCancelButton = styled.div`
  width: 84px;
  height: 32px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 52px;
    height: 28px;
  }
`;
const ButtonText = styled.div`
  color: ${[VIOLET[1]]};
`;
const NullInviteList = styled.div``;

const NullWrapper = styled.div`
  height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 340px;
  }
`;
