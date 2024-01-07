import { styled } from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../Button';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_16, FONT_14, FONT_12 } from '@/styles/FontStyles';
import { editInvitation } from '@/api/invitations/editInvitation';
import { InvitationType } from '@/lib/types/invitations';
import { useStore } from '@/context/stores';

interface Props {
  invite: InvitationType;
}

function InviteList({ invite }: Props) {
  const { setPage, trigger, toggleTriger } = useStore((state) => ({
    setPage: state.setPage,
    trigger: state.inviteTrigger,
    toggleTriger: state.toggleInviteTrigger,
  }));

  const handleInvitationClick = async (name: string, isAccept: boolean) => {
    if (isAccept) await toast.success(`초대 수락: ${name}`);
    else await toast.error(`초대 거절: ${name}`);

    const data = await editInvitation(`${invite.id}`, { inviteAccepted: isAccept });
    setPage(1);
    toggleTriger(trigger);
  };

  return (
    <InviteWrap>
      <InviteContainer>
        <InviteDashLayout>
          <InviteInformation>이름</InviteInformation>
          <InviteData>{invite.dashboard.title}</InviteData>
        </InviteDashLayout>
        <InviterName>
          <InviteInformation>초대자</InviteInformation>
          <InviteData>{invite.inviter.nickname}</InviteData>
        </InviterName>
        <ButtonGroup>
          <ButtonLayout>
            <Button.Plain
              style="primary"
              roundSize="S"
              onClick={() => handleInvitationClick(invite.dashboard.title, true)}
            >
              <ButtonText>수락</ButtonText>
            </Button.Plain>
          </ButtonLayout>
          <ButtonLayout>
            <Button.Plain
              style="secondary"
              roundSize="S"
              onClick={() => handleInvitationClick(invite.dashboard.title, false)}
            >
              <ButtonText>거절</ButtonText>
            </Button.Plain>
          </ButtonLayout>
        </ButtonGroup>
      </InviteContainer>
    </InviteWrap>
  );
}

export default InviteList;

const InviteWrap = styled.div`
  padding: 20px 0px;
  border-bottom: 1px solid ${GRAY[30]};
`;

const InviteContainer = styled.div`
  padding: 0px 28px;
  align-items: center;

  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 0px 16px;
  }
`;

const InviteDashLayout = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 10px;
    gap: 28px;
  }
`;

const InviterName = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 16px;
    gap: 16px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const InviteData = styled.div`
  ${[FONT_16]}
`;

const ButtonText = styled.div`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;

const ButtonLayout = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 72px;
    height: 30px;
  }
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 109px;
  }
`;

const InviteInformation = styled.div`
  display: none;
  color: ${[GRAY[40]]};
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: inline-block;
  }
`;
