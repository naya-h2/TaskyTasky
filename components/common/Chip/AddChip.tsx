import styled from 'styled-components';
import AddFilloIcon from '@/public/icon/add_Fillo.svg';
import { DEVICE_SIZE } from '@/styles/DeviceSize';

function AddChip() {
  return (
    <StyledContainer>
      <StyledAddFilloIcon />
    </StyledContainer>
  );
}

export default AddChip;

const StyledContainer = styled.div`
  width: 22px;
  height: 22px;
  padding: 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f1effd;
  border-radius: 4px;

  @media (max-width: ${DEVICE_SIZE.mobile}) {
    width: 20px;
    height: 20px;
  }
`;

const StyledAddFilloIcon = styled(AddFilloIcon)`
  width: 16px;
  height: 16px;
`;
