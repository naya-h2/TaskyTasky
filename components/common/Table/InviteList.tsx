import { Invitation } from '@/lib/types/type';
import { GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_16, FONT_14, FONT_12 } from '@/styles/FontStyles';
import { styled } from 'styled-components';
import { BLUE, GREEN, ORANGE, PINK, PURPLE } from '@/styles/ColorStyles';
import Button from '../Button';

const CHIP_COLOR = {
  green: GREEN,
  purple: PURPLE,
  orange: ORANGE,
  blue: BLUE,
  pink: PINK[1],
};

interface Props {
  invite: Invitation;
}

function InviteList({ invite }: Props) {
  return (
    <InviteWrap>
      <InviteContainer>
        <StyledChip $color="green" />
        <InviteDashLayout>
          <InviteInformation>이름</InviteInformation>
          <InviteData>{invite.dashboard.title}</InviteData>
        </InviteDashLayout>
        <InviterName>
          <InviteInformation>초대자</InviteInformation>
          <InviteData>{invite.invitee.nickname}</InviteData>
        </InviterName>
        <ButtonGroup>
          <ButtonLayout>
            <Button.Plain style="primary" roundSize="S">
              <ButtonText>수락</ButtonText>
            </Button.Plain>
          </ButtonLayout>
          <ButtonLayout>
            <Button.Plain style="secondary" roundSize="S">
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
  display: flex;
  padding: 0px 28px;
  align-items: center;
  & > div:nth-child(1) {
    @media (max-width: ${DEVICE_SIZE.tablet}) {
      flex-basis: 3%;
    }
    @media (max-width: ${DEVICE_SIZE.mobile}) {
      display: none;
    }
  }
  & > div:nth-child(2) {
    flex-basis: 36%;

    @media (max-width: ${DEVICE_SIZE.tablet}) {
      flex-basis: 60%;
    }
  }
  & > div:nth-child(3) {
    flex-basis: 40%;
  }
  & > div:nth-child(4) {
    flex-basis: 20%;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }
`;

const InviteDashLayout = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 10px;

    & > div:nth-child(1) {
      flex-basis: 30%;
      border: 1px solid red;
    }
    & > div:nth-child(2) {
      flex-basis: 70%;
      border: 1px solid blue;
    }
  }
`;

const InviterName = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin-bottom: 16px;

    & > div:nth-child(1) {
      flex-basis: 30%;
      border: 1px solid red;
    }
    & > div:nth-child(2) {
      flex-basis: 70%;
      border: 1px solid blue;
    }
  }
`;

const StyledChip = styled.div<{ $color: 'green' | 'purple' | 'orange' | 'blue' | 'pink' }>`
  margin-right: 16px;
  width: 8px;
  height: 8px;
  background-color: ${({ $color }) => `${CHIP_COLOR[$color]}`};
  border-radius: 100%;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-right: 12px;
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
