import styled from 'styled-components';
import DropDown from '@/components/common/DropDown/DropDown';

export default function Test() {
  return (
    <>
      <Div>
        <DropDown type="status" initialStatus={'Done'} />
      </Div>
      <Div>
        <DropDown type="person" initialPerson="이규호" />
      </Div>
      <Div>
        <DropDown type="kebab" />
      </Div>
    </>
  );
}

const Div = styled.div`
  padding: 60px 100px 60px 200px;
`;
