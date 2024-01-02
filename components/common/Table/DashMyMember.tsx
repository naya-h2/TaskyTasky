import { styled } from 'styled-components';
import { GRAY, VIOLET, WHITE } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_12, FONT_14, FONT_16, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import Button from '../Button';
import ProfileImg from '../Profile/ProfileImg';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetMemberListResponseType } from '@/lib/types/members';
import { getMemberList } from '@/api/members/getMemberList';

function DashMyMember() {
  const isMobile = useMediaQuery({ query: `(max-width: ${DEVICE_SIZE.mobile})` });
  const ImageMobileSize = 34;
  const ImageSize = 38;

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [dashMember, setDashMember] = useState<GetMemberListResponseType>({ members: [], totalCount: 0 });
  const { members, totalCount } = dashMember;
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(totalCount / 5);

  const fetchDashboardData = async (page: number) => {
    const dashMember = await getMemberList(dashboardId, page, 5);
    setDashMember(dashMember);
  };

  const handleButtonNextPage = () => {
    setPage(page + 1);
  };

  const handleButtonPrevPage = () => {
    setPage(page - 1);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchDashboardData(page);
  }, [router.isReady, page]);
  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>구성원</Title>
          <ArrowButton>
            <PageStatus>1 페이지 중 1</PageStatus>
            <ButtonLayout>
              <Button.Arrow type="left" isNotActive={page === 1 ? true : false} onClick={handleButtonPrevPage} />
              <Button.Arrow
                type="right"
                isNotActive={totalPage === page ? true : false}
                onClick={handleButtonNextPage}
              />
            </ButtonLayout>
          </ArrowButton>
        </Header>
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 28px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    margin: 0 20px;
  }
`;
const Title = styled.div`
  ${[FONT_24_B]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}

    align-items: center;
  }
`;

const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 16px;
  }
`;
const ButtonLayout = styled.div`
  display: flex;
`;

const PageStatus = styled.div`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;
