import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { BLACK, GRAY, WHITE } from '@/styles/ColorStyles';
import { FONT_14, FONT_16, FONT_20_B } from '@/styles/FontStyles';
import Button from '@/components/common/Button';
import Profile from '@/components/common/Profile/Profile';
import ProfileImgList from '@/components/common/Profile/ProfileImgList';
import { getUserInfo } from '@/api/users/getUserInfo';
import { UserType } from '@/lib/types/users';
import { GetMemberListResponseType } from '@/lib/types/members';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { Z_INDEX } from '@/styles/ZIndexStyles';
import Setting from '@/public/icon/settings.svg';
import Invite from '@/public/icon/add_box.svg';
import Crown from '@/public/icon/crown.svg';
import { useStore } from '@/context/stores';
import InviteModal from '../../Modal/InviteModal';

interface Props {
  page: 'myboard' | 'others';
  children: ReactNode;
  crown?: boolean;
  membersData?: GetMemberListResponseType;
}

function Header({ page, children, crown, membersData }: Props) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserInfo();
      setUser(response);
    };

    fetchUser();
  }, []);

  return (
    <StyledBody>
      <StyledContainer $page={page}>
        <StyledTitleSection $page={page}>
          <StyledTitle>{children}</StyledTitle>
          {crown && <StyledCrownIcon />}
        </StyledTitleSection>
        <StyledRight>
          {page !== 'myboard' && (
            <>
              <HeaderButtons createdByMe={crown} />
              {membersData && <ProfileImgList memberCount={membersData.totalCount} data={membersData.members} />}
              <StyledDividingLine />
            </>
          )}
          {user && <Profile type="header" name={user.nickname} profileImg={user.profileImageUrl} id={user.id} />}
        </StyledRight>
      </StyledContainer>
    </StyledBody>
  );
}

export default Header;

interface HeaderButtonsProps {
  createdByMe?: boolean;
}

function HeaderButtons({ createdByMe }: HeaderButtonsProps) {
  const { modal, showModal } = useStore((state) => ({ modal: state.modals, showModal: state.showModal }));
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <StyledButtonSection>
        {createdByMe && (
          <Link href={`/board/${id}/edit`}>
            <StyledSettingWrapper>
              <Button.Plain style="outline" roundSize="L">
                <StyledWrapper>
                  <StyledSettingIcon />
                  <StyledText>관리</StyledText>
                </StyledWrapper>
              </Button.Plain>
            </StyledSettingWrapper>
          </Link>
        )}
        <StyledInviteWrapper>
          <Button.Plain style="outline" roundSize="L" onClick={() => showModal('invite')}>
            <StyledWrapper>
              <StyledInviteIcon />
              <StyledText>초대하기</StyledText>
            </StyledWrapper>
          </Button.Plain>
        </StyledInviteWrapper>
      </StyledButtonSection>
      {modal.includes('invite') && <InviteModal dashboardId={Number(id)} />}
    </>
  );
}

const StyledBody = styled.div`
  width: 100%;
  height: 70px;
  padding-left: 300px;

  position: fixed;
  top: 0;

  z-index: ${Z_INDEX.secondHeader_Body};

  display: flex;
  align-items: center;

  border-bottom: 1px solid ${GRAY[30]};
  background-color: ${WHITE};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-left: 79px;
  }
`;

const StyledContainer = styled.div<{ $page: string }>`
  width: 100%;
  padding-left: 40px;
  padding-right: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-left: 12px;
    padding-right: 40px;

    justify-content: ${(props) => (props.$page === 'myboard' ? null : 'flex-end')};
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-right: 12px;
  }
`;

const StyledRight = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    gap: 24px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 12px;
  }
`;

const StyledTitleSection = styled.div<{ $page: string }>`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    display: ${(props) => (props.$page === 'others' ? `none` : null)};
  }
`;

const StyledCrownIcon = styled(Crown)`
  width: 20px;
  height: 16px;
`;

const StyledButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    gap: 12px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 6px;
  }
`;

const StyledSettingWrapper = styled.div`
  width: 88px;
  height: 40px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 85px;
    height: 36px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 49px;
    height: 30px;
  }
`;

const StyledInviteWrapper = styled.div`
  width: 116px;
  height: 40px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 109px;
    height: 36px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 73px;
    height: 30px;
  }
`;

const StyledTitle = styled.div`
  color: ${BLACK[2]};
  ${FONT_20_B};
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledText = styled.div`
  ${FONT_16};
  color: ${GRAY[50]};

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    ${FONT_14};
  }
`;

const StyledDividingLine = styled.div`
  height: 38px;

  border-right: 1px solid ${GRAY[30]};

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 34px;
  }
`;

const StyledSettingIcon = styled(Setting)`
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;

const StyledInviteIcon = styled(Invite)`
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    display: none;
  }
`;
