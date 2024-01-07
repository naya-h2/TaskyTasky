import styled from 'styled-components';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { FONT_12B } from '@/styles/FontStyles';
import { GRAY } from '@/styles/ColorStyles';
import { useStore } from '@/context/stores';
import { DashboardType } from '@/lib/types/dashboards';
import DashboardModal from '@/components/common/Modal/DashboardModal';
import AddIcon from '@/public/icon/add_box_Fillo.svg';

interface Props {
  data: DashboardType[];
  onDashboardAdded?: () => void;
}

/**
 * @param data dashboard 목록의 배열
 * @function onDashboardAdded 대시보드가 추가되었음을 부모 컴포넌트에게 알리는 콜백 함수
 */

function TabletAddDashBoard({ onDashboardAdded }: Props) {
  const { modals, showModal, page, total, increasePage, decreasePage } = useStore((state) => ({
    modals: state.modals,
    showModal: state.showModal,
    page: state.myboardPageNumber,
    total: state.myboardTotalPage,
    increasePage: state.increasePage,
    decreasePage: state.decreasePage,
  }));

  function handleDashboardAdd() {
    showModal('dashBoard');

    if (onDashboardAdded) {
      onDashboardAdded();
    }
  }

  return (
    <StyledContainer>
      <StyledWords>Dash Boards</StyledWords>
      <StyledButton onClick={handleDashboardAdd}>
        <StyledAddIcon />
      </StyledButton>
      {modals[modals.length - 1] === 'dashBoard' && <DashboardModal type="dashBoard" />}
    </StyledContainer>
  );
}

export default TabletAddDashBoard;

const StyledContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledWords = styled.span`
  color: ${GRAY[50]};
  ${FONT_12B};
`;

const StyledAddIcon = styled(AddIcon)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 16px;
  height: 16px;
  border: 1.5px solid #787486;
  padding: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: #ffffff;
`;
