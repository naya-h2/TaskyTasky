import { styled } from 'styled-components';
import { BLUE, GRAY, GREEN, ORANGE, PINK, PURPLE, WHITE } from '@/styles/ColorStyles';
import { FONT_14, FONT_16, FONT_18, FONT_20_B } from '@/styles/FontStyles';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { GetDashboardListDetailResponseType } from '@/lib/types/dashboards';

import { useStore } from '@/context/stores';
import EditModal from '../Modal/EditModal';
import { useRouter } from 'next/router';
import { getDashboardInfo } from '@/api/dashboards/getDashboardInfo';
import ColorChoice from '../Chip/ColorChoice';
import UpIcon from '@/public/icon/small-up.svg';
import DownIcon from '@/public/icon/small-down.svg';

function EditMyDash() {
  const [dashBoardInfo, setDashBoardInfo] = useState<GetDashboardListDetailResponseType>({
    id: 0,
    title: '',
    color: '',
    createdAt: '',
    updatedAt: '',
    createdByMe: false,
    userId: 0,
  });

  const initialColor = dashBoardInfo?.color;
  const colors = [GREEN, PURPLE, ORANGE, BLUE, PINK[1]];
  const colorIndex = colors.indexOf(initialColor);
  const [selectedColor, setSelectedColor] = useState('');
  const [isNotActive, setIsNotActive] = useState(true);
  const [editName, setEditName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);

  const { modal, showModal, isDashChanged } = useStore((state) => ({
    modal: state.modals,
    showModal: state.showModal,
    isDashChanged: state.isDashChanged,
  }));

  const OnNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
    value === '' ? setIsNotActive(true) : setIsNotActive(false);
  };

  const OnFocusInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEditName('');
  };

  const fetchDashboardData = async () => {
    const dashBoardData = await getDashboardInfo(dashboardId);
    setDashBoardInfo(dashBoardData);
  };

  const handleEditColorClick = () => {
    setIsOpen((prev) => !prev);
  };

  const setSelectColor = () => {
    setSelectedColor;
    setIsNotActive(false);
  };

  useEffect(() => {
    setSelectedColor(initialColor);
    fetchDashboardData();
    setEditName('');
  }, [initialColor, isDashChanged]);

  console.log(selectedColor, initialColor);

  return (
    <Wrapper>
      <Container>
        <EditDashChip>
          <ColorWrapper>
            {selectedColor && <Chip $color={selectedColor} />}
            <BoardTitle>{dashBoardInfo?.title}</BoardTitle>
          </ColorWrapper>
        </EditDashChip>
        <EditDashName>
          <DashNameText>대시보드 이름</DashNameText>
          <EditNameInputWrap>
            <EditNameInput value={editName} onChange={OnNameChangeHandler} onFocus={OnFocusInputHandler} />
          </EditNameInputWrap>
        </EditDashName>
        <EditColorWrapper onClick={handleEditColorClick}>
          <ColorEdit>색상 변경</ColorEdit>
          {isOpen ? <StyledUpIcon /> : <StyledDownIcon />}{' '}
        </EditColorWrapper>
        {isOpen && <ColorChoice type="edit" color={selectedColor} setColor={setSelectedColor} />}
        <EditButton>
          <ButtonWrapper>
            <Button.Plain
              style="primary"
              roundSize="M"
              onClick={() => showModal('EditDashboard')}
              isNotActive={isNotActive}
            >
              <ButtonText>변경</ButtonText>
            </Button.Plain>
          </ButtonWrapper>
        </EditButton>
      </Container>
      {modal.includes('EditDashboard') && (
        <EditModal type="EditDashboard" dashboardId={dashboardId} dashTitle={editName} dashColor={selectedColor} />
      )}
    </Wrapper>
  );
}

export default EditMyDash;

const Wrapper = styled.div`
  width: 620px;
  border-radius: 8px;
  background-color: ${[WHITE]};
  padding: 32px 28px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 544px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;

    padding: 27px 20px 21px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    gap: 15px;
  }
`;

const EditDashChip = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardTitle = styled.div`
  ${[FONT_20_B]}
`;

const EditDashName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DashNameText = styled.div`
  ${[FONT_18]}
  @media (max-width: ${DEVICE_SIZE.mobile}) {
    ${[FONT_16]}
  }
`;

const EditNameInputWrap = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  border: 1px solid ${[GRAY[30]]};
  padding: 15px 16px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 42px;
    padding: 13px 16px;
  }
`;
const EditNameInput = styled.input`
  width: 100%;
`;
const EditButton = styled.div`
  display: flex;
  justify-content: right;
`;

const ButtonWrapper = styled.div`
  width: 84px;
  height: 32px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;

const ButtonText = styled.text`
  display: flex;
  width: 84px;
  height: 32px;
  padding: 7px 29px;
  justify-content: center;
  align-items: center;
  ${[FONT_14]}

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    height: 28px;
  }
`;

const Chip = styled.div<{ $color: string }>`
  width: 15px;
  height: 15px;

  border-radius: 100%;
  background-color: ${(props) => props.$color};
`;

const ColorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorEdit = styled.div`
  ${FONT_18};
`;

const StyledDownIcon = styled(DownIcon)`
  width: 18px;
  height: 18px;
`;

const StyledUpIcon = styled(UpIcon)`
  width: 18px;
  height: 18px;
`;

const EditColorWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  gap: 5px;

  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;
