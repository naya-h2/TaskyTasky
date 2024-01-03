import { useState } from 'react';
import styled from 'styled-components';
import { modalType } from '@/lib/types/zustand';
import Input from '../Input/Input';
import ModalFrame from './ModalFrame';
import DashBoardColor from '../Chip/DashBoardColor';
import { FieldValues, useForm, useWatch } from 'react-hook-form';
import { createDashboard } from '@/api/dashboards/createDashboard';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/stores';
import { ERROR_MSG } from '@/lib/constants/inputErrorMsg';
import { FONT_16 } from '@/styles/FontStyles';
import { BLACK, GRAY, VIOLET } from '@/styles/ColorStyles';

interface Props {
  type: modalType;
}

function DashboardModal({ type }: Props) {
  const { push } = useRouter();
  const [colorTheme, setColorTheme] = useState('pastel');
  const [color, setColor] = useState('');
  const { hideModal } = useStore((state) => ({ hideModal: state.hideModal }));
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });
  const nameValue = watch('newDashboard');
  const isAllSelected = nameValue && color;

  const addNewDashboard = async (data: FieldValues) => {
    const body = { title: data.newDashboard, color };
    const response = await createDashboard(body);
    hideModal('dashBoard');
    push(`/board/${response.id}`);
  };

  return (
    <>
      <ModalFrame
        type={type}
        title={'새로운 대시보드'}
        height="Low"
        btnFnc={handleSubmit((data) => addNewDashboard(data))}
        disabledBtn={!isAllSelected}
      >
        <form onSubmit={handleSubmit((data) => addNewDashboard(data))}>
          <Input
            type="dashboard"
            register={register('newDashboard', { required: ERROR_MSG.emptyDashboardName })}
            error={errors.newDashboard}
            isHookForm
          />
          <StyledColorWrapper>
            <StyledText>색상 선택</StyledText>
            <StyledThemeWrapper>
              <StyledTheme $isSelected={'pastel' === colorTheme} onClick={() => setColorTheme('pastel')}>
                PASTEL
              </StyledTheme>
              <StyledTheme $isSelected={'vivid' === colorTheme} onClick={() => setColorTheme('vivid')}>
                VIVID
              </StyledTheme>
              <StyledTheme $isSelected={'custom' === colorTheme} onClick={() => setColorTheme('custom')}>
                CUSTOM
              </StyledTheme>
            </StyledThemeWrapper>
            <StyledChipWrapper>
              <DashBoardColor theme={colorTheme} selectedColor={color} setSelectedColor={setColor} isInModal={true} />
            </StyledChipWrapper>
          </StyledColorWrapper>
        </form>
      </ModalFrame>
    </>
  );
}

export default DashboardModal;

const StyledColorWrapper = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledText = styled.div`
  ${FONT_16};
  color: ${BLACK[2]};
`;

const StyledThemeWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledTheme = styled.div<{ $isSelected: boolean }>`
  width: 75px;
  padding: 5px 8px;

  display: flex;
  justify-content: center;

  border: 1px solid ${GRAY[30]};
  border-radius: 10px;

  color: ${(props) => (props.$isSelected ? `${VIOLET[1]}` : null)};
  background-color: ${(props) => (props.$isSelected ? `${VIOLET[8]}` : null)};

  &:hover {
    cursor: pointer;
    background-color: ${VIOLET[8]};
  }
`;

const StyledChipWrapper = styled.div`
  margin-top: 10px;
  justify-content: flex-start;
`;
