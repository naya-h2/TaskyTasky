import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import ArrowIcon from '@/public/icon/arrow_backward.svg';
import Second from '@/components/common/Header/SecondHeader/SecondHeader';
import SideMenu from '@/components/common/SideMenu/SideMenu';
import { FONT_14, FONT_15, FONT_16, FONT_18 } from '@/styles/FontStyles';
import { BLACK, GRAY } from '@/styles/ColorStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import EditMyDash from '@/components/common/Table/EditMyDash';
import DashMyMember from '@/components/common/Table/DashMyMember';
import DashInviteList from '@/components/common/Table/DashInviteList';
import { MEMBERS1 } from '@/lib/constants/mockup';
import boardMockData from '@/components/common/SideMenu/mock';

function Edit() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Root>
      <Second page="others" children="제목" />
      <SideMenu dashboards={boardMockData.dashboards} />
      <Content>
        <Wrapper>
          <ButtonLink href={`/board/${id}`}>
            <ReturnButton>
              <ArrowPosition>
                <ArrowBackward />
              </ArrowPosition>
              <ButtonText>돌아가기</ButtonText>
            </ReturnButton>
          </ButtonLink>
          <EditMyDash />
          <DashMyMember memberList={MEMBERS1} />
          <DashInviteList memberList={MEMBERS1} />
          <DeleteDashButton>대시보드 삭제하기</DeleteDashButton>
        </Wrapper>
      </Content>
    </Root>
  );
}

export default Edit;

const Root = styled.div``;

const Content = styled.div`
  width: 100%;
  padding-top: 70px;
  padding-left: 300px;
  background-color: ${[GRAY[20]]};
  display: flex;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    padding-top: 70px;
    padding-left: 160px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding-top: 70px;
    padding-left: 67px;
  }
`;

const Wrapper = styled.div`
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;

  &: link, 
  &: visited {
    color: ${[BLACK[2]]};
  }
`;

const ReturnButton = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  gap: 6px;
`;

const ArrowBackward = styled(ArrowIcon)``;
const ArrowPosition = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 20px;
    height: 20px;
  }
`;
const ButtonText = styled.div`
  font-size: 16px;
  ${[FONT_16]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_14]}
  }
`;

const DeleteDashButton = styled.button`
  width: 320px;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${[GRAY[30]]};
  ${[FONT_18]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 52px;
    ${[FONT_16]}
  }
`;
