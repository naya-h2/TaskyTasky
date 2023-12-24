import { styled } from 'styled-components';
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ListHeader from './ListHeader';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import { MemberList } from '@/lib/types/type';
import Button from '../Button';
import { useMediaQuery } from 'react-responsive';

interface Props {
  memberList: MemberList;
}

function DashInviteList({ memberList }: Props) {
  const { members, totalCount } = memberList;
  return (
    <Wrapper>
      <Container>
        <ListHeader title="초대 내역" />
        <ListTitle>이메일</ListTitle>
        <ListLayout>
          {members.map((member) => (
            <InviterEmailWrapper key={member.id}>
              <InviterEmailLayout>
                <InviteEmail>{member.email}</InviteEmail>
                <InviteCancelButton>
                  <Button.Plain style="outline" roundSize="S">
                    <ButtonText>취소</ButtonText>
                  </Button.Plain>
                </InviteCancelButton>
              </InviterEmailLayout>
            </InviterEmailWrapper>
          ))}
        </ListLayout>
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
