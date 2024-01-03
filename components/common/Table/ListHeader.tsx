import { FONT_12, FONT_14, FONT_20_B, FONT_24_B } from '@/styles/FontStyles';
import styled from 'styled-components';
import Button from '../Button';
import AddBoxIcon from '@/public/icon/add_box_fill.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useRouter } from 'next/router';
import { useStore } from '@/context/stores';
import InviteModal from '@/components/common/Modal/InviteModal';

interface ListHeaderProps {
  title: '구성원' | '초대 내역';
  totalCount: number;
  page: number;
  getPage: (num: number) => void;
}

function ListHeader({ title = '구성원', totalCount, page = 1, getPage }: ListHeaderProps) {
  const { modal, showModal } = useStore((state) => ({
    modal: state.modals,
    showModal: state.showModal,
  }));

  const router = useRouter();
  const { id } = router.query;
  const totalPage = Math.ceil(totalCount / 5);

  const handleButtonNextPage = () => {
    getPage(page + 1);
  };

  const handleButtonPrevPage = () => {
    getPage(page - 1);
  };

  return (
    <ListHeaderLayout>
      <HeaderLeft>{title}</HeaderLeft>
      {title === '초대 내역' && (
        <HeaderRight>
          <PageStatus>
            {totalPage === 0 ? 1 : totalPage} 페이지 중 {page}
          </PageStatus>
          <ArrowButton>
            <ButtonLayout>
              <Button.Arrow type="left" isNotActive={page <= 1 ? true : false} onClick={handleButtonPrevPage} />
              <Button.Arrow
                type="right"
                isNotActive={totalPage <= page ? true : false}
                onClick={handleButtonNextPage}
              />
            </ButtonLayout>
          </ArrowButton>
          <InviteButtonLayout>
            <Button.Plain style="primary" roundSize="S" onClick={() => showModal('invite')}>
              <ButtonStyle>
                <ButtonIcon>
                  <AddBox />
                </ButtonIcon>
                <ButtonText>초대하기</ButtonText>
              </ButtonStyle>
            </Button.Plain>
          </InviteButtonLayout>

          {modal.includes('invite') && <InviteModal dashboardId={Number(id)} />}
        </HeaderRight>
      )}
    </ListHeaderLayout>
  );
}

export default ListHeader;

const ListHeaderLayout = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  justify-content: space-between;

  padding: 0 28px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    padding: 0 20px;
  }
`;
const HeaderLeft = styled.div`
  display: flex;
  ${[FONT_24_B]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_20_B]}

    align-items: center;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 12px;

    flex-wrap: wrap;
    justify-content: right;
    width: 150px;
  }
`;

const PageStatus = styled.div`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;

const ArrowButton = styled.div`
  display: flex;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    flex-wrap: wrap;
    justify-content: right;
    gap: 10px;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
`;

const InviteButtonLayout = styled.div`
  width: 105px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 86px;
    height: 28px;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 6px;
  }
`;

const AddBox = styled(AddBoxIcon)`
  width: 16px;
  heightL 16px;
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 14px;
    height: 14px;
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.text`
  ${[FONT_14]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_12]}
  }
`;
