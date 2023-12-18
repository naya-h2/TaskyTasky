import styled from 'styled-components';
import DropDown from '@/components/common/DropDown/DropDown';

export default function Test() {
  return (
    <Div>
      <DropDown type="status" />
    </Div>
  );
}

const Div = styled.div`
  padding: 100px;
`;
