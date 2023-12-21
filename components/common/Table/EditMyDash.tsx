import { styled } from 'styled-components';
import { GRAY, WHITE } from '@/styles/ColorStyles';
import { FONT_16, FONT_18, FONT_20_B } from '@/styles/FontStyles';
import React, { useState } from 'react';
import DashBoardColor from '../Chip/DashBoardColor';
import Button from '../Button';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import { useMediaQuery } from 'react-responsive';

function EditMyDash() {
  const isMobile = useMediaQuery({ query: `(max-width: ${DEVICE_SIZE.mobile})` });
  const [selectedColor, setSelectedColor] = useState('');
  const [editName, setEditName] = useState('뉴프로젝트');

  const OnNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditName(value);
  };

  const OnFocusInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setEditName('');
  };

  return (
    <Wrapper>
      <Container>
        <EditDashChip>
          <Title>제목</Title>
          <DashBoardColor selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </EditDashChip>
        <EditDashName>
          <DashNameText>대시보드 이름</DashNameText>
          <EditNameInputWrap>
            <EditNameInput value={editName} onChange={OnNameChangeHandler} onFocus={OnFocusInputHandler} />
          </EditNameInputWrap>
        </EditDashName>
        <EditButton>
          <ButtonWrapper>
            <Button type="primary" children="변경" height="100%" roundSize="S" fontSize={isMobile ? 'S' : 'M'} />
          </ButtonWrapper>
        </EditButton>
      </Container>
    </Wrapper>
  );
}

export default EditMyDash;

const Wrapper = styled.div`
  width: 620px;
  height: 256px;
  border-radius: 8px;
  background-color: ${[WHITE]};
  padding: 32px 28px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    width: 544px;
    height: 256px;
  }

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 284px;
    height: 211px;
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

const Title = styled.div`
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
const EditNameInput = styled.input``;
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
