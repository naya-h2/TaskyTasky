import styled from 'styled-components';
import TextArea from '@/components/common/TextArea';
import ButtonBase from '@/components/common/Button/ButtonBase';
import { FONT_15, FONT_24 } from '@/styles/FontStyles';
import Button from '@/components/common/Button';

/**
 * 컴포넌트 실험용 페이지입니다. (컴포넌트 구현 완료 후 삭제 예정)
 */

export default function Test() {
  return (
    <>
      <Button.Add roundSize="L">냐냐</Button.Add>
      <Button.Arrow type="left" isNotActive></Button.Arrow>
      <Button.Arrow type="right"></Button.Arrow>
      <Button.Plain style="primary" roundSize="L" isNotActive>
        <Div>primary 버튼</Div>
      </Button.Plain>
    </>
  );
}

const Div = styled.div`
  color: white;
  ${FONT_24};
`;
