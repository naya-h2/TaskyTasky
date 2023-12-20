import styled from 'styled-components';
import DropDown from '@/components/common/DropDown/DropDown';

/**
 * 컴포넌트 실험용 페이지입니다. (컴포넌트 구현 완료 후 삭제 예정)
 */
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
