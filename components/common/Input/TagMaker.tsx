import { GRAY, VIOLET } from '@/styles/ColorStyles';
import styled from 'styled-components';

function TagMaker() {
  const TagArr = [];

  return (
    <StyledContainer>
      {TagArr.length > 0 && <StyledTagBoxes></StyledTagBoxes>}
      <StyledInput />
    </StyledContainer>
  );
}

export default TagMaker;

const StyledContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid ${GRAY[30]};
  border-radius: 6px;

  &:focus-within {
    border: 1px solid ${VIOLET[1]};
  }
`;

const StyledTagBoxes = styled.div`
  max-width: 200px;
  overflow-x: auto;
`;

const StyledInput = styled.input``;
