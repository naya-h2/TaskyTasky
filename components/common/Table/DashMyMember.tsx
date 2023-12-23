import { styled } from 'styled-components';
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import ListHeader from './ListHeader';
import { MemberList } from '@/lib/types/type';
import { FONT_14, FONT_16 } from '@/styles/FontStyles';
import Button from '../Button';
import ProfileImg from '../Profile/ProfileImg';
import { useMediaQuery } from 'react-responsive';

interface Props {
  memberList: MemberList;
}

function DashMyMember({ memberList }: Props) {
  const isMobile = useMediaQuery({ query: `(max-width: ${DEVICE_SIZE.mobile})` });
  const ImageMobileSize = 34;
  const ImageSize = 38;
  const { members, totalCount } = memberList;

  return (
    <Wrapper>
      <Container>
        <ListHeader title="구성원" />
        <ListTitle>이름</ListTitle>
        <ListLayout>
          {members.map((member) => (
            <MemberWrapper key={member.id}>
              <MemberNameLayout>
                <ProfileImgLayout>
                  <ProfileImg
                    id={member.id}
                    name={member.nickname}
                    size={isMobile ? ImageMobileSize : ImageSize}
                    url={member.profileImageUrl as string}
                  />
                </ProfileImgLayout>
                <NameLayout>
                  <MemberName>{member.nickname}</MemberName>
                  <MemberDeleteButton>
                    <Button.Plain style="secondary" roundSize="S">
                      <ButtonText>삭제</ButtonText>
                    </Button.Plain>
                  </MemberDeleteButton>
                </NameLayout>
              </MemberNameLayout>
            </MemberWrapper>
          ))}
        </ListLayout>
      </Container>
    </Wrapper>
  );
}

export default DashMyMember;

const Wrapper = styled.div`
  width: 620px;
  height: 530px;
  border-radius: 8px;
  padding-top: 30px;
  background-color: ${[WHITE]};
  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 544px;
    height: 530px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 450px;
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

const MemberWrapper = styled.div`
  padding-top: 19px;
  padding-bottom: 19px;
  border-bottom: 1px solid ${[GRAY[20]]};
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 14px;
    padding-bottom: 14px;
  }
`;
const MemberNameLayout = styled.div`
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 12px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 8px;
    padding: 0 20px;
  }
`;
const MemberName = styled.div`
  ${[FONT_16]};
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
  }
`;
const MemberDeleteButton = styled.div`
  width: 84px;
  height: 32px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 52px;
    height: 28px;
  }
`;
const ListLayout = styled.div``;
const ProfileImgLayout = styled.div`
  flex-basis: 5%;
`;

const ButtonText = styled.div`
  color: ${[VIOLET[1]]};
`;

const NameLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-basis: 95%;
`;
